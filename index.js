const SYMBOL_DELETE = "DELETE";
const SYMBOL_INVERT = "INVERT";
const SYMBOL_PERCENTAGE = "PERCENTAGE";
const SYMBOL_DIVIDE = "DIVIDE";
const SYMBOL_SUBTRACT = "SUBTRACT";
const SYMBOL_ADD = "ADD";
const SYMBOL_COMMA = "COMMA";
const SYMBOL_EVALUATE = "EVALUATE";
const SYMBOL_MULTIPLY = "MULTIPLY";

const MAX_DISPLAY_INPUT_LENGTH = 10;

const KEYBOARD_KEY_SYMBOL_MAP = {
  Delete: SYMBOL_DELETE,
  "%": SYMBOL_PERCENTAGE,
  "/": SYMBOL_DIVIDE,
  "-": SYMBOL_SUBTRACT,
  "+": SYMBOL_ADD,
  ",": SYMBOL_COMMA,
  "=": SYMBOL_EVALUATE,
  "*": SYMBOL_MULTIPLY,
};

let previousNumber = null;
let activeAction = null;
let result = null;

const canAddComma = (displayValue) => displayValue.split(",").length === 1;

const removeActiveClass = () => {
  document
    .querySelectorAll(".active")
    .forEach((element) => element.classList.remove("active"));
};

const addActiveClass = (symbol) => {
  removeActiveClass();
  document.getElementById(`${symbol.toLowerCase()}`).classList.add("active");
};

const handleNumberInput = (number, display) => {
  if (display.textContent.length === MAX_DISPLAY_INPUT_LENGTH) {
    return;
  }

  if (display.textContent === "0" || display.textContent === "Error") {
    display.textContent = number;
    return;
  }

  if (previousNumber === null && activeAction !== null) {
    previousNumber = display.textContent;
    display.textContent = number;
    return;
  }

  display.textContent = `${display.textContent}${number}`;
};

const handleBasicExpression = (symbol, display) => {
  if (symbol === activeAction) {
    return;
  }

  activeAction = symbol;
  addActiveClass(symbol);
};

const handleEvaluate = (display) => {
  removeActiveClass();

  let eval = null;
  switch (activeAction) {
    case SYMBOL_ADD:
      eval = (Number(display.textContent) + Number(previousNumber)).toString();
      break;
    case SYMBOL_DIVIDE:
      if (display.textContent === "0") {
        display.textContent = "Error";
        return;
      }
      eval = (Number(previousNumber) / Number(display.textContent)).toString();
      break;
    case SYMBOL_SUBTRACT:
      eval = (Number(previousNumber) - Number(display.textContent)).toString();
      break;
    case SYMBOL_MULTIPLY:
      eval = (Number(display.textContent) * Number(previousNumber)).toString();
      break;
    default:
      display.textContent = "ERROR";
      return;
  }

  if (eval.length > MAX_DISPLAY_INPUT_LENGTH) {
    eval = eval.slice(0, MAX_DISPLAY_INPUT_LENGTH - 1);
  }

  display.textContent = eval;
  result = eval;
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

const handleDelete = (display) => {
  display.textContent = "0";
  activeAction = null;
  result = null;
  previousNumber = null;
  removeActiveClass();
};

const handleInput = (symbol) => {
  const display = document.getElementById("display");

  switch (symbol) {
    case SYMBOL_DIVIDE:
    case SYMBOL_ADD:
    case SYMBOL_SUBTRACT:
    case SYMBOL_MULTIPLY:
      handleBasicExpression(symbol, display);
      break;
    case SYMBOL_EVALUATE:
      handleEvaluate(display);
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

  document.getElementById("delete").textContent =
    display.textContent.length > 1 || display.textContent !== "0" ? "C" : "AC";
};

document.querySelectorAll(".button").forEach((button) => {
  button.addEventListener("click", (event) =>
    handleInput(event.target.dataset.value)
  );
});

window.addEventListener("keypress", (event) => {
  if (Object.keys(KEYBOARD_KEY_SYMBOL_MAP).includes(event.key)) {
    handleInput(KEYBOARD_KEY_SYMBOL_MAP[event.key]);
    return;
  }

  if (!isNaN(+event.key)) {
    handleInput(event.key);
  }
});
