const container = document.getElementById('container');
const input = container.querySelector('input');
const output = container.querySelectorAll('span')[1];

input.addEventListener('input', function(){
    input.value = input.value
        .replace(/[^0-9+\-*/().\s]/g, '')
        .replaceAll('++', '+')
        .replaceAll('-+', '+')
        .replaceAll('*+', '+')
        .replaceAll('/+', '+')
        .replaceAll('+-', '-')
        .replaceAll('--', '-')
        .replaceAll('*-', '-')
        .replaceAll('/-', '-')
        .replaceAll('+*', '*')
        .replaceAll('-*', '*')
        .replaceAll('**', '*')
        .replaceAll('/*', '*')
        .replaceAll('+/', '/')
        .replaceAll('-/', '/')
        .replaceAll('*/', '/')
        .replaceAll('//', '/')
        .replaceAll('..', '.')
        .replaceAll('.+', '.')
        .replaceAll('.-', '.')
        .replaceAll('.*', '.')
        .replaceAll('./', '.')

    let aaa = input.value;
    const lastChar = aaa[aaa.length - 1];
    if (lastChar === '+' || lastChar === '-' || lastChar === '*' || lastChar === '/') {
        aaa = aaa.slice(0, -1);
    }

    try{
        output.innerHTML = eval(aaa) || '0';
    }catch{
        output.innerHTML = '0';
    }
});
