const sheetUrl = 'https://docs.google.com/spreadsheets/d/1MNlbLGJt2NBiXabHWXWSpcHnv9nahq-LBePTOgi00OY/gviz/tq';
const newStories = {}, categories = {}, allStories = {}, popup = {};

newStories.container = document.querySelector('#recent-container');
newStories.node = newStories.container.children[0];

categories.container = document.querySelector('#categories-container');
categories.node = categories.container.children[0];

allStories.container = document.querySelector('#stories-container');
allStories.node = allStories.container.children[0];

popup.container = document.querySelector('#popup-container');
popup.name = popup.container.querySelector('.popup-heading .elementor-heading-title');
popup.previous = popup.container.querySelector('.prev-story');
popup.next = popup.container.querySelector('.next-story');
popup.download = popup.container.querySelector('.download-story a');
popup.audio = popup.container.querySelector('audio');

const gdUrl = url => 'https://docs.google.com/uc?export=download&id=' + url.replace('https://drive.google.com/file/d/', '').split('/')[0];
const dbUrl = url => url.replace('www.dropbox.com', 'dl.dropboxusercontent.com').replace('?dl=0', '?dl=1');
const playStory = story => {
    popup.name.innerText = story[0];
    popup.download.href = gdUrl(story[1]);
    popup.audio.children[0].src = dbUrl(story[2]);
    popup.audio.children[1].src = gdUrl(story[1]);
    popup.audio.load();
}
const openPopup = () => popup.container.style.display = 'flex';
const genStoryElems = (array) => {

    allStories.container.innerHTML = '';

    array.forEach(e => {
        const clone = allStories.node.cloneNode(true);
        clone.querySelector('.elementor-button-text').innerText = e[0];
        clone.addEventListener('click', () => {
            playStory(e);
            openPopup();
        });
        allStories.container.prepend(clone);
    });
    
    allStories.container.scroll(0, -allStories.container.scrollHeight);

}

const getData = async () => {

    const rep = await fetch(sheetUrl + '?headers=1');
    const res = await rep.text();
    const table = JSON.parse(res.slice(47, -2)).table;
    let rows = table.rows.map(o => o?.c?.map(i => i?.v || '') || '');

    document.querySelector('#date-updated .elementor-heading-title').innerText = table.cols[0]?.label;

    newStories.node.remove();
    rows.filter(e => e[0].includes('*')).forEach(e => {
        const clone = newStories.node.cloneNode(true);
        const el = e[0].replace('*', '');
        clone.querySelector('.elementor-button-text').innerText = el;
        clone.addEventListener('click', () => {
            playStory(el);
            openPopup();
        });
        newStories.container.appendChild(clone);
    });

    rows = rows.filter(el => !el[0].includes('*'));
    const split = rows.findIndex(el => el[0] === '-');
    const _new = rows.slice(0, split);
    const _old = rows.slice(split + 1);
    const count = Math.ceil(_old.length / 50);

    for (let i = 0; i < count; i++) {
        const clone = categories.node.cloneNode(true);
        clone.querySelector('.elementor-button-text').innerText = count - i;
        clone.addEventListener('click', () => {
            genStoryElems(_old.slice(50 * i, 50 * i + 50));
        });
        categories.container.appendChild(clone);
    }

    genStoryElems(_new);
    categories.node.addEventListener('click', () => {
        genStoryElems(_new);
    });

}
getData();

popup.container.querySelector('.popup-close').addEventListener('click', () => {
    popup.container.style.display = '';
    popup.audio.pause();
});
