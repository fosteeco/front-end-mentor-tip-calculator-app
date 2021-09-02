const billInput = document.querySelector("#bill"),
  form = document.querySelector("#form"),
  tipgrid = document.querySelector(".tip-grid"),
  tipInput = document.querySelector(".tip-input"),
  personInput = document.querySelector("#num-people"),
  tip = document.querySelector("#tip"),
  total = document.querySelector("#total");
// import end

let tipPerPerson = 0;
let bill;
let persons;
let totalPerPerson = 0;
let tipPercent = 5;

// Bill change or people change
function inputChanged() {
  if (billInput.value > 0) {
    bill = billInput.value;
  }

  if (personInput.value > 0) {
    persons = personInput.value;
  }

  calculateTip();
}

// Bill change
function billChange() {
  if (billInput.value.trim() !== "") {
    billInput.classList.add("green-highlight");
  } else {
    billInput.classList.remove("green-highlight");
  }
}

// Person change
function personChange() {
  const pError = document.querySelector(".p-error");
  if (+personInput.value === 0) {
    pError.classList.add("show");
  } else {
    pError.classList.remove("show");
  }
}

// Tip clicked event
function tipClicked(e) {
  let clicked = e.target;
  if (clicked.classList.contains("tip-btn")) {
    removeSelected();
    clicked.classList.add("selected");
    tipPercent = +clicked.value;
    console.log(tipPercent);
  } else if (clicked.classList.contains("tip-input")) {
    removeSelected();
  }
  calculateTip();
}

// Handle custom tip input
function customTipInput(e) {
  let tip = +tipInput.value;
  if (tip > 0) {
    tipPercent = tipInput.value;
    tipInput.classList.remove("error");
  } else if (tip < 0) {
    tipInput.classList.add("error");
  }
  calculateTip();
}

// remove selected class from tip-btn
function removeSelected() {
  const tipBtn = document.querySelector(".tip-btn.selected");
  if (tipBtn) {
    tipBtn.classList.remove("selected");
  }
}

function calculateTip() {
  const tipTotal = bill * (tipPercent / 100);
  tipPerPerson = tipTotal / persons;
  totalPerPerson = bill / persons + tipPerPerson;
  if (!Number.isNaN(tipPerPerson) && !Number.isNaN(totalPerPerson)) {
    tip.innerText = `$${tipPerPerson.toFixed(2)}`;
    total.innerText = `$${totalPerPerson.toFixed(2)}`;
  }
}

// Event listeners
billInput.addEventListener("change", inputChanged);
billInput.addEventListener("change", billChange);
personInput.addEventListener("change", inputChanged);
personInput.addEventListener("change", personChange);
tipgrid.addEventListener("click", tipClicked);
form.addEventListener("submit", (e) => {
  e.preventDefault();
});
tipInput.addEventListener("input", customTipInput);
