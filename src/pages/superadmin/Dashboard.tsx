import { useState } from 'react';
import '../../components/superadmin/superadmin.css';
import './Dashboard.css';

/* ── Stat cards data ── */
const statCards = [
  {
    label: 'Total Turfs',
    value: 25,
    color: '#f5e6fa',
    accent: '#c47de0',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c47de0" strokeWidth="2">
        <rect x="2" y="3" width="20" height="18" rx="2"/>
        <path d="M8 3v18M16 3v18M2 9h20M2 15h20"/>
      </svg>
    ),
  },
  {
    label: 'Active Bookings',
    value: 40,
    color: '#e6f0ff',
    accent: '#5b8dee',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5b8dee" strokeWidth="2">
        <rect x="3" y="4" width="18" height="18" rx="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
    highlight: true,
  },
  {
    label: 'Pending Approvals',
    value: 12,
    color: '#fff3e6',
    accent: '#f0a050',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f0a050" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
];

/* ── Line chart data (31 days, Oct) ── */
const chartData = [
  18, 28, 22, 35, 42, 30, 25, 38, 20, 32, 28, 45, 38, 22, 30,
  18, 42, 35, 28, 22, 38, 45, 32, 28, 35, 22, 48, 40, 30, 38, 52,
];

/* ── New turf requests ── */
const turfRequests = [
  { type: 'Cricket',     name: 'Spin play', rate: 'Premium', status: 'pending' },
  { type: 'Swimming...',  name: 'Spin play', rate: 'Premium', status: 'pending' },
  { type: 'Basket Ball', name: 'Spin play', rate: 'Premium', status: 'pending' },
  { type: 'Basket Ball', name: 'Spin play', rate: 'Premium', status: 'pending' },
];

/* ── Recent feedbacks ── */
const feedbacks = [
  {
    name: 'Max Timmy',
    text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque',
    date: '27-06-2024',
    initials: 'MT',
    color: '#e8d5f5',
  },
  {
    name: 'Christina John',
    text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque',
    date: '27-06-2024',
    initials: 'CJ',
    color: '#d5e8f5',
  },
  {
    name: 'Joseph Franklo',
    text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque',
    date: '26-06-2024',
    initials: 'JF',
    color: '#d5f5e8',
  },
];

/* ── SVG Line Chart ── */
function LineChart({ data }: { data: number[] }) {
  const W = 560;
  const H = 160;
  const pad = { top: 16, right: 12, bottom: 24, left: 40 };
  const innerW = W - pad.left - pad.right;
  const innerH = H - pad.top - pad.bottom;

  const minVal = 0;
  const maxVal = 60;
  const yLabels = [0, 15, 30, 45, 60];

  const xStep = innerW / (data.length - 1);
  const yScale = (v: number) => innerH - ((v - minVal) / (maxVal - minVal)) * innerH;

  const points = data.map((v, i) => ({
    x: pad.left + i * xStep,
    y: pad.top + yScale(v),
  }));

  const pathD = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(' ');

  // area fill
  const areaD =
    pathD +
    ` L ${points[points.length - 1].x.toFixed(1)} ${(pad.top + innerH).toFixed(1)}` +
    ` L ${points[0].x.toFixed(1)} ${(pad.top + innerH).toFixed(1)} Z`;

  const xLabels = ['1','3','5','7','9','11','13','15','17','19','21','23','25','27','29','31'];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: 'block', overflow: 'visible' }}>
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#3dba7a" stopOpacity="0.18"/>
          <stop offset="100%" stopColor="#3dba7a" stopOpacity="0"/>
        </linearGradient>
      </defs>

      {/* Y grid lines + labels */}
      {yLabels.map(v => {
        const y = pad.top + yScale(v);
        return (
          <g key={v}>
            <line
              x1={pad.left} y1={y} x2={W - pad.right} y2={y}
              stroke="#e8eef0" strokeWidth="1" strokeDasharray="4 3"
            />
            <text x={pad.left - 8} y={y + 4} textAnchor="end" fontSize="10" fill="#9ab0a8">
              {v === 0 ? '0k' : `${v}k`}
            </text>
          </g>
        );
      })}

      {/* X labels – every other day */}
      {xLabels.map((label, i) => {
        const idx = i * 2;
        if (idx >= data.length) return null;
        const x = pad.left + idx * xStep;
        return (
          <text key={label} x={x} y={H - 4} textAnchor="middle" fontSize="10" fill="#9ab0a8">
            {label}
          </text>
        );
      })}

      {/* Area fill */}
      <path d={areaD} fill="url(#areaGrad)"/>

      {/* Line */}
      <path d={pathD} fill="none" stroke="#3dba7a" strokeWidth="2" strokeLinejoin="round"/>

      {/* Dots */}
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="3" fill="#3dba7a" stroke="#fff" strokeWidth="1.5"/>
      ))}
    </svg>
  );
}

