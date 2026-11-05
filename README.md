# VulnHub — Fail Database

Site web dark / soigné qui regroupe les fails de sécu (web, API, apps, OS) avec filtre par OS (Windows, macOS, Linux, Kali).

## Stack

- React 18 + Vite
- Tailwind CSS
- Lucide icons
- Data 100% locale (`src/data/vulns.json`)

## Lancer

```bash
cd vuln-hub
npm install
npm run dev
```

Ouvre http://localhost:5173

## Features

- Recherche full-text (nom, description, payloads, outils)
- Filtres : OS / cible (web, api, app, os, cloud) / sévérité / catégorie
- Cartes + modal détail (how, example, tools, mitigation, lab)
- OWASP Top 10 2025 + PrivEsc Windows / Linux / macOS + API + race / JWT / SSTI etc.

## Ajouter une fail

Édite `src/data/vulns.json` — schéma :

```json
{
  "id": "unique-slug",
  "name": "Nom lisible",
  "category": "Injection | Broken Access Control | ...",
  "cwe": "CWE-XX",
  "owasp": "A0X:2025" | null,
  "severity": "critical|high|medium|low",
  "targets": ["web","api","app","os","cloud","ci"],
  "os": ["any"] | ["windows","linux","macos","kali"],
  "description": "...",
  "how": "...",
  "example": "payloads multi-lignes",
  "tools": ["outil1"],
  "mitigation": "...",
  "lab": "DVWA, PortSwigger...",
  "status": "still-works|version-dependent|config-dependent"
}
```

## Build prod

```bash
npm run build
npm run preview
```

Sortie dans `dist/`.
