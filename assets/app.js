/* Clickable explainers */
const EXPLAINERS = {
  patient_name: {
    title: "Patient Name",
    text: "Extracted consistently from EOB and ERA. No conflicts detected.",
    confidence: "High"
  },
  member_id: {
    title: "Member ID",
    text: "Found on insurance card and EOB. Matches expected format.",
    confidence: "High"
  },
  paid_amount: {
    title: "Paid Amount",
    text: "Extracted from ERA only in MA case; from EOB in Medicaid/Commercial.",
    confidence: "Medium"
  },
  insurance_card_back: {
    title: "Insurance Card (Back)",
    text: "Back of card not uploaded. Required for routing/PA details.",
    confidence: "Low"
  },
  era_denial: {
    title: "ERA Denial",
    text: "ERA shows $0 paid due to CARC 16 (missing documentation).",
    confidence: "Low"
  }
};

function showExplainer(key) {
  const e = EXPLAINERS[key];
  const el = document.getElementById("explainer");
  if (!el || !e) return;
  el.classList.remove("hidden");
  el.innerHTML = `<strong>${e.title}</strong><br>${e.text}<br><em>Confidence: ${e.confidence}</em>`;
}

/* Tab switching + dynamic PDF download mapping
   - Each page's <a id="download-link"> has data-href-<docType> attributes.
   - We read those to swap the href when tabs change.
*/
function switchDoc(btn, type) {
  // Swap visible document layer
  document.querySelectorAll('.doc-layer').forEach(layer => layer.classList.remove('active'));
  const layer = document.getElementById(`doc-${type}`);
  if (layer) layer.classList.add('active');

  // Active tab styling
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  if (btn) btn.classList.add('active');

  // Update download link
  const link = document.getElementById('download-link');
  if (link) {
    const attr = link.getAttribute(`data-href-${type}`);
    if (attr) link.href = attr;
  }
}
