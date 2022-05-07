const passForm = document.getElementById('passForm');
const serviceInput = document.getElementById('service');
const lengthInput = document.getElementById('length');
const letterInput = document.getElementById('case');
const numberInput = document.getElementById('number');
const symbolInput = document.getElementById('symbols');

const generatePass = (length, canSymbols = true, canNumbers = true, ableCase = 'all') => {
    let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789~`!@#$%^&*()_-+={[}]|\\:;<,>.?/';
    if(!canSymbols) chars = chars.replace(/[\W_]/g, '');
    if(!canNumbers) chars = chars.replace(/[\d]/g, '');
    switch(ableCase) {
        case 'upper':
            chars = chars.replace(/[a-z]/g, '');
            break;
        case 'lower':
            chars = chars.replace(/[A-Z]/g, '');
            break;
        case 'all':
            break;
        default:
            chars = chars.replace(/[A-z]/g, '');
            break;
    }
    if(!chars) return false;
    let pass = '';
    for(let i =0; i < length; i++) pass += chars[Math.floor(Math.random() * chars.length)];
    return pass;
}

passForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const temp = generatePass(lengthInput.value, symbolInput.checked, numberInput.checked, letterInput.value);
    if(temp) {
        localStorage.setItem(serviceInput.value, temp);
        refreshList()
    }
});

const refreshList = () => {
    document.getElementById('example').innerHTML = '';
    for (var i = 0; i < localStorage.length; i++) {
        document.getElementById('example').innerHTML += `<h3 onclick="localStorage.removeItem('${localStorage.key(i)}'); refreshList()">${localStorage.key(i)}: ${localStorage.getItem(localStorage.key(i))}</h3>`;
    }
}
refreshList();