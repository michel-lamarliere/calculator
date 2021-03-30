// VARIABLES
// operators
const opeBtns = document.querySelectorAll('.opBtn');
const addBtn = document.getElementById('addBtn');
const subBtn = document.getElementById('subBtn');
const divBtn = document.getElementById('divBtn');
const mulBtn = document.getElementById('mulBtn');
const equBtn = document.getElementById('equBtn');
// numbers
const numBtns = document.querySelectorAll('.numBtn');
const dotBtn = document.getElementById('dotBtn');
// result display
const display = document.getElementById('display');
// clear buttons
const clearBtn = document.getElementById('clearBtn');
const clearAllBtn = document.getElementById('clearAllBtn')
// number storage
let firstOpe = null;
let secondOpe = null;
let operator = null;
let operatorBis = null;
let mustClearDisplay = false;
let result = null;

// EVENT LISTENERS
// numercial buttons

opeBtns.forEach((opeBtn) => opeBtn.addEventListener('click', event => {
        if (display.textContent == "") {
            opeBtns.disabled = true;
        } else if (firstOpe !== 0 || firstOpe !== null) {
            setOperands(getDisplay());
            setOperator(event.target.textContent);
            mustClearDisplay = true;
            dotBtn.disabled = false;
        }
        
        opeBtns.disabled = false;
}));

numBtns.forEach((numBtn) => numBtn.addEventListener('click', event => {
    hasPeriod();
    clearDisplay();
    setDisplay(event.target.textContent);
    mustClearDisplay = false;
    dotBtn.disabled = false;
}));

dotBtn.addEventListener('click', () => {
    hasPeriod();

})

document.addEventListener('keydown', event => {
    // numbers
    if (event.key >= 0 && event.key <= 9) {
        document.getElementById(`num${event.key}`).click();
    }
    if (event.key == '+' || event.key == '-' || event.key == '*' || event.key == '/') {
        document.getElementById(`op${event.key}`).click();    
    }
    if (event.key == '=' || event.key === 'Enter' ) {
        document.getElementById('equBtn').click();
    }
    if (event.key == '.') {
        document.getElementById('dotBtn').click();
    }
    if (event.key === 'Backspace') {
        document.getElementById('clearBtn').click();
    }
    if (event.key === 'Escape') {
        document.getElementById('clearAllBtn').click();
    }
})

clearBtn.addEventListener('click', () => {
    clear();
    dotBtn.disabled = false;
})

clearAllBtn.addEventListener('click', () => {
    clearAll();
    dotBtn.disabled = false;
})

equBtn.addEventListener('click', () => {
    if (firstOpe !== null && operator !== null) {
        setOperands();
        display.textContent = result;
        mustClearDisplay = true;
    }
})

// FUNCTIONS

function translate(keyboard) {
    if (keyboard === "/") return "÷";
    else if (keyboard === "*") return "x";

}

function convertOperator(keyboardOperator) {
    if (keyboardOperator === "/") return "÷";
    if (keyboardOperator === "*") return "×";
    if (keyboardOperator === "-") return "−";
    if (keyboardOperator === "+") return "+";
  }
function hasPeriod() {
    if ((display.textContent).match(/\./)) {
        dotBtn.disabled = true;
    }
}
// mathematical functions
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

// operate function
function operate(operator, a, b) {
    switch(operator) {
        case '+':
            return add(a, b);
            break;
        case '-':
            return subtract(a, b);
            break;
        case 'x':
            return multiply(a, b);
            break;
        case '÷':
            return divide(a, b);
            break;
    }
}

// display function
function setDisplay(value) {
    display.textContent += value;
}

// clear display function
function clearDisplay() {
    if (mustClearDisplay) {
        display.textContent = "";
    }
    mustClearDisplay = false;
}

// clear 
function clear() {
    display.textContent = "";
}

// clear all
function clearAll() {
    firstOpe = null;
    secondOpe = null;
    operator = null;
    display.textContent = "";
    result = null;
    dotBtn.disabled = false;
}

// get display value 
function getDisplay() {
    return display.textContent;
}

// get operator function
function setOperator(value) {
    if (firstOpe !== null) {
        operator = value;
    }
}

// get operands function
function setOperands() {
    if (firstOpe == null) {
        firstOpe = Number(getDisplay());
    } else if (firstOpe !== null && operator !== null) {
        clearDisplay();
        secondOpe = Number(getDisplay());
        result = Math.round(operate(operator, firstOpe, secondOpe) * 1000) / 1000;
        firstOpe = result;
        secondOpe = null;
        operator = null;
        display.textContent = result;
    } else if (firstOpe !== null && secondOpe !== null) {  
        result = operate(operator, firstOpe, secondOpe);
        firstOpe = result;
        operator = null;
        secondOpe = null;
        mustClearDisplay = true;
    }
    clearDisplay();    
}