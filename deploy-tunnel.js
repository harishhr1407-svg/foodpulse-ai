const http = require('http');
const { startTunnel } = require('untun');
const fs = require('fs');
const path = require('path');

// Start the FoodPulse AI web server
require('./server.js');

const PORT = process.env.PORT || 3000;

async function launchCloudTunnel() {
  console.log(`Connecting FoodPulse AI (port ${PORT}) to Cloudflare Quick Tunnel...`);

  try {
    // Explicitly target 127.0.0.1 to avoid Windows IPv6 (::1) mismatch
    const tunnel = await startTunnel({
      url: `http://127.0.0.1:${PORT}`
    });

    const publicUrl = await tunnel.getURL();

    console.log(`=======================================================`);
    console.log(`🚀 FOODPULSE AI — LIVE PUBLIC DEPLOYMENT ACTIVE!`);
    console.log(`🌐 LIVE PROJECT URL:    ${publicUrl}`);
    console.log(`🖥️ PRESENTATION SLIDES:  ${publicUrl}/ppt`);
    console.log(`📥 POWERPOINT (.PPTX):   ${publicUrl}/FoodPulse_AI_Zeroth_Review_Presentation.pptx`);
    console.log(`🏛️ INSTITUTION:          SRM EEC (Zeroth Project Review)`);
    console.log(`👨‍💻 CANDIDATE:            Harish Kanna M (310624104095)`);
    console.log(`👩‍🏫 GUIDE:                Nagamani Segalla`);
    console.log(`=======================================================`);

    // Persist live link to disk so it can be checked
    fs.writeFileSync(path.join(__dirname, 'live-url.txt'), publicUrl, 'utf8');

  } catch (err) {
    console.error('Tunnel error:', err.message);
  }
}

// Give server.js 1 second to bind to port 3000
setTimeout(launchCloudTunnel, 1000);
