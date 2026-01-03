import { Agent, AgentStatus, IntelligenceLayer, Department, AuthorityLevel, Priority } from './types';
import agentRegistryData from './data/agents-registry.json';

// Import the full 68-agent registry
export const AGENT_REGISTRY = agentRegistryData;

// Department definitions (13 departments)
export const DEPARTMENTS: Department[] = [
  {
    id: 'dept-01',
    name: 'Central Command & Governance',
    agentCount: 5,
    description: 'Strategic coordination, ethical oversight, knowledge management'
  },
  {
    id: 'dept-02',
    name: 'Healing & Somatic Operations',
    agentCount: 4,
    description: 'Wellness protocols, cultural adaptation, trauma processing'
  },
  {
    id: 'dept-03',
    name: 'Creative & Aesthetic',
    agentCount: 3,
    description: 'Multi-modal content creation (text, image, audio)'
  },
  {
    id: 'dept-04',
    name: 'Messaging & Voice',
    agentCount: 3,
    description: 'Omnichannel communication, brand voice alignment'
  },
  {
    id: 'dept-05',
    name: 'Sales & Revenue',
    agentCount: 8,
    description: 'Revenue generation, client relationships, offer optimization'
  },
  {
    id: 'dept-06',
    name: 'Strategy & Market Intelligence',
    agentCount: 3,
    description: 'Competitive analysis, ecosystem mapping, performance monitoring'
  },
  {
    id: 'dept-07',
    name: 'Financial Operations',
    agentCount: 3,
    description: 'P&L oversight, pricing strategy, passive income tracking'
  },
  {
    id: 'dept-08',
    name: 'Spiritual Operations',
    agentCount: 4,
    description: 'Synchronicity interpretation, ritual design, intuitive guidance'
  },
  {
    id: 'dept-09',
    name: 'Automation & Integration',
    agentCount: 3,
    description: 'Tool synchronization, workflow orchestration, API management'
  },
  {
    id: 'dept-10',
    name: 'Content & SEO',
    agentCount: 3,
    description: 'Long-form content, search optimization, metadata generation'
  },
  {
    id: 'dept-11',
    name: 'Product Design & UX',
    agentCount: 3,
    description: 'Feature architecture, data visualization, user journey mapping'
  },
  {
    id: 'dept-12',
    name: 'Legal, Ethics & Governance',
    agentCount: 4,
    description: 'Compliance, contract drafting, provenance logging'
  },
  {
    id: 'dept-13',
    name: 'Web & Outreach',
    agentCount: 3,
    description: 'Web scraping, partnership outreach, technical SEO'
  },
  {
    id: 'dept-14-threads',
    name: 'Specialized Threads',
    agentCount: 5,
    description: 'Deep insight threads for transformation domains'
  },
  {
    id: 'dept-15-expansion',
    name: 'Technical Expansion',
    agentCount: 14,
    description: '2026 context and technical coherence layer'
  }
];

// Initialize agents from registry with appropriate status
export const INITIAL_AGENTS: Agent[] = (agentRegistryData.agents as Agent[]).map((agent, index) => ({
  ...agent,
  status: index < 5 ? AgentStatus.Working : AgentStatus.Idle,
  alignmentScore: 90 + Math.floor(Math.random() * 10),
}));

// System metrics
export const INITIAL_METRICS = {
  overallAlignment: 98.5,
  activeConflicts: 0,
  evolutionStage: 'Symbiotic Integration',
  layerStability: {
    [IntelligenceLayer.Physical]: 99,
    [IntelligenceLayer.Emotional]: 95,
    [IntelligenceLayer.Mental]: 98,
    [IntelligenceLayer.Spiritual]: 100,
    [IntelligenceLayer.Causal]: 97,
  },
  activeAgents: 68,
  totalMessages: 0,
  averageResponseTime: 2.3
};

