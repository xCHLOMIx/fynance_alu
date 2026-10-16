const transactions_amount = document.getElementById("transactions-amount");
const transactions_number = document.getElementById("transactions-number");
const budgets_number = document.getElementById("budgets-number");
const transactionList = document.getElementById("transactions");
const budgetList = document.getElementById("budgets")

const updateTransactions = (data, currency = "$") => {
    let totalTransactionsAmount = 0;

    if (data == null || data.transactions == null) {
        transactions_amount.textContent = 0;
        transactions_number.textContent = 0;
    } else {
        for (i = 0; i < data.transactions.length; i++) {
            totalTransactionsAmount += data.transactions[i].amount;
        }

        transactions_amount.textContent = currency + totalTransactionsAmount;
        transactions_number.textContent = data.transactions.length;
    }
}

const updateBudgets = (data) => {
    if (data == null || data.budgets == null) {
        budgets_number.textContent = 0;
    } else {
        budgets_number.textContent = String(data.budgets.length).padStart(2, 0);
    }
}

const updateTransactionList = (data, currency) => {
    if (data == null || data.transactions == null) {
        transactionList.innerHTML = `
            <p style="color: grey; text-align: center;">
                No transactions yet.
            </p>
        `;
    } else {
        const sortedTransactions = data.transactions.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 0));
        const topTransactions = sortedTransactions.filter((item, index) => index < 5);

        const htmlCode = topTransactions.map((item) => `
            <div class="item">
                <span class="first">$${item.amount}</span>
                <div class="text">
                    <h4>${item.description}</h4>
                    <span>${item.category}</span>
                </div>
            </div>
        `).join("");
        transactionList.innerHTML = htmlCode;
    }
}

const updateBudgetList = (data, currency) => {
    if (data == null || data.budgets == null) {
        budgetList.innerHTML = `
            <p style="color: grey; text-align: center;">
                No transactions yet.
            </p>
        `;
    } else {
        const sortedBudgets = data.budgets.sort((a, b) => (
            a.createdAt > b.createdAt ? -1 : 0
        ));
        const topBudgets = sortedBudgets.filter((item, index) =>
            index < 5
        );

        
        const htmlCode = topBudgets.map((item) => {
            const total = item.food + item.books + item.transport + item.entertainment + item.fees + item.others;
            return `<div class="item">
                <span class="first">
                    $${total}
                </span>
                <div class="text">
                    <h4>${item.name}<h4>
                    <p>${item.start_date} to ${item.end_date}</p>
                </div>
            </div>
        `}).join("");
        budgetList.innerHTML = htmlCode;
    }
}
const data = JSON.parse(localStorage.getItem("data")) || null;
updateBudgets(data);
updateTransactions(data);
updateTransactionList(data);
updateBudgetList(data);