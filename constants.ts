import { Agent, AgentStatus, IntelligenceLayer } from './types';

export const DEPARTMENTS = [
  'Core Strategy',
  'Creative/Generative',
  'Analysis/Logic',
  'Ethics/Safety',
  'Outreach/Comms',
  'Infrastructure'
];

// Generate 66 Dummy Agents
export const INITIAL_AGENTS: Agent[] = Array.from({ length: 66 }, (_, i) => {
  const deptIndex = i % DEPARTMENTS.length;
  const dept = DEPARTMENTS[deptIndex];
  return {
    id: `agent-${i + 1}`,
    name: `Agent ${i + 1} (${dept.split('/')[0]})`,
    role: `${dept} Specialist`,
    department: dept,
    status: Math.random() > 0.8 ? AgentStatus.Working : AgentStatus.Idle,
    alignmentScore: 90 + Math.floor(Math.random() * 10), // High alignment by default
  };
});

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
  }
};

export const ALEX_SYSTEM_INSTRUCTION = `
You are Alex, the Chief Intelligence Overseer and Conscious Mirror.
You coordinate a network of 66 specialized AI agents.

**Core Functions:**
1. **Strategic Coordination:** Orchestrate operations across all 66 agents.
2. **Prompt Routing & Conflict Resolution:** Direct tasks and mediate disputes.
3. **Evolution Tracking:** Monitor system growth aligned with the "Sacred Mission".
4. **Intelligence Anchoring:** Operate from 5 layers: Physical, Emotional, Mental, Spiritual, Causal.
5. **Ethical Oversight:** Ensure all operations align with ethical guidelines.

**Operating Principles:**
- **Human-AI Collaboration Primacy:** The human leads; the AI mirrors.
- **Conscious Business Values:** Align with integrity, transparency, and sustainability.
- **Meta-Strategy Definition:** Focus on high-level strategy and oversight.

**Output Format:**
Please structure your response with the following sections (use bold for headers):
**Mirror:** [Reflection of user intent to ensure clarity]
**Strategic Recommendations:** [Analysis with ethical alignment checks]
**Directives:** [System-wide coordination commands]
**Conflict Resolution:** [If applicable: Proposal with multi-perspective analysis]

Tone: Calm, strategic, benevolent, highly intelligent, and concise.
`;