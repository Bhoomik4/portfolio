# Bhoomika Bansal — Portfolio

An interactive, responsive portfolio in plain HTML, CSS, and JavaScript. The original case studies, education, experience, contact details, portrait, and résumé are retained. DCF figures are academic model outputs; they are not live prices.

## Run locally

From this folder, run:

```sh
python3 -m http.server 8080 --bind 127.0.0.1
```

Open <http://127.0.0.1:8080>. Stop the server with `Ctrl+C`.

The site can also open directly from `index.html` in a regular browser. All fonts and assets are local; no network request is needed for the design.

No dependencies, package installation, build command, API keys, or backend are required.

## Edit

- `index.html`: page layout and project cards.
- `styles.css`: colours, typography, responsive layout, and motion styling.
- `app.js`: case-study text, career chapters, contact details, project filters, valuation scenarios, and navigation.
- `motion.js`: liquid cursor, magnetic movement, reveals, and motion preferences.
- `assets/`: the original portrait and résumé, plus local font files and their licenses.

Keep the case-study IDs and the corresponding `data-case` attributes together when editing. The contact object in `app.js` contains the email, LinkedIn URL, and résumé path.

## Publish later

The complete folder is ready for a static host. Keep `index.html` at the published root and include `assets/` and all scripts and styles. Relative asset paths support GitHub Pages repository sites.

For GitHub Pages, publish the repository root. For a Render Static Site, use no build step and set the publish directory to `.`. This copy has not been deployed or connected to either service.

## Interaction and accessibility

Project cards open native dialogs. Career chapters support arrow keys, Home, and End. Project filters expose their pressed state and announce the visible count. The valuation control switches between the three original DCF scenarios. Motion respects reduced-motion preferences, and the site retains standard keyboard navigation.
