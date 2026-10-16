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
    let data = JSON.parse(localStorage.getItem("data")) || null;
    const amount = document.getElementById("amount");
    const description = document.getElementById("description");
    const category = document.getElementById("category");
    const date = new Date();

    const transaction = {
        id: data == null || data.transactions == null ? 1 : data.transactions[data.transactions.length - 1].id + 1,
        amount: parseFloat(amount.value),
        description: description.value,
        category: category.value,
        createdAt: `${String(date.getDate()).padStart(2, "0")}-${String(date.getMonth()).padStart(2, "0")}-${String(date.getFullYear()).padStart(2, "0")}-${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`
    };

    if (data == null || data.transactions == null) {
        data = { ...data, transactions: [transaction] };
        localStorage.setItem("data", JSON.stringify(data));
    } else {
        data.transactions = [...data.transactions, transaction];
        localStorage.setItem("data", JSON.stringify(data));
    }
    amount.value = "";
    description.value = "";
    category.value = "";
    const newData = JSON.parse(localStorage.getItem("data")) || null;
    if (newData.transactions != null) showData(newData.transactions);
    form_container.classList.add("hidden");
}

form.addEventListener("submit", (event) => {
    event.preventDefault()
    formHandle();
});

const showData = (data, mark) => {
    const tableBody = document.getElementById("table");
    const htmlCode = data.map((data) => `
        <tr>
            <td>${(mark && mark.includes(data) ? "<mark>" + data.description + "</mark>" : data.description)}</td>
            <td>$ ${data.amount}</td>
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
                            <img src="../assets/icons/black_plus.png" alt="Black plus icon">
                        </button>
                    </div>
                    <form id="${data.id}-form">
                        <div class="field">
                            <label for="amount">Amount ($):</label>
                            <input type="number" pattern="^(0|[1-9]\\d*)(\\.\\d{1,2})?$" value=${parseFloat(data.amount)} id="${data.id}-amount" title="Must be a numeric value" placeholder="Example: 500"required>
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
                <div class="buttons">
                    <button id="edit" onclick="openEditForm(${data.id})">Edit</button>
                    <button id="delete" onclick="openDelPopUp(${data.id})">Delete</button>
                </div>
            </td>
        </tr>
    `).join("");

    tableBody.innerHTML = htmlCode;
};

const options = document.getElementById("options-container");
const data = JSON.parse(localStorage.getItem("data")) || null;
if (data && data.transactions) {
    showData(data.transactions);
} else {
    options.style += "display: none;";
};

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
    let data = JSON.parse(localStorage.getItem("data")) || null;
    data.transactions = data.transactions.filter((transaction) => transaction.id != id);
    localStorage.setItem("data", JSON.stringify(data));
    showData(data.transactions);
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
        let data = JSON.parse(localStorage.getItem("data")) || null;
        const amount = document.getElementById(`${id}-amount`);
        const description = document.getElementById(`${id}-description`);
        const category = document.getElementById(`${id}-category`);
        const date = new Date();
        let transaction = data.transactions.find((item) => item.id == id);
        transaction.amount = parseFloat(amount.value);
        transaction.description = description.value;
        transaction.category = category.value;
        transaction.updatedAt = `${String(date.getDate()).padStart(2, "0")}-${String(date.getMonth()).padStart(2, "0")}-${String(date.getFullYear()).padStart(2, "0")}-${String(date.getHours()).padStart(2, "0")}-${String(date.getMinutes()).padStart(2, "0")}-${String(date.getSeconds())}`;

        data = { ...data, transactions: data.transactions.filter((item) => item.id != id) };
        data.transactions = [...data.transactions, transaction];
        data.transactions = data.transactions.sort((a, b) => a.id - b.id)
        showData(data.transactions);
        closeEditForm(id);
        localStorage.setItem("data", JSON.stringify(data));
    })
}

// Live Searching ??

const searchInput = document.getElementById("search");

searchInput.addEventListener("input", (event) => {
    try {
        const re = new RegExp(event.target.value, "i");
        const transactions = JSON.parse(localStorage.getItem("transactions")) || null;
        const newTransactions = event.target.value ? transactions.filter((item) => (item.description).match(re)) : null;

        showData(transactions, newTransactions);
    } catch (err) {
        console.log("Sorry, there was an error!")
    }
});

// Sorting functionality
const sortingSelect = document.getElementById("sorting");
sortingSelect.addEventListener("change", (event) => {
    const transactions = JSON.parse(localStorage.getItem("data")).transactions || null;
    let newTransactions;

    switch (event.target.value) {
        case 'amount-a':
            newTransactions = transactions.sort((a, b) => a.amount - b.amount);
            break;
        case 'amount-d':
            newTransactions = transactions.sort((a, b) => b.amount - a.amount);
            break;
        case 'createdAt-a':
            newTransactions = transactions.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 0));
            break;
        case 'createdAt-d':
            newTransactions = transactions.sort((a, b) => (a.createdAt > b.createdAt ? 0 : -1));
            break;
        case 'description-d':
            newTransactions = transactions.sort((a, b) => (a.description.toUpperCase() > b.description.toUpperCase() ? -1 : 0));
            break;
        case 'description-a':
            newTransactions = transactions.sort((a, b) => (a.description.toUpperCase() > b.description.toUpperCase() ? 0 : -1))
    }

    showData(newTransactions);
})