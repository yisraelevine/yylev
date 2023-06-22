const array = [
    [1, 'כור'],
    [2, 'לתך'],
    [10, 'איפה'],
    [30, 'סאה'],
    [60, 'תרקב - הין'],
    [100, 'עשרון'],
    [180, 'קב'],
    [720, 'לוג'],
    [2880, 'רביעית'],
    [4320, 'ביצה'],
    [8640, 'כזית'],
    [25920, 'משורה'],
    [46080, 'קורטוב'],
    [248832, 'ס"מ מעוקב']
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

    cloneLabel.innerHTML = el[1];
    cloneInput.dataset.id = el[0];
    cloneInput.addEventListener('input', calculator);

    cloneDiv.appendChild(cloneLabel);
    cloneDiv.appendChild(cloneInput);
    main.appendChild(cloneDiv);
});

const input = document.querySelectorAll('input');

function calculator() {
    const num = this.value / this.dataset.id;
    input.forEach(el => {
        if (this !== el) {
            el.value = (num * el.dataset.id).toFixed(2);
        }
    });
}