export default function Dashboard() {
  const [revenueFilter, setRevenueFilter] = useState('Week 1');

  return (
    <div className="dash-root">
      {/* Welcome */}
      <h2 className="dash-welcome">Hi Jack Henry Welcome Back.....</h2>

      {/* ── Top two-column section ── */}
      <div className="dash-top-grid">

        {/* Left – stat cards */}
        <div className="dash-stat-col">
          {statCards.map((s) => (
            <div
              key={s.label}
              className={`dash-stat-card${s.highlight ? ' highlight' : ''}`}
              style={{ background: s.highlight ? s.color : '#fff', border: s.highlight ? 'none' : '1px solid #eef0f5' }}
            >
              <div className="dash-stat-icon" style={{ background: s.highlight ? 'rgba(255,255,255,0.5)' : s.color }}>
                {s.icon}
              </div>
              <span className="dash-stat-label" style={{ color: s.highlight ? '#1a2a4a' : '#5a6a8a' }}>
                {s.label}
              </span>
              <span className="dash-stat-value" style={{ color: s.highlight ? '#1a2a4a' : '#1a2a4a' }}>
                {s.value}
              </span>
            </div>
          ))}
        </div>

        {/* Right – revenue chart */}
        <div className="dash-chart-card">
          <div className="dash-chart-header">
            <div className="dash-chart-title-row">
              <span className="dash-chart-title">Total revenue:</span>
              <span className="dash-chart-amount">₹ 1,54,325</span>
            </div>
            <div className="dash-chart-filters">
              {/* Date picker button */}
              <button className="dash-filter-btn">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                Oct 2024
              </button>
              {/* Week selector */}
              <select
                className="dash-filter-btn"
                value={revenueFilter}
                onChange={e => setRevenueFilter(e.target.value)}
              >
                {['Week 1','Week 2','Week 3','Week 4'].map(w => (
                  <option key={w}>{w}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="dash-chart-body">
            <LineChart data={chartData} />
          </div>
        </div>

      </div>

      {/* ── Bottom two-column section ── */}
      <div className="dash-bottom-grid">

        {/* New Turf Requests */}
        <div className="dash-card">
          <div className="dash-card-header">
            <span className="dash-card-title">New Turf Requests</span>
          </div>
          <table className="dash-table">
            <thead>
              <tr>
                <th>Turf type</th>
                <th>Turf name</th>
                <th>Rate category</th>
                <th>Action</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {turfRequests.map((r, i) => (
                <tr key={i}>
                  <td>{r.type}</td>
                  <td>{r.name}</td>
                  <td>{r.rate}</td>
                  <td>
                    <button className="dash-link-btn">View</button>
                  </td>
                  <td>
                    <div className="dash-action-row">
                      <button className="dash-approve-btn">Approve</button>
                      <button className="dash-reject-btn">Reject</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recent Feedbacks */}
        <div className="dash-card">
          <div className="dash-card-header">
            <span className="dash-card-title">Recent Feedbacks</span>
            <button className="dash-feedback-arrow" aria-label="View all feedbacks">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
          </div>
          <div className="dash-feedback-list">
            {feedbacks.map((f, i) => (
              <div className="dash-feedback-item" key={i}>
                <div className="dash-feedback-avatar" style={{ background: f.color }}>
                  {f.initials}
                </div>
                <div className="dash-feedback-body">
                  <p className="dash-feedback-name">{f.name}</p>
                  <p className="dash-feedback-text">{f.text}</p>
                  <p className="dash-feedback-date">Date - {f.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
