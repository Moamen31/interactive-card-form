//get inputs
const inputs = document.querySelectorAll("input");

const cardHolderName = document.querySelector(".cardholder-name");
const cardNumber = document.querySelector(".card-number");
const expDate = document.querySelectorAll(".exp-date-number span");
const cvcNumber = document.querySelector(".cvc-number");

const submitBtn = document.querySelector("button");

const form = document.querySelector("form")

const container = document.querySelector(".container")


function addCardInfo() {
    inputs.forEach(input => {
        input.addEventListener("keyup", e => {
            if (e.target.classList.contains("name")) {
                cardHolderName.innerText = e.target.value
                if (e.target.value === "") {
                    cardHolderName.innerText = "enter name"
                }
            }
            else if (e.target.classList.contains("number")) {
                cardNumber.innerText = e.target.value
                if (e.target.value === "") {
                    cardNumber.innerText = "0000 0000 0000 0000"
                }
            }
            else if (e.target.classList.contains("month") || e.target.classList.contains("year")) {
                if (e.target.classList.contains("month")) {
                    expDate[0].innerText = e.target.value
                }
                else {
                    expDate[1].innerText = e.target.value
                }
                if (expDate[0].innerText === "") {
                    expDate[0].innerText = "00"
                }
                if (expDate[1].innerText === "") {
                    expDate[1].innerText = "00"
                }

            }
            else if (e.target.classList.contains("cvc")) {
                cvcNumber.innerText = e.target.value
                if (e.target.value === "") {
                    cvcNumber.innerText = "000"
                }
            }
        })
    })
}
addCardInfo();


function checkInputsIfEmpty() {
    let nameInput = document.querySelector("form .name");
    let nameP = document.querySelector("form .name + p");

    let numberInput = document.querySelector("form .number");
    let numberP = document.querySelector("form .number + p");

    let monthInput = document.querySelector("form .date-inputs .month");
    let yearInput = document.querySelector("form .date-inputs .year");
    let dateP = document.querySelector("form .date-inputs + p");

    let cvcInput = document.querySelector("form .cvc");
    let cvcP = document.querySelector("form .cvc + p");

    /////////////////////////////
    // name input
    nameInput.onblur = () => {
        onUnFocused(nameInput, nameP);
    }
    nameInput.onkeyup = () => {
        onKeyPressed(nameInput, nameP);
    }

    /////////////////////////////
    // number input
    numberInput.oninput = () => {
        numberInput.value = numberInput.value.replace(/[\D\W]/g, '').replace(/(.{4})/g, '$1 ').trim();
    }
    numberInput.onblur = () => {
        if (numberInput.value.length < 19) {
            numberP.innerText = "please write the whole numbers"
        }
        onUnFocused(numberInput, numberP);
    }
    numberInput.onkeyup = () => {
        onKeyPressed(numberInput, numberP);
    }

    ///////////////////////////////
    // date inputs
    monthInput.onblur = () => {
        onUnFocused(monthInput, dateP);
    }
    monthInput.onkeyup = () => {
        onKeyPressed(monthInput, dateP);
    }
    yearInput.onblur = () => {
        onUnFocused(yearInput, dateP);
    }
    yearInput.onkeyup = () => {
        onKeyPressed(yearInput, dateP);
    }

    ///////////////////////////////
    // cvc input
    cvcInput.onblur = () => {
        onUnFocused(cvcInput, cvcP);
    }
    cvcInput.onkeyup = () => {
        onKeyPressed(cvcInput, cvcP);
    }

    //////////////////////////
    if (nameInput.value !== "" && numberInput.value !== "" && monthInput.value !== ""
        && yearInput.value !== "" && cvcInput.value !== "") {
        form.remove();
        let complete = document.createElement("div")
        complete.className = "complete"
        complete.innerHTML = `
        <img src="images/icon-complete.svg" alt="">
        <h1>Thank you!</h1>
        <p>We've added your card details</p>
        <button onclick="reloadPage()">Continue</button> `
        container.insertAdjacentElement("beforeend", complete);
    }
}
checkInputsIfEmpty();

// function if the inputs are empty
function onUnFocused(input, p) {
    if (input.value === "") {
        p.innerText = "Can't be blank"
        input.classList.add("invaild")
    }
}
function onKeyPressed(input, p) {
    if (input.value !== "") {
        p.innerText = ""
        input.classList.remove("invaild")
    }
}

submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    checkInputsIfEmpty();
})

function reloadPage(){
    location.reload();
}


