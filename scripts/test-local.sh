#!/bin/bash

# Local Testing Helper Script
# Labware AI Agent Network

echo "═══════════════════════════════════════════════════════════"
echo "  LABWARE AI AGENT NETWORK - LOCAL TESTING"
echo "  68 Agents | 13 Departments | Sovereign Intelligence"
echo "═══════════════════════════════════════════════════════════"
echo ""

# Check if dev server is running
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo "✅ Development server is RUNNING"
    echo ""
    echo "🔗 Access your application:"
    echo "   Local:   http://localhost:3000/"
    echo "   Network: http://$(hostname -I | awk '{print $1}'):3000/"
    echo ""
    echo "📋 Testing Guide: Open TESTING-GUIDE.md"
    echo ""
    echo "🧪 What to Test:"
    echo "   1. Dashboard Tab - Chat with Alex"
    echo "   2. Departments Tab - View all 68 agents"
    echo "   3. Network Tab - See hub-spoke topology"
    echo "   4. Agents Tab - Visualize agent swarm"
    echo ""
    echo "⚡ Quick Tests:"
    echo "   • Click 'Simulate Conflict' button (top right)"
    echo "   • Expand 'Sales & Revenue' department (8 agents)"
    echo "   • Hover over agents in Network Graph"
    echo "   • Check browser console (F12) for errors"
    echo ""
    echo "⚠️  Note: Chat requires Gemini API key in .env.local"
    echo "   Get key at: https://ai.google.dev/"
    echo ""
    echo "═══════════════════════════════════════════════════════════"
    echo "  Status: READY FOR TESTING"
    echo "  Sacred Mission Alignment: 98.5%"
    echo "═══════════════════════════════════════════════════════════"
else
    echo "⚠️  Development server is NOT running"
    echo ""
    echo "To start the server:"
    echo "   npm run dev"
    echo ""
    echo "Then run this script again to get testing info."
fi
