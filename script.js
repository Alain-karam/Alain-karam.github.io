const backgroundContainer = document.getElementById("backgroundContainer");
const imageUrl = "images/TheGreatDayofHisWrathBlurred.jpg";

let currentImages = 0;

// Génère une image de fond (normale ou inversée)
function createBackgroundImage(index) {
    const div = document.createElement("div");
    div.classList.add("background-image");
    div.style.backgroundImage = `url(${imageUrl})`;
    div.style.transform = index % 2 === 0 ? "none" : "scaleY(-1)"; // Alterne entre normal et inversé
    div.style.position = "absolute";
    div.style.width = "100%";
    div.style.height = "100vh";
    div.style.top = `${index * 100}vh`; // Positionne chaque image en fonction de son index
    return div;
}

// Vérifie si de nouvelles images doivent être ajoutées
function checkAndGenerateImages() {
    const scrollTop = window.scrollY; // Position actuelle du défilement
    const windowHeight = window.innerHeight; // Hauteur de la fenêtre

    // Ajoute de nouvelles images si on approche de la fin
    while ((currentImages - 1) * windowHeight < scrollTop + 2 * windowHeight) {
        const image = createBackgroundImage(currentImages);
        backgroundContainer.appendChild(image);
        currentImages++;
    }
}

// Détecte le défilement et génère de nouvelles images
window.addEventListener("scroll", () => {
    checkAndGenerateImages();
});

// Initialise les premières images
checkAndGenerateImages();