/**
 * Workflow Engine
 *
 * Implements event-triggered and feedback loop workflows for the agent network.
 * Demonstrates the key workflow patterns from the operational blueprint.
 */

import { Agent, Event, Workflow, WorkflowStep, InterAgentMessage, MessageType, Priority } from '../types';

/**
 * Event Bus
 * Centralized event publishing and subscription system
 */
export class EventBus {
  private subscribers: Map<string, Set<(event: Event) => void>> = new Map();
  private eventHistory: Event[] = [];

  /**
   * Subscribe to a specific event type
   */
  subscribe(eventType: string, callback: (event: Event) => void): () => void {
    if (!this.subscribers.has(eventType)) {
      this.subscribers.set(eventType, new Set());
    }

    this.subscribers.get(eventType)!.add(callback);

    // Return unsubscribe function
    return () => {
      const callbacks = this.subscribers.get(eventType);
      if (callbacks) {
        callbacks.delete(callback);
      }
    };
  }

  /**
   * Publish an event to all subscribers
   */
  publish(event: Event): void {
    this.eventHistory.push(event);

    const callbacks = this.subscribers.get(event.eventType);
    if (callbacks) {
      callbacks.forEach(callback => {
        try {
          callback(event);
        } catch (error) {
          console.error(`Error in event handler for ${event.eventType}:`, error);
        }
      });
    }

    // Also trigger wildcard subscribers
    const wildcardCallbacks = this.subscribers.get('*');
    if (wildcardCallbacks) {
      wildcardCallbacks.forEach(callback => callback(event));
    }
  }

  /**
   * Get event history for debugging/audit
   */
  getHistory(eventType?: string): Event[] {
    if (eventType) {
      return this.eventHistory.filter(e => e.eventType === eventType);
    }
    return [...this.eventHistory];
  }

  /**
   * Clear history (for memory management)
   */
  clearHistory(): void {
    this.eventHistory = [];
  }
}

/**
 * Workflow Engine
 * Executes multi-step workflows with event triggers
 */
export class WorkflowEngine {
  private eventBus: EventBus;
  private activeWorkflows: Map<string, Workflow> = new Map();

  constructor(eventBus?: EventBus) {
    this.eventBus = eventBus || new EventBus();
    this.setupDefaultEventHandlers();
  }

