import genereTab1 from "./tab1.js";
import genereTab2 from "./tab2.js";
import genereTab3 from "./tab3.js";
import genereTab4 from "./tab4.js";

let currentStep = 0;

const obj = {
    name: "",
    email: "",
    phone: "",
    date: "",
    sexe: "",
    diplomes: [],
    experiences: [],
    pdfFile: "",
    urlLinkedin: "",
    urlPortofolio: "",
};

function TabFunc(step) {
    currentStep = step;
    document.querySelector(".right").innerHTML = "";
    if (currentStep === 0) {
        genereTab1(currentStep, TabFunc, collectData);
    } else if (currentStep === 1) {
        genereTab2(currentStep, TabFunc, collectData);
    } else if (currentStep === 2) {
        genereTab3(currentStep, TabFunc, collectData);
    } else if (currentStep === 3) {
        genereTab4(currentStep, TabFunc, collectData);
    }
}

function collectData(data, tabRecieved) {
    if (tabRecieved == 1) {
        obj.name = data.name;
        obj.email = data.email;
        obj.phone = data.phone;
        obj.date = data.date;
        obj.sexe = data.sexe;
    } else if (tabRecieved == 2) {
        obj.diplomes = data;
    } else if (tabRecieved == 3) {
        obj.experiences = data;
    }
    console.log(obj);
}
TabFunc(currentStep);
