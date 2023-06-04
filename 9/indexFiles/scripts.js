const sheetId = "1oz_UHSqdS7oszMsD42GgjBbgBy5sUn6tsMNo5qFPDy0";
const urlSheets = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq`;

const main = document.querySelector('main');
const expOuter = document.querySelector('exp-outer');
const expInner = expOuter.children[0];
const expP = expInner.children[0];

fetch(urlSheets).then(e => e.text()).then(e => {
    const data = JSON.parse(e.substring(47).slice(0, -2)).table.rows;
    const div = document.createElement('div');
    const h2 = document.createElement('h2');
    const p = document.createElement('p');

    data.forEach(row => {
        const row0 = row.c[0]?.v || '';
        const row1 = row.c[1]?.v || '';
        const row2 = row.c[2]?.v || '';
        const node = div.cloneNode(true);
        const clone0 = h2.cloneNode(true)
        const clone1 = p.cloneNode(true)

        clone0.innerHTML = row0;
        clone1.innerHTML = row1;

        if (row0 === 'קושיה') {
            node.style.backgroundColor = '#f5a5a5';
            node.style.color = '#5c1212';
            node.style.outlineColor = '#5c1212';
        } else if (row0 === 'תירוץ') {
            node.style.backgroundColor = '#b0f3b0';
            node.style.color = 'rgb(21 94 21)';
            node.style.outlineColor = 'rgb(21 94 21)';
        }

        node.appendChild(clone0);
        node.appendChild(clone1);
        node.addEventListener('click', changeExp);
        node.dataset.exp = row2;
        main.appendChild(node);
    });
    document.body.style.display = 'flex';
});

//------------------------------------------------------------------------------//

let currentDiv;

function changeExp() {
    if(currentDiv){
        currentDiv.style.outlineStyle = 'none';
    }
    currentDiv = this;
    expInner.style.backgroundColor = currentDiv.style.backgroundColor;
    expInner.style.color = currentDiv.style.color;
    expInner.style.borderColor = currentDiv.style.color;
    currentDiv.style.outlineStyle = 'solid';
    expP.innerHTML = currentDiv.dataset.exp;
}