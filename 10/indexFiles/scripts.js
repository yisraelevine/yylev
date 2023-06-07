const inputBox = document.querySelector('#search-files>input');
const filesNames = document.querySelectorAll('#files-links div');

inputBox.addEventListener('input', searchFiles);

function searchFiles() {
    const inVal = this.value;
    filesNames.forEach(el => {
        const iT = el.innerText;
        const i = iT.search(inVal);
        const inValLength = inVal.length;
        if (i === -1) {
            //el.style.display = 'none';
            el.innerHTML = iT;
            el.parentElement.style.order = 0;
        } else {
            el.parentElement.style.order = -1;
            //el.style.display = 'inline-block';
            el.innerHTML = iT.slice(0, i) + '<mark>' + iT.slice(i, i + inValLength) + '</mark>' + iT.slice(i + inValLength);
        }
    });
}