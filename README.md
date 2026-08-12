# carryad

Media marketing agency site for cafés, restaurants, and local craft businesses.
React + TypeScript + Vite, plain CSS design system (no Tailwind), react-router-dom.

## Routes

- `/` — marketing site: hero, services, package estimator, portfolio, booking form
- `/portal` — client dashboard: content calendar approvals, asset vault, milestones (requires sign-in)
- `/admin` — agency hub: client CRM, content upload queue, campaign templates (requires sign-in)

## Auth

`/portal` and `/admin` are gated by [Clerk](https://clerk.com) (`@clerk/react`) —
see `src/components/ProtectedRoute.tsx`. Signed-out visitors hitting either route
directly are redirected to Clerk's hosted sign-in and returned afterward. The
public site header shows a "Portal login" button (opens Clerk's sign-in modal)
when signed out, or "Go to portal" + a `UserButton` when signed in.

Requires `VITE_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` in `.env.local`
(already populated locally via `clerk env pull`, gitignored via the `*.local`
pattern). This project is linked to the Clerk app `CarryAd`
(`app_3Ho5yrHJvwtHpG8jCFW0Vjqey2q`) — currently a development instance only;
production needs a separate Clerk production instance before going live.

## Development

```bash
npm run dev      # start dev server
npm run build    # type-check and build for production
npm run lint     # eslint
npm run preview  # preview the production build locally
```

Design tokens and component styles live in `src/styles/global.css`, written mobile-first.
