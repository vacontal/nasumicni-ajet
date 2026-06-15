const apiURL = "https://api.alquran.cloud/v1/ayah/random/bs.korkut";

function prikaziAjet() 
{
    const elementAjet = document.getElementById("ajet");

    const jedinstveniURL = apiURL + "?nocache=" + new Date().getTime();
    
    fetch(jedinstveniURL)
        .then(response => response.json())
        .then(data =>
        {
            const tekstAjeta = data.data.text;

            if (tekstAjeta.length < 45) {
                console.log("Ajet je prekratak, tražim novi...");
                prikaziAjet(); 
                return;        
            }

            const nazivSure = data.data.surah.englishName;
            const brojAjeta = data.data.numberInSurah;

            elementAjet.classList.add("ucitavanje-teksta");

            elementAjet.innerHTML = `
                "${tekstAjeta}" <br>
                <small style="display:block; margin-top:10px; color:#666;">
                    — Sura ${nazivSure}, ajet ${brojAjeta}
                </small>
            `;
            

            setTimeout(() => {
                elementAjet.classList.remove("ucitavanje-teksta");
            }, 100); 
        })
        .catch(error => {
            console.error("Greška sa API: ", error);
            elementAjet.innerText = "Nije moguće učitati novi ajet, probajte ponovo.";
            elementAjet.classList.remove("ucitavanje-teksta");
        });
}

window.onload = prikaziAjet;