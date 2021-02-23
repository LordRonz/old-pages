const calcNumbers = document.querySelectorAll('[data-number]');
const calcOps = document.querySelectorAll('[data-operator]');
const screen = document.querySelector('[data-screen]');
const equals = document.querySelector('[data-equals]');
const clear = document.querySelector('[data-clear]');
const point = document.querySelector('[data-point]');
const delBtn = document.querySelector('[data-delete]');

let firstOp = '';
let secondOp = '';
let curOp = null;

let shouldResetScr = false;
let enteredNum = false;

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

const operate = (a, b, op) => {
    a = Number(a);
    b = Number(b);
    switch(op) {
        case '+':
            return add(a, b);
            break;
        case '-':
            return subtract(a, b);
            break;
        case '*':
            return multiply(a, b);
            break;
        case '/':
            if(b !== 0) {
                return divide(a, b);
            }
            else {
                return NaN;
            }
            break;
        default:
            return NaN;
            break;
    }
};

function reset() {
    firstOp = '';
    secondOp = '';
    curOp = null;
    screen.textContent = '';
    shouldResetScr = true;
}

function pushNumber(a) {
    if(screen.textContent.length === 1 && screen.textContent[0] === '0') {
        if(a === '0') return;
        screen.textContent = '';
    }
    if(curOp && shouldResetScr) screen.textContent = '';
    screen.textContent += a;
    shouldResetScr = false;
    enteredNum = true;
}

function pushPoint(a) {
    for(let i = 0; i < screen.textContent.length; ++i) {
        if(screen.textContent[i] === '.') return;
    }
    if(curOp && shouldResetScr) screen.textContent = '';
    screen.textContent += a;
    shouldResetScr = false;
}

function updateOp(a) {
    if(screen.textContent.length === 0) return;
    if(curOp && enteredNum) lesGo();
    curOp = a;
    firstOp = screen.textContent;
    shouldResetScr = true;
    enteredNum = false;
}

function lesGo() {
    if(!curOp) return;
    secondOp = screen.textContent;
    screen.textContent = operate(firstOp, secondOp, curOp);
    firstOp = screen.textContent;
    curOp = null;
}

function del() {
    if(screen.textContent.length > 0) {
        screen.textContent = screen.textContent.slice(0, screen.textContent.length - 1);
    }
}

calcNumbers.forEach(a=>{
    a.addEventListener('click', (e)=>{
        pushNumber(a.textContent);
    });
});

calcOps.forEach(a=>{
    a.addEventListener('click', e=>{
        updateOp(a.textContent);
    });
});

equals.addEventListener('click', e=>{
    lesGo();
});

clear.addEventListener('click', e=>{
    reset();
});

point.addEventListener('click', e=>{
    pushPoint(point.textContent);
});

delBtn.addEventListener('click', e=>{
    del();
});

document.addEventListener('keydown', e=>{
    for(let i1 = 48, i2 = 96, j = 0; i1 < 58; ++i1, ++i2, ++j) {
        if(e.keyCode === i1) {
            pushNumber(String(j));
        }
        else if(e.keyCode === i2) {
            pushNumber(String(j));
        }
    }
    switch(e.keyCode) {
        case 8:
            del();
            break;
        case 13:
            lesGo();
            break;
        case 107:
            updateOp('+');
            break;
        case 109:
            updateOp('-');
            break;
        case 106:
            updateOp('*');
            break;
        case 111:
            updateOp('/');
            break;
        case 190:
            pushPoint('.');
            break;
    }
});