# MCP Server Inventory

**Generated:** 2026-09-02 07:26 +07  
**Scope:** Every MCP server you can actually connect from a local client, plus every Grok connector already live or available on this account.  
**Rule:** Local stdio servers do **not** work in hosted claude.ai chat or in the Grok Android / grok.com app.

Sources verified live on 2026-09-02:
- Official MCP Registry API: https://registry.modelcontextprotocol.io/v0.1/servers
- Official registry docs: https://modelcontextprotocol.io/registry/about (preview as of 2026-08-31)
- Reference repo: https://github.com/modelcontextprotocol/servers (last push 2026-08-31, tag `2026.8.31`, 90,008 stars)
- Archived repo: https://github.com/modelcontextprotocol/servers-archived (last push 2025-05-28 — excluded)
- MCP Toplist 2026-09-01: 115,707 servers tracked across Official Registry, Glama, Smithery, mcp.so, PulseMCP
- Glama 2026-09-01: ~81,400 listings

This file inventories the **maintained production set**. It does not dump 115k names.

---

## 1. What you already have

This session is the **Grok Android app** (SuperGrokPro). There is no local filesystem, no Claude Desktop process, and no client `mcp list` command to run against your laptop.

### 1.1 Local MCP config files — not readable from this session

These paths were requested. They cannot be opened from Android Grok. Status of each on **this device**: **absent / unreachable**.

| Path | Platform | Status here |
|---|---|---|
| `~/.claude.json` | Claude Code / Claude CLI | Unreachable |
| `~/Library/Application Support/Claude/claude_desktop_config.json` | macOS Claude Desktop | Unreachable |
| `~/.config/Claude/claude_desktop_config.json` | Linux Claude Desktop | Unreachable |
| `%USERPROFILE%\.claude.json` | Windows Claude Code | Unreachable |
| `%APPDATA%\Claude\claude_desktop_config.json` | Windows Claude Desktop | Unreachable |
| `~/.cursor/mcp.json` | Cursor | Unreachable |
| `~/.codeium/windsurf/mcp_config.json` | Windsurf | Unreachable |

**Tell:** if those files exist on a Mac/PC you use, they live on that machine, not in this Android session.

### 1.2 GitHub, Drive, Gmail — actually searched

GitHub account: `laurentlaboise` (21 public repos).

| Artifact | Status |
|---|---|
| `laurentlaboise/app.labware.icu/.mcp.json` | **Configured-but-unverified / likely stale** |
| `laurentlaboise/Claude` (private) | One 461 KB `README.md` only. No MCP config. |
| All other `laurentlaboise` repos | Zero `mcpServers` / `claude_desktop_config.json` hits |
| Google Drive | Zero MCP / `claude.json` files |
| Gmail | No config files. Marketing mail only (Docker agents, AnnounceKit MCP, Tella Editor MCP, Substack MCP mention) |

Exact file found:

```json
{
  "mcpServers": {
    "obsidian-vault": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "${OBSIDIAN_VAULT_PATH:-./obsidian}"
      ]
    }
  }
}
```

Repo last push: **2026-07-13**. Cannot prove the process runs. Env-var expansion inside `args` is **not** standard Claude Desktop behavior — if `OBSIDIAN_VAULT_PATH` is unset, many clients pass the literal string `${OBSIDIAN_VAULT_PATH:-./obsidian}` and the server dies with “path does not exist”.

### 1.3 Grok connectors already connected (live in this chat)

These are **xAI connectors**, not MCP servers. They already work here.

| Connector | State |
|---|---|
| Gmail | Connected |
| GitHub | Connected (`laurentlaboise`) |
| Google Drive | Connected |
| Voice | Connected |
| Automations | Connected |

### 1.4 Grok connectors available, not yet connected

Connect from Grok settings (this is **not** an MCP JSON edit):

Google Calendar, Outlook, Outlook Calendar, Box, Calendly, Canva, Coinbase, Excalidraw, Figma, Gamma, Google Cloud BigQuery, HubSpot, HyperFrames by HeyGen, Interactive Brokers (IBKR), Linear, Meltwater, Microsoft Teams, Mixpanel, Netlify, Notion, Robinhood, S&P Global, Stripe, Vercel, Webull, Whop, Wix, X Ads, etoro.

Highest-value next Grok connects for your stack: **Notion, Linear, Stripe, Figma, Vercel, Google Calendar, HubSpot**.

---

## 2. Client reality (read this once)