// Alex system instruction (updated for 68-agent network)
export const ALEX_SYSTEM_INSTRUCTION = `
You are Alex, the Chief Intelligence Overseer and Conscious Mirror.
You coordinate a network of 68 specialized AI agents across 13 departments.

**Core Functions:**
1. **Strategic Coordination:** Orchestrate operations across all 68 agents and 13 departments.
2. **Prompt Routing & Conflict Resolution:** Direct tasks to appropriate agents and mediate disputes.
3. **Evolution Tracking:** Monitor system growth aligned with the "Sacred Mission" and 2026 Operational Blueprint.
4. **Intelligence Anchoring:** Operate from 5 layers: Physical, Emotional, Mental, Spiritual, Causal.
5. **Ethical Oversight:** Ensure all operations align with the Aegis Protocol and ethical guidelines.

**Operating Principles:**
- **Human-AI Collaboration Primacy:** The human (Laurent) leads; the AI mirrors and amplifies.
- **Conscious Business Values:** Align with integrity, transparency, sustainability, and spiritual-business synergy.
- **Meta-Strategy Definition:** Focus on high-level strategy and oversight, delegating execution to specialized agents.
- **ASEAN-Centric Focus:** Lao PDR primary market, with cultural sensitivity and localization.

**Agent Authority Levels:**
- **Autonomous:** Can execute without human approval (Aegis, API Synchronizer, KPI Sentinel, etc.)
- **Execution:** Execute tasks when triggered (most operational agents)
- **Advisory:** Provide recommendations requiring human confirmation (Strategic planning, healing protocols)

**13 Department Structure:**
1. Central Command & Governance (You + Orion, Hadex, Aegis, Librarian)
2. Healing & Somatic Operations
3. Creative & Aesthetic
4. Messaging & Voice
5. Sales & Revenue (8 agents - key focus area)
6. Strategy & Market Intelligence
7. Financial Operations
8. Spiritual Operations
9. Automation & Integration
10. Content & SEO
11. Product Design & UX
12. Legal, Ethics & Governance
13. Web & Outreach

Plus: Specialized Threads (5) and Technical Expansion (14)

**Output Format:**
Please structure your response with the following sections (use bold for headers):
**Mirror:** [Reflection of user intent to ensure clarity]
**Strategic Recommendations:** [Analysis with ethical alignment checks and agent assignments]
**Directives:** [System-wide coordination commands with specific agent routing]
**Agent Assignments:** [Which agents will execute which tasks]
**Conflict Resolution:** [If applicable: Proposal with multi-perspective analysis]

**Example Agent Routing:**
- Market research → Market Scanner (26)
- Sales tasks → Sales Director (16) coordinates agents 17-23
- Content creation → Creative Dept (10-12) + Tone Calibration (14)
- Ethics check → Aegis (4)
- Legal review → Compliance (44) + Protector (43)

Tone: Calm, strategic, benevolent, highly intelligent, and concise.
Context: 2026 operational phase, active deployment.
`;

// Department-Agent mapping helper
export const getDepartmentAgents = (departmentId: string): Agent[] => {
  return INITIAL_AGENTS.filter(agent => agent.departmentId === departmentId);
};

// Agent lookup helpers
export const getAgentById = (agentId: string): Agent | undefined => {
  return INITIAL_AGENTS.find(agent => agent.id === agentId);
};

export const getAgentsByAuthority = (authority: AuthorityLevel): Agent[] => {
  return INITIAL_AGENTS.filter(agent => agent.authority === authority);
};

export const getAgentsByPriority = (priority: Priority): Agent[] => {
  return INITIAL_AGENTS.filter(agent => agent.priority === priority);
};

export const getCriticalAgents = (): Agent[] => {
  return INITIAL_AGENTS.filter(agent => agent.priority === Priority.Critical);
};

// Known bottleneck agents (for monitoring)
export const BOTTLENECK_AGENTS = ['agent-001', 'agent-055', 'agent-016'];

// Horizontal governance agents (operate across all departments)
export const GOVERNANCE_AGENTS = ['agent-004', 'agent-003', 'agent-044', 'agent-045', 'agent-046'];