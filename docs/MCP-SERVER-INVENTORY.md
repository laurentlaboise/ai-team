# MCP Server Inventory

Generated: 2026-09-02 07:26 +07  
Scope date cutoff for "maintained": last commit on or after 2026-03-02  
Official registry: https://registry.modelcontextprotocol.io  
Reference repo: https://github.com/modelcontextprotocol/servers (last docs push 2026-08-31)

This file is the keepable copy. Raw URL:
https://raw.githubusercontent.com/laurentlaboise/ai-team/main/docs/MCP-SERVER-INVENTORY.md

---

## 0. How this session can and cannot see your machine

This inventory was produced from a **Grok Android SuperGrokPro** session (IP Vientiane). There is **no local filesystem** attached to this chat. The Claude Desktop / Cursor / VS Code paths below were checked against your GitHub account `laurentlaboise`, Google Drive, and Gmail. They were **not** read off a Mac, Linux box, or Windows PC, because none of those disks are mounted here.

Consequence: any local `stdio` MCP server listed below is usable only after you paste the JSON onto a desktop MCP client. It will **never** appear inside this Grok Android chat.

---

## 1. What you already have

### 1.1 Grok connectors (live in this chat)

These are **xAI connectors**, not MCP servers. They are already authorized and working in this session:

| Connector | State |
|---|---|
| Gmail | connected |
| GitHub (`laurentlaboise`) | connected |
| Google Drive | connected |
| Voice | connected |
| Automations | connected |

Grok connectors available but **not** connected (connect from Grok Settings → Connectors):

Google Calendar, Outlook, Outlook Calendar, Box, Calendly, Canva, Coinbase, Excalidraw, Figma, Gamma, Google Cloud BigQuery, HubSpot, HyperFrames by HeyGen, Interactive Brokers (IBKR), Linear, Meltwater, Microsoft Teams, Mixpanel, Netlify, Notion, Robinhood, S&P Global, Stripe, Vercel, Webull, Whop, Wix, X Ads, etoro.

### 1.2 Claude / Cursor / VS Code MCP config files

| Path requested | Result |
|---|---|
| `~/.claude.json` | not readable from this session; not present in GitHub or Drive |
| `~/Library/Application Support/Claude/claude_desktop_config.json` | not readable (no macOS disk) |
| `~/.config/Claude/claude_desktop_config.json` | not readable (no Linux disk) |
| `%USERPROFILE%\.claude.json` / `%APPDATA%\Claude\claude_desktop_config.json` | not readable (no Windows disk) |
| Google Drive filename search for `claude.json`, `claude_desktop_config`, `mcp.json` | zero config files |
| Gmail | no config attachments; marketing mail only |

### 1.3 MCP configs found in your GitHub

**Only one file.**

- Repo: `laurentlaboise/app.labware.icu` (private)
- Path: `.mcp.json`
- Last repo push: 2026-07-13
- Status: **configured-but-unverified / likely stale** (cannot run a client status command from Android)

```json
{
  "mcpServers": {
    "obsidian-vault": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "${OBSIDIAN_VAULT_PATH:-./obsidian}"]
    }
  }
}
```

What that actually does: official Filesystem reference server, scoped to `./obsidian` unless `OBSIDIAN_VAULT_PATH` is set. It is **not** the Obsidian REST/community MCP. It cannot talk to the Obsidian app, only to files on disk.

Other findings:

- `laurentlaboise/Claude` (private) contains a single 461 KB `README.md`. No MCP config.
- Code search across `user:laurentlaboise` for `mcpServers`, `claude_desktop_config.json`, `filename:mcp.json` returned **zero** other hits.
- Drive contains Next.js `mcp.md` / `get-or-create-mcp-server.*` copies from a Node SDK, not a client config.

No client `mcp list` / status command could be executed against a running Claude Desktop, Cursor, or VS Code instance from this session. Reported state is therefore **account-side evidence**, not a live process table.

---

## 2. What you could add

Sources checked 2026-09-02:

- Official MCP Registry API `https://registry.modelcontextprotocol.io/v0.1/servers?version=latest`
- `modelcontextprotocol/servers` README (commit activity through 2026-08-31)
- Vendor docs for GitHub, Notion, Linear, Stripe, Slack, Figma, Sentry, Atlassian, Cloudflare, Vercel, Neon, Supabase, Playwright, Brave, Context7, n8n
- MCP Toplist (115,707 servers tracked, 2026-09-01) and Glama (81,422 open-source listings, 2026-09-01)

