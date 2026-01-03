import React, { useState, useMemo } from 'react';
import { Agent, Department, AgentStatus, AuthorityLevel } from '../types';
import { Shield, Zap, Info, ChevronDown, ChevronRight } from 'lucide-react';

interface DepartmentViewProps {
  departments: Department[];
  agents: Agent[];
}

export const DepartmentView: React.FC<DepartmentViewProps> = ({ departments, agents }) => {
  const [expandedDepts, setExpandedDepts] = useState<Set<string>>(new Set(['dept-01']));

  const toggleDepartment = (deptId: string) => {
    const newExpanded = new Set(expandedDepts);
    if (newExpanded.has(deptId)) {
      newExpanded.delete(deptId);
    } else {
      newExpanded.add(deptId);
    }
    setExpandedDepts(newExpanded);
  };

  const getAgentsByDepartment = (deptId: string): Agent[] => {
    return agents.filter(agent => agent.departmentId === deptId);
  };

  const getStatusColor = (status: AgentStatus): string => {
    switch (status) {
      case AgentStatus.Working: return 'text-emerald-400';
      case AgentStatus.Conflict: return 'text-red-500';
      case AgentStatus.Collaborating: return 'text-blue-400';
      case AgentStatus.Idle: return 'text-slate-500';
      case AgentStatus.Offline: return 'text-slate-700';
      default: return 'text-slate-500';
    }
  };

  const getAuthorityBadge = (authority: AuthorityLevel): {
    color: string;
    icon: React.ReactNode;
    label: string;
  } => {
    switch (authority) {
      case AuthorityLevel.Autonomous:
        return {
          color: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
          icon: <Zap size={10} />,
          label: 'Auto'
        };
      case AuthorityLevel.Execution:
        return {
          color: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
          icon: <Shield size={10} />,
          label: 'Exec'
        };
      case AuthorityLevel.Advisory:
        return {
          color: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
          icon: <Info size={10} />,
          label: 'Adv'
        };
    }
  };

  const departmentStats = useMemo(() => {
    return departments.map(dept => {
      const deptAgents = getAgentsByDepartment(dept.id);
      return {
        ...dept,
        working: deptAgents.filter(a => a.status === AgentStatus.Working).length,
        idle: deptAgents.filter(a => a.status === AgentStatus.Idle).length,
        avgAlignment: deptAgents.length > 0
          ? deptAgents.reduce((sum, a) => sum + a.alignmentScore, 0) / deptAgents.length
          : 0
      };
    });
  }, [departments, agents]);

  return (
    <div className="space-y-2 h-full overflow-y-auto pr-2">
      <div className="mb-4 flex justify-between items-center">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">
          Department Overview
        </h3>
        <span className="text-xs text-slate-500 font-mono">
          {departments.length} Departments • {agents.length} Agents
        </span>
      </div>

      {departmentStats.map(dept => {
        const isExpanded = expandedDepts.has(dept.id);
        const deptAgents = getAgentsByDepartment(dept.id);

        return (
          <div
            key={dept.id}
            className="glass-panel rounded-lg overflow-hidden transition-all duration-200 hover:border-indigo-500/30"
          >
            {/* Department Header */}
            <button
              onClick={() => toggleDepartment(dept.id)}
              className="w-full p-3 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-3 flex-1">
                <div className={`transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}>
                  <ChevronRight size={16} className="text-slate-400" />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm font-semibold text-white">{dept.name}</h4>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-700 text-slate-300 font-mono">
                      {dept.agentCount}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-tight">{dept.description}</p>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <div className="flex items-center gap-2 text-[10px]">
                    <span className="text-emerald-400 font-mono">{dept.working || 0} active</span>
                    <span className="text-slate-600">•</span>
                    <span className="text-slate-500 font-mono">{dept.idle || 0} idle</span>
                  </div>
                  <div className="text-[10px] text-indigo-400 font-mono">
                    {dept.avgAlignment?.toFixed(1)}% aligned
                  </div>
                </div>
              </div>
            </button>

            {/* Agent List (Expandable) */}
            {isExpanded && (
              <div className="border-t border-slate-800 bg-slate-900/30">
                {deptAgents.length === 0 ? (
                  <div className="p-4 text-center text-xs text-slate-600">
                    No agents in this department
                  </div>
                ) : (
                  <div className="divide-y divide-slate-800/50">
                    {deptAgents.map(agent => {
                      const authorityBadge = getAuthorityBadge(agent.authority);

                      return (
                        <div
                          key={agent.id}
                          className="p-3 hover:bg-white/5 transition-colors group"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-start gap-3 flex-1">
                              {/* Status Indicator */}
                              <div className={`w-2 h-2 rounded-full mt-1.5 ${getStatusColor(agent.status).replace('text-', 'bg-')}`} />

                              {/* Agent Info */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-xs font-semibold text-white truncate">
                                    {agent.name}
                                  </span>
                                  <span className="text-[9px] text-slate-500 font-mono">
                                    {agent.id}
                                  </span>
                                </div>

                                <p className="text-[10px] text-slate-400 mb-2 leading-tight">
                                  {agent.role}
                                </p>

                                <div className="flex flex-wrap gap-1.5 text-[9px]">
                                  {/* Authority Badge */}
                                  <span className={`px-1.5 py-0.5 rounded border flex items-center gap-1 ${authorityBadge.color}`}>
                                    {authorityBadge.icon}
                                    {authorityBadge.label}
                                  </span>

                                  {/* Priority Badge */}
                                  <span className="px-1.5 py-0.5 rounded bg-slate-700 text-slate-300">
                                    {agent.priority}
                                  </span>

                                  {/* LLM Model */}
                                  <span className="px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-mono">
                                    {agent.llmModel.split('-')[0]}
                                  </span>
                                </div>

                                {/* Current Task (if any) */}
                                {agent.currentTask && (
                                  <div className="mt-2 p-2 bg-slate-800/50 rounded text-[10px] text-slate-400">
                                    <span className="text-amber-400 font-semibold">Current:</span> {agent.currentTask}
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Alignment Score */}
                            <div className="flex flex-col items-end gap-1 text-right">
                              <div className="text-xs font-mono text-indigo-300">
                                {agent.alignmentScore}%
                              </div>
                              <div className="w-12 h-1 bg-slate-800 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all"
                                  style={{ width: `${agent.alignmentScore}%` }}
                                />
                              </div>
                            </div>
                          </div>

                          {/* Agent Details (hover reveal) */}
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity mt-2 pt-2 border-t border-slate-800/50">
                            <div className="grid grid-cols-2 gap-2 text-[9px]">
                              <div>
                                <span className="text-slate-600">Inputs:</span>
                                <div className="text-slate-400 mt-0.5">
                                  {agent.inputs.slice(0, 2).join(', ')}
                                  {agent.inputs.length > 2 && ` +${agent.inputs.length - 2}`}
                                </div>
                              </div>
                              <div>
                                <span className="text-slate-600">Outputs:</span>
                                <div className="text-slate-400 mt-0.5">
                                  {agent.outputs.slice(0, 2).join(', ')}
                                  {agent.outputs.length > 2 && ` +${agent.outputs.length - 2}`}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
