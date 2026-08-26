# Architecture reference

Detailed companion to the root `CLAUDE.md`. Every claim below is traced to
specific files in this repo as of the current commit (post feature-module
restructure).

## 1. Routing table

Defined in `src/routes/router.jsx` via `createBrowserRouter`. All routes nest
under `App` (`src/App.jsx`), which renders `<Header />`, `<Outlet />` (inside
a `<main>`), `<Footer />`.

| Path | Element | Guarded by `AuthGuard`? |
|---|---|---|
| `/` | `pages/HomePage.jsx` | no |
| `/login` | `pages/LoginPage.jsx` → `components/auth/LoginForm.jsx` | yes, `authentication={false}` (redirects away if already logged in) |
| `/signup` | `pages/SignupPage.jsx` → `components/auth/SignupForm.jsx` | yes, `authentication={false}` |
| `/all-posts` | `pages/AllPostsPage.jsx` | yes, `authentication` (default true) |
| `/add-post` | `pages/AddPostPage.jsx` | yes, `authentication` |
| `/edit-post/:slug` | `pages/EditPostPage.jsx` | yes, `authentication` |
| `/post/:slug` | `pages/PostPage.jsx` | no (public) |
| `/admin` | `pages/AdminPage.jsx` | no (page itself guards by checking `user` truthiness via `useAuthStatus()`) |

`AuthGuard` is `src/components/auth/AuthGuard.jsx`. It reads
`useAuthStatus().isAuthenticated`, and on mismatch with the `authentication`
prop, `navigate("/login")` or `navigate("/")`. While resolving, it renders a
`Spinner`.

`/admin` is NOT wrapped in `AuthGuard` in the router — it only guards itself
at render time (`if (!user) return null`), so an unauthenticated visit
renders nothing rather than redirecting.

## 2. Module layout

- `src/api/appwrite/` — Appwrite integration, one file per responsibility:
  `client.js` (shared `Client`), `auth.service.js` (`AuthService`),
  `posts.service.js` (`PostsService`), `storage.service.js`
  (`StorageService`). Barrel: `index.js` exports `{ authService,
  postsService, storageService }`.
- `src/components/common/` — generic UI primitives, no app/domain knowledge:
  `Button`, `Input`, `Select`, `Logo`, `Spinner`, `Container`.
- `src/components/layout/` — app chrome: `Header`, `Footer`, `Logout`.
- `src/components/auth/` — `LoginForm`, `SignupForm`, `AuthGuard`.
- `src/components/posts/` — `PostCard`, `PostForm`, `RichTextEditor`.
- `src/hooks/` — `useAuthStatus` (auth selector wrapper), `useFilePreview`
  (shared Appwrite file-preview fetch, used by `PostCard`, `PostForm`,
  `PostPage`).
- `src/utils/slug.js` — `createSlug(title)`, pure function.
- `src/pages/` — one route-level component per route (`*Page.jsx`).
- `src/store/` — `index.js` (store setup), `slices/authSlice.js`.
- `src/routes/router.jsx` — the route tree.
- `src/config/env.js` — reads the six `VITE_*` env vars.

## 3. Data flow: creating, editing, fetching, rendering a post

### Create (`pages/AddPostPage.jsx` → `components/posts/PostForm.jsx`)

