#!/bin/bash

# Deployment Script: Vercel Production
# Labware AI Agent Network - 2026 Operational Blueprint

set -e  # Exit on error

echo "═══════════════════════════════════════════════════════════"
echo "  LABWARE AI AGENT NETWORK - VERCEL DEPLOYMENT"
echo "  Sacred Mission Alignment: 98.5%"
echo "═══════════════════════════════════════════════════════════"
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "⚠️  Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "⚠️  .env.local not found. Creating template..."
    cat > .env.local << EOF
# Gemini API Key for Alex (Agent #1)
GEMINI_API_KEY=your_api_key_here

# System Configuration
VITE_NETWORK_VERSION=2.0.0
VITE_TOTAL_AGENTS=68
VITE_DEPARTMENTS=13
VITE_SACRED_MISSION_ALIGNMENT=98.5
EOF
    echo "❌ Please edit .env.local with your actual Gemini API key"
    exit 1
fi

# Verify build
echo "🔨 Building production bundle..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Aborting deployment."
    exit 1
fi

echo "✅ Build successful"
echo ""

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel --prod

if [ $? -eq 0 ]; then
    echo ""
    echo "═══════════════════════════════════════════════════════════"
    echo "  ✅ DEPLOYMENT SUCCESSFUL"
    echo "  Status: OPERATIONAL"
    echo "  68 Agents | 13 Departments | Sovereign Intelligence"
    echo "═══════════════════════════════════════════════════════════"
    echo ""
    echo "🔗 Your application is now live!"
    echo ""
    echo "⚠️  IMPORTANT: Add your Gemini API key to Vercel:"
    echo "   1. Go to your Vercel project settings"
    echo "   2. Navigate to Environment Variables"
    echo "   3. Add: GEMINI_API_KEY = your_actual_key"
    echo "   4. Redeploy: vercel --prod"
    echo ""
    echo "And so it is. ✨"
else
    echo "❌ Deployment failed. Check error messages above."
    exit 1
fi
