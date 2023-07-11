// ----------------VARIABLES---------------- //
const currentBudget = document.querySelector(".current-budget");
const currentExpenses = document.querySelector(".current-expenses");
const currentBalance = document.querySelector(".current-balance");
const budgetOutputList = document.querySelector(".budget-output-list")
const budgetResultTwo = document.querySelector("#budget-result-two");
const budgetForm = document.querySelector("#budget-form");
const expensesForm = document.querySelector("#expenses-form");


// ----------------INPUT ELEMENTS---------------- //
const budgetInputName = document.querySelector("#budget-input-name");
const budgetAmount = document.querySelector("#budget-amount");
const expenseName = document.querySelector("#expense-name");
const expenseAmount = document.querySelector("#expense-amount");

// -----------BUTTONS---------------- //
const setBudgetBtn = document.querySelector("#set-budget-btn");
const setExpensesBtn = document.querySelector("#set-expenses-btn");
const clearBtn = document.querySelector("#clear-btn");



// -----------TOAST---------------- //
const notifications = document.querySelector(".notifications");
// Object containing details for different types of toasts
const toastDetails = {
    timer: 5000,
    success: {
        icon: 'fa-circle-check',
        text: 'Successfully added.',
    },
    error: {
        icon: 'fa-circle-xmark',
        text: 'Please enter name and amount.',
    },
    warning: {
        icon: 'fa-triangle-exclamation',
        text: 'Warning: This is a warning toast.',
    },
    info: {
        icon: 'fa-circle-info',
        text: 'Please set budget. Expense is larger than budget amount',
    }
}

const removeToast = (toast) => {
    toast.classList.add("hide");
    if(toast.timeoutId) clearTimeout(toast.timeoutId); // Clearing the timeout for the toast
    setTimeout(() => toast.remove(), 500); // Removing the toast after 500ms
}

const createToast = (id) => {
    // Getting the icon and text for the toast based on the id passed
    const { icon, text } = toastDetails[id];
    const toast = document.createElement("li"); // Creating a new 'li' element for the toast
    toast.className = `toast ${id}`; // Setting the classes for the toast
    // Setting the inner HTML for the toast
    toast.innerHTML = `<div class="column">
                        <i class="fa-solid ${icon}"></i>
                        <span>${text}</span>
                    </div>
                    <i class="fa-solid fa-xmark" onclick="removeToast(this.parentElement)"></i>`;
    notifications.appendChild(toast); // Append the toast to the notification ul
    // Setting a timeout to remove the toast after the specified duration
    toast.timeoutId = setTimeout(() => removeToast(toast), toastDetails.timer);
}


// -----------VARIABLES---------------- //
let budgetList;
showData();
updateUI();

// 

// -----------EVENT LISTENERS---------------- //

// -----------SET BUDGET---------------- //
setBudgetBtn.addEventListener("click", e => {
    e.preventDefault();
    if(budgetAmount.value && budgetInputName.value) {
        // -----------SHOW TOAST---------------- //
        createToast("success");
        // -----------SET BUDGET TO BUDGET LIST---------------- //
        let budget = {
            name: budgetInputName.value,
            amount: budgetAmount.value,
            expenses: []
        }
        budgetList.push(budget);        
        // currentBudget.textContent = formatValue(budgetAmount.value);
        // budgetAmount.value = "";
        // budgetInputName.value = "";
        // getBalance();

    } else {
        // -----------SHOW TOAST---------------- //
        createToast("error");
        // NOTE
        return;
    }
    updateUI();
})

