const audio = new Object;

audio.container = document.querySelector('#container');
audio.player = audio.container.querySelector('audio');
audio.name = audio.container.querySelector('div');

const a = document.querySelectorAll('main a');
const tables = document.querySelectorAll('main table');
const tr = document.querySelectorAll('main tr');
const node = document.createElement('span');

let currentTable = tables[0];

tables.forEach(el => {
    el.parentElement.addEventListener('click', funcBtnForDisolayChg);
});

function funcBtnForDisolayChg(event) {
    if (event.target.tagName !== 'A') {
        currentTable.style.display = 'none';
        currentTable.parentElement.style.backgroundColor = 'rgb(120 114 34)';
        currentTable = this.children[1];
        currentTable.style.display = 'table';
        currentTable.parentElement.scrollIntoView({ behavior: "smooth", block: "start" });
        currentTable.parentElement.style.backgroundColor = 'rgb(74, 69, 6)';
    }
}

function funcPlayAudio() {
    audio.player.src = this.name;
    audio.name.style.padding = '5px 10px';
    let cot = this.parentNode.parentNode;
    audio.name.innerHTML = cot.children[0].innerHTML;
    while (cot.children[0].innerHTML === 'בענין הנ"ל') {
        cot = cot.previousElementSibling;
        const cott = cot.children[0].innerHTML;
        if (cott !== 'בענין הנ"ל') {
            const clone = node.cloneNode(true);
            clone.textContent = '(' + cott + ')';
            audio.name.appendChild(clone);
        }
    }
}

a.forEach(el => {
    if (el.href.slice(-3) === 'mp3') {
        el.setAttribute('name', el.href);
        el.removeAttribute('href')
        el.classList = 'a';
        el.addEventListener('click', funcPlayAudio);
    } else {
        el.setAttribute('target', '_blank');
    }
});

tr.forEach(el => {
    if (!el.innerText.includes('אודיו')) {
        const clone = node.cloneNode(true);
        clone.innerHTML = 'אודיו';
        el.lastElementChild.prepend(clone);
    };
    if (!el.innerText.includes('וידאו')) {
        const clone = node.cloneNode(true);
        clone.innerHTML = 'וידאו';
        el.querySelector('a').after(clone);
    };
    if (!el.innerText.includes('דף עזר')) {
        const clone = node.cloneNode(true);
        clone.innerHTML = 'דף עזר';
        el.lastElementChild.appendChild(clone);
    };
});