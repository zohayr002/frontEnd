function genereTab1(currentStep, TabFunc, collectData) {
    const tab = document.createElement("div");
    tab.classList.add("tab1");
    tab.innerHTML = `
    <h1 class="tabTitle">Informations Personlles</h1>
    <!-- <h4 class="tabSmall">Please provide your name,email address,and phone number.</h4> -->
    <form method = "post">
        <div class="inputField">
        <label for="name">Nome</label>
        <input class="inputElem" id="name" type="text" placeholder="Enter your name...">
        </div>
        <div class="inputField">
        <label for="email">Email Address</label>
        <input class="inputElem" id="email" type="email" placeholder="e.g hmed@gmail.com">
        </div>
        <div class="inputField">
        <label for="phone">Numéro de téléphone</label>
        <input class="inputElem" id="phone" type="tel" minlength="10" maxlength=15 placeholder="e.g +1 234 567 890">
        </div>
        <div class="inputField">
        <label for="date">Date de naissance</label>
        <input class="inputElem" id="date" type="date">
        </div>
        <div class="inputField">
        <label>Sexe:</label>
        <!-- <input class="inputElem" id="sexe" type="text" placeholder="e.g +1 234 567 890"> -->
        <div class="radioCon" style="display: flex;">
            <div class="radionField">
            <label for="homme">Homme</label>
            <input id="homme" name="option" type="radio" value="homme">
            </div>
            <div class="radionField">
            <label for="femme">Femme</label>
            <input id="femme" name="option" type="radio" value="homme">
            </div>
        </div>
        </div>
        <button type="button" class="nextBtn">Next Step</button>
    </form>
    `;
    document.querySelector(".right").appendChild(tab);

    const nextBtn = tab.querySelector(".nextBtn");

    nextBtn.addEventListener("click", function () {
        const name = tab.querySelector("#name").value.trim();
        const email = tab.querySelector("#email").value.trim();
        const phone = tab.querySelector("#phone").value.trim();
        const date = tab.querySelector("#date").value;
        const sexe =
            tab.querySelector("input[name='option']:checked")?.value || "";

        // console.log(name);
        // console.log(email);
        // console.log(phone);
        // console.log(date);
        // console.log(sexe);

        // if (!name || !email || !phone || !date || !sexe) {
        //     alert("Veuillez remplir tous les champs.");
        //     return;
        // }

        const obj = {
            name: name,
            email: email,
            phone: phone,
            date: date,
            sexe: sexe,
        };
        // console.log(obj);

        collectData(obj, 1);
        currentStep++;
        TabFunc(currentStep);
    });
}

export default genereTab1;