  /**
   * Setup default event handlers for common workflows
   */
  private setupDefaultEventHandlers(): void {
    // Lead Discovery → Outreach Workflow
    this.eventBus.subscribe('lead.discovered', (event: Event) => {
      console.log('[Workflow] Lead discovered, initiating outreach workflow', event.payload);

      const workflow = this.createWorkflow({
        name: 'Lead to Outreach',
        description: 'Process new lead from discovery to initial outreach',
        coordinator: 'agent-016',
        steps: [
          {
            step: 1,
            action: 'Log lead in CRM',
            agent: 'agent-022',
            trigger: 'event:lead.discovered',
            output: null
          },
          {
            step: 2,
            action: 'Notify Sales Director',
            agent: 'agent-016',
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
      });

      this.executeWorkflow(workflow.workflowId);
    });

    // Stress Detection → Healing Protocol Workflow
    this.eventBus.subscribe('stress.detected', (event: Event) => {
      console.log('[Workflow] Stress detected, initiating healing workflow', event.payload);

      const workflow = this.createWorkflow({
        name: 'Stress to Healing Protocol',
        description: 'Detect stress and deliver integrated healing protocol',
        coordinator: 'agent-001',
        steps: [
          {
            step: 1,
            action: 'Alert Alex',
            agent: 'agent-001',
            trigger: 'event:stress.detected',
            output: null
          },
          {
            step: 2,
            action: 'Generate somatic protocol',
            agent: 'agent-008',
            trigger: 'parallel:1',
            output: null
          },
          {
            step: 3,
            action: 'Check spiritual correlations',
            agent: 'agent-030',
            trigger: 'parallel:1',
            output: null
          },
          {
            step: 4,
            action: 'Check lunar alignment',
            agent: 'agent-015',
            trigger: 'parallel:1',
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
            action: 'Request human approval',
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
      });

      this.executeWorkflow(workflow.workflowId);
    });

    // Strategic Planning Workflow
    this.eventBus.subscribe('strategic.planning.requested', (event: Event) => {
      console.log('[Workflow] Strategic planning requested', event.payload);

      const workflow = this.createWorkflow({
        name: 'Strategic Planning',
        description: `Strategic planning for: ${event.payload.goal}`,
        coordinator: 'agent-001',
        steps: [
          {
            step: 1,
            action: 'Create strategic roadmap',
            agent: 'agent-024',
            output: null
          },
          {
            step: 2,
            action: 'Market research',
            agent: 'agent-026',
            trigger: 'parallel:1',
            output: null
          },
          {
            step: 3,
            action: 'Assess localization',
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
          }
        ]
      });

      this.executeWorkflow(workflow.workflowId);
    });

    // Content Creation → Publishing Workflow
    this.eventBus.subscribe('content.creation.requested', (event: Event) => {
      console.log('[Workflow] Content creation requested', event.payload);

      const workflow = this.createWorkflow({
        name: 'Content Creation & Publishing',
        description: 'Create and publish content across channels',
        coordinator: 'agent-013',
        steps: [
          {
            step: 1,
            action: 'Generate content',
            agent: event.payload.contentType === 'visual' ? 'agent-011' : 'agent-010',
            output: null
          },
          {
            step: 2,
            action: 'Optimize for SEO',
            agent: 'agent-037',
            trigger: 'step:1:complete',
            output: null
          },
          {
            step: 3,
            action: 'Tone calibration',
            agent: 'agent-014',
            trigger: 'step:2:complete',
            output: null
          },
          {
            step: 4,
            action: 'Ethics check',
            agent: 'agent-004',
            trigger: 'step:3:complete',
            output: null
          },
          {
            step: 5,
            action: 'Schedule posting',
            agent: 'agent-015',
            trigger: 'step:4:approved',
            output: null
          },
          {
            step: 6,
            action: 'Publish content',
            agent: 'agent-013',
            trigger: 'step:5:complete',
            output: null
          }
        ]
      });

      this.executeWorkflow(workflow.workflowId);
    });
  }

  /**
   * Create a new workflow
   */
  createWorkflow(config: {
    name: string;
    description: string;
    coordinator: string;
    steps: Omit<WorkflowStep, 'output'>[];
  }): Workflow {
    const workflowId = `wf-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const workflow: Workflow = {
      workflowId,
      name: config.name,
      description: config.description,
      status: 'pending',
      coordinator: config.coordinator,
      steps: config.steps.map(step => ({ ...step, output: null }))
    };

    this.activeWorkflows.set(workflowId, workflow);

    // Publish workflow created event
    this.eventBus.publish({
      eventType: 'workflow.created',
      eventId: `evt-${Date.now()}`,
      timestamp: new Date().toISOString(),
      publisher: 'workflow-engine',
      payload: { workflowId, name: config.name },
      subscribers: []
    });

    return workflow;
  }

  /**
   * Execute a workflow (simulated)
   */
  async executeWorkflow(workflowId: string): Promise<void> {
    const workflow = this.activeWorkflows.get(workflowId);
    if (!workflow) {
      console.error(`Workflow ${workflowId} not found`);
      return;
    }

    console.log(`[Workflow] Executing workflow: ${workflow.name}`);
    workflow.status = 'in_progress';

    this.eventBus.publish({
      eventType: 'workflow.started',
      eventId: `evt-${Date.now()}`,
      timestamp: new Date().toISOString(),
      publisher: 'workflow-engine',
      payload: { workflowId, name: workflow.name },
      subscribers: []
    });

    // Simulated execution (in real implementation, this would coordinate actual agent calls)
    for (const step of workflow.steps) {
      console.log(`[Workflow] Executing step ${step.step}: ${step.action} (Agent: ${step.agent})`);

      // Simulate step execution delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Mark step as complete
      step.output = {
        status: 'completed',
        timestamp: new Date().toISOString(),
        result: `Simulated output from ${step.agent}`
      };

      this.eventBus.publish({
        eventType: 'workflow.step.completed',
        eventId: `evt-${Date.now()}`,
        timestamp: new Date().toISOString(),
        publisher: 'workflow-engine',
        payload: { workflowId, step: step.step, agent: step.agent },
        subscribers: []
      });
    }

    workflow.status = 'completed';

    this.eventBus.publish({
      eventType: 'workflow.completed',
      eventId: `evt-${Date.now()}`,
      timestamp: new Date().toISOString(),
      publisher: 'workflow-engine',
      payload: { workflowId, name: workflow.name },
      subscribers: []
    });

    console.log(`[Workflow] Completed workflow: ${workflow.name}`);
  }

  /**
   * Get workflow status
   */
  getWorkflow(workflowId: string): Workflow | undefined {
    return this.activeWorkflows.get(workflowId);
  }

  /**
   * Get all active workflows
   */
  getActiveWorkflows(): Workflow[] {
    return Array.from(this.activeWorkflows.values()).filter(
      wf => wf.status === 'in_progress' || wf.status === 'pending'
    );
  }

  /**
   * Get event bus for external event publishing
   */
  getEventBus(): EventBus {
    return this.eventBus;
  }

  /**
   * Trigger a specific workflow by event
   */
  triggerEvent(eventType: string, payload: any): void {
    this.eventBus.publish({
      eventType,
      eventId: `evt-${Date.now()}`,
      timestamp: new Date().toISOString(),
      publisher: 'external',
      payload,
      subscribers: []
    });
  }
}

// Export singleton instance
export const workflowEngine = new WorkflowEngine();

/**
 * Pre-defined workflow triggers for common operations
 */
export const WorkflowTriggers = {
  /**
   * Trigger lead discovery workflow
   */
  leadDiscovered: (leadData: any) => {
    workflowEngine.triggerEvent('lead.discovered', leadData);
  },

  /**
   * Trigger stress detection workflow
   */
  stressDetected: (stressData: any) => {
    workflowEngine.triggerEvent('stress.detected', stressData);
  },

  /**
   * Trigger strategic planning workflow
   */
  requestStrategicPlanning: (goal: string, requirements: any) => {
    workflowEngine.triggerEvent('strategic.planning.requested', { goal, requirements });
  },

  /**
   * Trigger content creation workflow
   */
  requestContentCreation: (contentType: 'text' | 'visual' | 'audio', specs: any) => {
    workflowEngine.triggerEvent('content.creation.requested', { contentType, specs });
  }
};
