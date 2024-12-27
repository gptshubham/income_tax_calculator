const form = document.querySelector('form');

const taxContainer = document.querySelector('.tax-container');

let tax;
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const data = new FormData(form);

  const [id, income] = data.entries();
  // console.log(data.entries());
  // console.log([id, income]);
  // console.log(id[1]);

  let tax;
  if (id[1] == '') {
    tax = 0;
  } else {
    tax = calculateTax(Number(id[1]));
  }

  // console.log(tax);

  taxContainer.innerHTML = `Maximum Tax Payable: ${tax}
  <br>(The Income Tax Act,1961)`;
});

// function to calculate income tax based on different tax brackets
const calculateTax = (income) => {
  // console.log(income);
  let tax;

  if (income <= 300000 && income > 0) {
    tax = 0;
  } else if (income > 300000 && income <= 500000) {
    tax = 0;
    // a maximum rebate of 10000 is available if income <= 500000,
    // making the tax payable to 0
    // no rebate is available if income > 500000
  } else if (income >= 500000 && Number(income) <= 700000) {
    tax = ((income - 300000) * 5) / 100;
  } else if (income >= 700000 && income <= 1000000) {
    tax = ((income - 700000) * 10) / 100 + 400000 * (5 / 100);
  } else if (income >= 1000000 && income <= 1200000) {
    tax =
      ((income - 1000000) * 15) / 100 +
      (300000 * 10) / 100 +
      (400000 * 5) / 100;
  } else if (income >= 1200000 && income <= 1500000) {
    tax =
      ((income - 1200000) * 20) / 100 +
      (200000 * 15) / 100 +
      (300000 * 10) / 100 +
      (400000 * 5) / 100;
  } else if (income > 1500000) {
    tax =
      ((income - 1500000) * 30) / 100 +
      (300000 * 20) / 100 +
      (200000 * 15) / 100 +
      (300000 * 10) / 100 +
      (400000 * 5) / 100;
  }

  // calculation of surcharge if income > 50 lakhs
  let surcharge = 0;

  if (income > 5000000 && income < 5500000) {
    surcharge = income - 5000000;
  } else if (income >= 5500000 && income < 10000000) {
    surcharge = (tax * 10) / 100;
  } else if (income >= 10000000 && income <= 11500000) {
    surcharge = income - 10000000;
  } else if (income > 11500000) {
    surcharge = (tax * 15) / 100;
  }

  let tax_before_cess = tax + surcharge;

  // calculation of cess
  const cess = (tax_before_cess * 4) / 100;

  const taxPayable = tax_before_cess + cess;

  return taxPayable;
};
