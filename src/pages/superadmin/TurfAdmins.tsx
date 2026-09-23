import PageHeader from '../../components/superadmin/PageHeader';
import '../../components/superadmin/superadmin.css';

const admins = [
  { id: 1, name: 'Ravi Kumar',  email: 'ravi@example.com',    turfs: 2, city: 'Chennai',    joined: '1 Dec 2025', status: 'active'  },
  { id: 2, name: 'Suresh M',    email: 'suresh@example.com',  turfs: 1, city: 'Chennai',    joined: '15 Jan 2026',status: 'active'  },
  { id: 3, name: 'Pradeep K',   email: 'pradeep@example.com', turfs: 1, city: 'Chennai',    joined: '3 Feb 2026', status: 'active'  },
  { id: 4, name: 'Anand R',     email: 'anand@example.com',   turfs: 1, city: 'Chennai',    joined: '10 Mar 2026',status: 'inactive'},
  { id: 5, name: 'Murugan T',   email: 'murugan@example.com', turfs: 1, city: 'Madurai',    joined: '20 Apr 2026',status: 'active'  },
  { id: 6, name: 'Bala V',      email: 'bala@example.com',    turfs: 1, city: 'Coimbatore', joined: '1 Sep 2026', status: 'pending' },
];

export default function TurfAdmins() {
  return (
    <div className="sa-page">
      <PageHeader
        title="Turf Admins"
        subtitle={`${admins.length} turf admins registered`}
        action={
          <button className="btn btn-primary">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Invite Admin
          </button>
        }
      />

      <div className="sa-card">
        <div className="sa-table-wrap">
          <table className="sa-table">
            <thead>
              <tr>
                <th>#</th><th>Name</th><th>Email</th><th>City</th>
                <th>Turfs Managed</th><th>Joined</th><th>Status</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((a, i) => (
                <tr key={a.id}>
                  <td style={{ color: 'var(--text-muted)', fontSize: 12 }}>{i + 1}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div className="user-avatar">{a.name.slice(0,2).toUpperCase()}</div>
                      <span style={{ fontWeight: 600, color: 'var(--text-heading)' }}>{a.name}</span>
                    </div>
                  </td>
                  <td style={{ fontSize: 13 }}>{a.email}</td>
                  <td>{a.city}</td>
                  <td style={{ fontWeight: 600, textAlign: 'center' }}>{a.turfs}</td>
                  <td style={{ fontSize: 12, color: 'var(--text-muted)' }}>{a.joined}</td>
                  <td>
                    <span className={`badge ${a.status === 'active' ? 'badge-success' : a.status === 'pending' ? 'badge-warning' : 'badge-gray'}`}>
                      {a.status}
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
                      <button className="icon-btn danger" title="Remove">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>
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
