const projectsContainer = document.getElementById('projects-list');

function appendEmptyState(container, text) {
    const message = document.createElement('p');
    message.className = 'empty-state';
    message.textContent = text;
    container.appendChild(message);
}

function createRepositoryLink(url) {
    const link = document.createElement('a');
    link.className = 'project-link';
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';

    const icon = document.createElement('img');
    icon.src = window.portfolioPath('images/icons/github.png');
    icon.alt = '';
    icon.setAttribute('aria-hidden', 'true');

    const label = document.createElement('span');
    label.textContent = 'Voir le dépôt GitHub';
    link.append(icon, label);
    return link;
}

function createAssignment(assignment) {
    const item = document.createElement('li');
    item.className = 'assignment-card';

    const title = document.createElement('h5');
    title.textContent = assignment.title;
    item.appendChild(title);

    if (assignment.description) {
        const description = document.createElement('p');
        description.textContent = assignment.description;
        item.appendChild(description);
    }

    const actions = document.createElement('div');
    actions.className = 'assignment-actions';

    if (assignment.codeUrl) {
        const codeLink = document.createElement('a');
        codeLink.href = assignment.codeUrl;
        codeLink.target = '_blank';
        codeLink.rel = 'noopener noreferrer';
        codeLink.textContent = 'Code';
        actions.appendChild(codeLink);
    }

    if (assignment.reportUrl) {
        const reportLink = document.createElement('a');
        reportLink.href = assignment.reportUrl;
        reportLink.target = '_blank';
        reportLink.rel = 'noopener noreferrer';
        reportLink.textContent = 'Rapport / README';
        actions.appendChild(reportLink);
    }

    if (actions.childElementCount > 0) {
        item.appendChild(actions);
    }

    if (assignment.technologies.length > 0) {
        const technologies = document.createElement('p');
        technologies.className = 'technologies';
        technologies.textContent = `Technologies : ${assignment.technologies.join(', ')}`;
        item.appendChild(technologies);
    }

    return item;
}

function createProjectCard(project) {
    const article = document.createElement('article');
    article.id = project.id;
    article.className = 'project-card';

    const header = document.createElement('header');
    header.className = 'project-header';

    const titleGroup = document.createElement('div');
    const code = document.createElement('p');
    code.className = 'project-code';
    code.textContent = project.courseCode || 'Projet personnel';

    const title = document.createElement('h3');
    title.textContent = project.title;
    titleGroup.append(code, title);
    header.appendChild(titleGroup);

    if (project.repository) {
        header.appendChild(createRepositoryLink(project.repository));
    }

    article.appendChild(header);

    const descriptionSection = document.createElement('section');
    descriptionSection.className = 'project-section';
    const descriptionHeading = document.createElement('h4');
    descriptionHeading.textContent = 'Description';
    descriptionSection.appendChild(descriptionHeading);

    if (project.description) {
        const description = document.createElement('p');
        description.className = 'project-description';
        description.textContent = project.description;
        descriptionSection.appendChild(description);
    } else {
        appendEmptyState(descriptionSection, 'Description à compléter.');
    }

    const skillsSection = document.createElement('section');
    skillsSection.className = 'project-section';
    const skillsHeading = document.createElement('h4');
    skillsHeading.textContent = 'Compétences et technologies';
    skillsSection.appendChild(skillsHeading);

    if (project.skills.length > 0) {
        const list = document.createElement('ul');
        list.className = 'skills-list';
        project.skills.forEach((skill) => {
            const item = document.createElement('li');
            item.textContent = skill;
            list.appendChild(item);
        });
        skillsSection.appendChild(list);
    } else {
        appendEmptyState(skillsSection, 'Compétences à compléter.');
    }

    const assignmentsSection = document.createElement('section');
    assignmentsSection.className = 'project-section';
    const assignmentsHeading = document.createElement('h4');
    assignmentsHeading.textContent = 'Travaux pratiques';
    assignmentsSection.appendChild(assignmentsHeading);

    if (project.assignments.length > 0) {
        const list = document.createElement('ol');
        list.className = 'assignment-list';
        project.assignments.forEach((assignment) => list.appendChild(createAssignment(assignment)));
        assignmentsSection.appendChild(list);
    } else {
        appendEmptyState(assignmentsSection, 'Travaux pratiques à compléter.');
    }

    article.append(descriptionSection, skillsSection, assignmentsSection);
    return article;
}

async function loadProjects() {
    try {
        const response = await fetch(window.portfolioPath('data/projects.json'));

        if (!response.ok) {
            throw new Error(`Erreur HTTP ${response.status}`);
        }

        const projects = await response.json();
        projects.forEach((project) => projectsContainer.appendChild(createProjectCard(project)));

        const requestedProjectId = decodeURIComponent(window.location.hash.slice(1));
        const requestedProject = document.getElementById(requestedProjectId);

        if (requestedProject) {
            requestedProject.scrollIntoView({ block: 'start' });
        }
    } catch (error) {
        const message = document.createElement('p');
        message.className = 'error-message';
        message.textContent = "Impossible de charger les projets pour le moment.";
        projectsContainer.appendChild(message);
        console.error(error);
    }
}

loadProjects();
