# Waseem Abbas Portfolio

**Live site: https://waseem-abbas-flutter.vercel.app**

Personal portfolio of Waseem Abbas, Flutter developer. Built with Next.js 15 (App Router), TypeScript, Tailwind CSS v4 and Framer Motion.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

## Edit the content (no code changes needed)

| What | File |
|---|---|
| Name, contact, About text, skills, services, experience, education, languages | `src/content/profile.ts` |
| Projects and case studies | `src/content/projects.ts` |
| CV files (download buttons) | `public/cv/Waseem-Abbas-CV.pdf` (premium) and `public/cv/Waseem-Abbas-CV-ATS.pdf` (plain ATS) |
| Photos | `public/images/waseem.webp` (cut-out), `public/images/waseem-square.webp` |
| GreenScan screenshots | `public/images/greenscan/` |

All facts come from the CV `D:\My_CV\CV\Waseem-Abbas-CV-Premium-Upload.pdf`. Nothing is invented.

### Adding screenshots to the other projects

1. Put images in `public/images/<project>/` (e.g. `public/images/pawhug/1.png`).
2. Run `node scripts/optimize-images.mjs` after adding a rule for that folder, or save them as `.webp` yourself.
3. In `src/content/projects.ts`, fill that project's `screens` (in-app screens, shown in phone frames) and/or `images` (gallery), and `links` (Play Store, website).

Until then those projects show a "Screenshots coming soon" placeholder.

## Contact form

The form works in two modes:

- **Default (no setup):** "Send via email app" opens the visitor's email app with the message pre-filled to `waseemdevcompany@gmail.com`.
- **Direct delivery (recommended):** get a free access key at https://web3forms.com (enter your email, they send the key), then add it as an environment variable:

  ```
  NEXT_PUBLIC_WEB3FORMS_KEY=your-access-key
  ```

  Locally: create `.env.local` with that line. On Vercel: Project → Settings → Environment Variables. Messages then arrive in your inbox and the visitor sees "Message sent". This key is designed to be public, so it is safe in frontend code.

## SEO settings

- Set your final domain in `NEXT_PUBLIC_SITE_URL` (e.g. `https://waseem-abbas-flutter.vercel.app` or your own domain). It's used for canonical URLs, the sitemap, robots.txt and Open Graph.
- Title, description and keywords: `src/app/layout.tsx`.
- Social share image: `src/app/opengraph-image.tsx` (generated automatically).
- `sitemap.xml` and `robots.txt` are generated from `src/app/sitemap.ts` and `src/app/robots.ts`.

## Deploy (Vercel, free)

1. Push this folder to a GitHub repository.
2. On https://vercel.com → Add New Project → import the repo → Deploy.
3. Add `NEXT_PUBLIC_SITE_URL` (and optionally `NEXT_PUBLIC_WEB3FORMS_KEY`) in Settings → Environment Variables, then redeploy.

## Notes

- Animations respect the visitor's "reduce motion" setting.
- Images are pre-optimized WebP (`images.unoptimized` in `next.config.ts`), which keeps the site fast on any host.
- Tech logos load from the Simple Icons CDN (jsDelivr).
