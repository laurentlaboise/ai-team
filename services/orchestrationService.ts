/**
 * Orchestration Service
 *
 * Core routing and communication logic for the 68-agent network.
 * Handles message routing, workflow coordination, and agent communication.
 */

import {
  Agent,
  InterAgentMessage,
  MessageType,
  Priority,
  Event,
  Workflow,
  AuthorityLevel
} from '../types';
import {
  getAgentById,
  getDepartmentAgents,
  GOVERNANCE_AGENTS,
  BOTTLENECK_AGENTS
} from '../constants';

// Simple UUID generator
const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

/**
 * Agent Router
 * Determines the best agent(s) to handle a specific task
 */
export class AgentRouter {
  /**
   * Route a task to the appropriate agent(s)
   */
  static route(task: string, context?: any): string[] {
    const taskLower = task.toLowerCase();
    const agentIds: string[] = [];

    // Sales-related routing
    if (taskLower.includes('lead') || taskLower.includes('prospect')) {
      agentIds.push('agent-017'); // Lead Discovery
      if (taskLower.includes('nurture') || taskLower.includes('follow')) {
        agentIds.push('agent-018'); // Lead Nurturing
      }
    }

    // Content creation routing
    if (taskLower.includes('content') || taskLower.includes('write') || taskLower.includes('blog')) {
      agentIds.push('agent-010'); // Creator
      if (taskLower.includes('seo')) {
        agentIds.push('agent-037'); // SEO Optimizer
      }
    }

    // Visual content
    if (taskLower.includes('image') || taskLower.includes('visual') || taskLower.includes('design')) {
      agentIds.push('agent-011'); // Visual
    }

    // Market research
    if (taskLower.includes('market') || taskLower.includes('research') || taskLower.includes('competitor')) {
      agentIds.push('agent-026'); // Market Scanner
    }

    // Strategic planning
    if (taskLower.includes('strategy') || taskLower.includes('plan') || taskLower.includes('roadmap')) {
      agentIds.push('agent-024'); // Architect
    }

    // Financial tasks
    if (taskLower.includes('finance') || taskLower.includes('pricing') || taskLower.includes('revenue')) {
      agentIds.push('agent-027'); // Finance
      if (taskLower.includes('pricing')) {
        agentIds.push('agent-028'); // Pricing
      }
    }

    // Healing/wellness
    if (taskLower.includes('heal') || taskLower.includes('wellness') || taskLower.includes('stress')) {
      agentIds.push('agent-006'); // Healer
      if (taskLower.includes('somatic') || taskLower.includes('nervous')) {
        agentIds.push('agent-008'); // Nervous System
      }
    }

    // Spiritual
    if (taskLower.includes('spiritual') || taskLower.includes('ritual') || taskLower.includes('sync')) {
      agentIds.push('agent-030'); // Sync Decoder
    }

    // Legal/compliance
    if (taskLower.includes('legal') || taskLower.includes('contract') || taskLower.includes('compliance')) {
      agentIds.push('agent-043'); // Protector
      agentIds.push('agent-044'); // Compliance
    }

    // Lao-specific
    if (taskLower.includes('lao') || taskLower.includes('laos')) {
      agentIds.push('agent-009'); // Lao Market Liaison
      agentIds.push('agent-062'); // Lao Language Expert
    }

    // Default to Alex if no specific routing found
    if (agentIds.length === 0) {
      agentIds.push('agent-001'); // Alex
    }

    // Always include Aegis for ethics check on sensitive topics
    if (taskLower.includes('sales') || taskLower.includes('spiritual') || taskLower.includes('healing')) {
      if (!agentIds.includes('agent-004')) {
        agentIds.push('agent-004'); // Aegis
      }
    }

    return agentIds;
  }

  /**
   * Get the department hub for a given department
   */
  static getDepartmentHub(departmentId: string): string {
    const hubMapping: Record<string, string> = {
      'dept-01': 'agent-001', // Alex
      'dept-05': 'agent-016', // Sales Director
      'dept-09': 'agent-055', // API Synchronizer
      'dept-12': 'agent-044', // Compliance
    };

    return hubMapping[departmentId] || 'agent-001'; // Default to Alex
  }
}

/**
 * Message Builder
 * Constructs properly formatted inter-agent messages
 */
