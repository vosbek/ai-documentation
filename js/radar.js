import { loadTools } from './utils.js';

async function init() {
  const tools = await loadTools();
  const states = ['aware','investigating','vendor_engagement','trialing','pilot'];
  const counts = states.map(state => tools.filter(t => t.usage_state === state).length);
  const ctx = document.getElementById('radar').getContext('2d');
  new Chart(ctx, {
    type: 'radar',
    data: {
      labels: states,
      datasets: [{
        label: 'Tool Count',
        data: counts,
        backgroundColor: 'rgba(0,113,206,0.2)',
        borderColor: 'rgba(0,113,206,1)'
      }]
    }
  });
}

init();
