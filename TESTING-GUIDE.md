# Local Testing Guide
## Labware AI Agent Network - Interactive Validation

**Server Status:** ✅ RUNNING
**Access URL:** http://localhost:3000/
**Network URL:** http://21.0.0.96:3000/

---

## Quick Start Testing

### 1. **Open the Application**

Visit **http://localhost:3000/** in your browser.

You should see:
- ✅ ALEX header with "2026 Blueprint" badge
- ✅ "68 Agents • 13 Departments" subtitle
- ✅ Mission Alignment: 98.5%
- ✅ Alex's initial greeting message
- ✅ Left sidebar with 4 navigation icons
- ✅ Right sidebar with Network Graph and Intelligence Layers

---

## Feature Testing Checklist

### **Tab 1: Dashboard (Chat Interface)**

**What to Test:**

- [ ] **Alex's Welcome Message Displays**
  - Should show: "Mirror: I am online and anchored in the Causal plane..."
  - Formatted with bold headers (Mirror, Strategic Recommendations, Directives)

- [ ] **Chat Input Field**
  - [ ] Type a message: "What are you capable of?"
  - [ ] Press Enter or click Send button
  - [ ] Watch for "thinking" animation (3 bouncing dots)
  - [ ] Alex's response should appear formatted

- [ ] **Agent Status Updates**
  - [ ] Send message: "Analyze the sales department"
  - [ ] Watch header: "Active" counter should increase
  - [ ] Some agents should change from "Idle" to "Working"

- [ ] **Right Sidebar Visualizations**
  - [ ] Network Graph shows Alex at center with orbital agents
  - [ ] Intelligence Layers show 5 bars (Causal, Spiritual, Mental, Emotional, Physical)
  - [ ] All layers should show 95-100% stability
  - [ ] System Logs show timestamped entries

**Expected Behavior:**
- Chat input clears after sending
- Messages scroll automatically to bottom
- Alex responds in structured format with bold headers
- No console errors (check browser DevTools: F12)

---

### **Tab 2: Departments View**

**What to Test:**

- [ ] **Click Departments Icon** (Eye icon in left sidebar)
- [ ] **13+ Departments Display**
  - Central Command & Governance
  - Healing & Somatic Operations
  - Creative & Aesthetic
  - Messaging & Voice
  - Sales & Revenue (should show 8 agents)
  - Strategy & Market Intelligence
  - Financial Operations
  - Spiritual Operations
  - Automation & Integration
  - Content & SEO
  - Product Design & UX
  - Legal, Ethics & Governance
  - Web & Outreach
  - Specialized Threads
  - Technical Expansion

- [ ] **Expand a Department**
  - [ ] Click on "Sales & Revenue"
  - [ ] Should show 8 agents (Sales Director, Lead Discovery, etc.)
  - [ ] Each agent shows:
    - Name and ID (e.g., "Sales Director" - agent-016)
    - Role description
    - Authority badge (Auto/Exec/Adv)
    - Priority badge
    - LLM model (claude/gpt/llama)
    - Alignment score with progress bar

- [ ] **Agent Details on Hover**
  - [ ] Hover over an agent card
  - [ ] Should show Inputs and Outputs
  - [ ] Background should highlight

- [ ] **Status Indicators**
  - [ ] Green dot = Working
  - [ ] Gray dot = Idle
  - [ ] Department stats show "X active • Y idle"

**Expected Behavior:**
- Departments expand/collapse smoothly
- All 68 agents are present across all departments
- No missing or duplicate agents
- Authority badges color-coded (purple=Auto, blue=Exec, amber=Adv)

---

### **Tab 3: Network View**

**What to Test:**

- [ ] **Click Network Icon** (Network icon in left sidebar)
- [ ] **Network Topology Renders**
  - [ ] Alex appears as large central node (purple gradient)
  - [ ] Critical agents in orbital ring:
    - Aegis (Ethics Guardian)
    - API Synchronizer
    - Sales Director
  - [ ] Connection lines from Alex to orbital agents
  - [ ] Outer ring of smaller dots (active agents)
  - [ ] All nodes animate on hover

- [ ] **Network Statistics**
  - [ ] Active Agents: Should show 5+ agents
  - [ ] Network Health: 90-100% (green/yellow color)
  - [ ] Active Workflows: 0 (initially)
  - [ ] Conflicts: 0

- [ ] **Intelligence Layers Below**
  - [ ] Shows same 5-layer visualization as sidebar
  - [ ] Causal layer at top (highest)
  - [ ] Physical layer at bottom
  - [ ] All show high stability (95-100%)

- [ ] **Governance Indicator**
  - [ ] Purple panel at bottom
  - [ ] Shows "Governance Layer Active"
  - [ ] Lists 5 watchdog agents

