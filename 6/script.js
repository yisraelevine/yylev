const numOfStories = 700;
const container = document.querySelector('#main>.container.a>.container.listcontainers>.container.liststories');
const node = container.querySelector('.button.story');
container.querySelector('.button.story').remove();
for(let i = 0; i < 100; i++){
    const clone = node.cloneNode(true);
    clone.innerHTML = i;
    container.appendChild(clone);
}

const sheetId = '1MNlbLGJt2NBiXabHWXWSpcHnv9nahq-LBePTOgi00OY';
const urlSheets = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq`;

fetch(urlSheets).then(res => res.text()).then(rep => {
    const jsData = JSON.parse(rep.substring(47).slice(0, -2));
    const jsDataRows = jsData.table.rows;
    console.log(jsDataRows);
    const jsDataRowsLen = jsDataRows.length;
});