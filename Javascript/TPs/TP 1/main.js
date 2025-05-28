let questions = document.querySelectorAll(".questions");
let opers = document.querySelectorAll(".oper");
let iconsPlus = document.querySelectorAll(".icon-plus");
let iconsMinus = document.querySelectorAll(".icon-minus");
function show(index){
    questions[index].classList.toggle("active")
    questions[index].classList.contains("active")? iconsPlus[index].style.display = "none" : iconsPlus[index].style.display = "block";
    questions[index].classList.contains("active")? iconsMinus[index].style.display = "block" : iconsMinus[index].style.display = "none";

}

