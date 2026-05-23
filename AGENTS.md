# AGENTS.md - Roman Diachenko's Personal Website

## Project Overview

This is a simple static website - a personal resume/portfolio. It consists of:

- `index.html` - Main HTML document
- `index.css` - Stylesheet
- `images/` - Favicon assets

No JavaScript framework, no build system, no tests.

---

## Commands

### Development

There is no development server or build process. The site can be viewed by opening `index.html` directly in a browser, or served locally:

```bash
# Serve with Python
python3 -m http.server 8000

# Or with Node.js (if installed)
npx serve .
```

### Testing

No tests exist for this project.

### Linting

No linting is configured.

### Deployment

The site is hosted at https://www.diachenko.pp.ua via a static hosting provider. Upload the following files:

- `index.html`
- `index.css`
- `images/` directory (entire contents)

---

## Code Style Guidelines

### General Principles

- Keep it simple - this is a static resume site
- Prioritize accessibility and readability
- Use semantic HTML

### HTML

- Use HTML5 doctype: `<!doctype html>`
- Include lang attribute: `<html lang="en">`
- Include meta viewport for responsiveness
- Include Open Graph meta tags for social sharing
- Use semantic elements: `<header>`, `<section>`, `<article>`, `<h1>`-`<h4>`
- Use accessible link patterns with `rel="noopener"` for external `_blank` links
- Self-closing tags: use `<link ... />`, `<meta ... />`, `<br />`, etc.

### CSS

- Use CSS custom properties (variables) via `:root`
- Support CSS features with `@supports` fallbacks for older browsers
- Use responsive design with `@media` queries (breakpoint: 720px)
- Use print styles (`@media print`) to hide shadows when printing
- Follow BEM-lite naming: `.block`, `.block-element`, `.block--modifier`
- Prefix custom properties with `rd-` (e.g., `--rd-primary-color`)
- Use `box-sizing: border-box` globally
- Use `hyphens: auto` for long text content
- Include focus states for accessibility: `a:focus { outline: ... }`

### Accessibility

- Always include focus outlines for keyboard navigation
- Use proper heading hierarchy (h1 → h2 → h3)
- Include meta descriptions
- Use descriptive link text (not "click here")

### Formatting

- Follow `.editorconfig`: 2-space indentation, LF line endings, UTF-8
- Use double quotes for attributes in HTML
- Use double quotes for strings in CSS
- Use trailing commas in multi-line CSS properties
- Add blank lines between unrelated rulesets
- Keep lines under 100 characters when practical

### Performance

- Use `rel="preconnect"` for external font resources
- Include appropriate favicon sizes (16x16, 32x32, 180x180)
- Use system fonts or Google Fonts with display swap

### Naming Conventions

- Classes: lowercase with hyphens (e.g., `.contact-list`, `.skills-list`)
- Custom properties: lowercase with hyphens, prefixed (e.g., `--rd-gap`)
- IDs: avoid unless necessary (use classes instead)

### Error Handling

N/A - static HTML/CSS only

### Git

- Commit messages: imperative mood ("Add" not "Added")
- Keep commits focused and atomic

---

## File Structure

```
/
├── index.html      # Main HTML document
├── index.css       # Stylesheet
├── images/         # Static assets
│   └── favicons/   # Favicon files
├── .editorconfig   # Editor configuration
└── .gitignore     # Git ignore rules
```

---

## Notes for Agents

- Do NOT add JavaScript unless explicitly requested
- Do NOT add a build system (Vite, Webpack, etc.) unless explicitly requested
- Do NOT add testing frameworks unless explicitly requested
- Avoid CSS frameworks (Tailwind, Bootstrap) - custom CSS is preferred
- Keep changes minimal and focused on the specific task
- Verify changes work in modern browsers (Chrome, Firefox, Safari, Edge)
