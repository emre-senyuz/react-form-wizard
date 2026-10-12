# React Form Wizard

A complete, responsive client onboarding demo for a fictional creative studio, Forma. Built with Vite, React, strict TypeScript, Tailwind CSS, React Hook Form, Zod, @hookform/resolvers, and lucide-react.

## Setup

Requires Node.js 20.19+ or 22.12+ and npm.

```sh
cd react-form-wizard
npm install
npm run dev
```

Open the local URL printed by Vite.

## Scripts

- `npm run dev`: start development server.
- `npm run build`: check TypeScript and build production assets in `dist/`.
- `npm run preview`: serve the production build locally.
- `npm run typecheck`: run the strict TypeScript check.

## Features

- Three separate step components: personal details, company, and preferences.
- Per-step validation before advancing, inline errors, and focus on the first invalid field.
- Full-schema validation on final submission; TypeScript form types derived from Zod.
- Back navigation preserves values. Review screen includes edit links for each section.
- Success screen summarizes all submitted values; Reset clears the flow and form.
- Accessible labels, native keyboard controls, current/completed step announcements, focus management, and reduced-motion support.
- Responsive layout for 375px phones and larger screens.
- Optional website accepts blank or whitespace-only values; nonblank websites require a complete HTTP(S) URL.
- Phone accepts common formatting and requires 7–15 digits. At least one service, a team size, a budget, and demo acknowledgement are required. Notes are optional, up to 1,000 characters.

## Privacy and scope

**Local demo only. Data is not actually sent or stored on a server.** Form data is held only in React Hook Form / React memory. Reloading, resetting, or closing the page clears it. There are no API calls, database, analytics, localStorage, or backend. Submission only displays an on-page summary. This project intentionally has no tests.

## Project structure

```text
src/
  App.tsx                       # Navigation, review, local submission, reset
  schema.ts                     # Zod schema, derived types, field groups
  main.tsx                      # React entry point
  styles.css                    # Tailwind + responsive visual styles
  components/
    Fields.tsx                  # Shared field labels/errors
    PersonalStep.tsx
    CompanyStep.tsx
    PreferencesStep.tsx
    Summary.tsx                 # Review and success data display
```

## Screenshot

> Screenshot placeholder: add `docs/screenshot.png` showing the desktop onboarding flow. A mobile screenshot at 375px is also recommended.

## Production

Run `npm run build`. Deploy the generated `dist/` directory to any static host. No environment variables are needed. This source project does not include a hosted deployment.
