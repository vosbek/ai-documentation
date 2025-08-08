import { loadTools } from './utils.js';

async function init() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const tools = await loadTools();
  const tool = tools.find(t => t.id === id);
  if (!tool) return;
  document.getElementById('title').innerText = tool.name;
  document.getElementById('details').innerHTML = `
    <p><strong>Vendor:</strong> ${tool.vendor.company} (${tool.vendor.type})</p>
    <p><strong>Pricing:</strong> ${tool.pricing.cost || tool.pricing.model}</p>
    <p><strong>SDLC:</strong> ${tool.sdlc_phases.join(', ')}</p>
    <p><strong>Features:</strong> ${tool.features.join(', ')}</p>
    <p><strong>Comparable Tools:</strong> ${tool.comparable_tools.join(', ')}</p>
    <p><strong>Community Sentiment:</strong> ${tool.community_sentiment}</p>
    <p><strong>Maturity:</strong> ${tool.maturity}</p>
    <p><strong>Strategic Relationships:</strong> ${tool.strategic_relationships.join(', ')}</p>
    <p><strong>Adopters:</strong> ${tool.adopters.join(', ')}</p>
    <p><strong>Usage State:</strong> ${tool.usage_state}</p>
  `;
}

init();
