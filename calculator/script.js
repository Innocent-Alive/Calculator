"use strict";

// Calculator business logic :

// creating a class to implement the operations and different methods :
class Calculator {
  constructor(previousOperandElement, currentResultElement) {
    this.previousOperandElement = previousOperandElement;
    this.currentResultElement = currentResultElement;
    this.clear();
  }

  clear() {
    this.currentResult = ``;
    this.previousOperand = ``;
    this.operation = undefined;
  }

  delete() {
    this.currentResult = this.currentResult.toString().slice(0, -1);
  }

  append(number) {
    if (number === "." && this.currentResult.includes(".")) return;
    this.currentResult = this.currentResult.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentResult === ``) return;
    if (this.previousOperand !== ``) {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentResult;
    this.currentResult = ``;
  }

  compute() {
    let computation;
    const previous = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentResult);
    if (isNaN(previous) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = previous + current;
        break;
      case "-":
        computation = previous - current;
        break;
      case "*":
        computation = previous * current;
        break;
      case "%":
        computation = (current / previous) * 100;
        break;
      case "/":
        if (current === 0) {
          alert("Integer cannot be divided by zero !!!");
          return;
        }
        computation = previous / current;
        break;
      default:
        return;
    }
    this.currentResult = computation;
    this.operation = undefined;
    this.previousOperand = ``;
  }
  displayNumber(number) {
    if (number === "" || number === null) return "";
    const [integerPart, decimalPart] = number.toString().split(".");
    const integerDisplay = parseFloat(integerPart).toLocaleString("en", {
      maximumFractionDigits: 0,
    });
    if (decimalPart !== undefined) {
      return `${integerDisplay}.${decimalPart}`;
    } else {
      return integerDisplay;
    }
  }
  update() {
    this.currentResultElement.textContent = this.displayNumber(
      this.currentResult
    );
    if (this.operation !== undefined && this.operation !== null) {
      this.previousOperandElement.textContent = `${this.displayNumber(
        this.previousOperand
      )} ${this.operation}`;
    } else {
      this.previousOperandElement.textContent = "";
    }
  }
}

// selecting all query of the documents :
const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const allClearButton = document.querySelector("[data-allclear]");
const clearButton = document.querySelector("[data-clear]");
const equalsButton = document.querySelector("[data-equals]");
const previousOperandElement = document.querySelector(
  "[data-previous-operand]"
);
const currentResultElement = document.querySelector("[data-current-result]");

// creating a new object for the class :
const calculator = new Calculator(previousOperandElement, currentResultElement);

// adding event listners to each buttons :
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.append(button.textContent);
    calculator.update();
  });
});
operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.textContent);
    calculator.update();
  });
});

equalsButton.addEventListener("click", () => {
  calculator.compute();
  calculator.update();
});
clearButton.addEventListener("click", () => {
  calculator.delete();
  calculator.update();
});
allClearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.update();
});

// Adding event listener to handle keyboard inputs :
document.addEventListener("keydown", (event) => {
  const key = event.key;
  if (key >= "0" && key <= "9") {
    calculator.append(key);
    calculator.update();
  } else if (key === ".") {
    calculator.append(key);
    calculator.update();
  } else if (
    key === "+" ||
    key === "-" ||
    key === "*" ||
    key === "/" ||
    key === "%"
  ) {
    calculator.chooseOperation(key);
    calculator.update();
  } else if (key === "=" || key === "Enter") {
    calculator.compute();
    calculator.update();
  } else if (key === "Backspace") {
    calculator.delete();
    calculator.update();
  } else if (key === "Escape" || key === "Delete") {
    calculator.clear();
    calculator.update();
  }
});

