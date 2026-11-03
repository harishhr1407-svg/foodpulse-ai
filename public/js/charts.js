/**
 * FoodPulse AI - High-Performance Native SVG Charting Engine
 */

window.Charts = {
  // Sparkline generator for KPI cards
  sparkline(values, color = '#34d399', width = 90, height = 32) {
    if (!values || values.length === 0) return '';
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = (max - min) || 1;
    const padding = 3;
    const h = height - padding * 2;
    const w = width - padding * 2;

    const points = values.map((v, i) => {
      const x = padding + (i * w) / (values.length - 1);
      const y = height - padding - ((v - min) / range) * h;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(' ');

    return `
      <svg viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" style="overflow:visible; display:block;">
        <polyline fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" points="${points}" />
      </svg>
    `;
  },

  // Main Demand Forecasting Chart with Confidence Interval Band
  forecastChart(data, containerId) {
    const container = document.getElementById(containerId);
    if (!container || !data || !data.series || data.series.length === 0) return;

    const series = data.series;
    const W = 720;
    const H = 280;
    const padL = 50;
    const padR = 24;
    const padT = 30;
    const padB = 40;

    // Determine value range
    const allVals = [];
    series.forEach(pt => {
      if (pt.actual != null) allVals.push(pt.actual);
      if (pt.forecast != null) allVals.push(pt.forecast);
      if (pt.upperBound != null) allVals.push(pt.upperBound);
      if (pt.lowerBound != null) allVals.push(pt.lowerBound);
    });

    const minVal = Math.floor(Math.min(...allVals) * 0.95);
    const maxVal = Math.ceil(Math.max(...allVals) * 1.05);
    const valRange = maxVal - minVal || 1;

    const getX = i => padL + (i * (W - padL - padR)) / (series.length - 1);
    const getY = v => H - padB - ((v - minVal) / valRange) * (H - padT - padB);

    // Points for actual series
    const actualPts = [];
    // Points for forecast series
    const forecastPts = [];
    // Upper and lower points for confidence polygon
    const upperPts = [];
    const lowerPts = [];

    let forecastStartIndex = -1;

    series.forEach((pt, i) => {
      if (pt.actual != null) {
        actualPts.push(`${getX(i).toFixed(1)},${getY(pt.actual).toFixed(1)}`);
      }
      if (pt.forecast != null) {
        if (forecastStartIndex === -1) forecastStartIndex = i;
        forecastPts.push(`${getX(i).toFixed(1)},${getY(pt.forecast).toFixed(1)}`);
        upperPts.push(`${getX(i).toFixed(1)},${getY(pt.upperBound).toFixed(1)}`);
        lowerPts.push(`${getX(i).toFixed(1)},${getY(pt.lowerBound).toFixed(1)}`);
      }
    });

    // Connect last actual point to first forecast point for seamless curve
    const lastActualIdx = series.findIndex(pt => pt.isForecast) - 1;
    if (lastActualIdx >= 0 && forecastPts.length > 0) {
      const connectPt = `${getX(lastActualIdx).toFixed(1)},${getY(series[lastActualIdx].actual).toFixed(1)}`;
      forecastPts.unshift(connectPt);
      upperPts.unshift(connectPt);
      lowerPts.unshift(connectPt);
    }

    const bandPolygon = upperPts.concat(lowerPts.reverse()).join(' ');

    // Y Axis Ticks
    const tickCount = 4;
    const yTicks = [];
    for (let t = 0; t <= tickCount; t++) {
      const val = Math.round(minVal + (t * valRange) / tickCount);
      const yPos = getY(val);
      yTicks.push(`
        <line x1="${padL}" x2="${W - padR}" y1="${yPos}" y2="${yPos}" stroke="rgba(255,255,255,0.07)" stroke-dasharray="3" />
        <text x="${padL - 8}" y="${yPos + 4}" fill="#8b9bb4" font-size="10" text-anchor="end">${val.toLocaleString('en-IN')}</text>
      `);
    }

    // Cutoff Line (Historical vs Forecast)
    const cutoffX = forecastStartIndex > 0 ? getX(forecastStartIndex) : W / 2;

    const svg = `
      <div style="position:relative; width:100%;">
        <svg viewBox="0 0 ${W} ${H}" style="width:100%; height:auto; overflow:visible;" id="svg-${containerId}">
          <defs>
            <linearGradient id="bandGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#34d399" stop-opacity="0.25"/>
              <stop offset="100%" stop-color="#34d399" stop-opacity="0.04"/>
            </linearGradient>
          </defs>

          <!-- Grid Lines -->
          ${yTicks.join('')}

          <!-- Forecast Cutoff Boundary -->
          <line x1="${cutoffX}" x2="${cutoffX}" y1="${padT}" y2="${H - padB}" stroke="rgba(52, 211, 153, 0.4)" stroke-dasharray="4" stroke-width="1.5" />
          <text x="${cutoffX - 8}" y="${padT - 8}" fill="#8b9bb4" font-size="11" font-weight="600" text-anchor="end">← Historical Actuals</text>
          <text x="${cutoffX + 8}" y="${padT - 8}" fill="#34d399" font-size="11" font-weight="600">AI Forecast Horizon →</text>

          <!-- Confidence Band -->
          ${bandPolygon ? `<polygon points="${bandPolygon}" fill="url(#bandGrad)" />` : ''}

          <!-- Actual Line -->
          ${actualPts.length ? `<polyline points="${actualPts.join(' ')}" fill="none" stroke="#e2e8f0" stroke-width="2.5" stroke-linecap="round" />` : ''}

          <!-- Forecast Line -->
          ${forecastPts.length ? `<polyline points="${forecastPts.join(' ')}" fill="none" stroke="#34d399" stroke-width="2.8" stroke-dasharray="6 4" stroke-linecap="round" />` : ''}

          <!-- Axis Labels -->
          <text x="${padL}" y="${H - 12}" fill="#8b9bb4" font-size="11">T-14 Days</text>
          <text x="${cutoffX}" y="${H - 12}" fill="#34d399" font-size="11" text-anchor="middle">Today (Live)</text>
          <text x="${W - padR}" y="${H - 12}" fill="#8b9bb4" font-size="11" text-anchor="end">Day +${data.horizonDays}</text>
        </svg>

        <!-- Interactive Legend -->
        <div style="display:flex; justify-content:center; gap:18px; margin-top:8px; font-size:12px; color:var(--mu);">
          <span style="display:flex; align-items:center; gap:6px;">
            <i style="width:14px; height:3px; background:#e2e8f0; border-radius:2px; display:inline-block;"></i> Actual Sales
          </span>
          <span style="display:flex; align-items:center; gap:6px;">
            <i style="width:14px; height:3px; background:#34d399; border-radius:2px; display:inline-block;"></i> AI Model Forecast
          </span>
          <span style="display:flex; align-items:center; gap:6px;">
            <i style="width:12px; height:12px; background:rgba(52,211,153,0.25); border-radius:2px; display:inline-block;"></i> ${data.confidenceLevel}% Confidence Range
          </span>
        </div>
      </div>
    `;

    container.innerHTML = svg;
  },

  // Shelf-life Expiry Risk Timeline
  expiryTimeline(items, containerId) {
    const container = document.getElementById(containerId);
    if (!container || !items) return;

    const sorted = [...items].sort((a, b) => a.daysToExpiry - b.daysToExpiry);
    const maxDays = Math.max(...sorted.map(i => i.daysToExpiry), 30);

    const rows = sorted.map(item => {
      const days = item.daysToExpiry;
      const pct = Math.min(100, Math.max(6, (days / maxDays) * 100));
      let barColor = 'var(--g)';
      let badgeClass = 'grn';
      
      if (days <= 2) {
        barColor = 'var(--r)';
        badgeClass = 'red';
      } else if (days <= 7) {
        barColor = 'var(--o)';
        badgeClass = 'org';
      } else if (days <= 14) {
        barColor = 'var(--y)';
        badgeClass = 'yel';
      }

      return `
        <div style="display:flex; align-items:center; gap:14px; margin-bottom:12px; font-size:13px;">
          <div style="width:180px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; font-weight:500;">
            ${item.name}
          </div>
          <div style="flex:1;">
            <div class="bar" style="height:10px;">
              <i style="width:${pct}%; background:${barColor};"></i>
            </div>
          </div>
          <div style="width:110px; text-align:right;">
            <span class="b ${badgeClass}">in ${days} ${days === 1 ? 'day' : 'days'}</span>
          </div>
        </div>
      `;
    }).join('');

    container.innerHTML = rows;
  }
};
