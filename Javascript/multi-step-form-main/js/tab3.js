const ListExperiences = [];

function genereTab3(currentStep, TabFunc, collectData) {
    const tab = document.createElement("div");
    tab.classList.add("tab3");
    tab.innerHTML = `
        <div class="selectedDiplomeCon" style="display:none;">
            <div class="diplomeDiv">
                <h1 class="tabTitle">Expériences</h1>
            </div>
        </div>
        <h1 class="tabTitle">Expérience professionnelle</h1>
        <form>
            <div class="inputField">
                <label for="nombreTotal">Nombre total d'années d'expérience</label>
                <input class="inputElem" id="nombreTotal" type="number" placeholder="saisir le nombre total..." />
            </div>
            <div class="inputField">
                <label for="intitulite">Intitulé du poste le plus récent</label>
                <input class="inputElem" id="intitulite" type="text" placeholder="saisir l'intitulé du poste..." />
            </div>
            <div class="inputField">
                <label for="eta">Nom de l'entreprise</label>
                <input class="inputElem" id="eta" type="text" placeholder="saisir le nom de l'entreprise..." />
            </div>
            <div class="inputField">
                <label for="debut">Début du poste</label>
                <input id="debut" type="month" class="inputElem" />
            </div>
            <div class="inputField">
                <label for="fin">Fin du poste</label>
                <input id="fin" type="month" class="inputElem" />
            </div>
            <div class="inputField">
                <label for="desc">Description des fonctions</label>
                <textarea class="desc" id="desc" class="expDesc" minlength="50" placeholder="Minimum 50 caractères..."></textarea>
            </div>

            <button type="button" class="dipBtn">Soumettre</button>
            <button type="button" class="voirBtn">Voir les Exeperiences</button>
            <button type="button" class="backBtn">Back</button>
            <button type="button" class="nextBtn">Next Step</button>
        </form>
    `;
    document.querySelector(".right").appendChild(tab);

    const form = tab.querySelector("form");
    const voirBtn = tab.querySelector(".voirBtn");
    const soumettreBtn = tab.querySelector(".dipBtn");
    const nextBtn = tab.querySelector(".nextBtn");
    const backBtn = tab.querySelector(".backBtn");

    voirBtn.style.display = "none";

    voirBtn.addEventListener("click", function () {
        tab.firstElementChild.style.display = "flex";
    });

    tab.addEventListener("click", showDiplo);

    soumettreBtn.addEventListener("click", function () {
        let inputs = tab.querySelectorAll(".inputElem");
        const nombreTotal = inputs[0].value.trim();
        const intitulite = inputs[1].value.trim();
        const eta = inputs[2].value.trim();
        const debut = inputs[3].value;
        const fin = inputs[4].value;
        const desc = tab.querySelector(".desc").value.trim();

        const duree  = calculerDureeEnMois(debut,fin)

        if (!nombreTotal || !intitulite || !eta || !debut || !fin || !desc) {
            alert("Veuillez remplir tous les champs.");
            return;
        }
        if (desc.length < 50) {
            alert("La description doit contenir au moins 50 caractères.");
            return;
        }

        voirBtn.style.display = "inline";

        const contentExp = document.createElement("div");
        contentExp.classList.add("diplomeContent");
        contentExp.innerHTML = `
        <div class="del"><i class="fas fa-times"></i></div>
            <div style="display: flex; gap: 20px">
                <p>Nombre d'années:</p>
                <p id="nombreTotal" class="obj">${nombreTotal}</p>
            </div>
            <div style="display: flex; gap: 20px">
                <p>Intitulé du poste:</p>
                <p id="intitulite" class="obj">${intitulite}</p>
                </div>
            <div style="display: flex; gap: 20px">
                <p>Entreprise:</p>
                <p id="eta" class="obj">${eta}</p>
            </div>
            <div style="display: flex; gap: 20px">
                <p>Période:</p>
                <p class="obj">${debut} à ${fin}</p>
                <input id="duree" type="hidden" value="${duree}">
            </div>
            <div style="display: flex; gap: 20px">
            <p>Description:</p>
            <p id="desc" class="objj">${desc}</p>
            </div>
        `;
        tab.firstElementChild.firstElementChild.appendChild(contentExp);
        form.reset();

        tab.querySelectorAll(".del").forEach((btn) => {
            btn.addEventListener("click", function () {
                this.parentElement.style.display = "none";
            });
        });
    });
    backBtn.addEventListener("click", function () {
        currentStep--;
        TabFunc(currentStep);
    });

    nextBtn.addEventListener("click", function () {
        ListExperiences.length = 0
        tab.querySelectorAll(".diplomeContent").forEach((div) => {
            const nombreTotal = div.querySelector("#nombreTotal").textContent.trim();
            const intitulite = div.querySelector("#intitulite").textContent.trim();
            const eta = div.querySelector("#eta").textContent.trim();
            const duree = div.querySelector("#duree").value.trim();
            const desc = div.querySelector("#desc").textContent.trim();

            const obj = {
                nombreTotal: nombreTotal,
                intitulite: intitulite,
                eta: eta,
                duree: duree,
                desc: desc,
            };

            ListExperiences.push(obj);
        });

        collectData(ListExperiences, 3);
        currentStep++;
        TabFunc(currentStep);
    });
}

function calculerDureeEnMois(debut, fin) {
    const [debutAn, debutMois] = debut.split("-").map(Number);
    const [finAn, finMois] = fin.split("-").map(Number);

    let totalMois = (finAn - debutAn) * 12 + (finMois - debutMois) + 1;

    const annees = Math.floor(totalMois / 12);
    const mois = totalMois % 12;

    let resultat = "";
    if (annees > 0) resultat += `${annees} an${annees > 1 ? "s" : ""}`;
    if (mois > 0) {
        if (resultat) resultat += " et ";
        resultat += `${mois} mois`;
    }
    return resultat || "0 mois";
}

function showDiplo(e) {
    if (e.target.classList.contains("selectedDiplomeCon")) {
        e.currentTarget.firstElementChild.style.display = "none";
    }
}

export default genereTab3;
