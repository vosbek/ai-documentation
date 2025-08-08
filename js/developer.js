import { loadTools, filterTools } from './utils.js';

async function init() {
  const tools = await loadTools();
  const list = document.getElementById('tool-list');
  const searchInput = document.getElementById('search');
  const phaseSelect = document.getElementById('phase');
  const featureInput = document.getElementById('feature');
  const vendorSelect = document.getElementById('vendor');
  const pricingSelect = document.getElementById('pricing');

  function render(toRender) {
    list.innerHTML = '';
    toRender.forEach(tool => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `<h3><a href="tool.html?id=${tool.id}">${tool.name}</a></h3>
        <p>Vendor: ${tool.vendor.company} (${tool.vendor.type})</p>
        <p>SDLC: ${tool.sdlc_phases.join(', ')}</p>
        <p>Features: ${tool.features.join(', ')}</p>`;
      list.appendChild(card);
    });
  }

  function applyFilters() {
    const filtered = filterTools(tools, {
      phase: phaseSelect.value,
      feature: featureInput.value,
      vendor: vendorSelect.value,
      pricing: pricingSelect.value,
      search: searchInput.value
    });
    render(filtered);
  }

  searchInput.addEventListener('input', applyFilters);
  phaseSelect.addEventListener('change', applyFilters);
  featureInput.addEventListener('input', applyFilters);
  vendorSelect.addEventListener('change', applyFilters);
  pricingSelect.addEventListener('change', applyFilters);

  render(tools);
}

init();
