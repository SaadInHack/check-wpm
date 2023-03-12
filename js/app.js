// getelements
const elRead = document.querySelector(".js-readonly-input")
const elInput = document.querySelector(".js-write-input")
const elResult = document.querySelector(".result")
const elTime = document.querySelector(".time");
const elTryBtn = document.querySelector(".js-try-btn");

// variables
let time = 0
let keypress = 0;
let str = "";
// functions

function randomWords() {
    for (let i = 0; i < 5; i++) {
        let randomNumber = Math.floor(Math.random() * 1900)
        str += `${kinolar[randomNumber].title.toLowerCase()} `
    }
    keypress = str.length;
    elRead.textContent = str;
}
randomWords();

function checkTime(vaqt) {
    let sum = 0;
    if (vaqt < 60) {
        return Number(`0.${vaqt}`)
    } else {
        while (true) {
            if (vaqt - 60 > 0) {
                vaqt -= 60;
                sum++;
            } else {
                return Number(`${sum}.${vaqt}`)
            }
        }
    }
}
function keypresscount() {
    let sum = 0;
    for (let i = 0; i < elInput.value.length; i++) {
        if (elInput.value[i] !== str[i]) {
            sum++;
        }
    }
    return elInput.value.length - sum;
}
let inter = null;
let front = true;
let minute = 0;
let secund = 0;
elInput.addEventListener("keyup", (evt) => {
    if (front) {
        front = false;
        inter = setInterval(() => {
            time++;
            secund++;
            if (time === 60) {
                time = 0;
                minute++;
            }
            elTime.textContent = `Time used: 0${minute}:${time}`
        }, 1000)
    }
    if (elInput.value.length === keypress - 1) {
        clearInterval(inter);
        elInput.disabled = true;
        elResult.textContent = `Your result: ${Math.floor((keypresscount() / 5) / checkTime(secund))} wpm`;
        elTryBtn.classList.remove("d-none")
        elTryBtn.classList.add("d-block")
    }
})

elTryBtn.addEventListener("click", () => {
    window.location.reload()
})