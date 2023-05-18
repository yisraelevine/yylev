const sheetId = '1MNlbLGJt2NBiXabHWXWSpcHnv9nahq-LBePTOgi00OY';
const urlSheets = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq`;

const containerForContainers = document.querySelector('#main>.container.a>.container.listcontainers');
const containerForButtons = containerForContainers.querySelector('.container.liststories');
const button = containerForButtons('.button.story');
containerForButtons.querySelector('.button.story').remove();

fetch(urlSheets).then(res => res.text()).then(rep => {
    const jsData = JSON.parse(rep.substring(47).slice(0, -2));
    const jsDataRows = jsData.table.rows;
    const jsDataRowsLen = jsDataRows.length;
    jsDataRows[0].c[0].v;
    const containersToAdd = (jsDataRowsLen / 100).toFixed();
    for(let i = 0; i < containersToAdd; i++){
        
    }
        for(let i = 0; i < 100; i++){
            const clone = node.cloneNode(true);
            clone.innerHTML = i;
            container.appendChild(clone);
        }
});