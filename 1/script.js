const array = [
    ['cor', 1, 'כור'],
    ['letch', 2, 'לתך'],
    ['eifa', 10, 'איפה'],
    ['saha', 30, 'סאה'],
    ['hin', 60, 'תרקב - הין'],
    ['hisaron', 100, 'עשרון'],
    ['kab', 180, 'קב'],
    ['log', 720, 'לוג'],
    ['rviait', 2880, 'רביעית'],
    ['egg', 4320, 'ביצה'],
    ['zait', 8640, 'כזית'],
    ['mesora', 25920, 'משורה'],
    ['kortov', 46080, 'קורטוב'],
    ['cm', 248832, 'ס"מ מעוקב']
]

const main = document.querySelector('main');

const nodeDiv = document.createElement('div');
const nodeLabel = document.createElement('label');
const nodeInput = document.createElement('input');

nodeInput.setAttribute('min', 0);
nodeInput.setAttribute('type', 'number');

array.forEach(el => {
    const cloneDiv = nodeDiv.cloneNode(true);
    const cloneLabel = nodeLabel.cloneNode(true);
    const cloneInput = nodeInput.cloneNode(true);

    cloneLabel.setAttribute('for', el[0]);
    cloneLabel.innerHTML = el[2];

    cloneInput.id = el[0];
    cloneInput.dataset.id = el[1];
    cloneInput.addEventListener('input', calculator);

    cloneDiv.appendChild(cloneLabel);
    cloneDiv.appendChild(cloneInput);
    main.appendChild(cloneDiv);
});

const input = document.querySelectorAll('input');

function calculator() {
    const num = parseFloat(this.value) / this.dataset.id;
    input.forEach(el => {
        if (this !== el) {
            el.value = (num * Number(el.dataset.id)).toFixed(2);
        }
    });
}