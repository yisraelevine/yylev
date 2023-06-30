const popup1 = {};
const newStories = {};
const otherStories = {};
const allStories = {};
const sidebar = {};
const nav = {};
const data = {};
const dataNew = [];
const dataAll = [];
let navIsShown = false;

popup1.container = document.getElementById('popup-container');
popup1.audio = popup1.container.querySelector('audio');
popup1.sources = popup1.audio.children;
popup1.download = popup1.container.querySelector('.downloadBtn .elementor-button');
popup1.previous = popup1.container.querySelector('.btnP .elementor-button');
popup1.next = popup1.container.querySelector('.btnN .elementor-button');
popup1.header = popup1.container.querySelector('h2');
popup1.close = popup1.container.querySelector('.close-popup-button i');

otherStories.buttons = document.querySelectorAll('.heading_container .elementor-widget-button')

allStories.container = document.querySelector('#all_buttons_container .elementor-container');

sidebar.container = document.getElementById('sidebar');

popup1.audio.addEventListener('ended', audioEnded);
popup1.previous.addEventListener('click', navBtnP);
popup1.next.addEventListener('click', navBtnN);
popup1.close.addEventListener('click', funcClosePopup);
sidebar.container.addEventListener('mousedown', funcNavShow);

window.addEventListener('scroll', function () {
    if (navIsShown) {
        setTimeout(function () {
            side_nav.style.zIndex = -1;
            side_search.style.zIndex = -1;
        }, 300);
        side_nav.style.opacity = 0;
        side_search.style.opacity = 0;
        navIsShown = false;
        if (document.querySelector('.search-in-place')) {
            document.querySelector('.search-in-place').style.visibility = 'hidden';
        }
    }
});

if (document.querySelector('.elementor-editor-active') === null) {
    otherStories.buttons.forEach(el => {
        el.dataset.source = funcUrl(el.querySelector('a').href);
        el.querySelector('a').removeAttribute('href');
        el.addEventListener('mousedown', funcAll);
    });
}

fetch(urlSheets).then(res => res.text()).then(rep => {
    data.rows = JSON.parse(rep.substring(47).slice(0, -2)).table.rows;
    newStories.date = data.rows[0].c[0].v;
    data.rows.shift();
    data.rows.forEach(row => {
        row = row.c;
        if (row[0]?.v.includes('*')) {
            dataNew.push([row[0]?.v.replace('*', ''), row[1]?.v, row[2]?.v]);
        } else {
            dataAll.push([row[0]?.v, row[1]?.v, row[2]?.v]);
        }
    });
}).then(() => {
    // setting update date
    document.querySelector('#dateUpdated .elementor-heading-title').textContent = newStories.date;

    // creating buttons for new stories
    newStories.container = document.querySelector('#new-stories-container');
    newStories.node = newStories.container.firstElementChild;
    dataNew.forEach(el => {
        clone = newStories.node.cloneNode(true);
        clone.querySelector('.elementor-button-text').textContent = el[0];
        clone.dataset.source = funcUrl(el[1]);
        clone.dataset.sourceDb = funcUrlDB(el[2]);
        clone.addEventListener('mousedown', funcAll);
        newStories.container.appendChild(clone);
    });
    newStories.node.remove();

    // showing newStories container
    newStories.container.style.display = 'flex';

    // creating containers
    allStories.containerNode = allStories.container.firstElementChild;
    const x = (10 - (dataAll.length % 10));
    const timesToClone = Math.floor(dataAll.length / 10);
    for (let i = 0; i < timesToClone; i++) {
        allStories.container.appendChild(allStories.containerNode.cloneNode(true));
    }

    // removing leftover buttons
    allStories.buttons = Object.values(allStories.container.querySelectorAll('.elementor-widget-button'));
    for (let i = 0; i < x; i++) {
        allStories.buttons.pop().remove();
    }

    // setting button propeties
    for (let i = 0; i < dataAll.length; i++) {
        const button = allStories.buttons[dataAll.length - i - 1];
        if (dataAll[i][0] === undefined) {
            button.parentElement.parentElement.style.display = 'none';
        }
        button.querySelector('.elementor-button-text').textContent = dataAll[i][0];
        button.dataset.source = funcUrl(dataAll[i][1]);
        button.dataset.sourceDb = funcUrlDB(dataAll[i][2]);
        button.addEventListener('mousedown', funcAll);
    };

    // removing leftover containers
    if (x === 10) {
        allStories.container.children[allStories.container.children.length - 1].remove();
    }

    // showing allStories container
    allStories.container.style.display = 'flex';
});


nav.node = document.createElement('div');
nav.container = document.querySelector('#nav .e-con-inner');
for (let i = 0, x = 1; i < allStories.container.children.length; i++) {
    if (i % 5 === 0) {
        const clone = nav.node.cloneNode(true);
        clone.addEventListener('mousedown', funcScroll);
        clone.dataset.navId = x;
        allStories.container.children[i].id = x;
        clone.textContent = x;
        x++;
        nav.container.appendChild(clone);
    }
}