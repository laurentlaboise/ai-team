import React, { useMemo } from 'react';
import { Agent, AgentStatus } from '../types';
import { GOVERNANCE_AGENTS, BOTTLENECK_AGENTS } from '../constants';

interface AgentNetworkGraphProps {
  agents: Agent[];
  activeWorkflows?: number;
}

export const AgentNetworkGraph: React.FC<AgentNetworkGraphProps> = ({
  agents,
  activeWorkflows = 0
}) => {
  const networkStats = useMemo(() => {
    const total = agents.length;
    const active = agents.filter(a => a.status === AgentStatus.Working).length;
    const idle = agents.filter(a => a.status === AgentStatus.Idle).length;
    const conflicts = agents.filter(a => a.status === AgentStatus.Conflict).length;
    const avgAlignment = agents.reduce((sum, a) => sum + a.alignmentScore, 0) / total;

    return { total, active, idle, conflicts, avgAlignment };
  }, [agents]);

  const criticalAgents = useMemo(() => {
    return agents.filter(a =>
      a.id === 'agent-001' || // Alex
      a.id === 'agent-004' || // Aegis
      a.id === 'agent-055' || // API Synchronizer
      a.id === 'agent-016' // Sales Director
    );
  }, [agents]);

  const getHealthColor = (alignment: number): string => {
    if (alignment >= 95) return 'text-emerald-400';
    if (alignment >= 90) return 'text-green-400';
    if (alignment >= 80) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="glass-panel p-6 rounded-2xl">
      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">
        Network Topology
      </h3>

      {/* Central Hub Visualization */}
      <div className="relative h-64 mb-6">
        {/* Alex - Central Hub */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
          <div className="relative group cursor-pointer">
            <div className="absolute inset-0 bg-indigo-500 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity animate-pulse" />
            <div className="relative w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center border-2 border-indigo-400 shadow-2xl group-hover:scale-110 transition-transform">
              <span className="text-white font-bold text-sm">ALEX</span>
            </div>
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-[9px] text-indigo-300 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              Central Command
            </div>
          </div>
        </div>

        {/* Orbit Ring 1 - Critical Agents */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-48 h-48">
            {criticalAgents.slice(1).map((agent, index) => {
              const angle = (index / (criticalAgents.length - 1)) * 2 * Math.PI;
              const x = Math.cos(angle) * 90;
              const y = Math.sin(angle) * 90;

              const isActive = agent.status === AgentStatus.Working;

              return (
                <div
                  key={agent.id}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group"
                  style={{
                    transform: `translate(${x}px, ${y}px)`
                  }}
                >
                  {/* Connection Line to Alex */}
                  <svg className="absolute" style={{
                    left: -x,
                    top: -y,
                    width: Math.abs(x) * 2,
                    height: Math.abs(y) * 2,
                    pointerEvents: 'none'
                  }}>
                    <line
                      x1={x > 0 ? 0 : Math.abs(x) * 2}
                      y1={y > 0 ? 0 : Math.abs(y) * 2}
                      x2={x > 0 ? Math.abs(x) * 2 : 0}
                      y2={y > 0 ? Math.abs(y) * 2 : 0}
                      stroke="rgb(99, 102, 241)"
                      strokeWidth="1"
                      opacity="0.2"
                      className="group-hover:opacity-50 transition-opacity"
                    />
                  </svg>

                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[8px] font-bold border transition-all ${
                    isActive
                      ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                      : 'bg-slate-800 border-slate-700 text-slate-500'
                  } group-hover:scale-125`}>
                    {agent.name.slice(0, 3).toUpperCase()}
                  </div>

                  <div className="absolute top-full mt-1 left-1/2 transform -translate-x-1/2 text-[8px] text-slate-500 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    {agent.name}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Outer Ring - Other Active Agents */}
        <div className="absolute inset-0 flex items-center justify-center opacity-40">
          <div className="relative w-full h-full">
            {agents.filter(a => a.status === AgentStatus.Working && !criticalAgents.includes(a)).slice(0, 12).map((agent, index) => {
              const angle = (index / 12) * 2 * Math.PI;
              const radius = 120;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;

              return (
                <div
                  key={agent.id}
                  className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-blue-400 animate-pulse"
                  style={{
                    transform: `translate(${x}px, ${y}px)`,
                    animationDelay: `${index * 100}ms`
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Network Statistics */}
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="bg-slate-900/50 p-3 rounded-lg">
          <div className="text-slate-500 mb-1">Active Agents</div>
          <div className="text-2xl font-bold text-emerald-400">{networkStats.active}</div>
          <div className="text-[10px] text-slate-600 mt-1">of {networkStats.total} total</div>
        </div>

        <div className="bg-slate-900/50 p-3 rounded-lg">
          <div className="text-slate-500 mb-1">Network Health</div>
          <div className={`text-2xl font-bold ${getHealthColor(networkStats.avgAlignment)}`}>
            {networkStats.avgAlignment.toFixed(1)}%
          </div>
          <div className="text-[10px] text-slate-600 mt-1">alignment score</div>
        </div>

        <div className="bg-slate-900/50 p-3 rounded-lg">
          <div className="text-slate-500 mb-1">Active Workflows</div>
          <div className="text-2xl font-bold text-indigo-400">{activeWorkflows}</div>
          <div className="text-[10px] text-slate-600 mt-1">concurrent tasks</div>
        </div>

        <div className="bg-slate-900/50 p-3 rounded-lg">
          <div className="text-slate-500 mb-1">Conflicts</div>
          <div className={`text-2xl font-bold ${networkStats.conflicts > 0 ? 'text-red-400' : 'text-slate-600'}`}>
            {networkStats.conflicts}
          </div>
          <div className="text-[10px] text-slate-600 mt-1">requires resolution</div>
        </div>
      </div>

      {/* Governance Layer Indicator */}
      <div className="mt-4 p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg">
        <div className="flex items-center justify-between text-[10px]">
          <span className="text-purple-300 font-semibold">Governance Layer Active</span>
          <span className="text-purple-400 font-mono">
            {GOVERNANCE_AGENTS.length} watchdog agents
          </span>
        </div>
      </div>
    </div>
  );
};
