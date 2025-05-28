const ListDiplomes = [];
function genereTab2(currentStep, TabFunc, collectData) {
    const tab = document.createElement("div");
    tab.classList.add("tab2");
    tab.innerHTML = `
        <div class="selectedDiplomeCon" style="display:none;">
            <div class="diplomeDiv">
                <h1 class="tabTitle">Diplômes</h1>
            </div>
        </div>
        <h1 class="tabTitle">Formation</h1>
        <!-- <h4 class="tabSmall">Please provide your name,email address,and phone number.</h4> -->
        <form>
            <div class="inputField">
                <label for="diplome">Diplômes</label>
                <select class="diplome" name="diplome" id="diplome">
                    <option value="">--selectionnez--</option>
                    <option value="Lycee">Lycée</option>
                    <option value="Licence">Licence</option>
                    <option value="Master">Master</option>
                    <option value="Doctorat">Doctorat</option>
                </select>
            </div>
            <div class="inputField">
                <label for="domain">Domaine d'études</label>
                <input
                    class="inputElem"
                    id="domain"
                    type="text"
                    placeholder="saiser le nom de domain..."
                />
            </div>
            <div class="inputField">
                <label for="eta">Nom de l'établissement</label>
                <input
                    class="inputElem"
                    id="eta"
                    type="text"
                    placeholder="saiser le Nom de l'établissement..."
                />
            </div>
            <div class="inputField">
                <label for="anne"
                    >Année d'obtention du diplôme</label
                >
                <input
                    class="inputElem"
                    id="anne"
                    type="number"
                    placeholder="saiser l'Année d'obtention..."
                />
            </div>

            <button type="button" class="dipBtn">Soumettre</button>
            <button type="button" class="voirBtn">Voir les Diplomes</button>
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
        // console.log(inputs);

        let diplome = tab.querySelector(".diplome").value.trim();
        let domain = inputs[0].value.trim();
        let eta = inputs[1].value.trim();
        let anne = inputs[2].value.trim();

        const date = new Date();
        const thisYear = date.getFullYear();

        if (!diplome || !domain || !eta || !anne) {
            alert("Veuillez remplir tous les champs.");
            return;
        }
        if (parseInt(anne) > thisYear) {
            alert("L'année d'obtention ne peut pas être dans le futur.");
            return;
        }

        voirBtn.style.display = "inline";

        const contentDip = document.createElement("div");
        contentDip.classList.add("diplomeContent");
        contentDip.innerHTML = `
            <div class="del">
                <i class="fas fa-times"></i>
            </div>
            <div style="display: flex; gap: 20px">
            <p>Niveaux:</p>
            <p id="diplome" class="obj">${diplome}</p>
            </div>
            <div style="display: flex; gap: 20px">
            <p>Domaine d'études:</p>
                <p id="domain" class="obj">${domain}</p>
            </div>
            <div style="display: flex; gap: 20px">
                <p>Nom de l'établissement:</p>
                <p id="eta" class="obj">${eta}</p>
            </div>
            <div style="display: flex; gap: 20px">
                <p>Année d'obtention du diplôme:</p>
                <p id="anne" class="obj">${anne}</p>
            </div>
                `;
        tab.firstElementChild.firstElementChild.appendChild(contentDip);
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
        ListDiplomes.length = 0;

        tab.querySelectorAll(".diplomeContent").forEach((div) => {
            const diplome = div.querySelector("#diplome").textContent.trim();
            const domain = div.querySelector("#domain").textContent.trim();
            const eta = div.querySelector("#eta").textContent.trim();
            const anne = div.querySelector("#anne").textContent.trim();
            const obj = {
                diplome: diplome,
                domain: domain,
                eta: eta,
                anne: anne,
            };
            ListDiplomes.push(obj);
        });
        collectData(ListDiplomes, 2);

        currentStep++;
        TabFunc(currentStep);
    });
}
function showDiplo(e) {
    if (e.target.classList.contains("selectedDiplomeCon")) {
        this.firstElementChild.style.display = "none";
    }
}

export default genereTab2;