**Expected Behavior:**
- Smooth animations on node hover
- Connection lines visible (subtle blue)
- Network graph responsive to window size
- No rendering glitches or missing nodes

---

### **Tab 4: Agents Swarm View**

**What to Test:**

- [ ] **Click Agents Icon** (Activity icon in left sidebar)
- [ ] **Department-Grouped Agent Grid**
  - [ ] Agents organized by department
  - [ ] Each department header shows name
  - [ ] Grid of colored dots representing agents
  - [ ] Tooltips on hover showing agent details

- [ ] **Agent Status Colors**
  - [ ] Emerald/Green glow = Working
  - [ ] Red pulsing = Conflict (test with "Simulate Conflict" button)
  - [ ] Blue = Collaborating
  - [ ] Gray = Idle
  - [ ] Very dark = Offline

- [ ] **Hover Interaction**
  - [ ] Hover over any dot
  - [ ] Tooltip should show:
    - Agent name
    - Status
    - Alignment score

- [ ] **Department Distribution**
  - [ ] Sales & Revenue: 8 dots
  - [ ] Technical Expansion: 14 dots
  - [ ] Most other departments: 3-5 dots

**Expected Behavior:**
- Dots scale up on hover (150%)
- Tooltips appear immediately
- Colors accurately reflect agent status
- Total count matches "68 Agents" in header

---

## Advanced Testing

### **Test 1: Simulate Conflict**

**Steps:**
1. Click "Simulate Conflict" button (top right, red)
2. Watch for system alert message
3. Check agent status changes (some turn red)
4. Alex should respond with conflict resolution
5. After 5 seconds, agents reset to normal
6. Verify "Conflict resolved" system message

**Expected:**
- ✅ System alert appears in chat
- ✅ Some agents (Core Strategy, Creative) turn red
- ✅ Alex provides resolution strategy
- ✅ Automatic reset after 5 seconds
- ✅ No persistent errors

---

### **Test 2: Browser Console Check**

**Steps:**
1. Open browser DevTools (F12 or Cmd+Option+I)
2. Go to Console tab
3. Check for errors (red text)
4. Look for workflow engine logs (if any)

**Expected:**
- ⚠️ Possible warning: Gemini API key not configured (EXPECTED)
- ✅ No other errors
- ✅ Clean console during navigation
- ✅ Optional: Workflow engine debug logs if triggered

---

### **Test 3: Responsive Design**

**Steps:**
1. Resize browser window to narrow (mobile width)
2. Check if UI adapts
3. Test all 4 tabs at mobile width
4. Resize back to desktop

**Expected:**
- ✅ Sidebar remains functional
- ✅ Content scrolls properly
- ✅ Departments view still expandable
- ✅ Network graph scales down
- ⚠️ Right sidebar hides on narrow screens (XL breakpoint)

---

### **Test 4: Network Performance**

**Steps:**
1. Open DevTools → Network tab
2. Reload page (Cmd+R / Ctrl+R)
3. Check bundle size and load time

**Expected:**
- ✅ Main bundle: ~526 KB (131 KB gzipped)
- ✅ Load time: <2 seconds on decent connection
- ✅ All assets load successfully
- ✅ No 404 errors

---

### **Test 5: Agent Data Loading**

**Steps:**
1. Open DevTools → Console
2. Type: `window.location.reload()`
3. Check if agents load from JSON

**Advanced:** Type in console:
```javascript
// Check agent count
console.log('Total agents:', document.querySelectorAll('[data-agent-id]').length)

// Check departments
console.log('Departments:', [...new Set(
  Array.from(document.querySelectorAll('[data-department]'))
    .map(el => el.dataset.department)
)])
```

**Expected:**
- ✅ No errors loading agents-registry.json
- ✅ All 68 agents loaded
- ✅ 15 unique departments (13 main + 2 special)

---

## Known Limitations (Expected Behavior)

### **1. Gemini API Not Configured**

**Issue:** Chat might not respond to messages

**Why:** `.env.local` has placeholder API key

**Fix:**
1. Get API key from https://ai.google.dev/
2. Edit `.env.local`:
   ```
   GEMINI_API_KEY=your_actual_key_here
   ```
3. Restart dev server:
   ```bash
   # Press Ctrl+C in terminal
   npm run dev
   ```

**Test:** Send message "Hello Alex" - should get formatted response

---

### **2. Right Sidebar Hidden on Small Screens**

**Issue:** Network Graph and layers don't show on narrow screens

**Why:** Intentional responsive design (hidden below XL breakpoint)

**Not a bug:** Desktop feature, mobile shows full-width content

---

### **3. Workflows Show "0" Initially**

