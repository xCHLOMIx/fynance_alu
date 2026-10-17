const movable = document.getElementById("bg");
const usdButton = document.getElementById("usd");
const rwfTrigger = document.getElementById("rwf");
const kshTrigger = document.getElementById("ksh");

let data = JSON.parse(localStorage.getItem("data")) || null;
let currency;
if (data == null || data.currency == null) {
    currency = "$";
} else {
    currency = data.currency;
}
switch (currency) {
    case "$":
        movable.classList.add("left");
        break;
    case "RWF":
        movable.classList.add("center");
        break;
    case "KSH":
        movable.classList.add("right");
        break
}

usdButton.addEventListener("click", () => {
    movable.classList.remove("center");
    movable.classList.remove("right");
    movable.classList.add("left");
    data = { ...data, currency: "$" };
    localStorage.setItem("data", JSON.stringify(data));
});

rwfTrigger.addEventListener("click", () => {
    movable.classList.remove("right");
    movable.classList.remove("left");
    movable.classList.add("center");
    data = { ...data, currency: "RWF" };
    localStorage.setItem("data", JSON.stringify(data));
})

kshTrigger.addEventListener("click", () => {
    movable.classList.remove("left");
    movable.classList.remove("center");
    movable.classList.add("right");
    data = { ...data, currency: "KSH" }
    localStorage.setItem("data", JSON.stringify(data));
})