export class MessageBuilder {
  static createMessage(
    fromAgent: string,
    toAgent: string,
    action: string,
    data: any,
    messageType: MessageType = MessageType.Request,
    priority: Priority = Priority.Medium
  ): InterAgentMessage {
    return {
      messageId: uuidv4(),
      timestamp: new Date().toISOString(),
      fromAgent,
      toAgent,
      messageType,
      priority,
      payload: {
        action,
        data,
      },
      ethicsCheck: this.requiresEthicsCheck(action, data),
      requiresHumanApproval: this.requiresHumanApproval(action, data, priority),
      ttl: 3600, // 1 hour default
    };
  }

  static createEvent(
    eventType: string,
    publisher: string,
    payload: any,
    subscribers: string[]
  ): Event {
    return {
      eventType,
      eventId: uuidv4(),
      timestamp: new Date().toISOString(),
      publisher,
      payload,
      subscribers,
    };
  }

  private static requiresEthicsCheck(action: string, data: any): boolean {
    const ethicsKeywords = [
      'sales', 'outreach', 'communication', 'spiritual',
      'healing', 'ritual', 'offer', 'pricing'
    ];

    const actionLower = action.toLowerCase();
    return ethicsKeywords.some(keyword => actionLower.includes(keyword));
  }

  private static requiresHumanApproval(action: string, data: any, priority: Priority): boolean {
    // Critical priority always requires approval
    if (priority === Priority.Critical) return true;

    // Financial thresholds
    if (data.amount && data.amount > 1000) return true;

    // Legal documents
    if (action.includes('contract') || action.includes('legal')) return true;

    // Healing for acute cases
    if (action.includes('healing') && data.severity === 'acute') return true;

    // Strategic pivots
    if (action.includes('strategic') && action.includes('pivot')) return true;

    return false;
  }
}

/**
 * Workflow Orchestrator
 * Manages multi-step workflows across agents
 */
export class WorkflowOrchestrator {
  private activeWorkflows: Map<string, Workflow> = new Map();

  /**
   * Example: Lead Discovery → Nurturing → Outreach Workflow
   */
  createLeadWorkflow(leadData: any): Workflow {
    const workflow: Workflow = {
      workflowId: uuidv4(),
      name: 'Lead to Outreach',
      description: 'Process new lead from discovery to initial outreach',
      status: 'pending',
      coordinator: 'agent-016', // Sales Director
      steps: [
        {
          step: 1,
          action: 'Discover and qualify lead',
          agent: 'agent-017',
          output: null
        },
        {
          step: 2,
          action: 'Log in CRM',
          agent: 'agent-022',
          trigger: 'step:1:complete',
          output: null
        },
        {
          step: 3,
          action: 'Draft initial outreach',
          agent: 'agent-013',
          trigger: 'step:2:complete',
          output: null
        },
        {
          step: 4,
          action: 'Validate tone and voice',
          agent: 'agent-014',
          trigger: 'step:3:complete',
          output: null
        },
        {
          step: 5,
          action: 'Ethics check',
          agent: 'agent-004',
          trigger: 'step:4:complete',
          output: null
        },
        {
          step: 6,
          action: 'Send communication',
          agent: 'agent-013',
          trigger: 'step:5:approved',
          output: null
        }
      ]
    };

    this.activeWorkflows.set(workflow.workflowId, workflow);
    return workflow;
  }

  /**
   * Example: Stress Detection → Healing Protocol Workflow
   */
  createHealingWorkflow(stressData: any): Workflow {
    const workflow: Workflow = {
      workflowId: uuidv4(),
      name: 'Stress to Healing Protocol',
      description: 'Detect stress and deliver integrated healing protocol',
      status: 'pending',
      coordinator: 'agent-001', // Alex
      steps: [
        {
          step: 1,
          action: 'Detect stress signal',
          agent: 'agent-006',
          output: null
        },
        {
          step: 2,
          action: 'Generate somatic protocol',
          agent: 'agent-008',
          trigger: 'step:1:complete',
          output: null
        },
        {
          step: 3,
          action: 'Check spiritual correlations',
          agent: 'agent-030',
          trigger: 'step:1:complete',
          output: null
        },
        {
          step: 4,
          action: 'Check lunar alignment',
          agent: 'agent-015',
          trigger: 'step:1:complete',
          output: null
        },
        {
          step: 5,
          action: 'Synthesize protocol',
          agent: 'agent-001',
          trigger: 'step:2,3,4:complete',
          output: null
        },
        {
          step: 6,
          action: 'Human approval',
          agent: 'human-laurent',
          trigger: 'step:5:complete',
          output: null
        },
        {
          step: 7,
          action: 'Deliver protocol',
          agent: 'agent-006',
          trigger: 'step:6:approved',
          output: null
        }
      ]
    };

    this.activeWorkflows.set(workflow.workflowId, workflow);
    return workflow;
  }

