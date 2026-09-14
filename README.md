# Voyager - Bespoke Travel Planning & Custom Itineraries

A modern, responsive web application for exploring destinations, curating luxury itineraries, booking bespoke tours (including Dubai winter seasonal experiences), and organizing travel packages.

## Zero-NPM Direct Deployment (GitHub Pages & Custom Domains)

This project is configured to run directly on **GitHub Pages**, **cPanel**, or any custom domain (e.g. `orionfx.net/assets/saas-tools/voyager/`) **without needing Node.js or running `npm`**:

- **`index.html`**: Root entry point pre-linked to the compiled assets.
- **`assets/voyager.js`**: Self-contained browser-executable application bundle.
- **`assets/voyager.css`**: Compiled stylesheet with all typography and design tokens.
- **`404.html`**: Single-page app fallback for clean page refreshes.
- **`docs/`**: Pre-configured directory for repositories using GitHub Pages with `/docs` source folder.

### Deploying to GitHub Pages

1. Push this repository to GitHub.
2. Go to **Settings** → **Pages** in your repository.
3. Under **Build and deployment** → **Branch**:
   - Select your branch (e.g. `main` or `master`).
   - Select either **`/ (root)`** OR **`/docs`** (both are fully supported).
   - Click **Save**.
4. The site will be live immediately without any white-page errors!

### Deploying to Any Custom Domain (orionfx.net)

Simply upload the files to your server directory:
```text
your-folder/
├── index.html
├── 404.html
└── assets/
    ├── voyager.js
    └── voyager.css
```
Open `index.html` in your browser or navigate to your URL—the application runs instantly with zero terminal commands.

## Features

- **Global Destinations & Tours**: Curated horizons across continents, with seasonal highlights such as Dubai winter tours, desert safaris, yacht charters, and mountain excursions.
- **Custom Travel Packages**: Comprehensive day-by-day itineraries, transparent inclusions, and guest booking workflows.
- **Interactive Planner**: Dynamic map-based stop planner, budget tracking, and real-time scheduling.
- **Bilingual & Multi-currency**: Live currency switching (USD, EUR, GBP, JPY, AED) and localized descriptions.
- **Floating Actions**: Paired floating **Back to Top** and live 24/7 **Online Support** concierge widget.
