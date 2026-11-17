# Blessed Hill High School website

A static, multi-page React website prepared for Netlify deployment. It uses React 18 via CDN and needs no build step.

## Pages

- `index.html` — Home
- `about.html` — About the school
- `skills-training.html` — Skills training
- `why-us.html` — Why Blessed Hill
- `vision-mission.html` — Vision and mission
- `location.html` — Location and directions
- `contact.html` — Contact form

## Deploy to Netlify

Deploy this folder as the site root. The included `netlify.toml` publishes the current directory. The contact form is configured as a Netlify Form named `school-enquiry`; after deployment, check the Netlify Forms dashboard to confirm form detection.

The original supplied HTML did not include a phone number, email address or verified campus map coordinates. The site preserves the supplied location and school details without inventing those facts. The embedded map points to the Kitasa/Wakiso area and the directions button opens a Google Maps search for the school.

Selected school photographs are stored in `images/`. Google Fonts load from the web; a network connection is required for the custom typography.