  /**
   * Example: Strategic Planning Workflow
   */
  createStrategicPlanningWorkflow(goal: string, requirements: any): Workflow {
    const workflow: Workflow = {
      workflowId: uuidv4(),
      name: 'Strategic Planning',
      description: `Strategic planning for: ${goal}`,
      status: 'pending',
      coordinator: 'agent-001', // Alex
      steps: [
        {
          step: 1,
          action: 'Create strategic roadmap',
          agent: 'agent-024',
          output: null
        },
        {
          step: 2,
          action: 'Market research and analysis',
          agent: 'agent-026',
          trigger: 'parallel:1',
          output: null
        },
        {
          step: 3,
          action: 'Assess Lao localization needs',
          agent: 'agent-062',
          trigger: 'parallel:1',
          output: null
        },
        {
          step: 4,
          action: 'Financial feasibility',
          agent: 'agent-027',
          trigger: 'parallel:1',
          output: null
        },
        {
          step: 5,
          action: 'Compliance review',
          agent: 'agent-044',
          trigger: 'parallel:1',
          output: null
        },
        {
          step: 6,
          action: 'Synthesize plan',
          agent: 'agent-001',
          trigger: 'step:1,2,3,4,5:complete',
          output: null
        },
        {
          step: 7,
          action: 'Human review and approval',
          agent: 'human-laurent',
          trigger: 'step:6:complete',
          output: null
        }
      ]
    };

    this.activeWorkflows.set(workflow.workflowId, workflow);
    return workflow;
  }

  getWorkflow(workflowId: string): Workflow | undefined {
    return this.activeWorkflows.get(workflowId);
  }

  updateWorkflowStep(workflowId: string, stepNumber: number, output: any): void {
    const workflow = this.activeWorkflows.get(workflowId);
    if (workflow) {
      const step = workflow.steps.find(s => s.step === stepNumber);
      if (step) {
        step.output = output;
      }
    }
  }

  completeWorkflow(workflowId: string): void {
    const workflow = this.activeWorkflows.get(workflowId);
    if (workflow) {
      workflow.status = 'completed';
    }
  }

  failWorkflow(workflowId: string): void {
    const workflow = this.activeWorkflows.get(workflowId);
    if (workflow) {
      workflow.status = 'failed';
    }
  }
}

/**
 * Ethics Validator
 * Implements the Aegis Protocol for ethical checks
 */
export class EthicsValidator {
  /**
   * Scan content for ethical violations
   */
  static async scanContent(content: string, context: any): Promise<{
    passed: boolean;
    severity: 'none' | 'low' | 'medium' | 'high' | 'critical';
    violations: string[];
    corrections?: string;
  }> {
    const violations: string[] = [];
    let severity: 'none' | 'low' | 'medium' | 'high' | 'critical' = 'none';

    const contentLower = content.toLowerCase();

    // Check for deterministic spiritual harm
    if (this.checkDeterministicSpiritual(contentLower)) {
      violations.push('Deterministic spiritual predictions detected');
      severity = 'high';
    }

    // Check for coercive sales language
    if (this.checkCoerciveSales(contentLower)) {
      violations.push('Coercive sales language detected');
      severity = 'high';
    }

    // Check for cultural insensitivity (Lao context)
    if (context.targetMarket === 'lao' && this.checkCulturalSensitivity(contentLower)) {
      violations.push('Potential cultural insensitivity detected');
      severity = severity === 'high' ? 'high' : 'medium';
    }

    // Check for bias
    if (this.checkBias(contentLower)) {
      violations.push('Potential bias detected');
      severity = severity === 'none' ? 'medium' : severity;
    }

    return {
      passed: violations.length === 0,
      severity,
      violations,
      corrections: violations.length > 0 ? this.suggestCorrections(content, violations) : undefined
    };
  }

  private static checkDeterministicSpiritual(content: string): boolean {
    const deterministicKeywords = [
      'will definitely', 'guaranteed spiritual outcome',
      'your destiny is', 'you will meet your twin flame on'
    ];
    return deterministicKeywords.some(keyword => content.includes(keyword));
  }

  private static checkCoerciveSales(content: string): boolean {
    const coerciveKeywords = [
      'limited time only', 'act now or lose',
      'once in a lifetime', 'you must buy'
    ];
    return coerciveKeywords.some(keyword => content.includes(keyword));
  }