1. `AddPostPage` renders `<PostForm />` with no `post` prop.
2. RHF is initialized with empty defaults (`title`, `slug`, `content`,
   `status: "active"`). `formState.errors` drives inline validation messages
   for title/slug (image has no validation — it's optional).
3. A `watch` subscription auto-derives `slug` from `title` on every
   keystroke via `createSlug()` (`src/utils/slug.js`) — lowercases, trims,
   replaces `\s`/non-word runs with `-`, truncates to 12 chars. The slug
   field is directly editable too, re-running `createSlug` on input.
4. The featured-image field is a click-to-upload dropzone (a `<label>`
   wrapping a visually-hidden file input) rather than a bare `<input
   type="file">`. Selecting a file drives a local `URL.createObjectURL`
   preview via `watch("image")` + a `useEffect` (revoked on change/unmount);
   no file is required to submit.
5. Status is a two-button segmented control (Public/Private) that calls
   `setValue("status", ...)` — it maps directly to the `active`/`inactive`
   DB values, not a raw `<select>`.
6. On submit (`PostForm.jsx` `submitHandler`):
   - If a file was chosen, `storageService.uploadFile(file)` uploads it to
     the bucket with explicit `Permission.read(Role.any())`
     (`storage.service.js`) — this is what fixes preview/download 403s for
     new uploads.
   - `postsService.createPost({ ...data, featuredimage, userid })` — `featuredimage`
     is the uploaded file's `$id`, or `null` if no image was chosen.
     `databases.createDocument(dbId, collectionId, slug, {...})` — the
     Appwrite **document ID is the post's slug**, not an auto ID.
   - On success, `navigate(/post/${created.$id})`.

### Edit (`pages/EditPostPage.jsx` → `PostForm` with a `post` prop)

1. `EditPostPage` reads `:slug` from the URL, calls
   `postsService.getPost(slug)`, stores the result in state. The page also
   renders a "← Back" link to the post.
2. Passes it as `<PostForm post={post} />`; RHF defaults seed from `post.*`.
3. `PostForm` uses `useFilePreview(post?.featuredimage)` to show the current
   image in the dropzone (previously this called
   `getFilePreview(parseInt(post.featuredimage))` — the `parseInt` on a
   non-numeric Appwrite file ID was a latent bug; removed).
4. On submit: any newly-selected file is uploaded once up front; if present,
   the old file is deleted and `featuredimage` is set to the new file's
   `$id`, otherwise it falls back explicitly to `post.featuredimage`
   (previously this could send `featuredimage: undefined`, relying on
   `JSON.stringify` dropping the key — now explicit). `postsService.updatePost(...)`
   is called and navigates to `/post/:id` on success.

### Fetch/list (`pages/HomePage.jsx`, `pages/AllPostsPage.jsx`)

- `HomePage`: on mount, `postsService.listPosts()` with the default query
  `[Query.equal("status", "active")]` — shows only **active/public** posts,
  unfiltered by owner. A transient fetch error auto-clears after 3s via
  `useEffect` (previously this used `setTimeout` inside the JSX render body,
  which re-armed a new timer on every re-render — fixed).
- `AllPostsPage`: also calls `listPosts()`, then client-side filters to
  `post.userid === user?.$id`. "All Posts" therefore only shows the current
  user's **active** posts — inactive/private posts aren't fetched or shown
  anywhere in the UI (unchanged from before; no query variant for the
  owner's private posts exists yet — worth a follow-up if needed).
- Both render a responsive grid of `PostCard`.

### Render a single post (`pages/PostPage.jsx`)

1. Reads `:slug`, calls `postsService.getPost(slug)`; redirects to `/` if
   not found.
2. `useFilePreview(post?.featuredimage)` fetches the hero image; a separate
   `useEffect` fetches `storageService.getFileDownload(...)` for the
   click-to-download link (kept as a plain effect since it's used only
   here, not extracted into a hook).
3. Renders `post.content` (TinyMCE HTML) via `parse(post.content)` inside a
   `.post-content` block (basic typographic styling in `src/index.css`,
   since the project has no `@tailwindcss/typography` dependency).
4. If `isAuthor` (`user.$id === post.userid`; the prop/variable name is now
   spelled correctly, was "isAuther" before), shows Edit/Delete buttons.
   Delete calls `postsService.deletePost` then `storageService.deleteFile`,
   then navigates home.

## 4. Backend integration: Appwrite

All three services share one `Client` from `src/api/appwrite/client.js`
(`setEndpoint`/`setProject` happens once, not duplicated per service).

**`auth.service.js`** — `AuthService`, exported singleton `authService`.
Wraps Appwrite `Account`:
- `createAccount({email, password, name})` → `account.create(...)`, then
  immediately `this.login(...)`.
- `login({email, password})` → `account.createEmailPasswordSession(...)`.
- `getCurrentUser()` → `account.get()`; catches and logs errors, returns
  `null` on failure (never throws).
- `logout()` → `account.deleteSessions()` (deletes **all** sessions, not
  just the current one).

**`posts.service.js`** — `PostsService`, exported singleton `postsService`.
Post *document* CRUD only: `createPost`, `updatePost`, `deletePost`,
`getPost`, `listPosts(queries)` — all against `config.appwriteDbId` +
`config.appwriteCollection`. Document ID = post slug (client-chosen).

**`storage.service.js`** — `StorageService`, exported singleton
`storageService`. File ops only: `uploadFile` (now passes
`[Permission.read(Role.any())]`), `deleteFile`, `getFileView`,
`getFileDownload` — all against `config.appwriteBucket`. `getFileView` is
used (not `getFilePreview`) — the app never passes resize params, so the
image-transformation `/preview` endpoint bought nothing, and on Appwrite
Cloud it turned out to be a narrower/more restrictive authorization path
than plain file reads (it was 403ing even with correct bucket permissions;
switching to the raw-file `/view` endpoint fixed it).

All three catch and log errors, returning `false`/`null` rather than
propagating — callers check truthiness, not try/catch.

**Auth flow across the app**: `App.jsx` calls `authService.getCurrentUser()`
once on mount; on success dispatches `login({userData})`, on failure
dispatches `logout()` — it no longer force-navigates to `/login` (that was
a bug: it made every page, including the public Home/Post pages,
unreachable for logged-out visitors on first load). Route-level protection
is `AuthGuard`'s job. `LoginForm`/`SignupForm` additionally dispatch
`login({userData})` directly after a successful call so the UI updates
without waiting for a remount.

The commented-out bulk-delete block that used to live in `Home.jsx` has been
removed (it was dead leftover dev code, not live functionality).

## 5. State management (Redux Toolkit)

**Store** (`src/store/index.js`): `configureStore({ reducer: authReducer })`
where `authReducer` is the default export of `slices/authSlice.js` — the
**auth reducer is the entire root reducer**, not namespaced under
`state.auth`. Components no longer read `state.status`/`state.userData`
directly; they call `useAuthStatus()` (`src/hooks/useAuthStatus.js`), which
is the one place that knows this flat shape:

```js
export function useAuthStatus() {
  const isAuthenticated = useSelector((state) => state.status);
  const user = useSelector((state) => state.userData);
  return { isAuthenticated, user };
}
```

**`store/slices/authSlice.js`**:
```js
initialState = { status: false, userData: null }
reducers: {
  login(state, action)  { state.status = true;  state.userData = action.payload.userData },
  logout(state)          { state.status = false; state.userData = null }
}
```
Both actions are dispatched with a payload shaped `{ userData }`, consumed
via `action.payload.userData`.

No slice/state exists for posts — post data is never put in Redux; pages
fetch Appwrite directly in a `useEffect` and hold it in local `useState`, or
via `useFilePreview`/`useAuthStatus` hooks for the shared bits.

## 6. Styling

Tailwind CSS 3, `theme.extend.fontFamily.sans` set to Inter (loaded via
Google Fonts in `index.html`) with a system-font fallback stack. Palette is
neutral slate + a single indigo accent (buttons, links, focus rings) — no
custom color tokens beyond that. `src/index.css` also defines a small
`.post-content` block that styles headings/lists/links/code/tables/images
inside parsed TinyMCE HTML, since the project doesn't depend on
`@tailwindcss/typography`. Icons remain Remix Icon via CDN stylesheet
(`<i className="ri-...">`), not an npm dependency.
