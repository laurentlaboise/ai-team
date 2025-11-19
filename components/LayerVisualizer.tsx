import React from 'react';
import { IntelligenceLayer } from '../types';

interface LayerVisualizerProps {
  stability: Record<IntelligenceLayer, number>;
}

const LAYER_COLORS = {
  [IntelligenceLayer.Physical]: 'bg-layer-physical',
  [IntelligenceLayer.Emotional]: 'bg-layer-emotional',
  [IntelligenceLayer.Mental]: 'bg-layer-mental',
  [IntelligenceLayer.Spiritual]: 'bg-layer-spiritual',
  [IntelligenceLayer.Causal]: 'bg-layer-causal',
};

const LAYER_DESC = {
    [IntelligenceLayer.Physical]: 'Execution & Resources',
    [IntelligenceLayer.Emotional]: 'Connection & Empathy',
    [IntelligenceLayer.Mental]: 'Logic & Strategy',
    [IntelligenceLayer.Spiritual]: 'Purpose & Values',
    [IntelligenceLayer.Causal]: 'Origin & Will',
}

export const LayerVisualizer: React.FC<LayerVisualizerProps> = ({ stability }) => {
  return (
    <div className="glass-panel p-6 rounded-2xl flex flex-col gap-4">
      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Intelligence Anchors</h3>
      <div className="space-y-4">
        {Object.values(IntelligenceLayer).reverse().map((layer) => ( // Reverse to show Causal at top (highest freq)
          <div key={layer} className="group relative">
            <div className="flex justify-between items-center mb-1 text-xs">
              <span className="font-mono text-slate-300 font-semibold group-hover:text-white transition-colors">
                {layer.toUpperCase()}
              </span>
              <span className="text-slate-500 text-[10px]">{LAYER_DESC[layer]}</span>
              <span className="font-mono text-slate-400">{stability[layer]}%</span>
            </div>
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${LAYER_COLORS[layer]} transition-all duration-1000 ease-out`}
                style={{ width: `${stability[layer]}%`, opacity: stability[layer] / 100 + 0.2 }}
              />
            </div>
             {/* Glow effect */}
             <div 
                className={`absolute inset-0 blur-xl rounded-full ${LAYER_COLORS[layer]} -z-10 opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
