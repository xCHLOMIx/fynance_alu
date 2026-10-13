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

    const transaction = {
        id: transactions == null ? 1 : transactions[transactions.length - 1].id + 1,
        amount: parseInt(amount.value),
        description: description.value,
        category: category.value,
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