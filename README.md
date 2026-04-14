## Website Overview

This website is an interactive Intel timeline that highlights important milestones in Intel history and sustainability.

When users visit the page, they can:
- Scroll through timeline cards from 1968 to 2024
- Hover over each image to read quick historical context
- Jump through the timeline using the navigation dots
- Ask an Intel Museum Guide question and get an AI-powered response

The goal is to make Intel history easier to explore in a visual and beginner-friendly way.

## Quick Tutorial: How To Use The Site

1. Open the webpage in your browser.
2. Explore the timeline cards from left to right.
3. Hover over an image to view the overlay description.
4. Use the navigation dots to jump to the start, middle, or end milestones.
5. Scroll to the "Talk to an Intel Museum Guide" section.
6. Type a question such as: "Why was the Intel 4004 important?"
7. Click "Ask the Guide" and wait for the response to appear.

Tip: If the guide is not responding, confirm your API key is correctly set in [secrets.js](secrets.js).

# Project 2: Intel Sustainability Journey
Build an interactive webpage that presents Intel's sustainability goals in a timeline format. Using AI and your knowledge of responsive design, you'll experiment with hover effects, transitions, and layouts to ensure it adapts seamlessly to both desktop and mobile.

Launch a Codespace to get started! Remember to Commit and Push your project changes to GitHub from Codespaces to prevent losing progress.

## New Feature: Ask Intel History AI

This project now includes a simple OpenAI question area where users can ask about Intel history.

### Setup
1. Open [secrets.js](secrets.js).
2. Replace `PASTE_YOUR_OPENAI_KEY_HERE` with your OpenAI API key.
3. Keep this only for classroom testing. Do not use this method for real production apps.

### Files Added
- [app.js](app.js): Handles the form, API request, and response display.
- [secrets.js](secrets.js): Stores temporary key and model values.

## Skills Used In This Project

- HTML page structure with semantic sections (`header`, `main`, `nav`, `section`, `footer`)
- Building a horizontal timeline with milestone cards
- Creating image overlay hover effects in `.image-container` and `.overlay-text`
- Styling with CSS variables for consistent Intel-themed colors
- Adding responsive behavior for tablet and mobile layouts with media queries
- Creating accessible navigation links with clear `aria-label` names
- Building form-based user input (`textarea` + submit button)
- Connecting to OpenAI with an API key from [secrets.js](secrets.js)
- Sending API requests with `fetch` to retrieve assistant responses
- Parsing API responses and displaying guide output in the page
- Handling loading, validation, and API error states in JavaScript
- Organizing front-end code for readability with comments and named constants
- Protecting local secrets from git tracking using [.gitignore](.gitignore)
