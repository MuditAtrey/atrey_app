// Scientific Calculator JavaScript Interface
let calculator = null;
let currentInput = '';
let expression = '';
let lastResult = 0;
let angleMode = 'RAD'; // RAD or DEG
let memory = 0;
let pendingOperation = null;
let operand1 = null;

// Initialize WebAssembly Module
createCalculatorModule().then(Module => {
    calculator = new Module.ScientificCalculator();
    console.log('Scientific Calculator WebAssembly module loaded successfully!');
    updateDisplay();
});

// Get DOM elements
const display = document.getElementById('display');
const expressionDisplay = document.getElementById('expression');
const memoryIndicator = document.getElementById('memoryIndicator');
const modeIndicator = document.querySelector('.mode-indicator');

// Update display
function updateDisplay(value = currentInput || '0') {
    display.value = value;
    expressionDisplay.textContent = expression;
    memoryIndicator.textContent = memory !== 0 ? 'M' : '';
}

// Handle number input
function handleNumber(num) {
    if (currentInput === '0' && num !== '.') {
        currentInput = num;
    } else if (num === '.' && currentInput.includes('.')) {
        return;
    } else {
        currentInput += num;
    }
    updateDisplay();
}

// Handle operator
function handleOperator(op) {
    if (currentInput === '' && operand1 === null) return;
    
    if (operand1 === null) {
        operand1 = parseFloat(currentInput);
        currentInput = '';
    } else if (currentInput !== '') {
        calculateResult();
        operand1 = lastResult;
        currentInput = '';
    }
    
    pendingOperation = op;
    expression = `${operand1} ${op} `;
    updateDisplay();
}

// Calculate result
function calculateResult() {
    if (!calculator || operand1 === null || !pendingOperation) return;
    
    const operand2 = parseFloat(currentInput || operand1);
    let result;
    
    try {
        switch (pendingOperation) {
            case '+':
                result = calculator.add(operand1, operand2);
                break;
            case '-':
                result = calculator.subtract(operand1, operand2);
                break;
            case '*':
                result = calculator.multiply(operand1, operand2);
                break;
            case '/':
                result = calculator.divide(operand1, operand2);
                break;
            case '%':
                result = calculator.modulo(operand1, operand2);
                break;
            case '^':
                result = calculator.power(operand1, operand2);
                break;
            default:
                result = operand2;
        }
        
        if (isNaN(result) || !isFinite(result)) {
            currentInput = 'Error';
            expression = '';
        } else {
            lastResult = result;
            currentInput = formatResult(result);
            expression = '';
        }
        
        operand1 = null;
        pendingOperation = null;
        updateDisplay();
    } catch (error) {
        currentInput = 'Error';
        expression = '';
        updateDisplay();
    }
}

// Format result
function formatResult(num) {
    if (Math.abs(num) < 1e-10) return '0';
    if (Math.abs(num) > 1e10 || Math.abs(num) < 1e-10) {
        return num.toExponential(8);
    }
    return parseFloat(num.toFixed(10)).toString();
}

// Handle function
function handleFunction(func) {
    if (!calculator) return;
    
    const value = parseFloat(currentInput || lastResult || 0);
    let result;
    
    try {
        switch (func) {
            // Trigonometric
            case 'sin':
                result = angleMode === 'RAD' ? 
                    calculator.sine(value) : 
                    calculator.sine(calculator.degreesToRadians(value));
                break;
            case 'cos':
                result = angleMode === 'RAD' ? 
                    calculator.cosine(value) : 
                    calculator.cosine(calculator.degreesToRadians(value));
                break;
            case 'tan':
                result = angleMode === 'RAD' ? 
                    calculator.tangent(value) : 
                    calculator.tangent(calculator.degreesToRadians(value));
                break;
            case 'asin':
                result = angleMode === 'RAD' ? 
                    calculator.arcsine(value) : 
                    calculator.radiansToDegrees(calculator.arcsine(value));
                break;
            case 'acos':
                result = angleMode === 'RAD' ? 
                    calculator.arccosine(value) : 
                    calculator.radiansToDegrees(calculator.arccosine(value));
                break;
            case 'atan':
                result = angleMode === 'RAD' ? 
                    calculator.arctangent(value) : 
                    calculator.radiansToDegrees(calculator.arctangent(value));
                break;
            
            // Hyperbolic
            case 'sinh':
                result = calculator.sinh_calc(value);
                break;
            case 'cosh':
                result = calculator.cosh_calc(value);
                break;
            case 'tanh':
                result = calculator.tanh_calc(value);
                break;
            
            // Logarithmic
            case 'ln':
                result = calculator.naturalLog(value);
                break;
            case 'log':
                result = calculator.log10_calc(value);
                break;
            
            // Power and root
            case 'sqrt':
                result = calculator.squareRoot(value);
                break;
            case 'cbrt':
                result = calculator.cubeRoot(value);
                break;
            case 'square':
                result = calculator.power(value, 2);
                break;
            case 'exp':
                result = calculator.exponential(value);
                break;
            
            // Special
            case 'factorial':
                result = calculator.factorial(Math.floor(value));
                break;
            case 'abs':
                result = calculator.absolute(value);
                break;
            case 'floor':
                result = calculator.floor_calc(value);
                break;
            case 'ceil':
                result = calculator.ceiling(value);
                break;
            case 'round':
                result = calculator.round_calc(value);
                break;
            
            // Other
            case 'negate':
                result = -value;
                break;
            case 'ans':
                result = lastResult;
                break;
            
            default:
                return;
        }
        
        if (isNaN(result) || !isFinite(result)) {
            currentInput = 'Error';
        } else {
            lastResult = result;
            currentInput = formatResult(result);
        }
        
        expression = '';
        operand1 = null;
        pendingOperation = null;
        updateDisplay();
    } catch (error) {
        currentInput = 'Error';
        expression = '';
        updateDisplay();
    }
}

