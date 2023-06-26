const audio = {};
const main = {};

audio.container = document.querySelector('#container');
audio.player = audio.container.querySelector('audio');
audio.name = audio.container.querySelector('div');

main.container = document.querySelector('main');
main.table = main.container.querySelectorAll('table');
main.tr = main.container.querySelectorAll('tr');
main.a = main.container.querySelectorAll('a');

const node = document.createElement('span');

let currentTable;

main.table.forEach(el => {
    el.parentElement.addEventListener('click', funcChangeTableShown);
});

function funcChangeTableShown(event) {
    const thisTable = this.querySelector('table');
    if (currentTable !== thisTable) {
        currentTable?.parentElement.removeAttribute('class');
        currentTable = thisTable;
        currentTable.parentElement.setAttribute('class', 'selected');
    }
    if (event.target.tagName !== 'A') {
        currentTable.parentElement.scrollIntoView({ behavior: "smooth", block: "start" });
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

main.a.forEach(el => {
    if (el.href.slice(-3) === 'mp3') {
        el.setAttribute('name', el.href);
        el.removeAttribute('href')
        el.classList = 'a';
        el.addEventListener('click', funcPlayAudio);
    } else {
        el.setAttribute('target', '_blank');
    }
});

main.tr.forEach(el => {
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