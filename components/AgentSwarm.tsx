import React, { useMemo } from 'react';
import { Agent, AgentStatus } from '../types';

interface AgentSwarmProps {
  agents: Agent[];
}

export const AgentSwarm: React.FC<AgentSwarmProps> = ({ agents }) => {
  const getStatusColor = (status: AgentStatus) => {
    switch (status) {
      case AgentStatus.Working: return 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]';
      case AgentStatus.Conflict: return 'bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]';
      case AgentStatus.Collaborating: return 'bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.6)]';
      case AgentStatus.Idle: return 'bg-slate-600 opacity-50';
      case AgentStatus.Offline: return 'bg-slate-800 opacity-20 border border-slate-700';
      default: return 'bg-slate-500';
    }
  };

  // Group agents by department for better visualization
  const agentsByDept = useMemo(() => {
      const groups: Record<string, Agent[]> = {};
      agents.forEach(a => {
          if (!groups[a.department]) groups[a.department] = [];
          groups[a.department].push(a);
      });
      return groups;
  }, [agents]);

  return (
    <div className="glass-panel p-6 rounded-2xl h-full overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
         <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Agent Swarm Network</h3>
         <span className="text-xs font-mono text-slate-500">{agents.length} Nodes Active</span>
      </div>
      
      <div className="space-y-8">
        {Object.entries(agentsByDept).map(([dept, deptAgents]) => (
            <div key={dept}>
                <h4 className="text-xs text-indigo-300 mb-3 font-mono border-b border-slate-800 pb-1">{dept}</h4>
                <div className="grid grid-cols-12 gap-2">
                    {(deptAgents as Agent[]).map((agent) => (
                    <div 
                        key={agent.id}
                        title={`${agent.name}\nStatus: ${agent.status}\nAlignment: ${agent.alignmentScore}%`}
                        className={`h-3 w-3 rounded-full transition-all duration-300 hover:scale-150 cursor-help ${getStatusColor(agent.status)}`}
                    />
                    ))}
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};