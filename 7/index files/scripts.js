const audio = document.querySelector('audio');
const a = document.querySelectorAll('a');
const tables = document.querySelectorAll('#main table');
const trElements = document.querySelectorAll('tr');
let currentTable = tables[0];

tables.forEach(el => {
    el.previousElementSibling.addEventListener('click', funcBtnForDisolayChg);
});

function funcBtnForDisolayChg() {
    currentTable.style.display = 'none';
    currentTable.parentElement.style.backgroundColor = 'rgb(120 114 34)';
    currentTable = this.nextElementSibling;
    currentTable.style.display = 'table';
    currentTable.parentElement.scrollIntoView({ behavior: "smooth", block: "center" });
    currentTable.parentElement.style.backgroundColor = 'rgb(74, 69, 6)';
}

function funcPlayAudio() {
    audio.src = this.dataset.src;
}

a.forEach(el => {
    if (el.href.slice(-3) === 'mp3') {
        el.dataset.src = el.href;
        el.removeAttribute('href')
        el.classList = 'a';
        el.addEventListener('click', funcPlayAudio);
    }
});