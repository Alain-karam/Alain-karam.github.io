# Portfolio d'Alain Karam

Portfolio statique publié avec GitHub Pages. Le site utilise uniquement HTML, CSS et JavaScript.

## Organisation

- `index.html` : page d'accueil et contact
- `pages/experiences.html` : carte du parcours
- `pages/cours.html` : cheminement universitaire
- `pages/projets.html` : fiches des projets
- `data/` : contenu modifiable sans toucher au HTML
- `css/` : styles généraux et styles propres à chaque page
- `js/` : navigation et génération du contenu à partir des fichiers JSON
- `images/` : photos, icônes et arrière-plans

`index.html` reste à la racine pour GitHub Pages. Toute nouvelle page doit être ajoutée dans `pages/` avec `data-root=".."` sur la balise `<body>`.

## Ajouter ou modifier un cours

Modifier `data/courses.json`. Un cours possède cette forme :

```json
{ "code": "INF0000", "hasProject": false }
```

Mettre `hasProject` à `true` seulement lorsqu'une fiche ayant le même code existe dans `data/projects.json`.

## Ajouter ou modifier une fiche de projet

Modifier `data/projects.json` et reprendre ce modèle :

```json
{
    "id": "INF0000",
    "courseCode": "INF0000",
    "title": "Titre du cours ou du projet",
    "repository": "https://github.com/...",
    "description": "",
    "skills": [],
    "assignments": []
}
```

Un travail pratique dans `assignments` possède cette forme :

```json
{
    "title": "TP1 — Titre",
    "description": "",
    "codeUrl": "https://github.com/...",
    "reportUrl": "",
    "technologies": []
}
```

Les champs encore inconnus peuvent rester vides. Ne pas ajouter de virgule après le dernier élément d'une liste JSON.

## Modifier la carte des expériences

Modifier `data/experiences.json` :

- `map` contient les repères de la carte; `top`, `left` et `width` sont des pourcentages relatifs à la carte;
- `education` contient les diplômes; le champ `skillGroups` permet de regrouper les compétences par catégorie sans les associer à un cours précis;
- `certifications` contient les certificats et leurs liens;
- `jobs` contient les emplois, les rôles et les compétences acquises.

Les dates, descriptions, compétences et liens inconnus peuvent rester vides jusqu'à ce qu'ils soient complétés.

## Tester le site localement

Les navigateurs bloquent parfois la lecture des fichiers JSON lorsqu'un fichier HTML est ouvert directement. Utiliser l'extension **Live Server** de Visual Studio Code ou démarrer un petit serveur depuis le dossier du projet :

```powershell
npx --yes serve .
```

Ouvrir ensuite l'adresse locale affichée dans le terminal.
