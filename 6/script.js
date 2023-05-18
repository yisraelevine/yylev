const sheetId = '1MNlbLGJt2NBiXabHWXWSpcHnv9nahq-LBePTOgi00OY';
const urlSheets = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq`;

const containerForContainers = document.querySelector('#main>.container.a>.container.listcontainers');
const containerForButtons = containerForContainers.querySelector('.container.liststories');
const button = containerForButtons.querySelector('.button.story');
containerForContainers.querySelector('.container.liststories').remove();
containerForButtons.innerHTML = '';

fetch(urlSheets).then(res => res.text()).then(rep => {
    const jsData = JSON.parse(rep.substring(47).slice(0, -2));
    const jsDataRows = jsData.table.rows;
    const jsDataRowsLen = jsDataRows.length;
    const containersToAdd = Number((jsDataRowsLen / 100).toFixed());

    for (let i = 0, z = 0; i < containersToAdd; i++) {
        let buttonsToAdd;
        if (i + 1 === containersToAdd) {
            buttonsToAdd = jsDataRowsLen % 100;
        } else {
            buttonsToAdd = 100;
        }
        const clone1 = containerForButtons.cloneNode(true);
        for (let x = 0; x < buttonsToAdd; x++, z++) {
            const clone2 = button.cloneNode(true);
            clone2.innerHTML = jsDataRows[z].c[0].v;
            clone1.appendChild(clone2);
        }
        containerForContainers.appendChild(clone1);
    }

});
