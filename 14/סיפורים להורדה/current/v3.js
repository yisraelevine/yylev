const sheetId = '1MNlbLGJt2NBiXabHWXWSpcHnv9nahq-LBePTOgi00OY';
const urlSheets = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq`;

function funcUrl(url) {
    url = url?.replace('https://docs.google.com/uc?export=download&id=', '') || '';
    url = url.replace('https://drive.google.com/a/student.hartnell.edu/file/d/', '');
    url = url.replace('https://drive.google.com/open?id=', '');
    url = url.replace('https://drive.google.com/file/d/', '');
    url = url.replace('http://', '');
    url = url.replace('&authuser=0&usp=drive_link', '');
    url = url.replace('/view?usp=share_link', '');
    url = url.replace('/view?usp=sharing', '');
    url = url.replace('?usp=drive_link', '');
    url = url.replace('?usp=drivesdk', '');
    url = url.replace('/view', '');
    url = url.replace('/', '');
    return url;
}

function funcUrlDB(url) {
    url = url?.replace('?dl=0', '?dl=1') || '';
    url = url.replace('www.dropbox.com', 'dl.dropboxusercontent.com');
    return url;
}

let btn;
let btnP;
let btnN;
function funcAll() {
    if (btn !== undefined) {
        btn.children[0].style.backgroundColor = '#376381';
    }
    btn = this;
    funcOnBtnClick();
}

function navBtnP() {
    btn.children[0].style.backgroundColor = '#376381';
    btn = btnP;
    funcOnBtnClick();
}

function navBtnN() {
    btn.children[0].style.backgroundColor = '#376381';
    btn = btnN;
    funcOnBtnClick();
}

let btnsInMainContainer;
function funcOnBtnClick() {
    btnsInMainContainer = document.querySelectorAll('#all_buttons_container .elementor-widget-button');

    btn.children[0].style.backgroundColor = 'rgb(15,59,89)';
    popup1.header.innerText = btn.getElementsByClassName('elementor-button-text')[0].innerText;
    a = btn.dataset.sourceDb;
    b = `https://docs.google.com/uc?export=download&id=${btn.dataset.source}`;
    c = `https://www.googleapis.com/drive/v3/files/${btn.dataset.source}?alt=media&key=AIzaSyCj9vJ33UW--zxksFMVzPfMLIB1H1X0T1s`;
    popup1.sources[0].src = a;
    popup1.sources[1].src = b;
    popup1.sources[2].src = c;
    popup1.download.href = b;
    popup1.audio.load();
    popup1.container.style.display = 'flex';
    setTimeout(function () {
        popup1.audio.focus();
    }, 100);

    if (btn.parentElement.parentElement.classList.contains('elementor-element-6a33bb9') && btn !== btnsInMainContainer[0]) {
        popup1.next.style.display = 'flex';
    } else {
        popup1.next.style.display = 'none';
    }

    if (btn.parentElement.parentElement.classList.contains('elementor-element-6a33bb9') && btn !== btnsInMainContainer[btnsInMainContainer.length - 1]) {
        popup1.previous.style.display = 'flex';
    } else {
        popup1.previous.style.display = 'none';
    }

    btnN = btn.previousElementSibling || btn.parentElement.parentElement.previousElementSibling.children[0].children[9];
    btnP = btn.nextElementSibling || btn.parentElement.parentElement.nextElementSibling.children[0].children[0];
};

function audioEnded() {
    popup1.audio.autoplay = true;
    navBtnN();
}

function funcSearchFocus() {
    if (navIsShown) {
        document.getElementsByClassName('search-field')[0].focus();
    }
}

const side_nav = document.getElementById('nav');
const side_search = document.getElementById('search');
function funcNavShow() {
    if (navIsShown) {
        side_nav.style.opacity = 0;
        side_search.style.opacity = 0;
        setTimeout(function () {
            side_nav.style.zIndex = -1;
            side_search.style.zIndex = -1;
        }, 300)
        navIsShown = false;
    }
    else {
        side_nav.style.zIndex = 10;
        side_search.style.zIndex = 10;
        side_nav.style.opacity = 1;
        side_search.style.opacity = 1;
        navIsShown = true;
    }
    setTimeout(function () {
        if (document.getElementsByClassName('search-in-place')[0]) {
            document.getElementsByClassName('search-in-place')[0].style.visibility = 'visible';
        }
    }, 800);
}

function funcScroll() {
    document.getElementById(this.dataset.navId).scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
}

function funcClosePopup() {
    popup1.container.style.display = 'none';
    popup1.audio.pause();
    popup1.audio.autoplay = false;
}










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
    newStories.container.style.display = 'flex';

    // creating buttons for all stories
    allStories.containerNode = allStories.container.firstElementChild;
    const x = (10 - (dataAll.length % 10));
    const timesToClone = Math.floor(dataAll.length / 10);
    for (let i = 0; i < timesToClone; i++) {
        allStories.container.appendChild(allStories.containerNode.cloneNode(true));
    }
    allStories.buttons = Array.from(allStories.container.querySelectorAll('.elementor-widget-button'));
    allStories.leftover = allStories.buttons.splice(-x);
    if (x === 10) {
        allStories.container.children[allStories.container.children.length - 1].remove();
    } else {
        allStories.leftover.forEach(el => el.remove());
    }

    // setting all button propeties
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
    allStories.container.style.display = 'flex';

    // nav
    nav.node = document.createElement('div');
    nav.container = document.querySelector('#nav .e-con-inner');
    for (let i = 0, x = 1; i < allStories.container.children.length; i++) {
        if (i % 5 === 0) {
            const clone = nav.node.cloneNode(true);
            clone.addEventListener('mousedown', funcScroll);
            clone.dataset.navId = x;
            allStories.container.children[i].id = x;
            clone.textContent = x;
            nav.container.appendChild(clone);
            x++;
        }
    }
});