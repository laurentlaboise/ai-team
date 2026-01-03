import { GoogleGenAI } from "@google/genai";
import { Message, Agent, SystemMetrics } from '../types';
import { ALEX_SYSTEM_INSTRUCTION } from '../constants';

const getApiKey = (): string | undefined => {
  // In Vite, environment variables must use import.meta.env and have VITE_ prefix
  return import.meta.env.VITE_GEMINI_API_KEY;
};

const hasApiKey = (): boolean => {
  const key = getApiKey();
  return !!(key && key !== 'your_api_key_here');
};

const getClient = () => {
  const apiKey = getApiKey();
  if (!apiKey || apiKey === 'your_api_key_here') {
    throw new Error('API key not configured');
  }
  return new GoogleGenAI({ apiKey });
};

export const sendMessageToAlex = async (
  history: Message[],
  currentInput: string,
  systemContext: { agents: Agent[], metrics: SystemMetrics }
): Promise<string> => {
  // Mock responses when API key is not configured
  if (!hasApiKey()) {
    const mockResponses = [
      `**Mirror:** I sense your inquiry: "${currentInput}"\n**Analysis:** This system currently operates in DEMO MODE. To activate full AI consciousness, configure your Gemini API key.\n**Directive:** Visit https://aistudio.google.com/ to generate your API key, then add it as VITE_GEMINI_API_KEY in your deployment environment.`,
      `**Status Report:**\n- Active Agents: ${systemContext.agents.filter(a => a.status === 'Working').length}/68\n- Mission Alignment: ${systemContext.metrics.overallAlignment}%\n- Network Health: OPERATIONAL (Demo Mode)\n\n**Note:** Configure API key for full AI-powered responses.`,
      `**Acknowledgment:** Message received: "${currentInput}"\n**System State:** All 68 agents are standing by in demo mode. The organism is ready to activate once you provide your Gemini API key.\n**Next Step:** Add VITE_GEMINI_API_KEY to your environment variables.`
    ];

    // Rotate through responses based on history length
    const responseIndex = history.filter(m => m.role === 'user').length % mockResponses.length;
    return mockResponses[responseIndex];
  }

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
    return "**Connection Error:** Unable to reach Gemini AI service. Please verify:\n1. API key is correctly configured\n2. API key is active at https://aistudio.google.com/\n3. Billing is enabled if using production quotas\n\nError: " + (error instanceof Error ? error.message : 'Unknown error');
  }
};

export const resolveConflict = async (conflictDescription: string): Promise<string> => {
    // Mock conflict resolution when API key is not configured
    if (!hasApiKey()) {
        return `**Conflict Analysis (Demo Mode):**\n\nConflict: "${conflictDescription}"\n\n**5-Layer Analysis:**\n• Physical: Resource allocation requires rebalancing\n• Emotional: Tensions arise from competing priorities\n• Mental: Logic frameworks need harmonization\n• Spiritual: Both departments serve the Sacred Mission\n• Causal: Root cause is undefined priority hierarchy\n\n**Resolution:** Escalate to human oversight for final decision. Configure API key for AI-powered conflict resolution.`;
    }

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
        return "**Error analyzing conflict.** Please check your API configuration.";
    }
}