const sheetId = '1MNlbLGJt2NBiXabHWXWSpcHnv9nahq-LBePTOgi00OY';
const urlSheets = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq`;
const containerForContainers = document.querySelector('#main>.container.a>.container.listcontainers');
const containerForButtons = containerForContainers.querySelector('.container.liststories');
const button = containerForButtons.querySelector('.button.story');

containerForContainers.querySelector('.container.liststories').remove();
containerForButtons.innerHTML = '';

let containersToAdd;
let containerVisible;
fetch(urlSheets).then(res => res.text()).then(rep => {
    const jsData = JSON.parse(rep.substring(47).slice(0, -2));
    const jsDataRows = jsData.table.rows.reverse();
    const jsDataRowsLen = jsDataRows.length;

    containersToAdd = Number((jsDataRowsLen / 100).toFixed());
    containerVisible = containersToAdd - 1;

    for (let i = 0, z = 0; i < containersToAdd; i++) {
        let buttonsToAdd;
        if (i + 1 === containersToAdd) {
            buttonsToAdd = jsDataRowsLen % 100;
        } else {
            buttonsToAdd = 100;
        }
        const clone1 = containerForButtons.cloneNode(true);
        if (i === containersToAdd - 1) {
            clone1.style.display = 'flex';
        }
        for (let x = 0; x < buttonsToAdd; x++, z++) {
            const clone2 = button.cloneNode(true);
            clone2.innerHTML = jsDataRows[z].c[0].v;
            clone1.appendChild(clone2);
        }
        containerForContainers.appendChild(clone1);
    }
});

function showOnlySpicificContainer() {
    containerForContainers.children[containerVisible].style.display = 'none';
    if (this === navB && containerVisible < containersToAdd - 1) {
        containerVisible++;
    } else if (containerVisible > 0 && this === navF) {
        containerVisible--;
    }
    if(this === navF && containerVisible === 0){
        navF.style.visibility = 'hidden';
    } else if (this === navB && containerVisible === 6) {
        navB.style.visibility = 'hidden';
    } else {
        navF.style.visibility = 'visible';
        navB.style.visibility = 'visible';
    }
    containerForContainers.children[containerVisible].style.display = 'flex';

}

const navF = document.querySelector('#main>.container.a>.container.heading>.container.navF');
const navB = document.querySelector('#main>.container.a>.container.heading>.container.navB');

navF.addEventListener('mousedown', showOnlySpicificContainer);
navB.addEventListener('mousedown', showOnlySpicificContainer);

