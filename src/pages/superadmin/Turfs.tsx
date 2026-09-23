import { useState } from 'react';
import PageHeader from '../../components/superadmin/PageHeader';
import '../../components/superadmin/superadmin.css';

const turfsData = [
  { id: 1, name: 'Green Field FC',          city: 'Chennai',   admin: 'Ravi Kumar',   sports: ['Football','Cricket'], status: 'active',   bookings: 142, rating: 4.8 },
  { id: 2, name: 'Champions Arena',         city: 'Chennai',   admin: 'Suresh M',     sports: ['Football'],           status: 'active',   bookings: 98,  rating: 4.6 },
  { id: 3, name: 'Sports Hub Velachery',    city: 'Chennai',   admin: 'Pradeep K',    sports: ['Cricket','Badminton'],status: 'active',   bookings: 210, rating: 4.9 },
  { id: 4, name: 'Kick Zone OMR',           city: 'Chennai',   admin: 'Anand R',      sports: ['Football'],           status: 'inactive', bookings: 55,  rating: 4.2 },
  { id: 5, name: 'Play Arena Adyar',        city: 'Chennai',   admin: 'Vijay S',      sports: ['Basketball','Volleyball'], status: 'active', bookings: 176, rating: 4.7 },
  { id: 6, name: 'Sportz Village Madurai',  city: 'Madurai',   admin: 'Murugan T',    sports: ['Football','Cricket'], status: 'active',   bookings: 88,  rating: 4.5 },
  { id: 7, name: 'Elite Turf Coimbatore',   city: 'Coimbatore',admin: 'Bala V',       sports: ['Football'],           status: 'pending',  bookings: 0,   rating: 0   },
];

export default function Turfs() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = turfsData.filter(t => {
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase()) ||
                        t.city.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || t.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="sa-page">
      <PageHeader
        title="Turfs"
        subtitle={`${turfsData.length} turfs registered across India`}
        action={
          <button className="btn btn-primary">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Add Turf
          </button>
        }
      />

      <div className="sa-card">
        <div className="sa-card-header">
          <div className="toolbar">
            <div className="search-box">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input placeholder="Search turfs…" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            {(['all','active','inactive','pending'] as const).map(f => (
              <button
                key={f}
                className={`btn btn-sm ${filter === f ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setFilter(f)}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="sa-table-wrap">
          <table className="sa-table">
            <thead>
              <tr>
                <th>#</th><th>Turf Name</th><th>City</th><th>Admin</th>
                <th>Sports</th><th>Bookings</th><th>Rating</th><th>Status</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t, i) => (
                <tr key={t.id}>
                  <td style={{ color: 'var(--text-muted)', fontSize: 12 }}>{i + 1}</td>
                  <td style={{ fontWeight: 600, color: 'var(--text-heading)' }}>{t.name}</td>
                  <td>{t.city}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div className="user-avatar">{t.admin.slice(0,2).toUpperCase()}</div>
                      {t.admin}
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                      {t.sports.map(s => <span key={s} className="badge badge-info" style={{ fontSize: 10 }}>{s}</span>)}
                    </div>
                  </td>
                  <td style={{ fontWeight: 600 }}>{t.bookings}</td>
                  <td>{t.rating > 0 ? <span style={{ color: '#f5a623' }}>★ {t.rating}</span> : '—'}</td>
                  <td>
                    <span className={`badge ${t.status === 'active' ? 'badge-success' : t.status === 'pending' ? 'badge-warning' : 'badge-gray'}`}>
                      {t.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-btns">
                      <button className="icon-btn" title="View">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                      </button>
                      <button className="icon-btn" title="Edit">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                      </button>
                      <button className="icon-btn danger" title="Delete">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
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
