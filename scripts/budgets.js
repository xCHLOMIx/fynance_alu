const form_trigger = document.getElementById("add_budget");
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
    const name = document.getElementById("name");
    const start_date = document.getElementById("start_date");
    const end_date = document.getElementById("end_date");
    const food = document.getElementById("food");
    const books = document.getElementById("books");
    const transport = document.getElementById("transport");
    const entertainment = document.getElementById("entertainment");
    const fees = document.getElementById("fees");
    const others = document.getElementById("others")

    const budget = {
        id: data == null || data.budgets == null ? 1 : data.budgets[data.budgets.length - 1].id + 1,
        name: name.value,
        start_date: start_date.value,
        end_date: end_date.value,
        food: parseFloat(food.value),
        books: parseFloat(books.value),
        transport: parseFloat(transport.value),
        entertainment: parseFloat(entertainment.value),
        fees: parseFloat(fees.value),
        others: parseFloat(others.value)
    }

    if (data == null || data.budget == null) {
        data = {...data, budgets: [budget]};
        localStorage.setItem("data", JSON.stringify(data));
    } else {
        data.budgets = [...data.budgets, budget];
        localStorage.setItem("data", JSON.stringify(data));
    }
    name.value = "";
    start_date.value = "";
    end_date.value = "";
    food.value = "";
    books.value = "";
    transport.value = "";
    entertainment.value = "";
    fees.value = "";
    others.value = "";
    const newData = JSON.parse(localStorage.getItem("data")) || null;
    if (newData.budgets != null) showData(newData.budgets);
    form_container.classList.add("hidden");
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    formHandle();
})

const showData = (data, mark) => {
    const tableBody = document.getElementById('table');
    const htmlCode = data.map((data) => `
        <tr>
            <td>${(mark && mark.includes(data) ? "<mark>" + data.name + "</mark>" : data.name)}</td>
            <td>${data.food}</td>
            <td>${data.books}</td>
            <td>${data.transport}</td>
            <td>${data.entertainment}</td>
            <td>${data.fees}</td>
            <td>${data.others}</td>
            <td>${data.start_date}</td>
            <td>${data.end_date}</td>
        </tr>
    `).join("");

    tableBody.innerHTML = htmlCode;
}

const data = JSON.parse(localStorage.getItem("data")) || null;
if (data != null && data.budgets) showData(data.budgets);