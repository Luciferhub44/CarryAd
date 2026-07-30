# carryad

Media marketing agency site for cafés, restaurants, and local craft businesses.
React + TypeScript + Vite, plain CSS design system (no Tailwind), react-router-dom.

## Routes

- `/` — marketing site: hero, services, package estimator, portfolio, booking form
- `/portal` — client dashboard: content calendar approvals, asset vault, milestones
- `/admin` — agency hub: client CRM, content upload queue, campaign templates

## Development

```bash
npm run dev      # start dev server
npm run build    # type-check and build for production
npm run lint     # eslint
npm run preview  # preview the production build locally
```

Design tokens and component styles live in `src/styles/global.css`, written mobile-first.
