const sheetId = "1oz_UHSqdS7oszMsD42GgjBbgBy5sUn6tsMNo5qFPDy0";
const urlSheets = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq`;
const main = document.querySelector('main');
const content = main.querySelector('.content');

function CIPOCBOO(){
    if (content.scrollHeight > content.clientHeight) {
        content.style.paddingLeft = '15px';
    } else {
        content.style.paddingLeft = 0;
    }
}
setTimeout(function (){
    CIPOCBOO();
    main.style.opacity = 1;
}, 100);
window.addEventListener('resize', function () {
    CIPOCBOO();
});