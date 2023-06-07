const inputBox = document.querySelector('#search-files>input');
const filesNames = document.querySelectorAll('#files-links div');

inputBox.addEventListener('input', searchFiles);

function searchFiles() {
    const inVal = this.value;
    filesNames.forEach(el => {
        if (el.innerHTML.search(inVal) === -1) {
            el.style.display = 'none';
        } else {
            el.style.display = 'inline-block';
        }
    });
}