  private static checkCulturalSensitivity(content: string): boolean {
    // Placeholder for cultural sensitivity checks specific to Lao culture
    const insensitiveKeywords = ['backwards', 'primitive', 'underdeveloped'];
    return insensitiveKeywords.some(keyword => content.includes(keyword));
  }

  private static checkBias(content: string): boolean {
    // Placeholder for bias detection
    return false;
  }

  private static suggestCorrections(content: string, violations: string[]): string {
    // Return suggested corrections based on violations
    return `Consider revising to remove: ${violations.join(', ')}`;
  }
}

/**
 * Performance Monitor
 * Tracks agent performance and system health
 */
export class PerformanceMonitor {
  private static metrics: Map<string, {
    totalMessages: number;
    avgResponseTime: number;
    successRate: number;
    lastActive: Date;
  }> = new Map();

  static trackMessage(agentId: string, responseTime: number, success: boolean): void {
    const current = this.metrics.get(agentId) || {
      totalMessages: 0,
      avgResponseTime: 0,
      successRate: 100,
      lastActive: new Date()
    };

    current.totalMessages += 1;
    current.avgResponseTime = (current.avgResponseTime * (current.totalMessages - 1) + responseTime) / current.totalMessages;
    current.successRate = ((current.successRate * (current.totalMessages - 1)) + (success ? 100 : 0)) / current.totalMessages;
    current.lastActive = new Date();

    this.metrics.set(agentId, current);
  }

  static getAgentMetrics(agentId: string) {
    return this.metrics.get(agentId);
  }

  static getBottleneckAlerts(): string[] {
    const alerts: string[] = [];

    BOTTLENECK_AGENTS.forEach(agentId => {
      const metrics = this.metrics.get(agentId);
      if (metrics && metrics.avgResponseTime > 5000) { // 5 second threshold
        alerts.push(`${agentId} experiencing high latency: ${metrics.avgResponseTime.toFixed(0)}ms`);
      }
    });

    return alerts;
  }

  static resetMetrics(): void {
    this.metrics.clear();
  }
}

/**
 * Main Orchestration Service
 * Coordinates all orchestration functions
 */
export class OrchestrationService {
  private router: typeof AgentRouter;
  private messageBuilder: typeof MessageBuilder;
  private workflowOrchestrator: WorkflowOrchestrator;
  private ethicsValidator: typeof EthicsValidator;
  private performanceMonitor: typeof PerformanceMonitor;

  constructor() {
    this.router = AgentRouter;
    this.messageBuilder = MessageBuilder;
    this.workflowOrchestrator = new WorkflowOrchestrator();
    this.ethicsValidator = EthicsValidator;
    this.performanceMonitor = PerformanceMonitor;
  }

  /**
   * Main routing function
   */
  async routeTask(task: string, context?: any): Promise<{
    agents: string[];
    messages: InterAgentMessage[];
    workflow?: Workflow;
  }> {
    // Determine which agents should handle this task
    const agentIds = this.router.route(task, context);

    // Create messages for each agent
    const messages = agentIds.map(agentId =>
      this.messageBuilder.createMessage(
        'agent-001', // From Alex
        agentId,
        task,
        context,
        MessageType.Request,
        Priority.Medium
      )
    );

    // For complex tasks, create a workflow
    let workflow: Workflow | undefined;
    if (agentIds.length > 3 || task.toLowerCase().includes('plan')) {
      workflow = this.workflowOrchestrator.createStrategicPlanningWorkflow(task, context);
    }

    return { agents: agentIds, messages, workflow };
  }

  /**
   * Validate message with ethics check
   */
  async validateMessage(message: InterAgentMessage): Promise<boolean> {
    if (!message.ethicsCheck) return true;

    const result = await this.ethicsValidator.scanContent(
      JSON.stringify(message.payload.data),
      message.payload.context || {}
    );

    return result.passed;
  }

  /**
   * Get workflow orchestrator
   */
  getWorkflowOrchestrator(): WorkflowOrchestrator {
    return this.workflowOrchestrator;
  }

  /**
   * Track performance
   */
  trackPerformance(agentId: string, responseTime: number, success: boolean): void {
    this.performanceMonitor.trackMessage(agentId, responseTime, success);
  }

  /**
   * Get system health status
   */
  getSystemHealth(): {
    bottleneckAlerts: string[];
    totalActiveWorkflows: number;
  } {
    return {
      bottleneckAlerts: this.performanceMonitor.getBottleneckAlerts(),
      totalActiveWorkflows: this.workflowOrchestrator['activeWorkflows'].size
    };
  }
}

// Export singleton instance
export const orchestrationService = new OrchestrationService();
