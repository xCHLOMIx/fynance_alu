const movable = document.getElementById("bg");
const usdButton = document.getElementById("usd");
const rwfTrigger = document.getElementById("rwf");
const kshTrigger = document.getElementById("ksh");

usdButton.addEventListener("click", () => {
    movable.classList.remove("center");
    movable.classList.remove("right");
    movable.classList.add("left");
});

rwfTrigger.addEventListener("click", () => {
    movable.classList.remove("right");
    movable.classList.remove("left");
    movable.classList.add("center");
})

kshTrigger.addEventListener("click", () => {
    movable.classList.remove("left");
    movable.classList.remove("center");
    movable.classList.add("right");
})