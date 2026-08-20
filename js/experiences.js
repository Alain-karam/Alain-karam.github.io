const mapContainer = document.getElementById('experience-map');

function createMarker(experience) {
    const marker = document.createElement('button');
    marker.className = 'country-marker';
    marker.type = 'button';
    marker.style.top = `${experience.position.top}%`;
    marker.style.left = `${experience.position.left}%`;
    marker.style.setProperty('--marker-width', `${experience.position.width}%`);
    marker.setAttribute('aria-label', `${experience.country}, ${experience.years.join(', ')}`);

    const icon = document.createElement('img');
    icon.src = window.portfolioPath(experience.icon);
    icon.alt = '';

    const tooltip = document.createElement('span');
    tooltip.className = 'experience-tooltip';

    const country = document.createElement('strong');
    country.textContent = experience.country;
    tooltip.appendChild(country);

    experience.years.forEach((yearRange) => {
        const years = document.createElement('span');
        years.textContent = yearRange;
        tooltip.appendChild(years);
    });

    experience.details.forEach((detail) => {
        const detailLine = document.createElement('span');
        detailLine.textContent = detail;
        tooltip.appendChild(detailLine);
    });

    marker.append(icon, tooltip);
    return marker;
}

async function loadExperiences() {
    try {
        const response = await fetch(window.portfolioPath('data/experiences.json'));

        if (!response.ok) {
            throw new Error(`Erreur HTTP ${response.status}`);
        }

        const experiences = await response.json();
        const fragment = document.createDocumentFragment();

        experiences.forEach((experience) => fragment.appendChild(createMarker(experience)));
        mapContainer.appendChild(fragment);
    } catch (error) {
        const message = document.createElement('p');
        message.className = 'error-message';
        message.textContent = "Impossible de charger les expériences pour le moment.";
        mapContainer.insertAdjacentElement('afterend', message);
        console.error(error);
    }
}

loadExperiences();
