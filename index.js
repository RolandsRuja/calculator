const SYMBOL_DELETE = "DELETE";
const SYMBOL_INVERT = "INVERT";
const SYMBOL_PERCENTAGE = "PERCENTAGE";
const SYMBOL_DIVIDE = "DIVIDE";
const SYMBOL_SUBTRACT = "SUBTRACT";
const SYMBOL_ADD = "ADD";
const SYMBOL_COMMA = "COMMA";
const SYMBOL_EVALUATE = "EVALUATE";

const MAX_DISPLAY_INPUT_LENGTH = 10;

let previousNumber = null;
let activeAction = null;

const canAddComma = (displayValue) => displayValue.split(",").length === 1;

const toggleActive = () => {
  document
    .getElementById(`${activeAction.toLowerCase()}-btn`)
    .classList.toggle("active");
};

const handleNumberInput = (number, display) => {
  if (display.textContent.length === MAX_DISPLAY_INPUT_LENGTH) {
    return;
  }

  if (display.textContent === "0") {
    display.textContent = number;
    return;
  }

  display.textContent = `${display.textContent}${number}`;
};

const handleCommaInput = (display) => {
  if (!canAddComma(display.textContent)) {
    return;
  }

  display.textContent = `${display.textContent},`;
};

const handleInvert = (display) => {
  display.textContent = Number(display.textContent * -1);
};

const handleAddition = (display) => {
  activeAction = SYMBOL_ADD;
  previousNumber = Number(display.textContent);
  toggleActive();
};

const handleDelete = (display) => {
  display.textContent = "0";
};

const handleInput = (symbol) => {
  const display = document.getElementById("display");

  switch (symbol) {
    case SYMBOL_ADD:
      handleAddition(display);
      break;
    case SYMBOL_COMMA:
      handleCommaInput(display);
      break;
    case SYMBOL_INVERT:
      handleInvert(display);
      break;
    case SYMBOL_DELETE:
      handleDelete(display);
      break;
    default:
      handleNumberInput(symbol, display);
  }

  document.getElementById("delete-btn").textContent =
    display.textContent.length > 1 || display.textContent !== "0" ? "C" : "AC";
};

document.querySelectorAll(".button").forEach((button) => {
  button.addEventListener("click", (event) =>
    handleInput(event.target.dataset.value)
  );
});
