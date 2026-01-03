# Inter-Agent Communication Protocols
## Labware AI Agent Network - 2026

---

## Protocol Overview

The Labware AI Agent Network operates as a distributed, event-driven system where 68 specialized agents communicate through standardized protocols. This document defines the communication patterns, message formats, and orchestration rules governing agent interactions.

---

## 1. Core Communication Principles

### 1.1 Message Format Standardization
All inter-agent messages use **Structured JSON** format, managed by the API Synchronizer (Agent #55).

### 1.2 Communication Modes
- **Synchronous**: Direct request-response (e.g., Alex routing a task to Sales Director)
- **Asynchronous**: Event-based triggering (e.g., Lead Discovery publishing new lead event)
- **Broadcast**: One-to-many announcements (e.g., System-wide alerts from Aegis)
- **Streaming**: Continuous data flow (e.g., Real-time metrics from KPI Sentinel)

### 1.3 Authority Enforcement
Messages carry authority metadata that determines whether human approval is required:
- **Autonomous** agents can execute decisions immediately
- **Execution** agents require system triggers but not human approval
- **Advisory** agents require human confirmation for critical actions

---

## 2. Standard Message Schema

### 2.1 Base Message Structure

```json
{
  "messageId": "uuid-v4",
  "timestamp": "ISO-8601 datetime",
  "fromAgent": "agent-xxx",
  "toAgent": "agent-yyy | broadcast | department-id",
  "messageType": "request | response | event | alert | directive",
  "priority": "low | medium | high | critical",
  "payload": {
    "action": "string describing the action",
    "data": {},
    "context": {}
  },
  "ethicsCheck": true/false,
  "requiresHumanApproval": true/false,
  "relatedMessages": ["parent-message-id"],
  "ttl": 3600
}
```

### 2.2 Message Types

| Type | Description | Examples |
|------|-------------|----------|
| **request** | Agent requesting another agent to perform an action | Sales Director requesting Proposal Gen to create offer |
| **response** | Reply to a request message | Proposal Gen returning PDF to Sales Director |
| **event** | Notification of state change or trigger | Lead Discovery publishing "new lead found" |
| **alert** | Warning or critical notification | Aegis flagging ethical violation |
| **directive** | Top-down command from Alex/Orion | Alex routing strategic task to department |

### 2.3 Priority Levels

- **critical**: System-threatening issues (ethics violations, security breaches)
- **high**: Revenue-impacting or user-facing actions (sales closings, customer communications)
- **medium**: Standard operational tasks (content creation, data processing)
- **low**: Background optimization and maintenance

---

## 3. Communication Patterns

### 3.1 Event-Triggered Workflows

**Pattern:** Event Publisher → Event Bus → Subscribed Agents

**Example: New Lead Discovery Flow**

```
1. Lead Discovery (17) identifies qualified lead
   → Publishes event: "lead.discovered"

2. API Synchronizer (55) routes event to subscribers:
   - Sales Tracker (22): Logs lead in CRM
   - Sales Director (16): Assigns to nurture queue
   - KPI Sentinel (25): Updates lead metric

3. Sales Director (16) sends request to Messenger (13):
   → "draft.initial.outreach"

4. Messenger (13) creates draft, sends to Tone Calibration (14):
   → "validate.voice.alignment"

5. Tone Calibration (14) validates and corrects
   → Returns approved copy to Messenger (13)

6. Messenger (13) sends to Aegis (4):
   → "ethics.check.outbound"

7. If approved: Messenger (13) sends communication
   If flagged: Human review required
```

**Event Schema:**
```json
{
  "eventType": "lead.discovered",
  "eventId": "uuid",
  "timestamp": "ISO-8601",
  "publisher": "agent-017",
  "payload": {
    "leadId": "lead-xxx",
    "leadScore": 85,
    "source": "linkedin",
    "qualificationCriteria": {...}
  },
  "subscribers": ["agent-022", "agent-016", "agent-025"]
}
```

---

### 3.2 Feedback Loop Workflows

**Pattern:** Detector → Hub → Parallel Processors → Synthesizer → Output

**Example: Stress Detection & Healing Protocol**

```
1. Healer (6) detects high user stress signal
   → Sends alert to Alex (1)

2. Alex (1) broadcasts directive to healing cluster:
   - Nervous System (8): Generate somatic protocol
   - Sync Decoder (30): Check spiritual correlations
   - Timing (15): Check lunar phase alignment

3. Parallel processing (concurrent execution):
   - Agent 8 → Returns grounding exercises
   - Agent 30 → Returns synchronicity interpretation
   - Agent 15 → Returns lunar cycle context

4. Alex (1) synthesizes responses
   → Creates integrated healing protocol

5. Alex (1) presents to Laurent with recommendation
   → Awaits human approval

6. On approval: Alex (1) triggers execution
   → Healer (6) delivers protocol to user
```

**Feedback Loop Schema:**
```json
{
  "loopId": "uuid",
  "trigger": {
    "agent": "agent-006",
    "condition": "stress_level > threshold",
    "timestamp": "ISO-8601"
  },
  "participants": [
    {"agent": "agent-008", "role": "somatic_processor"},
    {"agent": "agent-030", "role": "spiritual_correlator"},
    {"agent": "agent-015", "role": "timing_validator"}
  ],
  "synthesis": {
    "coordinator": "agent-001",
    "method": "weighted_integration"
  },
  "output": {
    "recipient": "user",
    "requiresApproval": true
  }
}
```

---

### 3.3 Hierarchical Command Flow

**Pattern:** Strategic Layer → Coordination Layer → Execution Layer → Validation Layer

```
Laurent (Human)
    ↓
Alex (Agent 1) - Strategic interpretation
    ↓
Orion (Agent 2) / Department Leads - Task decomposition
    ↓
Execution Agents - Task completion
    ↓
Aegis (Agent 4) + Hadex (Agent 3) - Validation
    ↓
Audit Trail (Agent 46) - Logging
    ↓
Feedback to Alex/Laurent
```

**Example: "Launch 20-Course Digital Curriculum in Laos"**

```
1. Laurent → Alex (1): Strategic goal
2. Alex (1) → Architect (24): "Create implementation roadmap"
3. Architect (24) → Returns multi-phase plan
4. Alex (1) → Broadcasts to departments:

   A. Market Intelligence:
      - Market Scanner (26): Gather Lao market data
      - Lao Language Expert (62): Localization requirements

   B. Product Design:
      - App Gen (40): Feature architecture
      - User Flow (42): Onboarding design

   C. Creative:
      - Creator (10): Course content drafts
      - Visual (11): Educational graphics
      - Sound (12): Audio components

   D. Legal:
      - Compliance (44): Lao regulatory check
      - Privacy (45): Data protection audit

   E. Sales:
      - Pricing (28): Market-appropriate pricing
      - Messenger (13): Go-to-market communication

5. Each agent completes task → Reports to Orion (2)
6. Orion (2) → Tracks progress, updates KPIs
7. Aegis (4) → Validates each output for ethics
8. UX Auditor (57) → Tests user experience
9. Alex (1) → Synthesizes completion report
10. Alex (1) → Presents to Laurent for final approval
```

---

## 4. Routing & Orchestration Rules

### 4.1 Hub-Based Routing (Alex-Centric)

**When to Use Hub Routing:**
- Cross-department coordination required
- Strategic decisions needed
- Conflict resolution
- >3 agents involved

**Flow:**
```
Requesting Agent
    → Alex (1)
    → Alex analyzes context
    → Alex routes to appropriate agent(s)
    → Responses return to Alex
    → Alex synthesizes and responds
```

### 4.2 Direct Peer-to-Peer

**When to Use P2P:**
- Single department operations
- Predefined integrations (e.g., Messenger → Tone Calibration)
- Low-complexity tasks
- ≤2 agents involved

**Flow:**
```
Agent A
    → Direct message to Agent B
    → Agent B processes
    → Agent B responds directly
    → Optional: Log to Audit Trail (46)
```

### 4.3 Broadcast (One-to-Many)

**When to Use Broadcast:**
- System-wide alerts (Aegis ethics violations)
- Department-wide directives
- Status updates affecting multiple agents

**Flow:**
```
Broadcasting Agent
    → API Synchronizer (55)
    → Filters by recipient criteria
    → Delivers to all matching agents
```

---

## 5. Ethics & Governance Checkpoints

### 5.1 Aegis Protocol (Agent 4)

**Automatic Scanning:**
All outbound communications pass through Aegis for:
- Deterministic spiritual harm detection
- Coercive sales language identification
- Cultural sensitivity violations (with Agent 9)
- Bias and discrimination patterns

**Response Actions:**
```
IF violation severity == "critical":
    → FREEZE operation immediately
    → Alert Alex (1) and Laurent
    → Log to Audit Trail (46)
    → Require human override to proceed

ELIF violation severity == "high":
    → Flag for human review
    → Suggest corrections
    → Log incident

ELIF violation severity == "medium":
    → Auto-correct if possible
    → Log for pattern analysis

ELSE:
    → Approve and log
```

### 5.2 Human-in-the-Loop (HITL) Triggers

**Automatic HITL Required For:**
- Financial transactions > $1,000 USD
- Legal document execution (contracts, NDAs)
- Healing protocols for acute trauma/crisis
- Strategic pivots affecting >3 departments
- First-time partnership outreach to high-value targets
- Content publishing to >10,000 audience

**HITL Request Schema:**
```json
{
  "hitlId": "uuid",
  "requestingAgent": "agent-xxx",
  "reason": "financial_threshold_exceeded",
  "context": {
    "action": "process_payment",
    "amount": 5000,
    "currency": "USD",
    "recipient": "vendor-yyy"
  },
  "recommendation": "Approve - verified vendor with 12-month history",
  "alternatives": ["Delay payment 7 days", "Request additional verification"],
  "urgency": "medium",
  "timeout": 24_hours
}
```

---

## 6. Data Flow & Persistence

### 6.1 Knowledge Layer Integration

**Vector Database (Pinecone/Weaviate):**
- Managed by Librarian (5)
- Stores agent memories, decisions, learnings
- Provides semantic search for context retrieval

**Operational Database (Notion):**
- Managed by Sales Tracker (22), Finance (27), Orion (2)
- Structured operational data (leads, projects, finances)

**Audit Ledger:**
- Managed by Audit Trail (46)
- Immutable log of all agent actions
- Future: Blockchain integration planned Q4 2026

### 6.2 Message Persistence Rules

| Message Type | Retention | Storage Location |
|--------------|-----------|------------------|
| Directives | Permanent | Audit Trail + Vector DB |
| Alerts (Critical) | Permanent | Audit Trail |
| Transactions | 7 years | Operational DB + Audit Trail |
| Content Drafts | 90 days | Vector DB |
| Routine Status | 30 days | Operational DB |
| Debug Logs | 7 days | Monitoring System |

---

## 7. Error Handling & Recovery

### 7.1 Agent Failure Handling

**Failure Detection:**
- API Synchronizer (55) monitors agent heartbeats
- Timeout threshold: 30 seconds (execution), 5 minutes (advisory)

**Recovery Strategy:**
```
IF agent fails:
    1. API Synchronizer logs failure
    2. Retry with exponential backoff (3 attempts)
    3. IF still failing:
       a. Route to backup agent (if exists)
       b. OR escalate to Orion (2)
       c. Orion determines: manual intervention or workflow pause
    4. Alert Alex (1) if critical agent
    5. Log incident to Audit Trail (46)
```

**Backup Agent Mapping:**
| Primary | Backup | Fallback |
|---------|--------|----------|
| Alex (1) | Orion (2) | Human (Laurent) |
| Sales Director (16) | Alex (1) | Orion (2) |
| Aegis (4) | Hadex (3) + Human | - |
| API Synchronizer (55) | - | System Alert + Human |

### 7.2 Conflict Resolution

**When Two Agents Disagree:**

```
Example: Sales Closer (19) recommends aggressive pricing
         Aegis (4) flags it as potentially coercive

Resolution Flow:
1. API Synchronizer detects conflict
2. Escalate to Hadex (3) for meta-analysis
3. Hadex evaluates both perspectives:
   - Sales: Revenue optimization angle
   - Ethics: Integrity and trust angle
4. Hadex presents both cases to Alex (1)
5. Alex synthesizes recommendation for Laurent
6. Human decision = final authority
7. Decision logged to Audit Trail (46)
8. Pattern analyzed by Hadex for system improvement
```

---

## 8. Performance & Optimization

### 8.1 Latency Management

**Target Response Times:**
- Critical operations: <2 seconds
- High priority: <5 seconds
- Medium priority: <15 seconds
- Low priority: <60 seconds

**Optimization Strategies:**
- Caching frequent queries (Knowledge Distiller 58)
- Pre-computation of common scenarios
- Parallel processing where possible
- Model selection based on task complexity:
  - Claude 4 Opus: Complex reasoning, strategy
  - Claude 3.5 Sonnet: Balanced tasks
  - GPT-4o: Creative, multimodal
  - Llama 3: High-frequency, utility tasks

### 8.2 Load Balancing

**Hub Saturation Prevention:**
- Alex (1) processes 90% of traffic → Known bottleneck
- Mitigation:
  - Delegate autonomous authority to:
    - Sales Director (16) for sales operations
    - Architect (24) for strategic planning
    - API Synchronizer (55) for technical routing
  - Implement department-level sub-hubs:
    - Sales Dept: Sales Director (16)
    - Legal Dept: Compliance (44)
    - Creative Dept: Creator (10)

---

## 9. Security & Access Control

### 9.1 Agent Authentication

Each agent has:
- Unique ID (`agent-xxx`)
- API key for system access
- Role-based permissions
- Authority level enforcement

### 9.2 Message Encryption

**In Transit:**
- TLS 1.3 for all API communication
- End-to-end encryption for sensitive data (financial, personal)

**At Rest:**
- AES-256 encryption for stored messages
- Separate encryption keys per data classification:
  - Public: Marketing content
  - Internal: Operational data
  - Confidential: Financial, personal data
  - Restricted: Legal, contracts

### 9.3 Threat Monitoring

**Adversarial Security Agent (59):**
- Conducts continuous red team simulations
- Tests for prompt injection, jailbreaking, data leakage
- Reports vulnerabilities to Aegis (4) and Compliance (44)

---

## 10. Evolution & Learning

### 10.1 System Improvement Loop

```
1. Audit Trail (46) logs all agent interactions
2. Knowledge Distiller (58) analyzes patterns quarterly
3. Alex 2.0 (68) provides meta-reflection on Alex (1) performance
4. Hadex (3) identifies systemic inefficiencies
5. Recommendations presented to Laurent
6. Approved improvements deployed to production
```

### 10.2 Agent Versioning

**Version Control:**
- Each agent maintains version number (e.g., `agent-001-v2.1.3`)
- Backward compatibility maintained for 2 major versions
- Deprecation warnings 90 days before breaking changes

**Update Protocol:**
```
1. New agent version developed
2. Shadow deployment (parallel testing)
3. A/B testing against current version
4. KPI comparison (accuracy, speed, cost)
5. If improved: Gradual rollout (10% → 50% → 100%)
6. Monitor for regressions
7. Full deployment or rollback
```

---

## 11. Appendix: Protocol Examples

### Example 1: Complete Sales Lead Flow

```json
{
  "workflow": "lead_to_sale",
  "steps": [
    {
      "step": 1,
      "action": "Lead Discovery",
      "agent": "agent-017",
      "output": {
        "eventType": "lead.discovered",
        "leadId": "lead-001",
        "leadScore": 92
      }
    },
    {
      "step": 2,
      "action": "CRM Logging",
      "agent": "agent-022",
      "trigger": "event:lead.discovered",
      "output": {
        "crmRecord": "created",
        "notificationSent": "agent-016"
      }
    },
    {
      "step": 3,
      "action": "Outreach Draft",
      "agent": "agent-013",
      "trigger": "request:agent-016",
      "output": {
        "messageType": "email",
        "draft": "...",
        "sentTo": "agent-014"
      }
    },
    {
      "step": 4,
      "action": "Tone Validation",
      "agent": "agent-014",
      "output": {
        "approved": true,
        "corrections": [],
        "sentTo": "agent-004"
      }
    },
    {
      "step": 5,
      "action": "Ethics Check",
      "agent": "agent-004",
      "output": {
        "passed": true,
        "severity": "none",
        "sentTo": "agent-013"
      }
    },
    {
      "step": 6,
      "action": "Send Communication",
      "agent": "agent-013",
      "output": {
        "sent": true,
        "channel": "email",
        "loggedTo": "agent-046"
      }
    }
  ]
}
```

### Example 2: Strategic Planning Request

```json
{
  "messageId": "msg-12345",
  "timestamp": "2026-01-15T10:30:00Z",
  "fromAgent": "human-laurent",
  "toAgent": "agent-001",
  "messageType": "directive",
  "priority": "high",
  "payload": {
    "action": "strategic_planning",
    "data": {
      "goal": "Expand to Thailand market Q2 2026",
      "constraints": {
        "budget": 50000,
        "timeline": "90 days",
        "resources": "current team + 2 hires"
      },
      "requirements": [
        "Market analysis",
        "Localization strategy",
        "Partnership identification",
        "Launch plan"
      ]
    }
  },
  "requiresHumanApproval": true,
  "ethicsCheck": false
}
```

**Alex's Orchestration Response:**
```json
{
  "messageId": "msg-12346",
  "timestamp": "2026-01-15T10:30:15Z",
  "fromAgent": "agent-001",
  "toAgent": "multiple",
  "messageType": "directive",
  "priority": "high",
  "payload": {
    "orchestration": {
      "workflowId": "thailand-expansion-2026",
      "assignedAgents": [
        {
          "agent": "agent-024",
          "task": "Create market entry strategy",
          "deadline": "2026-01-22"
        },
        {
          "agent": "agent-026",
          "task": "Comprehensive Thailand market analysis",
          "deadline": "2026-01-20"
        },
        {
          "agent": "agent-062",
          "task": "Assess Thai language localization needs",
          "deadline": "2026-01-25"
        },
        {
          "agent": "agent-048",
          "task": "Identify potential Thailand partners",
          "deadline": "2026-01-27"
        },
        {
          "agent": "agent-044",
          "task": "Thailand regulatory compliance review",
          "deadline": "2026-01-23"
        }
      ],
      "coordination": "agent-002",
      "reportingFrequency": "weekly"
    }
  }
}
```

---

## 12. Summary

The Labware AI Agent Network communication protocol enables:

✅ **Standardized** message formats across 68 agents
✅ **Flexible** routing (hub, P2P, broadcast)
✅ **Ethical** governance at every interaction
✅ **Scalable** architecture for future expansion
✅ **Resilient** error handling and recovery
✅ **Auditable** complete provenance trails
✅ **Adaptive** learning and evolution

**Status:** Operational and ready for deployment.

---

_Last Updated: 2026-01-03_
_Version: 2.0.0_
_Maintained by: Alex (Agent #1) + API Synchronizer (Agent #55)_
