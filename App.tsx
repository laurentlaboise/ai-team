import React, { useState, useEffect, useRef } from 'react';
import {
  ShieldCheck,
  Activity,
  MessageSquare,
  Cpu,
  AlertTriangle,
  Send,
  Zap,
  LayoutDashboard,
  Settings,
  Eye,
  Network
} from 'lucide-react';
import { Agent, Message, SystemMetrics, AgentStatus } from './types';
import { INITIAL_AGENTS, INITIAL_METRICS, DEPARTMENTS } from './constants';
import { sendMessageToAlex, resolveConflict } from './services/geminiService';
import { LayerVisualizer } from './components/LayerVisualizer';
import { AgentSwarm } from './components/AgentSwarm';
import { DepartmentView } from './components/DepartmentView';
import { AgentNetworkGraph } from './components/AgentNetworkGraph';
import { workflowEngine, WorkflowTriggers } from './services/workflowEngine';

const App: React.FC = () => {
  // Application State
  const [agents, setAgents] = useState<Agent[]>(INITIAL_AGENTS);
  const [metrics, setMetrics] = useState<SystemMetrics>(INITIAL_METRICS);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init',
      role: 'model',
      text: '**Mirror:** I am online and anchored in the Causal plane.\n**Strategic Recommendations:** The grid is stable (98.5% alignment). I am ready to coordinate the 66 agents for the Sacred Mission.\n**Directives:** Awaiting your command.',
      timestamp: Date.now(),
      layersInvolved: []
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'agents' | 'network' | 'departments'>('dashboard');
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [activeWorkflows, setActiveWorkflows] = useState(0);

  // Subscribe to workflow events
  useEffect(() => {
    const unsubscribe = workflowEngine.getEventBus().subscribe('*', () => {
      setActiveWorkflows(workflowEngine.getActiveWorkflows().length);
    });
    return unsubscribe;
  }, []);

  // Scroll chat to bottom
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Handlers
  const handleSendMessage = async () => {
    if (!inputText.trim() || isThinking) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: inputText,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsThinking(true);

    // Simulate some agent activity changes based on interaction
    const updatedAgents = agents.map(a => 
      Math.random() > 0.9 ? { ...a, status: AgentStatus.Working } : a
    );
    setAgents(updatedAgents);

    try {
      const responseText = await sendMessageToAlex(messages, inputText, { agents, metrics });
      
      const modelMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: Date.now(),
        strategicDirective: responseText.includes('Directive')
      };

      setMessages(prev => [...prev, modelMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsThinking(false);
    }
  };

  const handleInjectConflict = async () => {
    setIsThinking(true);
    // Pick two random departments
    const dept1 = DEPARTMENTS[0];
    const dept2 = DEPARTMENTS[1];
    
    const conflictDesc = `${dept1} wants to accelerate output speed, but ${dept2} flags a violation of safety protocols.`;
    
    // Update state to show conflict
    setAgents(prev => prev.map(a => {
        if (a.department === dept1 || a.department === dept2) {
            return { ...a, status: AgentStatus.Conflict };
        }
        return a;
    }));
    
    const conflictMsg: Message = {
        id: Date.now().toString(),
        role: 'system',
        text: `ALERT: Conflict detected between ${dept1} and ${dept2}. "${conflictDesc}"`,
        timestamp: Date.now()
    };
    setMessages(prev => [...prev, conflictMsg]);

    const resolution = await resolveConflict(conflictDesc);
    
    const alexResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: resolution,
        timestamp: Date.now()
    };
    setMessages(prev => [...prev, alexResponse]);
    
    // Reset agents after resolution (simulated delay)
    setTimeout(() => {
         setAgents(INITIAL_AGENTS);
         setMessages(prev => [...prev, {
             id: Date.now().toString(),
             role: 'system',
             text: 'Conflict resolved. Harmony restored.',
             timestamp: Date.now()
         }]);
    }, 5000);

    setIsThinking(false);
  };

  return (
    <div className="flex h-screen w-full bg-alex-bg text-slate-200">
      {/* Sidebar Navigation */}
      <nav className="w-20 flex flex-col items-center py-8 border-r border-slate-800 bg-alex-bg z-20">
        <div className="mb-10 p-3 bg-indigo-500/10 rounded-xl text-indigo-400">
            <Cpu size={28} />
        </div>
        
        <div className="flex flex-col gap-8 w-full">
            <button
                onClick={() => setActiveTab('dashboard')}
                className={`p-3 w-full flex justify-center transition-all border-l-2 ${activeTab === 'dashboard' ? 'border-indigo-500 text-white bg-white/5' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
                title="Dashboard"
            >
                <LayoutDashboard size={24} />
            </button>
            <button
                onClick={() => setActiveTab('departments')}
                className={`p-3 w-full flex justify-center transition-all border-l-2 ${activeTab === 'departments' ? 'border-indigo-500 text-white bg-white/5' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
                title="Departments (13)"
            >
                <Eye size={24} />
            </button>
            <button
                onClick={() => setActiveTab('network')}
                className={`p-3 w-full flex justify-center transition-all border-l-2 ${activeTab === 'network' ? 'border-indigo-500 text-white bg-white/5' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
                title="Network Graph"
            >
                <Network size={24} />
            </button>
            <button
                onClick={() => setActiveTab('agents')}
                className={`p-3 w-full flex justify-center transition-all border-l-2 ${activeTab === 'agents' ? 'border-indigo-500 text-white bg-white/5' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
                title="Agent Swarm"
            >
                <Activity size={24} />
            </button>
        </div>

        <div className="mt-auto mb-4">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]"></div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        
        {/* Header / Top Bar */}
        <header className="h-16 border-b border-slate-800 flex items-center justify-between px-8 bg-alex-bg/90 backdrop-blur-sm z-10">
            <div className="flex items-center gap-4">
                <h1 className="text-xl font-bold tracking-tight text-white">ALEX <span className="text-slate-500 font-light">| Overseer & Conscious Mirror</span></h1>
                <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-xs font-mono border border-indigo-500/30">
                    2026 Blueprint
                </span>
                <span className="text-xs text-slate-500">
                    68 Agents • 13 Departments
                </span>
            </div>

            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-sm text-slate-400">
                    <ShieldCheck size={16} className="text-emerald-400" />
                    <span>Mission Alignment: <span className="text-white font-mono">{metrics.overallAlignment}%</span></span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                    <Activity size={16} className="text-indigo-400" />
                    <span>Active: <span className="text-white font-mono">{agents.filter(a => a.status === AgentStatus.Working).length}</span></span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                    <Zap size={16} className="text-purple-400" />
                    <span>Workflows: <span className="text-white font-mono">{activeWorkflows}</span></span>
                </div>
                <button 
                    onClick={handleInjectConflict}
                    className="flex items-center gap-2 px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 rounded-md text-xs transition-all"
                >
                    <AlertTriangle size={14} />
                    Simulate Conflict
                </button>
            </div>
        </header>

        {/* Main Content Area */}
        <div className="flex-1 flex overflow-hidden">

            {/* Dashboard View - Chat Interface */}
            {activeTab === 'dashboard' && (
            <div className="flex-1 flex flex-col min-w-0 max-w-4xl mx-auto w-full border-r border-slate-800/50">
                <div 
                    ref={chatContainerRef}
                    className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth"
                >
                    {messages.map((msg) => (
                        <div 
                            key={msg.id} 
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`max-w-[80%] rounded-2xl p-5 relative overflow-hidden ${
                                msg.role === 'user' 
                                    ? 'bg-indigo-600 text-white' 
                                    : msg.role === 'system'
                                    ? 'bg-rose-900/30 border border-rose-700 text-rose-200 w-full text-center'
                                    : 'bg-slate-800 border border-slate-700 text-slate-200 shadow-lg'
                            }`}>
                                {/* Avatar/Icon */}
                                {msg.role !== 'user' && msg.role !== 'system' && (
                                    <div className="absolute top-4 left-4 p-1.5 bg-indigo-500/20 rounded-lg">
                                        <Zap size={16} className="text-indigo-400" />
                                    </div>
                                )}
                                
                                <div className={`${msg.role === 'model' ? 'pl-10' : ''}`}>
                                    {/* Name label */}
                                    <p className="text-xs font-bold opacity-50 mb-2 uppercase tracking-wider">
                                        {msg.role === 'model' ? 'Alex' : msg.role === 'system' ? 'System Alert' : 'Laurent'}
                                    </p>
                                    
                                    {/* Message Body - handle line breaks */}
                                    <div className="whitespace-pre-wrap leading-relaxed text-sm font-light">
                                        {msg.text.split('**').map((part, i) => {
                                            // Basic markdown parsing for Bold sections (like Mirror:, Directive:)
                                            if (i % 2 === 1) return <span key={i} className="font-bold text-indigo-200 block mt-2 mb-1">{part}</span>;
                                            return part;
                                        })}
                                    </div>
                                    
                                    {/* Strategic Tag */}
                                    {msg.strategicDirective && (
                                        <div className="mt-3 pt-3 border-t border-white/10 flex items-center gap-2 text-xs text-emerald-300">
                                            <ShieldCheck size={12} />
                                            <span>Directive Logged & Propagated</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                    
                    {isThinking && (
                        <div className="flex justify-start">
                            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-4 flex items-center gap-3">
                                <div className="flex space-x-1">
                                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                </div>
                                <span className="text-xs text-slate-400">Alex is analyzing 5-layer resonance...</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Input Area */}
                <div className="p-6 bg-alex-bg/50 backdrop-blur-sm border-t border-slate-800">
                    <div className="relative max-w-4xl mx-auto">
                        <input 
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                            placeholder="Enter strategic command or inquiry..."
                            className="w-full bg-slate-900 border border-slate-700 rounded-xl py-4 pl-6 pr-14 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all shadow-inner font-mono text-sm"
                        />
                        <button 
                            onClick={handleSendMessage}
                            disabled={!inputText.trim() || isThinking}
                            className="absolute right-2 top-2 p-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <Send size={20} />
                        </button>
                    </div>
                    <div className="text-center mt-3">
                         <p className="text-[10px] text-slate-600">
                            Operating Principle: Human-AI Collaboration Primacy. You lead, I mirror.
                         </p>
                    </div>
                </div>
            </div>
            )}

            {/* Departments View */}
            {activeTab === 'departments' && (
            <div className="flex-1 p-6 overflow-hidden">
                <DepartmentView departments={DEPARTMENTS} agents={agents} />
            </div>
            )}

            {/* Network View */}
            {activeTab === 'network' && (
            <div className="flex-1 p-6 overflow-y-auto">
                <div className="max-w-4xl mx-auto space-y-6">
                    <AgentNetworkGraph agents={agents} activeWorkflows={activeWorkflows} />
                    <LayerVisualizer stability={metrics.layerStability} />
                </div>
            </div>
            )}

            {/* Agent Swarm View */}
            {activeTab === 'agents' && (
            <div className="flex-1 p-6 overflow-y-auto">
                <AgentSwarm agents={agents} />
            </div>
            )}

            {/* Right Sidebar: Visualizations (only show on dashboard) */}
            {activeTab === 'dashboard' && (
            <div className="w-80 border-l border-slate-800 bg-alex-bg/50 p-6 flex flex-col gap-6 overflow-y-auto hidden xl:flex">
                <AgentNetworkGraph agents={agents} activeWorkflows={activeWorkflows} />
                <LayerVisualizer stability={metrics.layerStability} />
                
                {/* Mini System Log */}
                <div className="glass-panel p-4 rounded-xl flex-1">
                     <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">System Logs</h3>
                     <div className="space-y-2 font-mono text-[10px] text-slate-500">
                        <p><span className="text-indigo-400">10:42:05</span> Syncing neural weights...</p>
                        <p><span className="text-emerald-400">10:42:08</span> Physical layer anchor secure.</p>
                        <p><span className="text-rose-400">10:42:15</span> Emotional resonance check: Pass.</p>
                        <p><span className="text-amber-400">10:43:01</span> Causal alignment verified.</p>
                        <p><span className="text-slate-400">10:45:00</span> Waiting for user input...</p>
                     </div>
                </div>
            </div>
            )}
        </div>
      </main>
    </div>
  );
};

export default App;