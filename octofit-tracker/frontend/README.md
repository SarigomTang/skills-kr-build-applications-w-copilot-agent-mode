# OctoFit Tracker frontend

The React 19 presentation tier uses Vite, Bootstrap, and React Router. Start the
development server from the repository root with:

```bash
npm run dev --prefix octofit-tracker/frontend
```

By default, the frontend requests the API at `http://localhost:8000`. In
GitHub Codespaces, create `octofit-tracker/frontend/.env.local` and set
`VITE_CODESPACE_NAME` to the Codespace name:

```dotenv
VITE_CODESPACE_NAME=your-codespace-name
```

The frontend then uses
`https://your-codespace-name-8000.app.github.dev` as its API origin. Restart
the Vite development server after changing environment variables. If
`VITE_CODESPACE_NAME` is empty or unset, the API requests safely fall back to
localhost instead of constructing a URL with `undefined`.
