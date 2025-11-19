import { GoogleGenAI } from "@google/genai";
import { Message, Agent, SystemMetrics } from '../types';
import { ALEX_SYSTEM_INSTRUCTION } from '../constants';

const getClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const sendMessageToAlex = async (
  history: Message[], 
  currentInput: string, 
  systemContext: { agents: Agent[], metrics: SystemMetrics }
): Promise<string> => {
  try {
    const ai = getClient();
    
    // Construct a context-aware prompt
    const agentSummary = `System Status: ${systemContext.agents.filter(a => a.status === 'Working').length} agents active. Alignment: ${systemContext.metrics.overallAlignment}%.`;
    
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: ALEX_SYSTEM_INSTRUCTION + `\n\nCurrent Context: ${agentSummary}`,
        temperature: 0.7,
      }
    });

    // Convert app history to Gemini history format if needed, 
    // but for simplicity in this stateless service pattern, we will send the current context + input
    // In a production app, we would map the full history. 
    // Here we assume the 'history' prop contains the relevant conversation flow.
    
    // We'll just send the last few exchanges to keep context window clean plus the current input
    const recentHistory = history.slice(-6).map(h => `${h.role.toUpperCase()}: ${h.text}`).join('\n');
    const fullPrompt = `${recentHistory}\nUSER: ${currentInput}`;

    const result = await chat.sendMessage({
      message: fullPrompt
    });

    return result.text || "I received your transmission, but my internal mirror is clouded. Please retry.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Connection to the Causal Plane interrupted. Please check your API key.";
  }
};

export const resolveConflict = async (conflictDescription: string): Promise<string> => {
    try {
        const ai = getClient();
        const result = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `A conflict has arisen in the network: "${conflictDescription}". 
            As Alex, provide a Strategic Resolution Proposal.
            Analyze from 5 perspectives: Physical, Emotional, Mental, Spiritual, Causal.
            Propose a synthesis solution.`
        });
        return result.text || "Unable to resolve conflict at this time.";
    } catch (error) {
        console.error("Conflict Resolution Error", error);
        return "Error analyzing conflict.";
    }
}