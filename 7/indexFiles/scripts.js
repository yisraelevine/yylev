const audio = document.querySelector('audio');
const a = document.querySelectorAll('a');
const tables = document.querySelectorAll('#main table');
const trElements = document.querySelectorAll('tr');
let currentTable = tables[0];

tables.forEach(el => {
    el.parentElement.addEventListener('click', funcBtnForDisolayChg);
    el.style.display = 'table';
    el.style.display = 'none';
});

function funcBtnForDisolayChg() {
    currentTable.style.display = 'none';
    currentTable.parentElement.style.backgroundColor = 'rgb(120 114 34)';
    currentTable = this.children[1];
    currentTable.style.display = 'table';
    currentTable.parentElement.scrollIntoView({ behavior: "smooth", block: "start" });
    currentTable.parentElement.style.backgroundColor = 'rgb(74, 69, 6)';
}

function funcPlayAudio() {
    audio.src = this.dataset.src;
}

a.forEach(el => {
    if (el.href.slice(-3) === 'mp3') {
        el.dataset.src = el.href;
        el.setAttribute('name', el.href);
        el.removeAttribute('href')
        el.classList = 'a';
        el.addEventListener('click', funcPlayAudio);
    }
});

const node = document.createElement('span');
node.innerHTML = 'וידאו';
document.querySelectorAll('tr').forEach(tr => {
    if(tr.querySelectorAll('a').length < 3){
        if(!tr.innerHTML.includes('וידאו')){
            const clone = node.cloneNode(true);
            tr.querySelector('a').after(clone);
        }
    };
});