function showExpenses(index) {
    // -----------SET EXPENSES---------------- //
    setExpensesBtn.addEventListener("click", e => {
        e.preventDefault();
        // let budgetValue = parseFloat(currentBudget.textContent.slice(1));
        // let expenseValue = parseFloat(currentExpenses.textContent.slice(1));
        // let expenseAmountValue = parseFloat(expenseAmount.value)

        // if (expenseAmountValue <= budgetValue) {
            if(expenseName.value && expenseAmount.value) {
                // -----------SHOW TOAST---------------- //
                createToast("success");
                let expense = {
                    name: expenseName.value,
                    amount: expenseAmount.value
                }

                budgetList[0]["expenses"].push(expense);
                console.log(budgetList);


            
                expensesForm.classList.remove("active-form");
                expensesForm.classList.add("inactive-form");

                
                budgetForm.classList.add("active-form");
                budgetForm.classList.remove("inactive-form");


                // expenseValue += expenseAmountValue;
                // currentExpenses.textContent = formatValue(expenseValue);
                // getBalance();
                // expenseName.value = "";
                // expenseAmount.value = "";

            } else {
                // -----------SHOW TOAST---------------- //
                createToast("error");
            } 
        // } 
        // else {
        //     createToast("info");
        // }    
        updateUI();
    })
}      




// -----------MODIFY BUDGET---------------- //

budgetOutputList.addEventListener("click", (e) => {
    const outputListName = e.target.parentElement.parentElement
    if(e.target.tagName === "INPUT") {
        outputListName.querySelector('.budget-name.expense-item').classList.toggle("checked");
        outputListName.parentElement.querySelector('.budget-amount.expense-item').classList.toggle("checked");
    }
    else if(e.target.classList.contains("delete-btn")) {
        const budgetEntryId = outputListName.parentElement.id;
        budgetList.splice(budgetEntryId, 1);

    }
    else if(e.target.classList.contains("edit-btn")) {
        const budgetEntryId = outputListName.parentElement.id;
        const budgetEntry = budgetList[budgetEntryId];
        budgetInputName.value = budgetEntry.name;
        budgetAmount.value = budgetEntry.amount;

        budgetList.splice(budgetEntryId, 1);       
    }
    else if(e.target.classList.contains("plus-btn")) {
        const budgetEntryId = outputListName.parentElement.id;

       showExpenses(budgetEntryId);


        budgetForm.classList.remove("active-form");
        budgetForm.classList.add("inactive-form");

        expensesForm.classList.remove("inactive-form");
        expensesForm.classList.add("active-form");


        // expensesForm.classList.toggle("active-form")
    }
    updateUI();
})


// -----------CLEAR BUDGET---------------- //
clearBtn.addEventListener("click", () => {
    console.log("yay")
    localStorage.clear();
    updateUI();
})

// -----------HELPER FUNCTIONS---------------- //

function updateUI() {
    budgetOutputList.innerHTML = "";
    budgetList.forEach((budget, index) => {
        const budgetEntry = `
            <div class="output-list-item output-list-item-two" id="${index}">
                <div class="output-list-name">
                <div>
                    <input type="checkbox" name="" id="">
                </div>
                <div>
                    <li class="budget-name expense-item" contentEditable="false">${budget.name}</li>
                    
                </div>
                </div>
                <div class="output-list-amount">
                    <li class="budget-amount expense-item" contentEditable="false">$${budget.amount}</li>
                </div>
                <div class="output-list-icon">
                    <button> <i class="fa-solid fa-plus plus-btn"></i></button>
                    <button><i class="fa-solid fa-pen-to-square edit-btn"></i></button>
                    <button> <i class="fa-solid fa-trash delete-btn"></i></button>
                    <button> <i class="fa-solid fa-eye eye-btn"></i></button>
                </div>
            </div>
        `
        const position = "afterbegin"
        budgetOutputList.insertAdjacentHTML(position, budgetEntry)
    })  
    saveData();
}

function getBalance() {
    const budgetValue = parseFloat(currentBudget.textContent.slice(1));
    const expenseValue = parseFloat(currentExpenses.textContent.slice(1));
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


function saveData() {
    localStorage.setItem("budget-list", JSON.stringify(budgetList));
}

function showData() {
   budgetList = JSON.parse(localStorage.getItem("budget-list")) || [];
}
