const changeDue = document.getElementById("change-due");
const cash = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const priceSpan = document.getElementById("price");
const registerScreen = document.querySelector(".top-compartment .register-screen");
const currencies = document.querySelectorAll(".currency");
const currencyValues = document.querySelectorAll(".currency-value");

let balance = 0;
let price = 1.87;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];


// display price and cid
priceSpan.innerText = `$${price}`;

currencies.forEach((currency, index) => {
    currency.style.margin = "0";
});

currencyValues.forEach((value, index) => {
    value.textContent = `$${cid[index][1]}`;
});



const updateBalance = (index, currency) => {

    let estimatedDeduction = 0;
    let remaining = 0;
    let actualDeduction = 0; 

    estimatedDeduction = Math.floor(balance/currency) * currency;
    
    remaining = cid[index][1];

    actualDeduction = estimatedDeduction < remaining ? estimatedDeduction : remaining;

    cid[index][1] -= actualDeduction;
    cid[index][1] = parseFloat(cid[index][1].toFixed(2));

    balance -= actualDeduction;
    balance = parseFloat(balance.toFixed(2));



    // console.log(`index: ${index}`);
    // console.log(`estimatedDeduction: ${estimatedDeduction}`);
    // console.log(`remaining: ${remaining}`);
    // console.log(`actualDeduction: ${actualDeduction}`);
    // console.log(`balance: ${balance}`);
    // console.log(" ");

    return actualDeduction;
}


const calculateChange = () => {

    let actualDeduction = 0;
    let index = 0;

    if (balance === 0) {
        return;
    }

    if ((cid[8][1] >= 100) && (balance / 100 >= 1)){
        index = 8;
        actualDeduction = updateBalance(index, 100);
        calculateChange();
    }
    else if ((cid[7][1] >= 20) && (balance / 20 >= 1)) {
        index = 7;
        actualDeduction = updateBalance(index, 20);
        calculateChange();
    }
    else if ((cid[6][1] >= 10) && (balance / 10 >= 1)) {
        index = 6;
        actualDeduction = updateBalance(index, 10);
        calculateChange();
    }
    else if ((cid[5][1] >= 5) && (balance / 5 >= 1)) {
        index = 5;
        actualDeduction = updateBalance(index, 5);
        calculateChange();
    }
    else if ((cid[4][1] >= 1) && (balance / 1 >= 1)) {
        index = 4;
        actualDeduction = updateBalance(index, 1);
        calculateChange();
    }
    else if ((cid[3][1] >= 0.25) && (balance / 0.25 >= 1)) {
        index = 3;
        actualDeduction = updateBalance(index, 0.25);
        calculateChange();
    }
    else if ((cid[2][1] >= 0.1) && (balance / 0.1 >= 1)) {
        index = 2;
        actualDeduction = updateBalance(index, 0.1);
        calculateChange();
    }
    else if ((cid[1][1] >= 0.05) && (balance / 0.05 >= 1)) {
        index = 1;
        actualDeduction = updateBalance(index, 0.05);
        calculateChange();
    }
    else if ((cid[0][1] >= 0.01) && (balance / 0.01 >= 1)) {
        index = 0;
        actualDeduction = updateBalance(index, 0.01);
        calculateChange();
    }

    // deduct corresponding cid and update and display currencies
    if (balance === 0) {
        changeDue.innerHTML += `<p>${cid[index][0]}: $${actualDeduction}</p>`;
        currencyValues[index].textContent = `$${cid[index][1]}`;
    }
    else {
        cid[index][1] += actualDeduction;
    }
}


const getCidTotal = () => {
    
    return cid.reduce((total, array) => {
        return total + array[1];
    }, 0);
}


const performCalculation = () => {

    balance = parseFloat(cash.value) - price;
    changeDue.innerHTML = "";
    // console.clear();
    // console.log(balance);

    if(balance < 0){
        alert("Customer does not have enough money to purchase the item");
    }
    else if(balance === 0){
        changeDue.innerHTML = "No change due - customer paid with exact cash";
    }
    else {
        calculateChange();

        // check balance === 0 and cash-in-drawer to decide status
        if (balance !== 0) {
            changeDue.innerHTML = `<p>Status: INSUFFICIENT_FUNDS</p>`;
        }
        else if (getCidTotal() === 0) {
            changeDue.innerHTML = `<p>Status: CLOSED</p>` + changeDue.innerHTML;
        } 
        else {
            changeDue.innerHTML = `<p>Status: OPEN</p>` + changeDue.innerHTML;
        }
    }

}


purchaseBtn.addEventListener("click", performCalculation);

document.addEventListener("keyup", (event) => {

    if (event.key === "Enter"){
        performCalculation();
    }
})