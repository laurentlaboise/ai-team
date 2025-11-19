export enum IntelligenceLayer {
  Physical = 'Physical',
  Emotional = 'Emotional',
  Mental = 'Mental',
  Spiritual = 'Spiritual',
  Causal = 'Causal'
}

export enum AgentStatus {
  Idle = 'Idle',
  Working = 'Working',
  Collaborating = 'Collaborating',
  Conflict = 'Conflict',
  Offline = 'Offline'
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  department: string;
  status: AgentStatus;
  currentTask?: string;
  alignmentScore: number; // 0-100
}

export interface Message {
  id: string;
  role: 'user' | 'model' | 'system';
  text: string;
  timestamp: number;
  layersInvolved?: IntelligenceLayer[];
  strategicDirective?: boolean;
}

export interface SystemMetrics {
  overallAlignment: number;
  activeConflicts: number;
  evolutionStage: string;
  layerStability: Record<IntelligenceLayer, number>; // 0-100
}

export interface ConflictScenario {
  id: string;
  description: string;
  agentsInvolved: string[];
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
}
