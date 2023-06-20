const main = document.querySelector('main');
const sheetId = "1M22BxEG_NA_hejBN_diWEKT_ctr955-WuXi2WZuCp6I";
const urlSheets = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq`;

fetch(urlSheets).then(e => e.text()).then(e => {
    const data = JSON.parse(e.substring(47).slice(0, -2)).table.rows;
    data.shift();
    data.forEach(el => {
        console.log(el.c);
    });
});