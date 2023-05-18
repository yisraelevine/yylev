const container = document.getElementById('container');
const input = container.querySelector('input');
const output = container.querySelectorAll('span')[1];

input.addEventListener('input', function () {
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
        .replaceAll(')0', ')')
        .replaceAll(')1', ')')
        .replaceAll(')2', ')')
        .replaceAll(')3', ')')
        .replaceAll(')4', ')')
        .replaceAll(')5', ')')
        .replaceAll(')6', ')')
        .replaceAll(')7', ')')
        .replaceAll(')8', ')')
        .replaceAll(')9', ')')
        .replaceAll('0(', '0')
        .replaceAll('1(', '1')
        .replaceAll('2(', '2')
        .replaceAll('3(', '3')
        .replaceAll('4(', '4')
        .replaceAll('5(', '5')
        .replaceAll('6(', '6')
        .replaceAll('7(', '7')
        .replaceAll('8(', '8')
        .replaceAll('9(', '9');


    let aaa = input.value.replaceAll(' ', '');
    const lastChar = aaa[aaa.length - 1];
    if (lastChar === '+' || lastChar === '-' || lastChar === '*' || lastChar === '/') {
        aaa = aaa.slice(0, -1);
    }

    try {
        output.innerHTML = eval(aaa) || '0';
    } catch {
        output.innerHTML = '0';
    }
});