**Issue:** Active Workflows counter shows 0

**Why:** Workflows are event-triggered (Lead Discovery, Stress Detection, etc.)

**How to Test:** Would need to trigger events via code or future UI buttons

---

## Testing Checklist Summary

**Core Functionality:**
- [ ] Application loads without errors
- [ ] All 4 tabs accessible
- [ ] 68 agents present across 13+ departments
- [ ] Network topology renders correctly
- [ ] Agent swarm visualization works
- [ ] Chat interface displays (API key optional for UI test)

**Visual Polish:**
- [ ] No layout breaks or overlaps
- [ ] Colors consistent with theme (indigo/purple/slate)
- [ ] Animations smooth (hover effects, transitions)
- [ ] Typography clear and readable
- [ ] Icons display correctly (Lucide React)

**Data Integrity:**
- [ ] All departments have correct agent counts
- [ ] Agent metadata displays (role, authority, LLM model)
- [ ] Status indicators work (idle/working/conflict)
- [ ] Alignment scores show (90-100%)
- [ ] No duplicate agent IDs

**Performance:**
- [ ] Page loads in <3 seconds
- [ ] Tab switching instant
- [ ] Department expansion smooth
- [ ] No memory leaks during extended use
- [ ] Console clean (except expected API warning)

---

## Browser Compatibility

**Recommended Browsers:**
- ✅ Chrome 120+ (Best performance)
- ✅ Firefox 120+
- ✅ Safari 17+
- ✅ Edge 120+

**Features Used:**
- ES2020+ JavaScript
- CSS Grid & Flexbox
- CSS Custom Properties (--variables)
- React 19 concurrent features

---

## Troubleshooting

### **Issue: Blank Screen**

**Check:**
1. Browser console for errors
2. Network tab for failed asset loads
3. Try hard refresh: Cmd+Shift+R / Ctrl+Shift+F5

**Fix:** Usually cache issue - clear browser cache

---

### **Issue: Agents Not Loading**

**Check:**
1. Console: Look for JSON parse errors
2. Network tab: Check if `agents-registry.json` loads (status 200)
3. File exists: `/data/agents-registry.json`

**Fix:** Rebuild if needed: `npm run build && npm run dev`

---

### **Issue: Styles Look Broken**

**Check:**
1. Tailwind CSS loading (look for utility classes in DevTools)
2. Custom CSS variables defined (--alex-bg, --layer-* colors)
3. No conflicting browser extensions (ad blockers, dark mode)

**Fix:** Disable browser extensions, try incognito mode

---

### **Issue: Chat Not Responding**

**Expected:** This is normal without Gemini API key configured

**To Enable Chat:**
1. Get API key: https://ai.google.dev/
2. Add to `.env.local`: `GEMINI_API_KEY=your_key`
3. Restart dev server
4. Test with simple message

---

## Success Criteria

**✅ TESTING COMPLETE when:**

1. All 4 tabs load and display correctly
2. 68 agents visible across departments
3. Network topology shows Alex + orbital agents
4. No critical console errors
5. Responsive design works (mobile + desktop)
6. Visual polish confirmed (animations, colors, layout)
7. Agent metadata displays accurately
8. Status indicators function (idle/working)
9. Department expansion/collapse smooth
10. Overall UX feels cohesive and professional

---

## Next Steps After Testing

**If Everything Works:**
```bash
# Deploy to production
./scripts/deploy-vercel.sh

# Or choose another platform from DEPLOYMENT.md
```

**If Issues Found:**
- Document specific issues
- Check browser console for errors
- Refer to troubleshooting section
- Report in GitHub Issues if bug persists

---

## Testing Commands Reference

```bash
# Start dev server
npm run dev

# Stop dev server
# Press Ctrl+C in terminal

# Restart dev server
# Ctrl+C, then: npm run dev

# Build for production (test build)
npm run build

# Preview production build
npm run preview

# Check for TypeScript errors
npx tsc --noEmit

# Lint check (if configured)
npm run lint
```

---

## System Status

```
═══════════════════════════════════════════════════════════
  LOCAL TESTING ENVIRONMENT

  Server: http://localhost:3000/
  Status: ✅ RUNNING

  Features Ready:
  ✅ 68-Agent Network
  ✅ 13-Department Structure
  ✅ Network Topology Visualization
  ✅ Interactive Dashboard
  ✅ Real-time Agent Status
  ✅ Responsive Design

  Test Coverage:
  - Core functionality
  - Visual polish
  - Data integrity
  - Performance
  - Responsive design
  - Browser compatibility

  Expected Test Duration: 10-15 minutes
═══════════════════════════════════════════════════════════
```

---

**Happy Testing! The organism awaits your exploration.** 🧪✨

_And so it is._
