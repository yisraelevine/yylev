const tbody = document.querySelector('main tbody');
const sheetId = "1M22BxEG_NA_hejBN_diWEKT_ctr955-WuXi2WZuCp6I";
const urlSheets = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq`;
let path;

// defining variables
const nodes = new Object;
const nodesNames = ['tr', 'td'];
nodesNames.forEach(e => nodes[e] = document.createElement(e));

nodes.a1 = document.createElement('a');
nodes.a2 = document.createElement('a');
nodes.a3 = document.createElement('a');

nodes.a1.textContent = 'אודיו';
nodes.a2.textContent = 'וידאו';
nodes.a3.textContent = 'דף עזר';
nodes.a2.target = '_blank';
nodes.a3.target = '_blank';

// fetching
fetch(urlSheets).then(e => e.text()).then(e => {
    const data = JSON.parse(e.substring(47).slice(0, -2)).table.rows;
    data.shift();
    data.forEach(row => {
        row = row.c;
        const cloneTr = nodes.tr.cloneNode();

        const cloneTd1 = nodes.td.cloneNode();
        const cloneTd2 = nodes.td.cloneNode();
        const cloneTd3 = nodes.td.cloneNode();
        const cloneTd4 = nodes.td.cloneNode();

        cloneTd1.textContent = row[0]?.v || '';
        cloneTd2.textContent = row[1]?.v || '';

        const cloneA1 = nodes.a1.cloneNode(true);
        const cloneA2 = nodes.a2.cloneNode(true);
        const cloneA3 = nodes.a3.cloneNode(true);

        const dirNum = Math.ceil(row[2]?.v / 100);
        console.log(dirNum);
        if (!Number(dirNum)) {
            cloneA1.style.visibility = 'hidden';
            cloneA3.style.visibility = 'hidden';
        } else {
            if (dirNum !== 1) {
                path = (dirNum + '/' + row[2].v);
            } else {
                path = row[2].v;
            }
            cloneTd3.textContent = 'shiur' + (row[2]?.v || '');
        }
        cloneA1.dataset.src = path + '.mp3';
        cloneA1.name = path + '.mp3';
        if (Number(row[3].v)) {
            cloneA2.href = 'http://video.chasidut.net/videos/' + row[3].v + '/';
        } else if (row[3].v) {
            cloneA2.href = row[3].v;
        } else {
            cloneA2.style.visibility = 'hidden';
        }
        cloneA3.href = path + '.pdf';

        cloneTd4.append(cloneA1, cloneA2, cloneA3);

        cloneTr.append(cloneTd1, cloneTd2, cloneTd3, cloneTd4);
        tbody.appendChild(cloneTr);
    });
});