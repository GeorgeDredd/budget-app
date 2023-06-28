const currentBudget = document.querySelector(".current-budget");
const currentExpenses = document.querySelector(".current-expenses");
const currentBalance = document.querySelector(".current-balance");
const expenseList = document.querySelector(".budget-output-list")
const budgetAmount = document.querySelector("#budget-amount");
const expenseName = document.querySelector("#expense-name");
const expenseAmount = document.querySelector("#expense-amount");
const setBudgetBtn = document.querySelector("#set-budget-btn");
const setExpensesBtn = document.querySelector("#set-expenses-btn");
const budgetResultTwo = document.querySelector("#budget-result-two");
const clearBtn = document.querySelector("#clear-btn");



setBudgetBtn.addEventListener("click", e => {
    e.preventDefault();
    if(budgetAmount.value) {
        currentBudget.textContent = formatValue(budgetAmount.value);
        budgetAmount.value = "";
        getBalance();
    } else {
        alert("Please fill input accordingly");
    }
    saveData();
})

setExpensesBtn.addEventListener("click", e => {
    e.preventDefault();
    let budgetValue = Number(currentBudget.textContent.slice(1));
    let expenseValue = Number(currentExpenses.textContent.slice(1));
    let expenseAmountValue = Number(expenseAmount.value)
    if (expenseAmountValue <= budgetValue) {
        if(expenseName.value && expenseAmount.value) {
            console.log(expenseValue, expenseAmountValue)
            expenseValue += expenseAmountValue;
            currentExpenses.textContent = formatValue(expenseValue);
            getBalance();
            addBudget();
            expenseName.value = "";
            expenseAmount.value = "";
        } else {
            alert("Please fill input accordingly");
        } 
    } else {
        alert("Please set budget. Expense is larger than budget amount");
    }    
    saveData();
})


function getBalance() {
    const budgetValue = Number(currentBudget.textContent.slice(1));
    const expenseValue = Number(currentExpenses.textContent.slice(1));
    const balanceValue = budgetValue - expenseValue
    currentBalance.textContent = formatBalance(balanceValue)
}


function formatBalance(value) {
    if (value < 0) {
        currentBalance.classList.add("red");
        currentBalance.classList.remove("green");
    } else {
        currentBalance.classList.remove("red");
        currentBalance.classList.add("green");
    }
    return  `$${value}.00`;
}


function formatValue(value) {
    return `$${value}.00`;
}

function addBudget() {
    const div = document.createElement("div");
    div.setAttribute("class", "output-list-item output-list-item-two")
    div.innerHTML = `
        <div class="output-list-name">
        <div>
            <input type="checkbox" name="" id="">
        </div>
        <div>
            <li class="budget-name expense-item" contentEditable="false">${expenseName.value}</li>
            
        </div>
        </div>
        <div class="output-list-amount">
            <li class="budget-amount expense-item" contentEditable="false">$${expenseAmount.value}</li>
        </div>
        <div class="output-list-icon">
            <button><i class="fa-solid fa-pen-to-square edit-btn"></i></button>
            <button> <i class="fa-solid fa-trash delete-btn"></i></button>
        </div>
    `
    saveData();
    expenseList.appendChild(div);
}

expenseList.addEventListener("click", (e) => {
    const outputListName = e.target.parentElement.parentElement
    if(e.target.tagName === "INPUT") {
        outputListName.lastElementChild.firstElementChild.classList.toggle("checked");
        outputListName.nextElementSibling.firstElementChild.classList.toggle("checked");
        // e.target.classList.toggle("checked");
        saveData()
    }
    else if(e.target.classList.contains("delete-btn")) {
        outputListName.parentElement.remove();
        saveData();
    }
    else if(e.target.classList.contains("edit-btn")) {
        // item.setAttribute("contentEditable", "true")
        const expenseItem = document.querySelectorAll(".expense-item")
        // console.log(expenseItem);
        expenseItem.forEach(item => {
            if (item.contentEditable == "true") {
                e.target.className = "fa-solid fa-pen-to-square edit-btn";
                item.contentEditable = "false";
            } 
            else {
                e.target.className = "fa-solid fa-check edit-btn";
                outputListName.parentElement.firstElementChild.lastElementChild.firstElementChild.focus();
                expenseItem.forEach(item => {
                    item.contentEditable = "true";
                });
            }
            item.addEventListener("focusout", () => {
                e.target.className = "fa-solid fa-pen-to-square edit-btn";
                expenseItem.forEach(item => {
                    item.contentEditable = "false";
                });
                saveData();
            });
        });        
    }
}, false)


clearBtn.addEventListener("click", () => {
    localStorage.clear();
    location.reload();
})

function saveData() {
    localStorage.setItem("expense-data", expenseList.innerHTML);
    // localStorage.setItem("budget-data", budgetResultTwo.innerHTML);
}

function showData() {
   expenseList.innerHTML =  localStorage.getItem("expense-data");
//    if(localStorage.getItem("budget-data")) {
//         budgetResultTwo.innerHTML =  localStorage.getItem("budget-data");
//    }
}

showData();