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

export enum AuthorityLevel {
  Autonomous = 'Autonomous',
  Execution = 'Execution',
  Advisory = 'Advisory'
}

export enum MessageType {
  Request = 'request',
  Response = 'response',
  Event = 'event',
  Alert = 'alert',
  Directive = 'directive'
}

export enum Priority {
  Low = 'low',
  Medium = 'medium',
  High = 'high',
  Critical = 'critical'
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  department: string;
  departmentId: string;
  status: AgentStatus;
  authority: AuthorityLevel;
  currentTask?: string;
  alignmentScore: number; // 0-100
  inputs: string[];
  outputs: string[];
  description: string;
  integrations: string[];
  priority: Priority;
  llmModel: string;
  active: boolean;
}

export interface Department {
  id: string;
  name: string;
  agentCount: number;
  description: string;
  agents?: Agent[];
}

export interface Message {
  id: string;
  role: 'user' | 'model' | 'system';
  text: string;
  timestamp: number;
  layersInvolved?: IntelligenceLayer[];
  strategicDirective?: boolean;
}

export interface InterAgentMessage {
  messageId: string;
  timestamp: string;
  fromAgent: string;
  toAgent: string;
  messageType: MessageType;
  priority: Priority;
  payload: {
    action: string;
    data: any;
    context?: any;
  };
  ethicsCheck: boolean;
  requiresHumanApproval: boolean;
  relatedMessages?: string[];
  ttl?: number;
}

export interface Event {
  eventType: string;
  eventId: string;
  timestamp: string;
  publisher: string;
  payload: any;
  subscribers: string[];
}

export interface WorkflowStep {
  step: number;
  action: string;
  agent: string;
  trigger?: string;
  output: any;
}

export interface Workflow {
  workflowId: string;
  name: string;
  description: string;
  steps: WorkflowStep[];
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  coordinator?: string;
}

export interface SystemMetrics {
  overallAlignment: number;
  activeConflicts: number;
  evolutionStage: string;
  layerStability: Record<IntelligenceLayer, number>; // 0-100
  activeAgents: number;
  totalMessages: number;
  averageResponseTime: number;
}

export interface ConflictScenario {
  id: string;
  description: string;
  agentsInvolved: string[];
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  resolution?: string;
  resolvedAt?: number;
}

export interface AgentRegistry {
  version: string;
  lastUpdated: string;
  totalAgents: number;
  departments: number;
  agents: Agent[];
  departmentSummary: Department[];
}
