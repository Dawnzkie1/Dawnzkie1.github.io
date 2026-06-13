const display = document.getElementById("result");
const historyDisplay = document.getElementById("history");
const buttons = document.querySelectorAll(".btn");
let currentValue = "";
let previousValue = "";
let operator = null;
let shouldResetDisplay = false;

function updateDisplay() {
  display.textContent = currentValue || "0";
  historyDisplay.textContent = previousValue ? `${previousValue} ${operator || ""}` : "";
}

function appendNumber(number) {
  if (shouldResetDisplay) {
    currentValue = "";
    shouldResetDisplay = false;
  }
  if (number === "." && currentValue.includes(".")) return;
  currentValue = currentValue === "0" && number !== "." ? number : currentValue + number;
}

function chooseOperator(selectedOperator) {
  if (currentValue === "") return;
  if (previousValue !== "") {
    compute();
  }
  operator = selectedOperator;
  previousValue = currentValue;
  shouldResetDisplay = true;
}

function compute() {
  if (operator === null || previousValue === "" || currentValue === "") return;
  const prev = parseFloat(previousValue);
  const current = parseFloat(currentValue);
  if (isNaN(prev) || isNaN(current)) return;

  let computation = 0;
  switch (operator) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "*":
      computation = prev * current;
      break;
    case "/":
      computation = current === 0 ? "Error" : prev / current;
      break;
    case "%":
      computation = prev % current;
      break;
    default:
      return;
  }

  currentValue = computation.toString();
  operator = null;
  previousValue = "";
  shouldResetDisplay = true;
}

function clearAll() {
  currentValue = "";
  previousValue = "";
  operator = null;
  shouldResetDisplay = false;
}

function deleteLast() {
  if (shouldResetDisplay) {
    currentValue = "";
    shouldResetDisplay = false;
    return;
  }
  currentValue = currentValue.slice(0, -1);
}

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.dataset.value;
    const action = button.dataset.action;

    if (action === "clear") {
      clearAll();
      updateDisplay();
      return;
    }

    if (action === "delete") {
      deleteLast();
      updateDisplay();
      return;
    }

    if (action === "equals") {
      compute();
      updateDisplay();
      return;
    }

    if (button.classList.contains("operator")) {
      chooseOperator(value);
      updateDisplay();
      return;
    }

    appendNumber(value);
    updateDisplay();
  });
});

updateDisplay();
