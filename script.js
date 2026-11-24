
let expression = "";

const inputDisplay = document.getElementById("input");
const resultDisplay = document.getElementById("result");

// Display entered values
function updateDisplay() {
    inputDisplay.textContent = expression;
}

// Add numbers and operators
function appendValue(value) {

    if (expression === "Error") {
        expression = "";
    }

    expression += value;
    updateDisplay();
}

// Clear the calculator
function clearDisplay() {
    expression = "";
    inputDisplay.textContent = "";
    resultDisplay.textContent = "0";
}

// Delete the last character
function deleteLast() {
    if (expression === "Error") {
        expression = "";
    } else {
        expression = expression.slice(0, -1);
    }

    updateDisplay();
}

// Calculate the result
function calculate() {

    if (expression === "") {
        return;
    }

    try {

        // Check for invalid characters
        if (!/^[0-9+\-*/.()\s]+$/.test(expression)) {
            throw new Error("Invalid Expression");
        }

        // Check division by zero
        if (/\/\s*0+(?![0-9.])/.test(expression)) {
            throw new Error("Cannot divide by zero");
        }

        let answer = Function(
            '"use strict"; return (' + expression + ')'
        )();

        if (!Number.isFinite(answer)) {
            throw new Error("Invalid Calculation");
        }

        resultDisplay.textContent = answer;
        inputDisplay.textContent = expression;

        expression = String(answer);

    } catch (error) {

        resultDisplay.textContent = "Error";
        inputDisplay.textContent = "Invalid Operation";

        expression = "";

    }
}
