let billValue = document.querySelector(".fill");
let numberPeople = document.querySelector(".numberPeople");
let valeurPerPerson = document.querySelector(".valeur");
let valeurTotal = document.querySelector(".valeur2");
let customInput = document.querySelector(".custom");
let reset = document.getElementById("reset");

billValue.addEventListener("input", function () {
    checkBill();
    calculer();
});
numberPeople.addEventListener("input", function () {
    checkBill();
    calculer();
});

let selectArr = Array.from(document.querySelectorAll(".select"));
let frais = 0; 

selectArr.forEach((select) => {
    select.addEventListener("click", function () {
        customInput.value = "";
        select.classList.toggle("active");

        if (!select.classList.contains("active")) {
            frais = 0;
        } else {
            frais = parseFloat(select.value);
        }

        calculer();

        selectArr.forEach((otherSelect) => {
            if (otherSelect !== this) {
                otherSelect.classList.remove("active");
            }
        });
    });
});

customInput.addEventListener("input", customFunc);
function customFunc() {
    let customValue = parseFloat(customInput.value);
    if (!isNaN(customValue)) {
        frais = (customValue / 100);
        selectArr.forEach((input) => input.classList.remove("active"));
    }
    calculer();
}

function calculer() {
    let people = parseInt(numberPeople.value);
    let bill = parseFloat(billValue.value);
    let fraisService = 0;

    if (people > 0 && bill > 0) {
        let perPerson = bill / people;

        if (frais > 0) {
            fraisService = (bill * frais) / people;
            console.log(fraisService)
            valeurPerPerson.innerHTML = fraisService.toFixed(2);
        } else {
            valeurPerPerson.innerHTML = "0.00";
        }

        let totalAmount = perPerson + fraisService;
        valeurTotal.innerHTML = totalAmount.toFixed(2);
    } else {
        valeurPerPerson.innerHTML = "0.00";
        valeurTotal.innerHTML = "0.00";
    }
}

function checkBill() {
    let cantBeZero = document.getElementById("zero");
    let value = numberPeople.value.trim();

    if (value === "0" || value === "") {
        numberPeople.style.border = "2px solid red";
        cantBeZero.style.display = "block";
        cantBeZero.style.color = "red";
    } else {
        cantBeZero.style.display = "none";
        numberPeople.style.border = "none";
    }
}

reset.addEventListener("click", resetFunc);
function resetFunc() {
    billValue.value = "";
    numberPeople.value = "";
    customInput.value = "";
    selectArr.forEach((select) => select.classList.remove("active"));
    frais = 0;
    valeurPerPerson.innerHTML = "0.00";
    valeurTotal.innerHTML = "0.00";
    checkBill();
}