// Handle memory operations
function handleMemory(action) {
    const value = parseFloat(currentInput || lastResult || 0);
    
    switch (action) {
        case 'mc':
            memory = 0;
            if (calculator) calculator.memoryClear();
            break;
        case 'mr':
            if (calculator) {
                memory = calculator.memoryRecall();
                currentInput = formatResult(memory);
                updateDisplay();
            }
            break;
        case 'm+':
            memory += value;
            if (calculator) calculator.memoryAdd(value);
            break;
        case 'm-':
            memory -= value;
            if (calculator) calculator.memorySubtract(value);
            break;
    }
    
    memoryIndicator.textContent = memory !== 0 ? 'M' : '';
}

// Handle constants
function handleConstant(constant) {
    if (!calculator) return;
    
    let value;
    switch (constant) {
        case 'pi':
            value = calculator.getPi();
            break;
        case 'e':
            value = calculator.getE();
            break;
        case 'phi':
            value = calculator.getGoldenRatio();
            break;
        default:
            return;
    }
    
    currentInput = formatResult(value);
    updateDisplay();
}

// Clear display
function clear() {
    currentInput = '';
    expression = '';
    operand1 = null;
    pendingOperation = null;
    updateDisplay();
}

// Backspace
function backspace() {
    if (currentInput.length > 0) {
        currentInput = currentInput.slice(0, -1);
        updateDisplay();
    }
}

// Toggle angle mode
function toggleAngleMode(mode) {
    angleMode = mode;
    modeIndicator.textContent = mode;
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', () => {
            const number = button.getAttribute('data-number');
            const operator = button.getAttribute('data-operator');
            const action = button.getAttribute('data-action');
            const constant = button.getAttribute('data-constant');
            
            if (number !== null) {
                handleNumber(number);
            } else if (operator !== null) {
                handleOperator(operator);
            } else if (constant !== null) {
                handleConstant(constant);
            } else if (action !== null) {
                switch (action) {
                    case 'clear':
                        clear();
                        break;
                    case 'backspace':
                        backspace();
                        break;
                    case 'equals':
                        calculateResult();
                        break;
                    case 'deg':
                        toggleAngleMode('DEG');
                        break;
                    case 'rad':
                        toggleAngleMode('RAD');
                        break;
                    case 'mc':
                    case 'mr':
                    case 'm+':
                    case 'm-':
                        handleMemory(action);
                        break;
                    case '(':
                    case ')':
                        // Parentheses could be implemented with a more complex expression parser
                        console.log('Parentheses not fully implemented in this version');
                        break;
                    default:
                        handleFunction(action);
                }
            }
        });
    });
    
    // Keyboard support
    document.addEventListener('keydown', (e) => {
        if (e.key >= '0' && e.key <= '9' || e.key === '.') {
            handleNumber(e.key);
        } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
            handleOperator(e.key);
        } else if (e.key === 'Enter' || e.key === '=') {
            calculateResult();
        } else if (e.key === 'Escape') {
            clear();
        } else if (e.key === 'Backspace') {
            backspace();
        }
    });
});