### Excluded as unmaintained (>6 months or officially archived)

**13 official reference servers** moved to `modelcontextprotocol/servers-archived` (archive last meaningful push 2025-05-28):

AWS KB Retrieval, Brave Search (old), EverArt, GitHub (old), GitLab, Google Drive, Google Maps, PostgreSQL, Puppeteer, Redis, Sentry (old), Slack (old), SQLite.

Also excluded as dead packages:

- `@modelcontextprotocol/server-github` — unsupported since April 2025. Use `github/github-mcp-server`.
- `@modelcontextprotocol/server-brave-search` — replaced by `@brave/brave-search-mcp-server`.
- `@modelcontextprotocol/server-postgres` — archived. Use Neon / Supabase / a 2026-maintained community Postgres server.
- Notion local `@notionhq/notion-mcp-server` — vendor now tells new setups to use the hosted remote; local package is maintenance-mode / sunset-risk.

**Long tail:** registries track ~80k–115k names. Most are one-off community repos. This file inventories the **maintained production set** (official reference + first-party vendor + a short list of community servers with 2026 commits). It does not dump 80,000 names. Count excluded from the keep-list: **13 official-archived + the dead npm packages above + the unmaintained long tail (~80,000+ listings with no commit after 2026-03-02).**

---

## 3. Client rules (read once)

| Client | stdio local | Remote HTTP/SSE | Notes |
|---|---|---|---|
| Grok Android / grok.com chat | no | no | xAI connectors only |
| Hosted claude.ai chat | no | yes | Settings → Connectors → Add custom connector. Connection originates from Anthropic IPs. |
| Claude Desktop | yes | yes | `claude_desktop_config.json` |
| Claude Code | yes | yes | `claude mcp add` writes `~/.claude.json`; project file is `.mcp.json` |
| Cursor | yes | yes | `~/.cursor/mcp.json` |
| VS Code Copilot | yes | yes | `.vscode/mcp.json` uses key `servers`, not `mcpServers` |
| Windsurf | yes | yes | `~/.codeium/windsurf/mcp_config.json` often uses `serverUrl` |

Config file paths to write:

- Claude Desktop macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Claude Desktop Linux: `~/.config/Claude/claude_desktop_config.json`
- Claude Desktop Windows: `%APPDATA%\Claude\claude_desktop_config.json`
- Claude Code user: `~/.claude.json`
- Claude Code / Cursor project: `.mcp.json` or `.cursor/mcp.json`
- Cursor user: `~/.cursor/mcp.json`
- VS Code: `.vscode/mcp.json`
- Windsurf: `~/.codeium/windsurf/mcp_config.json`

Restart / reload before anything appears:

1. Save the JSON.
2. Fully quit the client (Claude Desktop: Cmd-Q / Alt-F4, not just close the window).
3. Reopen.
4. Claude Code: run `claude mcp list` then `/mcp`.
5. Cursor: Settings → MCP → confirm green status.
6. VS Code: Command Palette → "MCP: List Servers".
7. Hosted claude.ai: Connectors list → Connect → complete OAuth → start a **new** chat.

---

# Servers by category

JSON blocks below use Claude Desktop / Cursor `mcpServers` shape unless noted. For VS Code wrap the same server object under `{"servers": { ... }}`. For Claude Code prefer the `claude mcp add` command in INSTALL.

---

## A. dev/code

### GitHub official MCP

- **Does:** Repos, issues, PRs, code search, Actions, releases, security alerts. Replaces the archived Anthropic GitHub reference server.
- **Official / vendor.** Repo `github/github-mcp-server`. Last commit 2026-08-27. Release v1.11.0 on 2026-08-25. ~32.7k stars.
- **Transport:** HTTP/SSE remote, or local stdio via Docker.
- **Clients:** Claude Desktop, Claude Code, Cursor, VS Code, Windsurf: yes. Hosted claude.ai: yes as a custom remote connector. Grok Android chat: no (use the already-connected Grok GitHub connector instead).
- **Auth:** OAuth 2.1 (VS Code and some hosts) or GitHub PAT (`Authorization: Bearer`). PAT takes precedence. Claude Code remote currently documents PAT, not OAuth.
- **INSTALL:**

```bash
# Remote (recommended). Create a classic or fine-grained PAT at
# https://github.com/settings/personal-access-tokens/new
# then add the server to the client.

# Claude Code
claude mcp add-json github '{"type":"http","url":"https://api.githubcopilot.com/mcp","headers":{"Authorization":"Bearer '