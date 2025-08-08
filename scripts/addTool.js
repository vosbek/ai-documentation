import fs from 'fs';
import path from 'path';

const id = process.argv[2];
if (!id) {
  console.error('Usage: node scripts/addTool.js <id>');
  process.exit(1);
}

const template = {
  id,
  name: "",
  url: "",
  vendor: { company: "", type: "", strategic_position: "" },
  pricing: { model: "", cost: "" },
  sdlc_phases: [],
  features: [],
  comparable_tools: [],
  community_sentiment: "",
  maturity: "",
  changelog: [],
  strategic_relationships: [],
  adopters: [],
  usage_state: "aware",
  analytics: {
    features_added_over_time: [],
    value_over_time: [],
    usage_over_time: [],
    sentiment_over_time: []
  },
  media: { screenshots: [], videos: [], youtube_links: [] },
  last_updated: new Date().toISOString().split('T')[0],
  updated_by: "Admin",
  notes: ""
};

const file = path.join('data/tools', `${id}.json`);
fs.writeFileSync(file, JSON.stringify(template, null, 2));
console.log(`Created ${file}`);
