const coursesContainer = document.getElementById('courses-list');

function groupByYear(sessions) {
    return sessions.reduce((groups, session) => {
        const year = String(session.year);
        groups[year] ??= [];
        groups[year].push(session);
        return groups;
    }, {});
}

function createCourseChip(course) {
    const element = document.createElement(course.hasProject ? 'a' : 'span');
    element.className = 'course-chip';
    element.textContent = course.code;

    if (course.hasProject) {
        element.href = window.portfolioPath(`pages/projets.html#${course.code}`);
        element.title = `Voir les projets du cours ${course.code}`;

        const indicator = document.createElement('span');
        indicator.className = 'course-chip-project';
        indicator.textContent = '●';
        indicator.setAttribute('aria-hidden', 'true');
        element.appendChild(indicator);
    }

    return element;
}

function createYearGroup(year, sessions) {
    const article = document.createElement('article');
    article.className = 'year-group';

    const heading = document.createElement('h2');
    heading.className = 'year-title';
    heading.textContent = year;

    const termList = document.createElement('div');
    termList.className = 'term-list';

    sessions.forEach((session) => {
        const row = document.createElement('section');
        row.className = 'term-row';

        const termHeading = document.createElement('h3');
        termHeading.className = 'term-title';
        termHeading.textContent = session.term;

        const chips = document.createElement('div');
        chips.className = 'course-chips';
        session.courses.forEach((course) => chips.appendChild(createCourseChip(course)));

        row.append(termHeading, chips);
        termList.appendChild(row);
    });

    article.append(heading, termList);
    return article;
}

async function loadCourses() {
    try {
        const response = await fetch(window.portfolioPath('data/courses.json'));

        if (!response.ok) {
            throw new Error(`Erreur HTTP ${response.status}`);
        }

        const sessions = await response.json();
        const groupedSessions = groupByYear(sessions);
        const legend = document.createElement('p');
        legend.className = 'courses-legend';
        legend.innerHTML = '<span class="legend-swatch" aria-hidden="true"></span>Un point indique qu’une fiche de projet est disponible.';
        coursesContainer.before(legend);

        Object.entries(groupedSessions).forEach(([year, yearSessions]) => {
            coursesContainer.appendChild(createYearGroup(year, yearSessions));
        });
    } catch (error) {
        const message = document.createElement('p');
        message.className = 'error-message';
        message.textContent = "Impossible de charger les cours pour le moment.";
        coursesContainer.appendChild(message);
        console.error(error);
    }
}

loadCourses();
