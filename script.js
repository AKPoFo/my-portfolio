let currentInput = '0';
let previousInput = '';
let operator = null;

const display = document.getElementById('display');

function updateDisplay() {
    display.innerText = currentInput;
}

function appendNumber(number) {
    if (currentInput === '0' && number !== '.') {
        currentInput = number;
    } else {
        // Prevent multiple decimals
        if (number === '.' && currentInput.includes('.')) return;
        currentInput += number;
    }
    updateDisplay();
}

function appendOperator(op) {
    if (operator !== null) calculate();
    previousInput = currentInput;
    currentInput = '0';
    operator = op;
}

function calculate() {
    if (operator === null || previousInput === '') return;
    
    let result = 0;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            // Handle division by zero nicely
            result = current === 0 ? 'Error' : prev / current;
            break;
    }

    currentInput = result.toString();
    operator = null;
    previousInput = '';
    updateDisplay();
    
    // Reset if an error occurred
    if (currentInput === 'Error') {
        setTimeout(clearDisplay, 1500);
    }
}

function clearDisplay() {
    currentInput = '0';
    previousInput = '';
    operator = null;
    updateDisplay();
}