// =========================
// ELEMENTI DOM
// =========================
const billInput = document.getElementById('bill');
const peopleInput = document.getElementById('people');

const tipButtons = document.querySelectorAll('.tip-grid button');
const customTipInput = document.querySelector('.tip-grid input');

const tipAmountEl = document.querySelectorAll('.amount')[0];
const totalAmountEl = document.querySelectorAll('.amount')[1];

const resetBtn = document.querySelector('.reset');

let tipPercent = 0;

// =========================
// FUNZIONI
// =========================
function calculate() {
  const bill = parseFloat(billInput.value);
  const people = parseInt(peopleInput.value);

  if (!bill || !people || people === 0) {
    tipAmountEl.textContent = '$0.00';
    totalAmountEl.textContent = '$0.00';
    resetBtn.disabled = true;
    return;
  }

  const tipTotal = bill * (tipPercent / 100);
  const tipPerPerson = tipTotal / people;
  const totalPerPerson = (bill + tipTotal) / people;

  tipAmountEl.textContent = `$${tipPerPerson.toFixed(2)}`;
  totalAmountEl.textContent = `$${totalPerPerson.toFixed(2)}`;

  resetBtn.disabled = false;
}

function clearActiveButtons() {
  tipButtons.forEach(btn => btn.classList.remove('active'));
}

// =========================
// EVENT LISTENERS
// =========================

// Bill & People input
billInput.addEventListener('input', calculate);
peopleInput.addEventListener('input', calculate);

// Tip buttons
tipButtons.forEach(button => {
  button.addEventListener('click', () => {
    clearActiveButtons();
    customTipInput.value = '';

    button.classList.add('active');
    tipPercent = parseInt(button.dataset.tip);

    calculate();
  });
});

// Custom tip
customTipInput.addEventListener('input', () => {
  clearActiveButtons();
  tipPercent = parseFloat(customTipInput.value) || 0;
  calculate();
});

// Reset
resetBtn.addEventListener('click', () => {
  billInput.value = '';
  peopleInput.value = '';
  customTipInput.value = '';
  tipPercent = 0;

  clearActiveButtons();

  tipAmountEl.textContent = '$0.00';
  totalAmountEl.textContent = '$0.00';
  resetBtn.disabled = true;
});
