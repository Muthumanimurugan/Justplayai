import { useState } from 'react';
import PageHeader from '../../components/superadmin/PageHeader';
import '../../components/superadmin/superadmin.css';

const bookingsData = [
  { id: 'B1021', user: 'Arun Kumar',  turf: 'Green Field FC',           date: '22 Sep 2026', time: '6:00 PM – 7:00 PM',  amount: '₹800',   status: 'confirmed', sport: 'Football'  },
  { id: 'B1020', user: 'Priya S',     turf: 'Champions Arena',          date: '22 Sep 2026', time: '4:30 PM – 5:30 PM',  amount: '₹1,200', status: 'confirmed', sport: 'Football'  },
  { id: 'B1019', user: 'Rahul M',     turf: 'Sports Hub Velachery',     date: '21 Sep 2026', time: '7:00 AM – 8:00 AM',  amount: '₹600',   status: 'completed', sport: 'Cricket'   },
  { id: 'B1018', user: 'Divya R',     turf: 'Kick Zone OMR',            date: '21 Sep 2026', time: '5:00 PM – 6:00 PM',  amount: '₹900',   status: 'cancelled', sport: 'Football'  },
  { id: 'B1017', user: 'Karthik V',   turf: 'Play Arena Adyar',         date: '20 Sep 2026', time: '8:00 AM – 9:00 AM',  amount: '₹1,500', status: 'completed', sport: 'Basketball'},
  { id: 'B1016', user: 'Meena L',     turf: 'Sportz Village Madurai',   date: '20 Sep 2026', time: '6:00 PM – 7:00 PM',  amount: '₹700',   status: 'completed', sport: 'Cricket'   },
  { id: 'B1015', user: 'Suresh M',    turf: 'Green Field FC',           date: '19 Sep 2026', time: '10:00 AM – 11:00 AM',amount: '₹800',   status: 'completed', sport: 'Football'  },
  { id: 'B1014', user: 'Arun Kumar',  turf: 'Champions Arena',          date: '18 Sep 2026', time: '7:00 PM – 8:00 PM',  amount: '₹1,200', status: 'completed', sport: 'Football'  },
];

const statusBadge = (s: string) => {
  const map: Record<string, string> = { confirmed: 'badge-success', completed: 'badge-info', cancelled: 'badge-danger', pending: 'badge-warning' };
  return map[s] ?? 'badge-gray';
};

export default function Bookings() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = bookingsData.filter(b => {
    const matchSearch = b.user.toLowerCase().includes(search.toLowerCase()) ||
                        b.turf.toLowerCase().includes(search.toLowerCase()) ||
                        b.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || b.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="sa-page">
      <PageHeader
        title="Bookings"
        subtitle={`${bookingsData.length} total bookings`}
        action={
          <button className="btn btn-outline">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Export CSV
          </button>
        }
      />

      <div className="sa-card">
        <div className="sa-card-header">
          <div className="toolbar">
            <div className="search-box">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input placeholder="Search bookings…" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            {(['all','confirmed','completed','cancelled'] as const).map(s => (
              <button
                key={s}
                className={`btn btn-sm ${statusFilter === s ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setStatusFilter(s)}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="sa-table-wrap">
          <table className="sa-table">
            <thead>
              <tr>
                <th>Booking ID</th><th>User</th><th>Turf</th><th>Sport</th>
                <th>Date</th><th>Time Slot</th><th>Amount</th><th>Status</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(b => (
                <tr key={b.id}>
                  <td><span style={{ fontFamily: 'monospace', fontWeight: 600, color: 'var(--primary)' }}>#{b.id}</span></td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div className="user-avatar">{b.user.slice(0,2).toUpperCase()}</div>
                      {b.user}
                    </div>
                  </td>
                  <td style={{ fontWeight: 500, color: 'var(--text-heading)' }}>{b.turf}</td>
                  <td><span className="badge badge-info" style={{ fontSize: 10 }}>{b.sport}</span></td>
                  <td style={{ fontSize: 12, color: 'var(--text-muted)' }}>{b.date}</td>
                  <td style={{ fontSize: 12, color: 'var(--text-muted)' }}>{b.time}</td>
                  <td style={{ fontWeight: 600, color: 'var(--text-heading)' }}>{b.amount}</td>
                  <td><span className={`badge ${statusBadge(b.status)}`}>{b.status}</span></td>
                  <td>
                    <div className="action-btns">
                      <button className="icon-btn" title="View details">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                      </button>
                      <button className="icon-btn danger" title="Cancel">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
