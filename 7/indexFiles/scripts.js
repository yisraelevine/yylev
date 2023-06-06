const audioPlayerContainer = document.querySelector('#container');
const audioPlayer = audioPlayerContainer.querySelector('audio');
const audioPlayerFileName = audioPlayerContainer.querySelector('div');
const a = document.querySelectorAll('a');
const tables = document.querySelectorAll('#main table');
const trElements = document.querySelectorAll('tr');
let currentTable = tables[0];

tables.forEach(el => {
    el.parentElement.addEventListener('click', funcBtnForDisolayChg);
    el.style.display = 'table';
    el.style.display = 'none';
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

const nodeSpan = document.createElement('span');
function funcPlayAudio() {
    audioPlayer.src = this.dataset.src;
    audioPlayerFileName.style.padding = '5px 10px';
    let cot = this.parentNode.parentNode;
    audioPlayerFileName.innerHTML = cot.children[0].innerHTML;
    while (cot.children[0].innerHTML === 'בענין הנ"ל') {
        cot = cot.previousElementSibling;
        const cott = cot.children[0].innerHTML;
        if (cott !== 'בענין הנ"ל') {
            const clone = nodeSpan.cloneNode(true);
            clone.textContent = '(' + cott + ')';
            audioPlayerFileName.appendChild(clone);
        }
    }
}

a.forEach(el => {
    if (el.href.slice(-3) === 'mp3') {
        el.dataset.src = el.href;
        el.setAttribute('name', el.href);
        el.removeAttribute('href')
        el.classList = 'a';
        el.addEventListener('click', funcPlayAudio);
    } else {
        el.setAttribute('target', '_blank');
    }
});

const node = document.createElement('span');
node.innerHTML = 'וידאו';
document.querySelectorAll('tr').forEach(tr => {
    if (tr.querySelectorAll('a').length < 3) {
        if (!tr.innerHTML.includes('וידאו')) {
            const clone = node.cloneNode(true);
            tr.querySelector('a').after(clone);
        }
    };
});