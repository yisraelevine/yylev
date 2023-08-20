const stories = {}, categories = {};

categories.container = document.querySelector('#categories-container');
categories.node = categories.container.children[0];

stories.container = document.querySelector('#stories-container');
stories.node = stories.container.children[0];
stories.data = [];

const sheetUrl = 'https://docs.google.com/spreadsheets/d/'
    + '1MNlbLGJt2NBiXabHWXWSpcHnv9nahq-LBePTOgi00OY'
    + '/gviz/tq';

const dynamicOverflow = () => {
    if (stories.container.scrollHeight > stories.container.clientHeight) {
        stories.container.style.paddingLeft = '';
    } else {
        stories.container.style.paddingLeft = '0';
    }
}

const getData = async () => {
    let selectedClone;
    const rep = await fetch(sheetUrl + '?headers=1');
    const res = await rep.text();
    const table = JSON.parse(res.slice(47, -2)).table;
    let rows = table.rows.map(o => o?.c?.map(i => i?.v || '') || '');
    stories.new = rows.filter(el => el[0].includes('*'));
    rows = rows.filter(el => !el[0].includes('*'));
    const count = Math.ceil(rows.length / 50);
    for (let i = rows.length, x = 0; i > 0; i -= 50, x++) {
        const clone = categories.node.cloneNode(true);
        clone.querySelector('.elementor-button-text').innerText = count - x;
        clone.addEventListener('click', () => {
            selectedClone.classList.remove('selected');
            selectedClone = clone;
            selectedClone.classList.add('selected');
            stories.container.innerHTML = '';
            stories.data[count - 1 - x].forEach(el => {
                const cl = stories.node.cloneNode(true);
                cl.querySelector('.elementor-button-text').innerText = el[0];
                stories.container.appendChild(cl);
            });
            dynamicOverflow();
        })
        categories.container.appendChild(clone);
        stories.data.push(rows.slice(Math.max(0, i - 50), i));
    }
    const newCatgEvent = () => {
        selectedClone?.classList.remove('selected');
        selectedClone = categories.node;
        selectedClone.classList.add('selected');
        stories.container.innerHTML = '';
        stories.new.forEach(el => {
            const cl = stories.node.cloneNode(true);
            cl.querySelector('.elementor-button-text').innerText = el[0].replace('*', '');
            stories.container.appendChild(cl);
        });
        dynamicOverflow();
    }
    newCatgEvent();
    categories.node.addEventListener('click', newCatgEvent);
}

getData()