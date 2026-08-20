const mapContainer = document.getElementById('experience-map');
const educationContainer = document.getElementById('education-list');
const certificationsContainer = document.getElementById('certifications-list');
const jobsContainer = document.getElementById('jobs-list');

function appendTextElement(container, tagName, className, text) {
    if (!text) {
        return;
    }

    const element = document.createElement(tagName);
    element.className = className;
    element.textContent = text;
    container.appendChild(element);
}

function appendTags(container, values) {
    if (!values || values.length === 0) {
        return;
    }

    const list = document.createElement('ul');
    list.className = 'profile-tags';

    values.forEach((value) => {
        const item = document.createElement('li');
        item.textContent = value;
        list.appendChild(item);
    });

    container.appendChild(list);
}

function appendSkillGroups(container, groups) {
    if (!groups || groups.length === 0) {
        return;
    }

    const skillsSection = document.createElement('section');
    skillsSection.className = 'education-skills';

    groups.forEach((group) => {
        const groupContainer = document.createElement('div');
        groupContainer.className = 'education-skill-group';

        const heading = document.createElement('h5');
        heading.textContent = group.label;
        groupContainer.appendChild(heading);
        appendTags(groupContainer, group.items);
        skillsSection.appendChild(groupContainer);
    });

    container.appendChild(skillsSection);
}

function appendIncompleteMessage(container) {
    const message = document.createElement('p');
    message.className = 'profile-card-placeholder';
    message.textContent = 'Informations à compléter.';
    container.appendChild(message);
}

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

function createEducationCard(education) {
    const article = document.createElement('article');
    article.className = 'profile-card';

    appendTextElement(article, 'p', 'profile-card-kicker', education.type);
    appendTextElement(article, 'h4', 'profile-card-title', education.title);
    appendTextElement(article, 'p', 'profile-card-organization', education.institution);
    appendTextElement(article, 'p', 'profile-card-period', education.period);
    appendTextElement(article, 'p', 'profile-card-description', education.description);
    appendTags(article, education.highlights);
    appendSkillGroups(article, education.skillGroups);

    const hasSkillGroups = education.skillGroups && education.skillGroups.length > 0;

    if (!education.period && !education.description && education.highlights.length === 0 && !hasSkillGroups) {
        appendIncompleteMessage(article);
    }

    return article;
}

function createCertificationCard(certification) {
    const article = document.createElement('article');
    article.className = 'profile-card';

    appendTextElement(article, 'p', 'profile-card-kicker', 'Certification');
    appendTextElement(article, 'h4', 'profile-card-title', certification.title);
    appendTextElement(
        article,
        'p',
        'profile-card-organization',
        [certification.issuer, certification.platform].filter(Boolean).join(' · ')
    );
    appendTextElement(article, 'p', 'profile-card-period', certification.period);
    appendTextElement(article, 'p', 'profile-card-description', certification.description);
    appendTags(article, certification.skills);

    if (certification.credentialUrl) {
        const link = document.createElement('a');
        link.className = 'profile-card-link';
        link.href = certification.credentialUrl;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = 'Voir le certificat';
        article.appendChild(link);
    }

    if (!certification.period && !certification.description && certification.skills.length === 0) {
        appendIncompleteMessage(article);
    }

    return article;
}

function createJobCard(job) {
    const article = document.createElement('article');
    article.className = 'profile-card';

    appendTextElement(article, 'p', 'profile-card-kicker', 'Expérience professionnelle');
    appendTextElement(article, 'h3', 'profile-card-title', job.company);
    appendTextElement(article, 'p', 'profile-card-organization', job.role);
    appendTextElement(article, 'p', 'profile-card-period', job.period);
    appendTextElement(article, 'p', 'profile-card-description', job.description);
    appendTags(article, job.skills);

    if (!job.role && !job.period && !job.description && job.skills.length === 0) {
        appendIncompleteMessage(article);
    }

    return article;
}

function renderCards(container, items, createCard) {
    const fragment = document.createDocumentFragment();
    items.forEach((item) => fragment.appendChild(createCard(item)));
    container.appendChild(fragment);
}

async function loadExperiences() {
    try {
        const response = await fetch(window.portfolioPath('data/experiences.json'));

        if (!response.ok) {
            throw new Error(`Erreur HTTP ${response.status}`);
        }

        const experiences = await response.json();
        const markerFragment = document.createDocumentFragment();

        experiences.map.forEach((experience) => markerFragment.appendChild(createMarker(experience)));
        mapContainer.appendChild(markerFragment);

        renderCards(educationContainer, experiences.education, createEducationCard);
        renderCards(certificationsContainer, experiences.certifications, createCertificationCard);
        renderCards(jobsContainer, experiences.jobs, createJobCard);

        const requestedSectionId = decodeURIComponent(window.location.hash.slice(1));
        const requestedSection = document.getElementById(requestedSectionId);

        if (requestedSection) {
            requestedSection.scrollIntoView({ behavior: 'instant', block: 'start' });
        }
    } catch (error) {
        const message = document.createElement('p');
        message.className = 'error-message';
        message.textContent = "Impossible de charger les expériences pour le moment.";
        mapContainer.insertAdjacentElement('afterend', message);
        console.error(error);
    }
}

loadExperiences();
