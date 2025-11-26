# UX Spec: Onboarding Wizard & Simple Mode

## 1. Onboarding Wizard: "System Calibration"

**Goal:** Establish trust and configure the "Governor" with a professional, authoritative, yet simple flow.
**Tone:** Precise, Efficient, "System Ready".

### Flow Overview (4 Steps)

1.  **Connect Source (Ingest)**
    *   **UI:** A central card with "Connect CRM" button (HubSpot/Salesforce logos).
    *   **State:**
        *   *Idle:* "Awaiting Source Connection."
        *   *Connecting:* Spinner with "Handshaking with CRM..."
        *   *Success:* Green checkmark. "Connection Established. 1,240 Records Found."
    *   **Copy:** "Connect your system of record. We will read your schema but write nothing until you approve."

2.  **Map Schema (Enrich)**
    *   **UI:** Split view. Left: "CRM Fields". Right: "Crafta Standard Model".
    *   **Interaction:** Auto-mapping runs immediately. User sees confidence scores.
    *   **Action:** "Confirm Mapping" or "Adjust".
    *   **Copy:** "Analyzing data shape. 95% match with Standard Revenue Model."

3.  **Set Governance Rules (Govern)**
    *   **UI:** Three toggle cards for default rules:
        *   "Prevent Duplicate Creation" (On/Off)
        *   "Enforce Email Validity" (On/Off)
        *   "Route Leads by Territory" (On/Off)
    *   **Copy:** "Select active governance protocols. These rules will run in Shadow Mode initially."

4.  **Activate Governor (Actuate)**
    *   **UI:** A large "Initialize System" button.
    *   **Action:** Clicking triggers a "System Calibration" progress bar (0-100%).
    *   **Final State:** "System Calibrated. Entering Shadow Mode." -> Redirects to Governor Console.

## 2. Default "Simple Mode" Views

**Goal:** Hide complexity. Show health status and high-level controls.

### General Layout
*   **Header:** "System Status: Healthy" (Green Dot) or "Attention Needed" (Amber Dot).
*   **Toggle:** "Simple Mode" (Active) / "Advanced Mode" (Hidden behind gear icon).

### View 1: Routing Rules
*   **Visual:** A list of "Rule Cards".
*   **Card Content:**
    *   **Title:** e.g., "Enterprise Routing"
    *   **Status:** "Active" (Green Badge)
    *   **Metric:** "Processed 150 leads today"
*   **Interaction:** Click to toggle On/Off. No complex logic editing in Simple Mode.

### View 2: SLA Monitor
*   **Visual:** "Traffic Light" Dashboard.
*   **Components:**
    *   **Green:** "Response Time < 5m" (98%)
    *   **Amber:** "Follow-up < 24h" (85%) - "Warning: Trending Down"
    *   **Red:** "No Contact > 48h" (12 Leads) - "Breach Detected"
*   **Action:** "View Breaches" button on Red cards.

### View 3: CRIO Mapping (Convert/Intake)
*   **Visual:** "Pipeline Flow" diagram.
*   **States:**
    *   *Healthy:* Smooth line connecting "Inbound" -> "Enriched" -> "CRM".
    *   *Issue:* Red "Blockage" icon at "Enrichment" node if API fails.
*   **Action:** "Retry Failed Events" button.

## 3. Accessibility & Responsiveness
*   **Keyboard Nav:** Full Tab support for all inputs and buttons.
*   **Contrast:** WCAG AA compliant (Text #1a1a1a on #ffffff or #f8f9fa).
*   **Responsive:**
    *   *Desktop:* Split panels (Console).
    *   *Mobile:* Stacked cards. "Impact Deck" takes priority.
