const form_trigger = document.getElementById("add_transaction");
const form_close = document.getElementById("form_close");
const form_container = document.getElementById("form-container");
const form = document.getElementById("form");


form_trigger.addEventListener("click", () => {
    form_container.classList.remove("hidden");
});

form_close.addEventListener("click", () => {
    form_container.classList.add("hidden");
});

const formHandle = () => {
    let transactions = JSON.parse(localStorage.getItem("transactions")) || null;
    const amount = document.getElementById("amount");
    const description = document.getElementById("description");
    const category = document.getElementById("category");
    const date = new Date();

    const transaction = {
        id: transactions == null ? 1 : transactions[transactions.length - 1].id + 1,
        amount: parseInt(amount.value),
        description: description.value,
        category: category.value,
        createdAt: `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}-${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    };

    if (transactions == null) {
        transactions = [transaction];
        localStorage.setItem("transactions", JSON.stringify([transaction]));
    } else {
        transactions = [...transactions, transaction];
        localStorage.setItem("transactions", JSON.stringify(transactions));
    }
    amount.value = "";
    description.value = "";
    category.value = "";
    if (transactions != null) showData(transactions);
    form_container.classList.add("hidden");
}

form.addEventListener("submit", (event) => {
    event.preventDefault()
    formHandle();
});

const showData = (data) => {
    const tableBody = document.getElementById("table");
    const htmlCode = data.map((data) => `
        <tr>
            <td>${data.amount}</td>
            <td>${data.description}</td>
            <td>${data.category}</td>
            <td>${data.createdAt}</td>
            <td>
                <div class="del-pop hidden-pop" id="${data.id}">
                    <div class="message-container">
                        Are you sure you want to delete "${data.description}" transaction?
                        <div>
                            <button class="yes" onclick="deleteTransaction(${data.id})">Yes</button>
                            <button class="no" onclick="closeDelPopUp(${data.id})">No</button>
                        </div>
                    </div>
                </div>
                <div id="${data.id}-container" class="hidden form-container">
                    <div class="head">
                        <h2>Edit transaction</h2>
                        <button id="form_close" onclick="closeEditForm(${data.id})">
                            <img src="../assets/icons/black_plus.png" alt="">
                        </button>
                    </div>
                    <form id="${data.id}-form">
                        <div class="field">
                            <label for="amount">Amount ($):</label>
                            <input type="number" value=${parseInt(data.amount)} id="${data.id}-amount" title="Must be numbers" placeholder="Example: 500"required>
                        </div>
                        <div class="field">
                            <label for="description">Description:</label>
                            <input type="text" value="${data.description}" minlength="5" id="${data.id}-description" placeholder="Example: Lunch at KFC" required>
                        </div>
                        <div class="selects" id="select_container">
                            <div class="field">
                                <label for="category">Category:</label>
                                <select name="category" value="${data.category}" id="${data.id}-category" required>
                                    <option value="">Select category</option>
                                    <option value="food">Food</option>
                                    <option value="books">Books</option>
                                    <option value="transport">Transport</option>
                                    <option value="entertainment">Entertainment</option>
                                    <option value="fees">Fees</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>
                        <button type="submit" onClick="editTransaction(${data.id})" class="primary">Submit</button>
                    </form>
                </div>
                <button id="edit" onclick="openEditForm(${data.id})">Edit</button>
                <button id="delete" onclick="openDelPopUp(${data.id})">Delete</button>
            </td>
        </tr>
    `).join("");

    tableBody.innerHTML = htmlCode;
};

const transactions = JSON.parse(localStorage.getItem("transactions")) || null;
if (transactions) showData(transactions);

const select = document.getElementById("category");
// select.addEventListener("change", (event) => {
//     const select_container = document.getElementById("select_container");
//     console.log(other)
//     if (event.target.value === "other") {
//         select_container.innerHTML += `<div class="field" id="other">
//                             <label for="other_category">Other category:</label>
//                             <input type="text" minlength="5" id="other_category" placeholder="Example: Hobby" required>
//                         </div>`
//         // other.remove()
//         select_container.appendChild(
//         )
//     }
// })

const deleteTransaction = (id) => {
    const transactions = JSON.parse(localStorage.getItem("transactions")) || null;
    const newTransactions = transactions.filter((transaction) => transaction.id != id);
    localStorage.setItem("transactions", JSON.stringify(newTransactions));
    showData(newTransactions);
}

const openDelPopUp = (id) => {
    const popUp = document.getElementById(id);
    popUp.classList.remove("hidden-pop");
}

const closeDelPopUp = (id) => {
    const popUp = document.getElementById(id);
    popUp.classList.add("hidden-pop");
}

const openEditForm = (id) => {
    const form = document.getElementById(`${id}-container`);

    form.classList.remove("hidden");
}

const closeEditForm = (id) => {
    const form = document.getElementById(`${id}-container`);
    form.classList.add("hidden");
}

const editTransaction = (id) => {
    document.getElementById(`${id}-form`).addEventListener("submit", (event) => {
        event.preventDefault();
        const transactions = JSON.parse(localStorage.getItem("transactions")) || null;
        const amount = document.getElementById(`${id}-amount`);
        const description = document.getElementById(`${id}-description`);
        const category = document.getElementById(`${id}-category`);
        let transaction = transactions.find((item) => item.id == id);
        transaction.amount = parseInt(amount.value);
        transaction.description = description.value;
        transaction.category = category.value;
    
        const newTransactions = transactions.filter((item) => item.id != id);
        newTransactions.push(transaction);
        showData(newTransactions);
        closeEditForm(id);
        console.log(transactions)
        localStorage.setItem("transactions", JSON.stringify(newTransactions.sort((a, b) => a.id - b.id)));
    })
}