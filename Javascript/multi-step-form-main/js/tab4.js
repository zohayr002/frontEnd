function genereTab4(currentStep, TabFunc,collectData) {
    const tab = document.createElement("div");
    tab.classList.add("tab4");
    tab.innerHTML = `
        <h1 class="tabTitle">Téléchargement de fichiers</h1>
        <form>
            <div class="inputField">
                <label for="cvUpload" style="margin-bottom: 15px;">Téléchargement du CV (PDF uniquement, 2 Mo max)</label>
                <input type="file" id="cvUpload" accept="application/pdf" />
            </div>
            <div class="inputField">
                <label for="linkedin">URL du profil LinkedIn (facultatif)</label>
                <input class="inputElem" type="url" id="linkedin" placeholder="https://linkedin.com/in/..." />
            </div>
            <div class="inputField">
                <label for="portfolio">URL du portfolio (facultatif)</label>
                <input class="inputElem" type="url" id="portfolio" placeholder="https://..." />
            </div>

            <button type="button" class="backBtn">Back</button>
            <button type="button" class="nextBtn">Next Step</button>
        </form>
    `;
    document.querySelector(".right").appendChild(tab);

    const nextBtn = tab.querySelector(".nextBtn");
    const backBtn = tab.querySelector(".backBtn");

    backBtn.addEventListener("click", function () {
        currentStep--;
        TabFunc(currentStep);
    });


    nextBtn.addEventListener("click", function () {
        const fileInput = tab.querySelector("#cvUpload");
        const file = fileInput.files[0];
        const linkedin = tab.querySelector("#linkedin").value.trim();
        const portfolio = tab.querySelector("#portfolio").value.trim();

        if (!file) {
            alert("Veuillez télécharger votre CV.");
            return;
        }

        const maxSize = 2 * 1024 * 1024;
        if (file.type !== "application/pdf" || file.size > maxSize) {
            alert("Seuls les fichiers PDF de moins de 2 Mo sont acceptés.");
            return;
        }

        if (
            linkedin &&
            !/^https:\/\/(www\.)?linkedin\.com\/.*$/.test(linkedin)
        ) {
            alert("Veuillez entrer une URL LinkedIn valide.");
            return;
        }

        if (portfolio && !/^https?:\/\/.+\..+$/.test(portfolio)) {
            alert("Veuillez entrer une URL de portfolio valide.");
            return;
        }

        currentStep++;
        TabFunc(currentStep);
    });
}

export default genereTab4;
