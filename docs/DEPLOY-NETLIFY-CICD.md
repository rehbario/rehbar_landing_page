# CI/CD: auto-deploy to Netlify on push to `main`

This sets up **GitHub Actions** to build the Next.js app and deploy it to
**Netlify** every time you push to `main`. The Netlify Next.js runtime turns
`/api/waitlist` into a serverless function and serves the pages from the CDN.

## How it works
```
push to main  →  GitHub Actions  →  npm ci  →  netlify deploy --build --prod  →  live site
```
- **GitHub** holds two secrets used only to *deploy*: `NETLIFY_AUTH_TOKEN`, `NETLIFY_SITE_ID`.
- **Netlify** holds the *runtime* secrets the deployed function reads: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`.
- The build itself does **not** need the Supabase keys (pages are static; the
  route reads env at request time), so the Action won't fail without them.

---

## What you need (and how to get it)

| # | Thing | Where it lives | How to get it |
|---|-------|----------------|---------------|
| 1 | A Netlify **site** + its **Site ID** | — | Step 1 below |
| 2 | **`NETLIFY_AUTH_TOKEN`** | GitHub secret | Step 2 |
| 3 | **`NETLIFY_SITE_ID`** | GitHub secret | Step 1 |
| 4 | **`SUPABASE_URL`** + **`SUPABASE_SERVICE_ROLE_KEY`** | Netlify env vars | Step 4 |
| 5 | Your code on the **`main`** branch | GitHub | Step 6 |

> You don't share any of these with anyone — you paste them into GitHub and
> Netlify settings yourself.

---

## Step 1 — Create the Netlify site & get the Site ID

Create the site **without** connecting it to auto-build from Git (GitHub Actions
will be the only thing that deploys — see [Avoiding double deploys](#avoiding-double-deploys)).

**Option A — Netlify CLI (fastest):**
```bash
npm i -g netlify-cli
netlify login
netlify sites:create --name rehbar-landing   # pick any unique name
```
It prints the **Site ID** (a UUID). Copy it.

**Option B — Netlify UI:**
1. [app.netlify.com](https://app.netlify.com) → **Add new site → Deploy manually**
   (drag the `.next` build folder, or just create an empty placeholder site).
2. **Site configuration → General → Site details** → copy **Site ID** (API ID).

## Step 2 — Create a Netlify auth token
Netlify → **User settings → Applications → Personal access tokens → New access
token**. Name it `github-actions`, create, and **copy it now** (shown once).

## Step 3 — Add the two GitHub secrets
GitHub repo → **Settings → Secrets and variables → Actions → New repository secret**:

| Name | Value |
|------|-------|
| `NETLIFY_AUTH_TOKEN` | the token from Step 2 |
| `NETLIFY_SITE_ID` | the Site ID from Step 1 |

## Step 4 — Set the Supabase env vars in Netlify
Netlify → your site → **Site configuration → Environment variables → Add a variable**:

| Key | Value | Scope |
|-----|-------|-------|
| `SUPABASE_URL` | `https://YOUR-PROJECT.supabase.co` | Production |
| `SUPABASE_SERVICE_ROLE_KEY` | your `sb_secret_…` key | Production |

These feed the deployed function at runtime. They are **not** `NEXT_PUBLIC_`, so
they never reach the browser.

> ⚠️ Do **not** add `NODE_ENV=production` here — it makes `npm install` skip
> devDependencies, and the build needs `typescript`, `@tailwindcss/postcss`, and
> `babel-plugin-react-compiler`.

## Step 5 — Add the workflow file
Create **`.github/workflows/deploy.yml`** with:

```yaml
name: Deploy to Netlify

on:
  push:
    branches: [main]
  workflow_dispatch:        # lets you trigger a deploy manually from the Actions tab

permissions:
  contents: read

concurrency:                # never run two prod deploys at once
  group: netlify-deploy
  cancel-in-progress: true

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Build & deploy to Netlify (production)
        run: npx --yes netlify-cli deploy --build --prod --message "GitHub Actions ${{ github.sha }}"
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

`netlify deploy --build` runs the build command + the `@netlify/plugin-nextjs`
runtime (from your `netlify.toml`), then `--prod` publishes it to the live URL.

## Step 6 — Get your code onto `main` and push
You're currently on `experiment_landing`. The workflow only fires on `main`, so
merge into `main` (or change the trigger branch):

```bash
git checkout main
git merge experiment_landing
git push origin main
```
Watch it run under the repo's **Actions** tab. When it's green, submit the
waitlist form on the live site and confirm a row appears in Supabase.

---

## Avoiding double deploys
If you ALSO connect this repo to Netlify's own continuous deployment, you'll get
two deploys per push. Pick one:
- **Recommended:** keep the site **not linked** to the repo in Netlify (Step 1
  Option A/B create it unlinked) — GitHub Actions is the sole deployer.
- Or, if you linked it: Netlify → **Site configuration → Build & deploy →
  Continuous deployment → Build settings → Stop builds**.

## After the first deploy
Set the real URL in [`src/lib/site.ts`](../src/lib/site.ts) (`site.url` is still
the `https://rehbar.io` placeholder) so the canonical tag, OG tags, sitemap, and
robots point at your live domain. Commit + push to redeploy.

## Where to look when something breaks
- **Build/deploy failures:** GitHub repo → **Actions** → the failed run's logs.
- **Runtime errors (form won't save):** Netlify → your site → **Logs →
  Functions** → look for the `[waitlist] …` line.

## Optional: preview deploys for pull requests
Add a second job that deploys a draft (no `--prod`) on PRs so you can review
changes on a temporary URL before merging:

```yaml
  preview:
    if: github.event_name == 'pull_request'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: "20", cache: "npm" }
      - run: npm ci
      - run: npx --yes netlify-cli deploy --build --message "PR ${{ github.event.number }}"
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```
(Add `pull_request:` to the `on:` triggers if you use this.)
