# Trackr

Track and analyze AI coding tool usage across your team. Supports multiple providers with a modular architecture.

https://github.com/user-attachments/assets/8054615f-067c-4530-9f1a-88072dd10500

## Features

- **Dashboard**: Token consumption, costs, model breakdown, top users
- **User Analytics**: Per-user usage history, model preferences, trends
- **Pivot Table**: Sortable/filterable view of all users with detailed metrics
- **Multi-Provider**: Mix and match Claude Code, Cursor, or add your own
- **Automated Sync**: Cron jobs for continuous data fetching
- **CSV Import**: Manual import when APIs are unavailable or for backfills

### Supported Providers

| Provider | Data Source | Features |
|----------|-------------|----------|
| **Claude Code** | Anthropic Admin API | Token usage, costs, model breakdown, API key mapping |
| **Cursor** | Cursor Admin API or CSV | Token usage, costs, model breakdown |
| **GitHub Commits** | GitHub App webhook + API | AI Attributed commit tracking (Co-Authored-By detection) |

Each provider is optional—configure only the ones you use.

---

## Quick Start

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/smartdev/trackr)

See the **[Quick Start Guide](https://smartdev.github.io/trackr/getting-started/quick-start/)** for full deployment instructions.

---

## Documentation

Full documentation is available at **[smartdev.github.io/trackr](https://smartdev.github.io/trackr/)**

- [Quick Start](https://smartdev.github.io/trackr/getting-started/quick-start/) - Deploy to Vercel in minutes
- [Environment Variables](https://smartdev.github.io/trackr/getting-started/environment-variables/) - Configuration reference
- [Providers](https://smartdev.github.io/trackr/providers/) - Set up Claude Code, Cursor, GitHub
- [CLI Reference](https://smartdev.github.io/trackr/cli/) - Command-line tools for sync and backfill
- [Deployment](https://smartdev.github.io/trackr/deployment/vercel/) - Vercel cron jobs and monitoring

---

## Local Development

```bash
pnpm install

# Create .env.local with your credentials
cat > .env.local << 'EOF'
POSTGRES_URL=postgres://...
BETTER_AUTH_SECRET=your-secret-here
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
NEXT_PUBLIC_DOMAIN=yourcompany.com
CRON_SECRET=your-cron-secret

# Providers (optional)
ANTHROPIC_ADMIN_KEY=sk-admin-...
CURSOR_ADMIN_KEY=...
EOF

pnpm cli db:migrate
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

**Note:** Add `http://localhost:3000/api/auth/callback/google` to your Google OAuth redirect URIs for local development.

---

## Roadmap

- **Codex** – Provider support for Codex usage and analytics
- **Copilot** – Provider support for GitHub Copilot usage and analytics
- **Bug-to-conversation audit** – Link bugs (e.g. from issue trackers or incidents) to the agent conversations that led to them for audit and root-cause analysis

---

## License

MITx
