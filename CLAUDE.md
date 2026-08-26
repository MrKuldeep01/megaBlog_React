# megaBlog_React

A personal/learning blog app (title in `index.html`/README: "Our Mini Media -
Mr Kumar"). Users sign up, log in, and create/edit/delete rich-text blog posts
with a featured image. Public (active) posts are visible on the home page to
everyone; a logged-in user's own posts show under "All Posts". Built from the
"Chai aur React" (Hitesh Choudhary) course project, then restructured into
feature-based submodules (see below).

Detailed component/data-flow reference: `docs/ARCHITECTURE.md`.

## Tech stack

- React 18 (Vite 5, `@vitejs/plugin-react`) — CRA-free, plain Vite setup
- React Router DOM 6 (`createBrowserRouter`, nested routes off `App`)
- Redux Toolkit 2 + React Redux 9 — single `auth` slice (no other slices)
- React Hook Form 7 — all forms (login, signup, post form)
- TinyMCE via `@tinymce/tinymce-react` — rich text editor for post content
- Appwrite JS SDK 15 — backend-as-a-service: auth, database, file storage
- Tailwind CSS 3 (Inter font via Google Fonts) — neutral/professional palette
  (slate + a single indigo accent), no heavy custom theme
- `html-react-parser` — renders stored HTML content from TinyMCE
- Remix Icon (loaded via CDN `<link>` in `index.html`, not npm) for icons

No TypeScript (plain `.jsx`/`.js`).

## Running the project

```bash
npm install
npm run dev       # vite dev server
npm run build     # vite build -> dist/
npm run preview   # preview a production build
npm run lint      # eslint . --ext js,jsx --max-warnings 0 (clean)
```

Requires a `.env` at the repo root (gitignored) with these Vite-exposed vars
(names only — see `src/config/env.js`):

```
VITE_APPWRITE_URL
VITE_APPWRITE_PROJECT_ID
VITE_APPWRITE_DB_ID
VITE_APPWRITE_COLLECTION_ID
VITE_APPWRITE_BUCKET_ID
VITE_TINYMCE_KEY
```

Do not commit `.env` or print its values; treat them as secrets even though
they are client-side.

## Folder structure (feature-based submodules)

```
src/
  api/appwrite/         Appwrite integration — one file per responsibility (SRP)
    client.js           Shared Client instance (endpoint/project) — built once
    auth.service.js      AuthService — account/session only
    posts.service.js     PostsService — post document CRUD only
    storage.service.js   StorageService — file upload/preview/download/delete only
    index.js             Barrel: { authService, postsService, storageService }

  components/
    common/              Generic UI primitives: Button, Input, Select, Logo, Spinner, Container
    layout/              Header, Footer, Logout (app chrome)
    auth/                LoginForm, SignupForm, AuthGuard (route protection)
    posts/                PostCard, PostForm, RichTextEditor
    index.js              Top-level barrel — re-exports every submodule's own index.js

  hooks/
    useAuthStatus.js      Wraps the (flat) auth selector — components never read state.status/state.userData directly
    useFilePreview.js     Shared "fetch an Appwrite file preview URL" logic (was duplicated 3x)

  pages/                 One route-level component per route, wired in routes/router.jsx
    HomePage.jsx, PostPage.jsx, LoginPage.jsx, SignupPage.jsx,
    AllPostsPage.jsx, AddPostPage.jsx, EditPostPage.jsx, AdminPage.jsx

  routes/
    router.jsx            createBrowserRouter route tree (extracted out of main.jsx)

  store/
    index.js               configureStore setup
    slices/authSlice.js     auth slice: { status, userData }, login/logout actions

  utils/
    slug.js                 createSlug() — pure title -> slug helper

  config/
    env.js                  Central config object reading import.meta.env.VITE_* vars

  App.jsx                  Root layout: Header/Outlet/Footer, bootstraps auth session on mount
  main.jsx                 ReactDOM root + Redux Provider + RouterProvider only
```

Each `components/<submodule>/index.js` is that submodule's public API; the
top-level `components/index.js` just re-exports them (`export * from "./common"`,
etc.), so pages keep importing from `"../components"`.

## Architecture notes

- **Routing**: `src/routes/router.jsx`, `createBrowserRouter`. All routes are
  children of `App` (shared Header/Outlet/Footer). Protected routes are
  wrapped in `<AuthGuard>` (`src/components/auth/AuthGuard.jsx`), which
  redirects based on the `authentication` prop vs. auth status from
  `useAuthStatus()`.
- **State management**: Redux Toolkit, one slice only (`auth`). No slice per
  post/list — pages fetch posts directly via `postsService` in `useEffect`
  and hold them in local `useState`. The store's root reducer *is* the auth
  reducer (state is flat: `state.status` / `state.userData`, not nested under
  `state.auth`) — this quirk is now isolated behind `useAuthStatus()` so
  components don't depend on it directly.
- **Backend**: Appwrite, accessed only through `src/api/appwrite/*.service.js`
  singletons, each with a single responsibility (auth vs. post documents vs.
  file storage) and all sharing one `Client` instance from `client.js`.
- **File uploads/permissions**: `storageService.uploadFile()` grants
  `Permission.read(Role.any())` explicitly. Appwrite's "File Security" leaves
  a file with no explicit permissions unreadable (401/403 on preview/download)
  — this was the cause of "preview not loading" bugs. This only fixes *new*
  uploads; any already-broken files need either a permissions fix in the
  Appwrite console or a re-upload. Displaying images uses `getFileView`
  (`storageService.getFileView`), not `getFilePreview` — the latter routes
  through Appwrite Cloud's image-transformation endpoint, which turned out
  to 403 even with correct bucket permissions since the app never uses
  resize params anyway.
- **Post images are optional**: `PostForm`'s featured-image field has no
  `required` validation; `featuredimage` is sent as `null` on create when
  none is chosen. If the Appwrite collection's `featuredimage` attribute is
  marked "Required" at the schema level, that needs to be relaxed too, or
  creation will fail with a schema validation error instead.
- **Auth bootstrap**: `App.jsx` calls `authService.getCurrentUser()` once on
  mount and dispatches `login`/`logout` accordingly, showing a spinner until
  it resolves. It no longer force-redirects logged-out visitors to `/login`
  — public pages (Home, a post) must stay visible to guests.
- **Forms**: `react-hook-form` throughout. Custom `Input`/`Select` use
  `forwardRef` so RHF's `register` attaches directly.
- **Rich text**: `RichTextEditor.jsx` wraps TinyMCE in an RHF `Controller`;
  content is stored as an HTML string in Appwrite and rendered via
  `html-react-parser` inside a `.post-content` typography block (see
  `src/index.css`).
- **Styling**: Tailwind utility classes, neutral slate palette + indigo
  accent, Inter font. No CSS modules, no design-token layer beyond a small
  `.post-content` block for parsed HTML.

## Conventions / working in this repo

- Add new Appwrite calls to the matching service class in `src/api/appwrite/`
  (auth vs. posts vs. storage) — keep each service single-purpose.
- Read auth state through `useAuthStatus()`, not `useSelector(state => state.status)`
  directly — it's the one place that knows the store's flat shape.
- Shared "fetch a file preview" logic belongs in `useFilePreview()`, not
  copy-pasted per component.
- New shared components go through their submodule's `index.js`
  (`common`/`layout`/`auth`/`posts`); import from `"../components"` in pages.
- Page components live in `src/pages/`, named `*Page.jsx`, and are wired into
  `src/routes/router.jsx` manually — there's no file-based routing.
- Config/env access goes through `src/config/env.js`, not raw
  `import.meta.env.*` in components.
- Errors from Appwrite calls are largely caught and logged with a fallback
  return (`null`/`false`) rather than thrown/surfaced — match this pattern
  unless deliberately improving it.