| Client | stdio (local process) | Remote HTTP / SSE |
|---|---|---|
| Grok Android / grok.com | No | No (uses xAI connectors only) |
| Hosted claude.ai chat / Claude mobile | **No** | Yes — Settings → Connectors → Add custom connector. Pro/Max/Team/Enterprise. ([Anthropic help](https://support.anthropic.com/en/articles/11175166-getting-started-with-custom-integrations-using-remote-mcp), updated 2026-09-02) |
| Claude Desktop | Yes | Yes |
| Claude Code | Yes (`claude mcp add`) | Yes |
| Cursor | Yes (`~/.cursor/mcp.json`) | Yes |
| Windsurf | Yes (`~/.codeium/windsurf/mcp_config.json`) | Yes (`serverUrl`, not `url`) |
| VS Code Copilot | Yes (`.vscode/mcp.json` key is `servers`, not `mcpServers`) | Yes |

Config file to write for Claude Desktop:

- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Linux: `~/.config/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

JSON blocks below use Claude Desktop shape (`mcpServers`). Adapt the key name per client as above.

---

## 3. What was excluded

**13 official reference servers archived** to `modelcontextprotocol/servers-archived` (last push 2025-05-28, repo archived). Do not install these:

AWS KB Retrieval, Brave Search (old `@modelcontextprotocol/server-brave-search`), EverArt, GitHub (old `@modelcontextprotocol/server-github` — **unsupported since April 2025**), GitLab, Google Drive, Google Maps, PostgreSQL, Puppeteer, Redis, Sentry (old), Slack (old), SQLite.

Replacements: Brave → `@brave/brave-search-mcp-server`. GitHub → `github/github-mcp-server`. Slack → official `https://mcp.slack.com/mcp`. Sentry → `https://mcp.sentry.dev/mcp`. Postgres → vendor Neon/Supabase or a 2026-maintained community server.

**Long tail:** Glama ~81,400 + MCP Toplist 115,707 listings as of 2026-09-01. We did not crawl every listing. Anything with last commit before **2026-03-02** is treated as unmaintained and omitted. Official-archived count = **13**. Community long-tail omitted = **100,000+**. This file keeps the maintained production set.

---

## 4. Servers by category

### 4.1 dev / code

#### GitHub official MCP
- Name: GitHub MCP Server. Repos, issues, PRs, Actions, code search, secret scanning.
- Official / vendor. Repo `github/github-mcp-server` last push **2026-09-01**. 32,660 stars.
- Transport: HTTP remote **or** stdio/Docker local.
- Clients: Claude Desktop, Claude Code, Cursor, VS Code, Windsurf. Hosted claude.ai: **yes** (custom connector URL). Grok Android: **no**.
- Auth: OAuth (VS Code 1.101+) or PAT (`repo`, `read:packages`, `read:org`). Claude Code remote is PAT-oriented.
- INSTALL:
```bash
# remote (preferred)
# no local install — point the client at the URL

# local Docker fallback
docker pull ghcr.io/github/github-mcp-server
```
- CONFIG (remote) — write to Claude Desktop config:
```json
{
  "mcpServers": {
    "github": {
      "url": "https://api.githubcopilot.com/mcp/"
    }
  }
}
```
- CONFIG (local Docker + PAT):
```json
{
  "mcpServers": {
    "github": {
      "command": "docker",
      "args": ["run", "-i", "--rm", "-e", "GITHUB_PERSONAL_ACCESS_TOKEN", "ghcr.io/github/github-mcp-server"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_REPLACE_WITH_YOUR_PAT"
      }
    }
  }
}
```
- VERIFY:
```bash
curl -sS -o /dev/null -w "%{http_code}\n" https://api.githubcopilot.com/mcp/
# then in the client: “list my github repos”
```
- Breaks-when: using `@modelcontextprotocol/server-github` (dead since Apr 2025). Tell: tools never appear / npm 404. PAT missing `repo` scope → 401/403. Hosted claude.ai cannot run the Docker variant.

#### Playwright (Microsoft)
- Name: Playwright MCP. Browser automation via accessibility snapshots.
- Official / vendor. Repo `microsoft/playwright-mcp` last push **2026-09-01**. 36,715 stars. Docs: https://playwright.dev/mcp/installation
- Transport: stdio (local). Optional HTTP with `--port`.
- Clients: Claude Desktop, Claude Code, Cursor, VS Code, Windsurf. Hosted claude.ai: **no**. Grok Android: **no**.
- Auth: none.
- INSTALL:
```bash
node -v   # need Node.js 20+
npx @playwright/mcp@latest --help
```
- CONFIG — `~/Library/Application Support/Claude/claude_desktop_config.json`:
```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    }
  }
}
```
- Claude Code:
```bash
claude mcp add playwright npx @playwright/mcp@latest
```
- VERIFY: ask the client to open https://demo.playwright.dev/todomvc and add a todo.
- Breaks-when: Node < 20; no display for headed mode on a server. Tell: browser never launches / `npx` hangs on first Chromium download.

#### Chrome DevTools MCP
- Name: Chrome DevTools for coding agents. Live Chrome debugging.
- Official / vendor. Repo `ChromeDevTools/chrome-devtools-mcp` last push **2026-09-01**. 50,413 stars.
- Transport: stdio.
- Clients: local only. Hosted claude.ai: **no**.
- Auth: none (optional `--wsHeaders`).
- INSTALL / CONFIG:
```json
{
  "mcpServers": {
    "chrome-devtools": {
      "command": "npx",
      "args": ["-y", "chrome-devtools-mcp@latest"]
    }
  }
}
```
- VERIFY: `npx -y chrome-devtools-mcp@latest --help` then “open chrome and list tabs”.
- Breaks-when: Chrome not installed / remote debugging port blocked. Tell: WebSocket connect fail.

#### Context7 (Upstash)
- Name: Up-to-date library docs injected into the model.
- Vendor. Repo `upstash/context7` last push **2026-09-01**. 61,494 stars. Package `@upstash/context7-mcp`.
- Transport: HTTP remote preferred, stdio local fallback.
- Clients: remote works in hosted claude.ai. Local stdio does not.
- Auth: API key (`Authorization: Bearer` or `CONTEXT7_API_KEY`) or OAuth at `/mcp/oauth`. Free key at https://context7.com/dashboard
- INSTALL:
```bash
npx ctx7 setup --claude
# or manual remote, no install
```
- CONFIG (remote):
```json
{
  "mcpServers": {
    "context7": {
      "url": "https://mcp.context7.com/mcp",
      "headers": {
        "Authorization": "Bearer CONTEXT7_KEY_FROM_DASHBOARD"
      }
    }
  }
}
```
- CONFIG (local):
```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp", "--api-key", "CONTEXT7_KEY_FROM_DASHBOARD"]
    }
  }
}
```
- VERIFY: “use context7 to show the current Next.js app router create-route example”.
- Breaks-when: no key → tight rate limit. Wrong header name (`CONTEXT7_API_KEY` vs `Authorization`) depending on client. Tell: empty doc results.

#### Git (official reference)
- Name: Read / search / manipulate a local git repo.
- Official reference. In `modelcontextprotocol/servers` (push 2026-08-31).
- Transport: stdio.
- Clients: local only. Hosted claude.ai: **no**.
- Auth: none (uses local git credentials).
- INSTALL:
```bash
uvx mcp-server-git --help
```
- CONFIG:
```json
{
  "mcpServers": {
    "git": {
      "command": "uvx",
      "args": ["mcp-server-git", "--repository", "/absolute/path/to/repo"]
    }
  }
}
```
- VERIFY: “show last 5 commits in that repo”.
- Breaks-when: relative path; repo is not a git dir. Tell: spawn error / empty log.

#### Everything (official reference / test)
- Name: Reference server exercising prompts, resources, tools.
- Official. Package `@modelcontextprotocol/server-everything`.
- Transport: stdio. Local only.
- Auth: none.
- CONFIG:
```json
{
  "mcpServers": {
    "everything": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-everything"]
    }
  }
}
```
- VERIFY: tools/list shows the kitchen-sink tool set.
- Breaks-when: used as a production server. Tell: noisy tool list, token bloat.

---

### 4.2 docs / knowledge

#### Filesystem (official reference)
- Name: Scoped local file read/write/search. This is the server already in your `.mcp.json`.
- Official. Package `@modelcontextprotocol/server-filesystem`. Filesystem README last commit **2026-07-06** inside a repo last pushed 2026-08-31.
- Transport: stdio. Local only. Hosted claude.ai: **no**.
- Auth: none (OS user permissions + allowed-dir list).
- INSTALL:
```bash
npx -y @modelcontextprotocol/server-filesystem --help
```
- CONFIG — use an **absolute** directory, not an env-var expression:
```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/YOUR_MAC_USER/Documents/ObsidianVault"]
    }
  }
}
```
- VERIFY: “list files in the allowed directory”.
- Breaks-when: path is relative, missing, or the `${OBSIDIAN_VAULT_PATH:-./obsidian}` form from your current config. Tell: server starts then every tool returns access denied / path not found.

#### Memory (official reference)
- Name: Local knowledge-graph memory across chats.
- Official. Package `@modelcontextprotocol/server-memory`.
- Transport: stdio. Local only.
- Auth: none.
- CONFIG:
```json
{
  "mcpServers": {
    "memory": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"]
    }
  }
}
```
- VERIFY: “remember that my GitHub login is laurentlaboise, then recall it”.
- Breaks-when: client wipes the default memory file between runs. Tell: empty graph after restart. Set `MEMORY_FILE_PATH` to a stable location.

#### Sequential Thinking (official reference)
- Name: Structured multi-step reasoning tool.
- Official. Package `@modelcontextprotocol/server-sequential-thinking`. npm line 2026.7.4.
- Transport: stdio. Local only.
- Auth: none.
- CONFIG:
```json
{
  "mcpServers": {
    "sequential-thinking": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sequential-thinking"]
    }
  }
}
```
- VERIFY: ask a multi-constraint planning question and watch `sequential_thinking` fire.
- Breaks-when: client tool-budget is tiny. Tell: one thought then stop.

#### Fetch (official reference)
- Name: Fetch a URL and convert to LLM-friendly text.
- Official. Python package `mcp-server-fetch`.
- Transport: stdio. Local only.
- Auth: none.
- INSTALL / CONFIG:
```json
{
  "mcpServers": {
    "fetch": {
      "command": "uvx",
      "args": ["mcp-server-fetch"]
    }
  }
}
```
- VERIFY: “fetch https://modelcontextprotocol.io and summarize the first heading”.
- Breaks-when: `uv` / `uvx` missing. Tell: command not found. Install: `curl -LsSf https://astral.sh/uv/install.sh | sh`.

#### Time (official reference)
- Name: Timezone conversion.
- Official. Python `mcp-server-time`.
- Transport: stdio. Local only.
- Auth: none.
- CONFIG:
```json
{
  "mcpServers": {
    "time": {
      "command": "uvx",
      "args": ["mcp-server-time"]
    }
  }
}
```
- VERIFY: “what time is it in Asia/Vientiane”.
- Breaks-when: invalid IANA zone. Tell: conversion error.

#### Notion official MCP
- Name: Read/write Notion pages and databases.
- Official / vendor. Hosted. Docs updated **2026-08-27**: https://developers.notion.com/guides/mcp/get-started-with-mcp
- Transport: Streamable HTTP `https://mcp.notion.com/mcp` (SSE fallback `https://mcp.notion.com/sse`).
- Clients: remote works in hosted claude.ai. Local npm `@notionhq/notion-mcp-server` is **maintenance-mode / sunset risk** — do not start new setups on it.
- Auth: OAuth.
- INSTALL: none for remote.
- CONFIG (Claude Desktop remote):
```json
{
  "mcpServers": {
    "notion": {
      "url": "https://mcp.notion.com/mcp"
    }
  }
}
```
- Hosted claude.ai: Settings → Connectors → Add custom connector → paste `https://mcp.notion.com/mcp`.
- Clients without remote support:
```bash
npx -y mcp-remote https://mcp.notion.com/mcp
```
- VERIFY: “search my Notion workspace for Labware”.
- Breaks-when: workspace not selected in OAuth; integration lacks page access. Tell: empty search / 403.

#### DeepWiki (Cognition)
- Name: Ask questions about any public GitHub repo from a generated wiki.
- Vendor. Endpoint live 2026.
- Transport: HTTP `https://mcp.deepwiki.com/mcp` (SSE also listed).
- Clients: remote, including hosted claude.ai.
- Auth: none.
- CONFIG:
```json
{
  "mcpServers": {
    "deepwiki": {
      "url": "https://mcp.deepwiki.com/mcp"
    }
  }
}
```
- VERIFY: “explain github/github-mcp-server architecture via deepwiki”.
- Breaks-when: private repos. Tell: not indexed.

---

### 4.3 data / DB

#### Supabase official MCP
- Name: Postgres, Auth, Storage, project management.
- Official / vendor. Remote `https://mcp.supabase.com/mcp`. Local CLI also exposes `http://localhost:54321/mcp`.
- Transport: HTTP. Hosted claude.ai: **yes**.
- Auth: OAuth (remote) or local JWT.
- CONFIG:
```json
{
  "mcpServers": {
    "supabase": {
      "url": "https://mcp.supabase.com/mcp"
    }
  }
}
```
- VERIFY: “list my supabase projects”.
- Breaks-when: project paused; wrong org in OAuth. Tell: 401 / empty project list.

#### Neon official MCP
- Name: Serverless Postgres, branches, migrations.
- Official / vendor. `https://mcp.neon.tech/mcp`. npm package is **deprecated** — use remote.
- Transport: HTTP. Hosted claude.ai: **yes**.
- Auth: OAuth.
- CONFIG:
```json
{
  "mcpServers": {
    "neon": {
      "url": "https://mcp.neon.tech/mcp"
    }
  }
}
```
- VERIFY: “list neon projects and branches”.
- Breaks-when: installing the old npm package. Tell: deprecation banner / auth fail.

#### Google Cloud BigQuery (Grok connector + vendor MCP elsewhere)
- On **this** Grok account: connect via Grok connector “Google Cloud BigQuery” (not MCP JSON).
- Breaks-when: treating it as an MCP stdio server inside Grok Android. Tell: nothing appears.

---

### 4.4 comms

#### Slack official MCP
- Name: Channels, messages, search, canvases.
- Official / vendor. GA Feb 2026. Endpoint `https://mcp.slack.com/mcp`.
- Transport: **Streamable HTTP only. Slack does not support SSE** (vendor docs 2026-09-02).
- Clients: remote. On Claude.ai Slack connector is Team/Enterprise only.
- Auth: OAuth 2.0 user tokens.
- CONFIG:
```json
{
  "mcpServers": {
    "slack": {
      "url": "https://mcp.slack.com/mcp"
    }
  }
}
```
- VERIFY: “list public channels I can access”.
- Breaks-when: pointing at `/sse`. Tell: connection hang / 4xx. Using the archived `@modelcontextprotocol/server-slack`.

#### Gmail / Google Calendar / Google Drive
- On this Grok account: **already connected** (Gmail, Drive). Calendar is available as a Grok connector, not yet connected.
- Official Google Workspace managed MCP servers also exist (Calendar / Drive / Gmail / Chat / People, Developer Preview in 2026 surveys). Prefer the Grok connector **in this app**. Prefer Google’s hosted MCP only inside Claude/Cursor.
- Do not install the archived `@modelcontextprotocol/server-gdrive`.

#### X (Twitter) official MCP
- Name: Posts, users, timelines, bookmarks, trends.
- Official / vendor (shipped 2026-06-30 per 2026 catalogs).
- Transport: HTTP `https://api.x.com/mcp`. Docs search (no auth): `https://docs.x.com/mcp`.
- Auth: X developer OAuth for the API server; none for docs.
- CONFIG (docs, no auth):
```json
{
  "mcpServers": {
    "x-docs": {
      "url": "https://docs.x.com/mcp"
    }
  }
}
```
- VERIFY docs: “search X API docs for filtered stream rules”.
- Breaks-when: using docs endpoint expecting write tools. Tell: only documentation tools exist there.

---

### 4.5 design

#### Figma official MCP
- Name: Design file structure, frames, variables, Code Connect, assets.
- Official / vendor. Remote `https://mcp.figma.com/mcp`. Desktop Dev Mode local: `http://127.0.0.1:3845/mcp` after enabling Dev Mode MCP in Figma desktop. Docs current 2026-09-02.
- Transport: HTTP. Remote works in hosted claude.ai. Local loopback does **not**.
- Auth: OAuth (remote).
- CONFIG (remote):
```json
{
  "mcpServers": {
    "figma": {
      "url": "https://mcp.figma.com/mcp"
    }
  }
}
```
- VERIFY: “list frames in the currently selected Figma file”.
- Breaks-when: Dev Mode MCP disabled; pointing hosted Claude at `127.0.0.1:3845`. Tell: connection refused from Anthropic IPs.
- Also available as a **Grok connector** named Figma (not yet connected).

#### Canva
- Vendor hosted: `mcp.canva.com` (listed in 2026 hosted directories). Also a Grok connector named Canva, not yet connected.
- Auth: OAuth.
- Prefer the Grok connector in this app.

#### Excalidraw
- Available as a Grok connector, not yet connected. Not an MCP JSON install in this session.

---

### 4.6 cloud / infra

#### Cloudflare official MCP
- Name: Workers, KV, R2, D1, DNS, observability, builds.
- Official / vendor. Repos `cloudflare/mcp-server-cloudflare` (updated 2026-09-01, 4,135 stars) and `cloudflare/mcp` (updated 2026-09-02).
- Transport: HTTP. Hosted claude.ai: **yes**.
- Auth: OAuth or Cloudflare API token.
- Endpoints in active use:
  - `https://mcp.cloudflare.com/mcp` (unified)
  - `https://bindings.mcp.cloudflare.com/mcp`
  - `https://observability.mcp.cloudflare.com/mcp`
  - `https://builds.mcp.cloudflare.com/mcp`
- CONFIG:
```json
{
  "mcpServers": {
    "cloudflare": {
      "url": "https://mcp.cloudflare.com/mcp"
    }
  }
}
```
- VERIFY: “list my cloudflare accounts / workers”.
- Breaks-when: using an old `/sse` radar-only URL from 2025 blog posts. Tell: partial tool set.

#### Vercel official MCP
- Name: Deployments, logs, environments.
- Official / vendor. `https://mcp.vercel.com`. Auth OAuth.
- Also a Grok connector named Vercel, not yet connected.
- CONFIG:
```json
{
  "mcpServers": {
    "vercel": {
      "url": "https://mcp.vercel.com"
    }
  }
}
```
- VERIFY: “list latest vercel deployments for labware.icu”.
- Breaks-when: OAuth into the wrong team. Tell: empty project list.

#### AWS managed MCP
- Name: Broad AWS API + docs surface.
- Official / vendor. Catalog: https://awslabs.github.io/mcp  Remote cited: `https://aws-mcp.us-east-1.api.aws/mcp` (2026 catalogs). Local: `uvx awslabs.aws-documentation-mcp-server@latest`.
- Auth: AWS IAM / SigV4 for the managed endpoint; none for the docs-only local server.
- Hosted claude.ai: remote only if the endpoint accepts the Claude OAuth/connector flow.
- Breaks-when: using archived `aws-kb-retrieval-server`. Tell: repo gone from `servers`.

#### Netlify
- Remote listed as `https://netlify-mcp.netlify.app/mcp` (OAuth). Also a Grok connector named Netlify, not yet connected.

---

### 4.7 automation

#### n8n
- Name: Workflow automation. Official instance MCP + large community server.
- Official instance docs 2026-08-27: enable MCP in the n8n instance, then `https://<your-instance>/mcp-server/http` with Bearer token. Community `czlonkowski/n8n-mcp` last commit cited 2026-08-31. Parent `n8n-io/n8n` ~202,950 stars on MCP Toplist 2026-09-01.
- Transport: HTTP (official instance) or stdio (community).
- Auth: instance API token / Bearer.
- RISK (community): token stored in client env; token lifetime = n8n API key lifetime; ToS = your n8n license.
- VERIFY: “list workflows on my n8n instance”.
- Breaks-when: MCP feature flag off on the instance. Tell: 404 on `/mcp-server/http`.

#### Zapier MCP
- Name: Fan-out to thousands of Zapier apps.
- Vendor hosted: `https://mcp.zapier.com/`.
- Auth: OAuth.
- Hosted claude.ai: **yes**.
- Breaks-when: Zapier MCP action not enabled for the account. Tell: empty app list.

#### Grok Automations
- Already connected on this account. Not MCP. Use it in this chat.

---

### 4.8 business / CRM

#### Linear official MCP
- Name: Issues, projects, cycles, teams.
- Official / vendor. `https://mcp.linear.app/mcp` (read-write). Read-only: `https://mcp.linear.app/mcp/readonly`. `/sse` is **deprecated**.
- Auth: OAuth 2.1 DCR, or API key.
- Also a Grok connector named Linear, not yet connected.
- CONFIG:
```json
{
  "mcpServers": {
    "linear": {
      "url": "https://mcp.linear.app/mcp"
    }
  }
}
```
- VERIFY: “list my linear teams and open issues”.
- Breaks-when: using `https://mcp.linear.app/sse`. Tell: flaky or deprecated transport errors.

#### Stripe official MCP
- Name: Customers, invoices, subscriptions, refunds, Stripe docs search.
- Official / vendor. Remote `https://mcp.stripe.com`. Local `npx -y @stripe/mcp --tools=all --api-key=rk_live_or_rk_test_...`. Also `stripe agent setup` via `@stripe/cli`.
- Auth: OAuth (hosted) or restricted API key (local).
- Also a Grok connector named Stripe, not yet connected.
- CONFIG (remote):
```json
{
  "mcpServers": {
    "stripe": {
      "url": "https://mcp.stripe.com"
    }
  }
}
```
- VERIFY: “search stripe docs for checkout session create”.
- Breaks-when: putting a secret `sk_live_` key in a world-readable JSON file. Tell: key leaked via git. Use a restricted key and keep writes human-in-the-loop.

#### HubSpot official MCP
- Name: CRM contacts, deals, pipelines.
- Official / vendor. `https://mcp.hubspot.com`. Auth OAuth.
- Also a Grok connector named HubSpot, not yet connected.
- CONFIG:
```json
{
  "mcpServers": {
    "hubspot": {
      "url": "https://mcp.hubspot.com"
    }
  }
}
```
- VERIFY: “list recently updated HubSpot deals”.

#### Atlassian Rovo official MCP
- Name: Jira issues, Confluence pages, Compass.
- Official / vendor. `https://mcp.atlassian.com/v1/mcp`. Auth OAuth 2.1. Legacy `/sse` deprecated (Atlassian SSE deprecation 2026-06-30).
- CONFIG:
```json
{
  "mcpServers": {
    "atlassian": {
      "url": "https://mcp.atlassian.com/v1/mcp"
    }
  }
}
```
- VERIFY: “search Jira for open bugs assigned to me”.
- Breaks-when: site not selected during OAuth. Tell: empty Jira cloud list.

#### Sentry official MCP
- Name: Issues, stack traces, performance, releases.
- Official / vendor. `https://mcp.sentry.dev/mcp`. `/sse` returns **410**. Local: `npx @sentry/mcp-server` + `SENTRY_ACCESS_TOKEN`.
- Auth: OAuth (remote) or token (local).
- CONFIG:
```json
{
  "mcpServers": {
    "sentry": {
      "url": "https://mcp.sentry.dev/mcp"
    }
  }
}
```
- VERIFY: “list unresolved sentry issues from the last 24 hours”.
- Breaks-when: hitting `/sse`. Tell: HTTP 410.

#### Asana / Monday
- Asana: `https://mcp.asana.com/sse` (OAuth; still SSE per 2026 lists).
- Monday: `https://mcp.monday.com/mcp` (OAuth).
- Hosted claude.ai: **yes** for HTTP(S) endpoints the client accepts.

---

### 4.9 browser / scraping

#### Brave Search official MCP
- Name: Web and local search via Brave Search API.
- Official / vendor. Repo `brave/brave-search-mcp-server` last push **2026-08-26**. Package `@brave/brave-search-mcp-server`. Do **not** use archived `@modelcontextprotocol/server-brave-search`.
- Transport: stdio default; `--transport http` available.
- Clients: local stdio → Desktop/Cursor/VS Code only. Hosted claude.ai: **no** unless you host the HTTP transport yourself.
- Auth: API key `BRAVE_API_KEY` from https://brave.com/search/api/
- INSTALL:
```bash
npx -y @brave/brave-search-mcp-server --help
```
- CONFIG:
```json
{
  "mcpServers": {
    "brave-search": {
      "command": "npx",
      "args": ["-y", "@brave/brave-search-mcp-server"],
      "env": {
        "BRAVE_API_KEY": "BSA_KEY_FROM_BRAVE_DASHBOARD"
      }
    }
  }
}
```
- VERIFY: “brave-search: what is the official MCP registry URL”.
- Breaks-when: missing key; using the archived package. Tell: 401 / package missing.

#### Firecrawl
- Name: Site crawl / scrape to clean markdown.
- Vendor. Repo `firecrawl/firecrawl-mcp-server` cited updated 2026-09-01.
- Transport: stdio typical.
- Auth: API key `FIRECRAWL_API_KEY`.
- CONFIG:
```json
{
  "mcpServers": {
    "firecrawl": {
      "command": "npx",
      "args": ["-y", "firecrawl-mcp"],
      "env": {
        "FIRECRAWL_API_KEY": "fc-KEY_FROM_FIRECRAWL"
      }
    }
  }
}
```
- Hosted claude.ai: **no** (stdio).
- RISK: API key in client JSON. Token lifetime = Firecrawl key. ToS = Firecrawl scrape policy.
- VERIFY: “scrape https://modelcontextprotocol.io/registry/about to markdown”.

---

### 4.10 community Obsidian (better than your current filesystem-only vault)

#### cyanheads/obsidian-mcp-server
- Name: Talk to an Obsidian vault with vault-aware tools, not raw filesystem.
- Community. Release v3.5.0 cited **2026-08-22** (inside 6-month window).
- Transport: stdio. Local only.
- Auth: Obsidian Local REST API token / community-plugin token.
- RISK: credential stored in client `env`; token lifetime = until you rotate the plugin token; ToS = Obsidian + plugin license. Do not commit the token.
- Prefer this over `@modelcontextprotocol/server-filesystem` pointed at a vault **if** you install the matching Obsidian plugin. Otherwise keep Filesystem with an absolute path.
- Breaks-when: Local REST API plugin off. Tell: connection refused on the vault port.

---

## 5. Compatibility table

| Server | Grok Android | Hosted claude.ai | Claude Desktop | Claude Code | Cursor | VS Code | Windsurf |
|---|---|---|---|---|---|---|---|
| Grok connectors (Gmail, GitHub, Drive, Voice, Automations) | YES | no | no | no | no | no | no |
| GitHub remote `api.githubcopilot.com/mcp/` | no | YES | YES | YES | YES | YES | YES |
| GitHub Docker stdio | no | no | YES | YES | YES | YES | YES |
| Notion `mcp.notion.com/mcp` | no* | YES | YES | YES | YES | YES | YES |
| Linear `mcp.linear.app/mcp` | no* | YES | YES | YES | YES | YES | YES |
| Stripe `mcp.stripe.com` | no* | YES | YES | YES | YES | YES | YES |
| Slack `mcp.slack.com/mcp` | no | YES** | YES | YES | YES | YES | YES |
| Figma `mcp.figma.com/mcp` | no* | YES | YES | YES | YES | YES | YES |
| Figma Desktop `127.0.0.1:3845` | no | no | YES | YES | YES | YES | YES |
| Sentry `mcp.sentry.dev/mcp` | no | YES | YES | YES | YES | YES | YES |
| Atlassian `mcp.atlassian.com/v1/mcp` | no | YES | YES | YES | YES | YES | YES |
| HubSpot `mcp.hubspot.com` | no* | YES | YES | YES | YES | YES | YES |
| Neon `mcp.neon.tech/mcp` | no | YES | YES | YES | YES | YES | YES |
| Supabase `mcp.supabase.com/mcp` | no | YES | YES | YES | YES | YES | YES |
| Vercel `mcp.vercel.com` | no* | YES | YES | YES | YES | YES | YES |
| Cloudflare `mcp.cloudflare.com/mcp` | no | YES | YES | YES | YES | YES | YES |
| Context7 remote | no | YES | YES | YES | YES | YES | YES |
| Context7 stdio | no | no | YES | YES | YES | YES | YES |
| Playwright stdio | no | no | YES | YES | YES | YES | YES |
| Chrome DevTools stdio | no | no | YES | YES | YES | YES | YES |
| Brave Search stdio | no | no | YES | YES | YES | YES | YES |
| Filesystem / Memory / Git / Fetch / Time / Sequential Thinking / Everything | no | no | YES | YES | YES | YES | YES |
| DeepWiki remote | no | YES | YES | YES | YES | YES | YES |
| X docs `docs.x.com/mcp` | no | YES | YES | YES | YES | YES | YES |

\* Same product also exists as a **Grok connector** you can enable without MCP.  
\*\* Slack on Claude.ai is Team/Enterprise only.

---

## 6. Highest-value bulk install (local desktop client)

Run on the Mac/PC that actually has Claude Desktop / Claude Code / Cursor. Not on this Android phone.

```bash
# 0. prerequisites
node -v    # >= 20
uv --version || curl -LsSf https://astral.sh/uv/install.sh | sh

# 1. Claude Code one-liners (skip if you only use Desktop JSON)
claude mcp add --transport http github https://api.githubcopilot.com/mcp/
claude mcp add --transport http notion https://mcp.notion.com/mcp
claude mcp add --transport http context7 https://mcp.context7.com/mcp
claude mcp add --transport http linear https://mcp.linear.app/mcp
claude mcp add --transport http stripe https://mcp.stripe.com
claude mcp add playwright npx @playwright/mcp@latest
claude mcp add filesystem npx -y @modelcontextprotocol/server-filesystem /absolute/path/to/vault-or-projects

# 2. Desktop JSON equivalent lives at:
#   macOS:  ~/Library/Application Support/Claude/claude_desktop_config.json
#   Linux:  ~/.config/Claude/claude_desktop_config.json
#   Win:    %APPDATA%\Claude\claude_desktop_config.json
```

Desktop JSON to paste (remote-first, no secrets except where a key is mandatory):

```json
{
  "mcpServers": {
    "github": { "url": "https://api.githubcopilot.com/mcp/" },
    "notion": { "url": "https://mcp.notion.com/mcp" },
    "linear": { "url": "https://mcp.linear.app/mcp" },
    "stripe": { "url": "https://mcp.stripe.com" },
    "context7": { "url": "https://mcp.context7.com/mcp" },
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    },
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/absolute/path/to/vault-or-projects"]
    }
  }
}
```

On **this Android Grok app**, skip MCP JSON. Connect these Grok connectors instead: Notion, Linear, Stripe, Figma, Vercel, Google Calendar, HubSpot.

---

## 7. Restart / reload before anything appears

| Client | Reload step |
|---|---|
| Claude Desktop | Fully quit (Cmd-Q / Alt-F4), relaunch. MCP is loaded at process start. Toggle the server off/on in Settings → Developer if the JSON was already valid. |
| Claude Code | `claude mcp list` then start a new session. |
| Cursor | Command Palette → “MCP: Restart” or reload window. |
| VS Code | Reload Window. Check `.vscode/mcp.json` uses key `servers`. |
| Windsurf | Reload. Use `serverUrl` for remotes. |
| Hosted claude.ai | Settings → Connectors → Add → paste HTTPS URL → complete OAuth → enable the connector on the next chat with the `+` / tools picker. No desktop restart. |
| Grok Android | Settings → connectors → connect. No `mcpServers` JSON. Restarting the app is enough after OAuth. |

Inspector (optional, local):

```bash
npx -y @modelcontextprotocol/inspector
```

Repo last push 2026-09-01. Use it to prove a stdio server answers `tools/list` before you blame the chat client.

---

## 8. Sources

- https://registry.modelcontextprotocol.io/v0.1/servers (live 2026-09-02)
- https://modelcontextprotocol.io/registry/about (2026-08-31)
- https://github.com/modelcontextprotocol/servers (push 2026-08-31, tag 2026.8.31)
- https://github.com/modelcontextprotocol/servers-archived (push 2025-05-28)
- https://github.com/github/github-mcp-server (push 2026-09-01)
- https://developers.notion.com/guides/mcp/get-started-with-mcp (2026-08-27)
- https://playwright.dev/mcp/installation (2026-08-27)
- https://github.com/microsoft/playwright-mcp (push 2026-09-01)
- https://github.com/ChromeDevTools/chrome-devtools-mcp (push 2026-09-01)
- https://github.com/upstash/context7 (push 2026-09-01)
- https://github.com/brave/brave-search-mcp-server (push 2026-08-26)
- https://github.com/cloudflare/mcp-server-cloudflare (updated 2026-09-01)
- https://support.anthropic.com/en/articles/11175166-getting-started-with-custom-integrations-using-remote-mcp (updated 2026-09-02)
- https://openhelm.ai/blog/best-remote-mcp-servers-2026 (2026-07-10)
- https://mcptoplist.com/ (2026-09-01)
- https://glama.ai/mcp/servers (2026-09-01)
