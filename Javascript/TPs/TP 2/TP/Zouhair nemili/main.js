let billValue = document.querySelector(".fill")
let numberPeople = document.querySelector(".numberPeople")
let valeurPerPerson = document.querySelector(".valeur")
let valeurTotal = document.querySelector(".valeur2")
let customInput = document.querySelector(".custom")
let reset = document.getElementById("reset")


billValue.addEventListener("input",function(){
    checkBill(this.value)
    calculer()
})
numberPeople.addEventListener("input",function(){
    checkBill(this.value)
    calculer()
})


let selectArr = Array.from(document.querySelectorAll(".select"))
selectArr.forEach(select => {
    select.addEventListener("click", function(){
        customInput.value = ""
        select.classList.toggle("active")
        if(!select.classList.contains("active")){
            frais = 0
        }
        let frais = select.value
        calculer(frais)
        selectArr.forEach(select => {
            if(select!= this){
                select.classList.remove("active")
            }
        })
    })
})

customInput.addEventListener("input",customFunc)
function customFunc(){
    let customValue = customInput.value
    if (customValue){
        for(input of selectArr){
            if(input.classList.contains("active")){
                input.classList.remove("active")
            }
        }
    }
    
    calculer(customValue / 100)
}

function calculer(frais){
    let people = numberPeople.value
    let bill = billValue.value
    let fraisService = 0
    if(people!= 0){
        let resultat = bill / people
        if(frais){
            fraisService = (bill * frais)/people
            valeurPerPerson.innerHTML = fraisService.toFixed(2)
        }
        let newTotal = resultat + fraisService
        valeurTotal.innerHTML = newTotal.toFixed(2)
    }
}


function checkBill(value){
    let cantBeZero = document.getElementById("zero")
    if (value){
        numberPeople.style.border = "2px solid red";
        cantBeZero.style.display = "block"
        cantBeZero.style.color = "red"
    }
    if(!numberPeople.value == 0){
        cantBeZero.style.display = "none"
        numberPeople.style.border = "0px solid red";
    }
}

reset.addEventListener("click",resetFunc)
function resetFunc(){
    billValue.value = ""
    numberPeople.value = ""
    customInput.value = ""
    selectArr.forEach(select => {
        select.classList.remove("active")
    })
    valeurPerPerson.innerHTML = "0.00"
    valeurTotal.innerHTML = "0.00"
    checkBill("")
}