const navigationItems = [
    { id: 'home', label: 'Accueil', path: 'index.html' },
    { id: 'experiences', label: 'Expériences', path: 'pages/experiences.html' },
    { id: 'courses', label: 'Cours', path: 'pages/cours.html' },
    { id: 'projects', label: 'Projets', path: 'pages/projets.html' },
    { id: 'contact', label: 'Contact', path: 'index.html#contact' }
];

const siteRoot = document.body.dataset.root || '.';

function portfolioPath(path) {
    return `${siteRoot}/${path}`;
}

window.portfolioPath = portfolioPath;

function renderHeader() {
    const header = document.getElementById('site-header');

    if (!header) {
        return;
    }

    const currentPage = document.body.dataset.page;
    const links = navigationItems.map((item) => {
        const isCurrent = item.id === currentPage;
        const currentAttribute = isCurrent ? ' aria-current="page"' : '';
        return `<li><a href="${portfolioPath(item.path)}"${currentAttribute}>${item.label}</a></li>`;
    }).join('');

    header.className = 'site-header';
    header.innerHTML = `
        <nav class="navbar page-container" aria-label="Navigation principale">
            <a class="brand" href="${portfolioPath('index.html')}">
                <img src="${portfolioPath('images/lucy.png')}" alt="">
                <span>Alain Karam</span>
            </a>
            <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="main-navigation">
                Menu
            </button>
            <ul class="nav-links" id="main-navigation">${links}</ul>
        </nav>
    `;

    const toggle = header.querySelector('.nav-toggle');
    const menu = header.querySelector('.nav-links');

    toggle.addEventListener('click', () => {
        const isOpen = menu.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', String(isOpen));
    });

    menu.addEventListener('click', () => {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
    });
}

function renderFooter() {
    const footer = document.getElementById('site-footer');

    if (!footer) {
        return;
    }

    footer.className = 'site-footer';
    footer.innerHTML = `
        <div class="footer-content page-container">
            <p>© ${new Date().getFullYear()} Alain Karam</p>
            <a href="mailto:alain.jm.karam@gmail.com">alain.jm.karam@gmail.com</a>
        </div>
    `;
}

function prepareHeroBackground() {
    const image = document.querySelector('.profile-photo');
    const container = image?.closest('.photo-container');

    if (!image || !container) {
        return;
    }

    const updateBackground = () => {
        const source = image.currentSrc || image.src;
        container.style.setProperty('--hero-image', `url("${source}")`);
        image.classList.toggle('profile-photo-landscape', image.naturalWidth >= image.naturalHeight);
    };

    if (image.complete) {
        updateBackground();
    } else {
        image.addEventListener('load', updateBackground, { once: true });
    }
}

renderHeader();
renderFooter();
prepareHeroBackground();
