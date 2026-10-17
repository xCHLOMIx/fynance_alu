const transactions_amount = document.getElementById("transactions-amount");
const transactions_number = document.getElementById("transactions-number");
const topCategoryEl = document.getElementById("top-category");
const transactionList = document.getElementById("transactions");
const budgetList = document.getElementById("budgets")

const updateTransactionsData = (data) => {
    let totalTransactionsAmount = 0;

    if (data == null || data.transactions == null) {
        transactions_amount.textContent = 0;
        transactions_number.textContent = 0;
    } else {
        for (i = 0; i < data.transactions.length; i++) {
            totalTransactionsAmount += data.transactions[i].amount;
        }

        function rankTransactionCategories(transactions) {
            let score = []
            for (i = 0; i < transactions.length; i++) {
                let categoryRank = {
                    category: transactions[i].category,
                    count: 0
                }

                for (j = 0; j < transactions.length; j++) {
                    if (transactions[j].category == categoryRank.category) {
                        categoryRank.count += 1;
                    }
                }

                score.push(categoryRank);
            }

            return score;
        }

        const topCategory = rankTransactionCategories(data.transactions)[0];
        let rate = 1;

        switch (data.currency) {
            case "$":
                rate = 1;
                break;
            case "RWF":
                rate = 1478.18;
                break;
            case "KSH":
                rate = 130.10
        }

        topCategoryEl.innerText = topCategory.category;
        transactions_amount.textContent = data.currency + " " + (totalTransactionsAmount * rate).toLocaleString();
        transactions_number.textContent = data.transactions.length;
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
updateTransactionsData(data);
updateTransactionList(data);
updateBudgetList(data);