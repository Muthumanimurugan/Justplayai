import PageHeader from '../../components/superadmin/PageHeader';
import StatCard from '../../components/superadmin/StatCard';
import '../../components/superadmin/superadmin.css';

const stats = [
  { label: 'Total Revenue', value: '₹24.6L', change: '18% vs last year', positive: true, color: '#00b14f',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> },
  { label: 'This Month', value: '₹2.4L', change: '5% vs last month', positive: false, color: '#3b82f6',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
  { label: 'Avg per Booking', value: '₹920', change: '3% vs last month', positive: true, color: '#8b5cf6',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
  { label: 'Pending Payouts', value: '₹38K', color: '#f5a623',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
];

const monthly = [
  { month: 'Jan', revenue: 180000, bookings: 210 },
  { month: 'Feb', revenue: 210000, bookings: 245 },
  { month: 'Mar', revenue: 195000, bookings: 228 },
  { month: 'Apr', revenue: 240000, bookings: 280 },
  { month: 'May', revenue: 220000, bookings: 260 },
  { month: 'Jun', revenue: 280000, bookings: 320 },
  { month: 'Jul', revenue: 260000, bookings: 300 },
  { month: 'Aug', revenue: 310000, bookings: 360 },
  { month: 'Sep', revenue: 240000, bookings: 260 },
];

const maxRev = Math.max(...monthly.map(m => m.revenue));

export default function Revenue() {
  return (
    <div className="sa-page">
      <PageHeader title="Revenue" subtitle="Financial overview and earnings breakdown" />

      <div className="stat-grid">
        {stats.map(s => <StatCard key={s.label} {...s} />)}
      </div>

      {/* Bar chart */}
      <div className="sa-card">
        <div className="sa-card-header">
          <span className="sa-card-title">Monthly Revenue (₹)</span>
        </div>
        <div style={{ padding: '20px 24px 8px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: 200 }}>
            {monthly.map(m => (
              <div key={m.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 600 }}>
                  ₹{(m.revenue / 100000).toFixed(1)}L
                </span>
                <div
                  className="chart-bar"
                  style={{ width: '100%', height: (m.revenue / maxRev) * 160 }}
                  title={`${m.month}: ₹${m.revenue.toLocaleString()}`}
                />
                <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{m.month}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Table breakdown */}
      <div className="sa-card">
        <div className="sa-card-header">
          <span className="sa-card-title">Monthly Breakdown</span>
          <button className="btn btn-outline btn-sm">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Export
          </button>
        </div>
        <div className="sa-table-wrap">
          <table className="sa-table">
            <thead>
              <tr><th>Month</th><th>Total Revenue</th><th>Bookings</th><th>Avg per Booking</th><th>Growth</th></tr>
            </thead>
            <tbody>
              {monthly.map((m, i) => {
                const avg = Math.round(m.revenue / m.bookings);
                const prev = monthly[i - 1];
                const growth = prev ? ((m.revenue - prev.revenue) / prev.revenue * 100).toFixed(1) : null;
                return (
                  <tr key={m.month}>
                    <td style={{ fontWeight: 600, color: 'var(--text-heading)' }}>{m.month} 2026</td>
                    <td style={{ fontWeight: 700, color: 'var(--primary)' }}>₹{m.revenue.toLocaleString()}</td>
                    <td>{m.bookings}</td>
                    <td>₹{avg.toLocaleString()}</td>
                    <td>
                      {growth !== null ? (
                        <span className={`badge ${parseFloat(growth) >= 0 ? 'badge-success' : 'badge-danger'}`}>
                          {parseFloat(growth) >= 0 ? '↑' : '↓'} {Math.abs(parseFloat(growth))}%
                        </span>
                      ) : '—'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
