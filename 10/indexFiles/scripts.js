const input = document.querySelector('#search-files>input');
const a = document.querySelectorAll('#files-links>a');

input.addEventListener('input', searchFiles);

function searchFiles() {
    const value = this.value;
    a.forEach(el => {
        const text = el.innerText;
        const position = text.search(value);
        const length = value.length;
        if (position === -1) {
            el.style.order = 0;
            el.innerHTML = text;
        } else {
            el.style.order = -1;
            el.innerHTML = text.slice(0, position) + '<mark>' + text.slice(position, position + length) + '</mark>' + text.slice(position + length);
        }
    });
}