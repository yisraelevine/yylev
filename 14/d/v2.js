const sheetUrl = 'https://docs.google.com/spreadsheets/d/'
    + '1MNlbLGJt2NBiXabHWXWSpcHnv9nahq-LBePTOgi00OY'
    + '/gviz/tq';
const recentContainer = document.querySelector('#recent-container');
const recentNode = recentContainer.children[0];
const categoriesContainer = document.querySelector('#categories-container');
const categoryNode = categoriesContainer.children[0];
const storiesContainer = document.querySelector('#stories-container');
const storyNode = storiesContainer.children[0];
const popupContainer = document.querySelector('#popup-container');
const popupHeading = popupContainer.querySelector('.popup-heading .elementor-heading-title');
const prevStoryButton = popupContainer.querySelector('.prev-story');
const nextStoryButton = popupContainer.querySelector('.next-story');
const downloadStory = popupContainer.querySelector('.download-story a');
const audio = popupContainer.querySelector('audio');
let selectedCategoryNode;
let selectedCategoryIndex;
let selectedStoryButton;
let selectedStoryIndex;
let prevStory;
let nextStory;
let prevStoryNode;
let nextStoryNode;
const allStories = [];

const gdUrl = (url) => {
    return 'https://docs.google.com/uc?export=download&id='
        + url.replace('https://drive.google.com/file/d/', '').split('/')[0];
}

const dbUrl = (url) => {
    return url.replace('www.dropbox.com', 'dl.dropboxusercontent.com')
        .replace('?dl=0', '?dl=1');
}

const showPopup = () => {
    changeNavVisibility();
    popupContainer.style.display = 'flex';
}

const playStory = (story) => {
    popupHeading.innerText = story[0];
    downloadStory.href = gdUrl(story[1]);
    audio.children[0].src = dbUrl(story[2]);
    audio.children[1].src = gdUrl(story[1]);
    audio.load();
}

const changeCategoriesStyle = (i) => {
    selectedCategoryNode?.classList.remove('selected');
    selectedCategoryNode = categoriesContainer.children[i];
    selectedCategoryNode.classList.add('selected');
}

const changeStoriesShown = (ci) => {
    
    selectedCategoryIndex = ci;

    storiesContainer.innerHTML = '';
    allStories[ci].forEach((el, i) => {
        const clone = storyNode.cloneNode(true);
        clone.querySelector('.elementor-button-text').innerText = el[0];
        clone.addEventListener('click', () => {
            selectedStoryIndex = i;
            prevStory = allStories[ci]?.[i - 1];
            nextStory = allStories[ci]?.[i + 1];
            selectedStoryButton = clone;
            changeNavVisibility();
            playStory(el);
            showPopup();
        })
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
    allStories.push(splitIndex !== -1 ? rows.slice(0, splitIndex) : [])
    const oldS = splitIndex !== -1 ? rows.slice(splitIndex + 1) : [];
    const count = Math.ceil(oldS.length / 50);

    document.querySelector('#date-updated .elementor-heading-title').innerText = table.cols[0]?.label;

    recentContainer.innerHTML = '';
    recS.forEach(el => {
        const clone = recentNode.cloneNode(true);
        clone.querySelector('.elementor-button-text').innerText = el[0].replace('*', '');
        clone.addEventListener('click', () => {
            selectedStoryIndex = -1;
            showPopup();
            playStory(el);
        })
        recentContainer.appendChild(clone);
    })

    for (let i = 0; i < count; i++) {
        allStories.push(oldS.slice(50 * i, 50 * i + 50));
        const clone = categoryNode.cloneNode(true);
        clone.querySelector('.elementor-button-text').innerText = count - i;
        clone.addEventListener('click', () => {
            changeStoriesShown(i + 1);
            changeCategoriesStyle(i + 1);
        })
        categoriesContainer.appendChild(clone);
    }

    changeStoriesShown(0);
    changeCategoriesStyle(0);
    categoryNode.addEventListener('click', () => {
        changeStoriesShown(0);
        changeCategoriesStyle(0);
    });
}

getData();

downloadStory.target = '_blank';

popupContainer.querySelector('.popup-close').addEventListener('click', () => {
    popupContainer.style.display = '';
    audio.pause();
});

prevStoryButton.addEventListener('click', () => {
    playStory(prevStory);
    selectedStoryButton = selectedStoryButton.nextElementSibling;
    selectedStoryIndex -= 1;
    navClickEvent();
    changeNavVisibility();
});

nextStoryButton.addEventListener('click', () => {
    playStory(nextStory);
    selectedStoryButton = selectedStoryButton.previousElementSibling;
    selectedStoryIndex += 1;
    navClickEvent();
    changeNavVisibility();
});

const navClickEvent = () => {
    const catg = allStories[selectedCategoryIndex];
    const i = selectedStoryIndex;
    prevStory = catg?.[i - 1];
    nextStory = catg?.[i + 1];
}

const changeNavVisibility = () => {
    prevStoryButton.style.display = prevStory ? '' : 'none';
    nextStoryButton.style.display = nextStory ? '' : 'none';
    selectedStoryButton?.classList.add('selected');
}