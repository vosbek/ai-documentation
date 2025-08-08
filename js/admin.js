function collectFormData() {
  return {
    id: document.getElementById('id').value,
    name: document.getElementById('name').value,
    url: document.getElementById('url').value,
    vendor: {
      company: document.getElementById('vendorCompany').value,
      type: document.getElementById('vendorType').value,
      strategic_position: ''
    },
    pricing: {
      model: document.getElementById('pricingModel').value,
      cost: document.getElementById('pricingCost').value
    },
    sdlc_phases: document.getElementById('phases').value.split(',').map(s=>s.trim()),
    features: document.getElementById('features').value.split(',').map(s=>s.trim()),
    comparable_tools: [],
    community_sentiment: '',
    maturity: '',
    changelog: [],
    strategic_relationships: [],
    adopters: [],
    usage_state: document.getElementById('usage').value,
    analytics: {
      features_added_over_time: [],
      value_over_time: [],
      usage_over_time: [],
      sentiment_over_time: []
    },
    media: { screenshots: [], videos: [], youtube_links: [] },
    last_updated: new Date().toISOString().split('T')[0],
    updated_by: 'Admin',
    notes: ''
  };
}

function download(data, filename) {
  const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

document.getElementById('generate').addEventListener('click', () => {
  const data = collectFormData();
  download(data, `${data.id}.json`);
});
