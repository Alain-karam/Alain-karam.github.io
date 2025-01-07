const backgroundContainer = document.getElementById("backgroundContainer");
const imageUrl = "images/TheGreatDayofHisWrathBlurred.jpg";

let currentImages = 0;

function createBackgroundImage(index) {
    const div = document.createElement("div");
    div.classList.add("background-image");
    div.style.backgroundImage = `url(${imageUrl})`;
    div.style.transform = index % 2 === 0 ? "none" : "scaleY(-1)";
    div.style.position = "absolute";
    div.style.width = "100%";
    div.style.height = "100vh";
    div.style.top = `${index * 100}vh`;
    return div;
}

function checkAndGenerateImages() {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;

    while ((currentImages - 1) * windowHeight < scrollTop + 2 * windowHeight) {
        const image = createBackgroundImage(currentImages);
        backgroundContainer.appendChild(image);
        currentImages++;
    }
}

window.addEventListener("scroll", () => {
    checkAndGenerateImages();
});

checkAndGenerateImages();

const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    const opacity = Math.max(1 - scrollY / 400, 0.1);
    navbar.style.opacity = opacity;
});
