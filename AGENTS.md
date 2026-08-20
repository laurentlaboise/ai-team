# Labware AI Agent Network

This repository is the Labware product dashboard: a Vite + React + TypeScript app that visualizes and operates the 68-agent Labware organism documented in the README and `data/agents-registry.json`.

**Founder / lead:** Laurent Laboise  
**Product:** [labware.icu](https://labware.icu)  
**Canonical registry:** `data/agents-registry.json` (68 agents, 13 departments)  
**Architecture:** `docs/architecture.md`, `docs/protocols.md`, `docs/master-genesis-file.md`

Do not invent a new agent roster. Extend the existing registry and documentation.

## Cursor Cloud specific instructions

These rules apply to Cursor Cloud Agents working in this repo. They do **not** mean 68 live Cursor seats.

### The 68 agents are the product, not Cursor seats

The 68 entries in `data/agents-registry.json` are Labware *product* personas (Alex, Orion, Aegis, and the rest of the organism on labware.icu). They are dashboard roles, workflows, and UI — not 68 concurrent Cursor Cloud Agent seats.

**Hot crew is 8–12.** When doing work here, operate with a small active crew, not a 68-seat swarm. Laurent leads.

### How to run locally

```bash
npm install
npm run dev
```

The Vite app listens on **http://localhost:3000** (`vite.config.ts`). Chat works in demo mode without a Gemini key. Do **not** add, commit, or request a Gemini API key unless Laurent explicitly asks. Do **not** deploy.

Typecheck (no emit):

```bash
npm run typecheck
```

Production build (only when asked; do not deploy):

```bash
npm run build
```

### Where the 68-agent registry lives

| What | Path |
| --- | --- |
| Agent roster (source of truth) | `data/agents-registry.json` |
| Typed models | `types.ts` |
| Registry + department constants | `constants.ts` |
| Workflows | `services/workflowEngine.ts` |
| Alex / Gemini (demo mode if no key) | `services/geminiService.ts` |
| Dashboard UI | `App.tsx`, `components/` |

Add or change agents by extending the registry, not by inventing a parallel philosophy.

### Approval tiers (Laurent leads)

| Tier | Actions | Required |
| --- | --- | --- |
| **T1** | Drafts, local edits, typecheck, docs, PRs that do not send/publish/deploy | Proceed |
| **T2** | Send, publish, or deploy (email, social, Vercel/Netlify/Pages, live product) | Explicit **yes** from Laurent |
| **T3** | Money, legal, or delete (payments, contracts, destructive data/repo/prod) | **Typed confirm** from Laurent |

T1 is the default for Cloud Agent work in this repo. T2/T3 stay blocked until Laurent answers with the required confirmation. Human-in-the-loop product rules in `docs/protocols.md` (finance, legal, healing, multi-department pivots) still apply.

### Out of scope unless asked

- Adding a Gemini key or `.env.local` secrets
- Deploying to Vercel, Netlify, or GitHub Pages
- Rewriting the dashboard UI
- Treating the 68-agent registry as 68 live Cursor workers
