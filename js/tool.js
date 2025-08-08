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

  // render changelog
  const changelogSection = document.getElementById('changelog');
  if (tool.changelog && tool.changelog.length) {
    const list = document.getElementById('changelog-list');
    tool.changelog.forEach(entry => {
      const li = document.createElement('li');
      li.textContent = `${entry.date}: ${entry.summary}`;
      list.appendChild(li);
    });
  } else {
    changelogSection.style.display = 'none';
  }

  // render analytics charts
  const analytics = tool.analytics || {};
  let hasChart = false;
  function renderChart(id, label, data) {
    const ctx = document.getElementById(id).getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.map(d => d.date),
        datasets: [{
          label,
          data: data.map(d => d.value),
          borderColor: 'rgba(0,113,206,1)',
          backgroundColor: 'rgba(0,113,206,0.2)',
          tension: 0.3
        }]
      },
      options: {
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
    hasChart = true;
  }

  if (analytics.features_added_over_time?.length) {
    renderChart('featuresChart', 'Features Added', analytics.features_added_over_time);
  } else {
    document.getElementById('featuresChart').style.display = 'none';
  }
  if (analytics.value_over_time?.length) {
    renderChart('valueChart', 'Value Over Time', analytics.value_over_time);
  } else {
    document.getElementById('valueChart').style.display = 'none';
  }
  if (analytics.usage_over_time?.length) {
    renderChart('usageChart', 'Usage Over Time', analytics.usage_over_time);
  } else {
    document.getElementById('usageChart').style.display = 'none';
  }
  if (analytics.sentiment_over_time?.length) {
    renderChart('sentimentChart', 'Sentiment Over Time', analytics.sentiment_over_time);
  } else {
    document.getElementById('sentimentChart').style.display = 'none';
  }
  if (!hasChart) {
    document.getElementById('analytics').style.display = 'none';
  }

  // render media
  const mediaSection = document.getElementById('media');
  const mediaDiv = document.getElementById('media-content');
  if (tool.media) {
    (tool.media.screenshots || []).forEach(src => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = `${tool.name} screenshot`;
      mediaDiv.appendChild(img);
    });
    (tool.media.videos || []).forEach(src => {
      const video = document.createElement('video');
      video.src = src;
      video.controls = true;
      mediaDiv.appendChild(video);
    });
    (tool.media.youtube_links || []).forEach(link => {
      const iframe = document.createElement('iframe');
      iframe.src = link;
      iframe.width = '560';
      iframe.height = '315';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true;
      mediaDiv.appendChild(iframe);
    });
  }
  if (mediaDiv.childElementCount === 0) {
    mediaSection.style.display = 'none';
  }
}

init();
