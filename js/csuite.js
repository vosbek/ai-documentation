import { loadTools, filterTools } from './utils.js';

async function init() {
  const tools = await loadTools();
  const list = document.getElementById('tool-list');
  const searchInput = document.getElementById('search');

  function render(toRender) {
    list.innerHTML = '';
    toRender.forEach(tool => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `<h3><a href="tool.html?id=${tool.id}">${tool.name}</a></h3>
        <p>Cost: ${tool.pricing.cost || tool.pricing.model}</p>
        <p>Vendor Type: ${tool.vendor.type}</p>
        <p>Usage State: ${tool.usage_state}</p>`;
      list.appendChild(card);
    });
  }

  function applyFilters() {
    const filtered = filterTools(tools, {
      search: searchInput.value
    });
    render(filtered);
  }

  searchInput.addEventListener('input', applyFilters);
  render(tools);
}

init();
