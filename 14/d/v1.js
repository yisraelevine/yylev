const sheetUrl = 'https://docs.google.com/spreadsheets/d/'
    + '1MNlbLGJt2NBiXabHWXWSpcHnv9nahq-LBePTOgi00OY'
    + '/gviz/tq';
const recentContainer = document.querySelector('#recent-container');
const recentNode = recentContainer.children[0];
const categoriesContainer = document.querySelector('#categories-container');
const categoryNode = categoriesContainer.children[0];
const storiesContainer = document.querySelector('#stories-container');
const storyNode = storiesContainer.children[0];
let selectedCategory;

const changeStoriesShown = (cat, sto) => {

    selectedCategory?.classList.remove('selected');
    selectedCategory = cat;
    selectedCategory.classList.add('selected');

    storiesContainer.innerHTML = '';
    sto.forEach(el => {
        const clone = storyNode.cloneNode(true);
        clone.querySelector('.elementor-button-text').innerText = el[0];
        storiesContainer.prepend(clone);
    });
}

const getData = async () => {

    const rep = await fetch(sheetUrl + '?headers=1');
    const res = await rep.text();
    const table = JSON.parse(res.slice(47, -2)).table;
    let rows = table.rows.map(o => o?.c?.map(i => i?.v || '') || '');
    const recS = rows.filter(el => el[0].includes('*'));
    rows = rows.filter(el => !el[0].includes('*'));
    const splitIndex = rows.findIndex(el => el[0] === '-');
    const newS = splitIndex !== -1 ? rows.slice(0, splitIndex) : [];
    const oldS = splitIndex !== -1 ? rows.slice(splitIndex + 1) : [];
    const count = Math.ceil(oldS.length / 50);

    document.querySelector('#date-updated .elementor-heading-title').innerText = table.cols[0]?.label;

    recentContainer.innerHTML = '';
    recS.forEach(el => {
        const clone = recentNode.cloneNode(true);
        clone.querySelector('.elementor-button-text').innerText = el[0].replace('*', '');
        recentContainer.appendChild(clone);
    })

    for (let i = 0; i < count; i++) {
        const clone = categoryNode.cloneNode(true);
        clone.querySelector('.elementor-button-text').innerText = count - i;
        clone.addEventListener('click', () => {
            changeStoriesShown(clone, oldS.slice(50 * i, 50 * i + 50));
        })
        categoriesContainer.appendChild(clone);
    }

    const newSEvent = () => {
        changeStoriesShown(categoryNode, newS)
    }
    newSEvent();
    categoryNode.addEventListener('click', newSEvent);
}

getData();