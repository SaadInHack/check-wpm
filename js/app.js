// getelements
const elRead = document.querySelector(".js-readonly-input")
const elInput = document.querySelector(".js-write-input")
const elResult = document.querySelector(".result")
const elTime = document.querySelector(".time");
const elTryBtn = document.querySelector(".js-try-btn");
const elHigh = document.querySelector(".js-allTimeHigh-wpm")
const elLess = document.querySelector(".js-allTimeLess-time")


// variables
let time = 0
let keypress = 0;
let str = "";
let inter = null;
let front = true;
let minute = 0;
let secund = 0;
let wpm = 0;
// functions

function randomWords() {
    for (let i = 0; i < 5; i++) {
        let randomNumber = Math.floor(Math.random() * 1900)
        if (kinolar[randomNumber] !== undefined) {
            str += `${kinolar[randomNumber].title.toLowerCase()} `
        } else {
            i--;
            continue;
        }
    }
    keypress = str.length;
    elRead.textContent = str;
}
randomWords();

function recorsFunction() {
    if (localStorage.getItem("records")) {
        let newArr = JSON.parse(localStorage.getItem("records"));
        elHigh.textContent = `Your all time high wpm: ${newArr[0]}`
        elLess.textContent = `Your all time low time: 0${newArr[3]}:${newArr[2]}`
    } else {
        elHigh.textContent = "Your all time high wpm: 0"
        elLess.textContent = "Your all time low time: 0"
    }
}
recorsFunction()

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

function checkWords() {
    for (let i = 0; i < elInput.value.length; i++) {
        if (str[i] !== elInput.value[i]) {
            elRead.style.color = "red";
            break;
        } else {
            elRead.style.color = "#b6b6b6";
        }
    }
}


// input addEventListener
elInput.addEventListener("keyup", (evt) => {
    checkWords()
    elTryBtn.classList.remove("d-none")
    elTryBtn.classList.add("d-block")
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
        wpm = Math.floor((keypresscount() / 5) / checkTime(secund))
        elResult.textContent = `Your result: ${wpm} wpm`;
        if (localStorage.getItem("records")) {
            let newArr = JSON.parse(localStorage.getItem("records"));
            if (newArr[0] > wpm && newArr[1] < secund) {
                localStorage.setItem("records", JSON.stringify([wpm, secund, time, minute]));
                recorsFunction()
            }
        } else {
            localStorage.setItem("records", JSON.stringify([wpm, secund, time, minute]));
        }
    }
})

elTryBtn.addEventListener("click", () => {
    window.location.reload()
})