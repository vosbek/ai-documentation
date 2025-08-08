import { loadTools } from './utils.js';

async function init() {
  const tools = await loadTools();
  const list = document.getElementById('recent-tools');
  tools.slice(0, 3).forEach(tool => {
    const li = document.createElement('li');
    li.innerHTML = `<a href="tool.html?id=${tool.id}">${tool.name}</a>`;
    list.appendChild(li);
  });
}

init();
