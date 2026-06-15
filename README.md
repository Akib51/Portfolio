# Akib Md Shehabuddin Portfolio

Premium static portfolio for GitHub Pages, built with HTML, CSS, and JavaScript.

## Features

- Strong first viewport with portrait, resume download, social links, and availability.
- Project, skills, education, experience, and contact sections based on the provided resume.
- Contact form that submits from the page using a static-site email endpoint.
- Copy-email control for recruiters who prefer manual contact.
- Light/dark theme toggle, reveal animations, responsive layout, and SEO/social metadata.

## Run Locally

Open `index.html` directly in a browser, or serve the folder with any static server.

```bash
python -m http.server 5500
```

Then visit `http://localhost:5500`.

## Direct Email Sending

The form uses FormSubmit's AJAX endpoint:

```js
const EMAIL_ENDPOINT = `https://formsubmit.co/ajax/${OWNER_EMAIL}`;
```

On first deployment, FormSubmit may send a one-time activation email to Akib's address. After activation, messages submit directly from the portfolio page without opening the visitor's email app.
