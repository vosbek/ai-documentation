export async function loadTools() {
  const index = await fetch('data/tools/index.json').then(r => r.json());
  const tools = [];
  for (const id of index) {
    const tool = await fetch(`data/tools/${id}.json`).then(r => r.json());
    tools.push(tool);
  }
  return tools;
}

export function filterTools(tools, filters) {
  return tools.filter(tool => {
    if (filters.phase && !tool.sdlc_phases.includes(filters.phase)) return false;
    if (filters.feature && !tool.features.includes(filters.feature)) return false;
    if (filters.pricing && tool.pricing.model !== filters.pricing) return false;
    if (filters.vendor && tool.vendor.type !== filters.vendor) return false;
    if (filters.search) {
      const term = filters.search.toLowerCase();
      if (!tool.name.toLowerCase().includes(term)) return false;
    }
    return true;
  });
}
