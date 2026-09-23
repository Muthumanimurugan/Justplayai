import { useState } from 'react';
import PageHeader from '../../components/superadmin/PageHeader';
import '../../components/superadmin/superadmin.css';

const usersData = [
  { id: 1, name: 'Arun Kumar',  email: 'arun@example.com',  phone: '9876543210', role: 'customer',   joined: '12 Jan 2026', bookings: 14, status: 'active'   },
  { id: 2, name: 'Priya S',     email: 'priya@example.com', phone: '9123456789', role: 'customer',   joined: '5 Feb 2026',  bookings: 8,  status: 'active'   },
  { id: 3, name: 'Ravi Kumar',  email: 'ravi@example.com',  phone: '9988776655', role: 'turfadmin',  joined: '1 Dec 2025',  bookings: 0,  status: 'active'   },
  { id: 4, name: 'Divya R',     email: 'divya@example.com', phone: '9345678901', role: 'customer',   joined: '20 Mar 2026', bookings: 3,  status: 'inactive' },
  { id: 5, name: 'Karthik V',   email: 'karthik@example.com',phone:'9012345678', role: 'customer',   joined: '8 Apr 2026',  bookings: 22, status: 'active'   },
  { id: 6, name: 'Suresh M',    email: 'suresh@example.com',phone: '9765432109', role: 'turfadmin',  joined: '15 Jan 2026', bookings: 0,  status: 'active'   },
  { id: 7, name: 'Meena L',     email: 'meena@example.com', phone: '9654321098', role: 'customer',   joined: '2 May 2026',  bookings: 6,  status: 'active'   },
];

export default function Users() {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const filtered = usersData.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) ||
                        u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === 'all' || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  return (
    <div className="sa-page">
      <PageHeader
        title="Users"
        subtitle={`${usersData.length} registered users`}
        action={
          <button className="btn btn-primary">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Add User
          </button>
        }
      />

      <div className="sa-card">
        <div className="sa-card-header">
          <div className="toolbar">
            <div className="search-box">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input placeholder="Search users…" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            {(['all','customer','turfadmin'] as const).map(r => (
              <button
                key={r}
                className={`btn btn-sm ${roleFilter === r ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setRoleFilter(r)}
              >
                {r === 'all' ? 'All' : r === 'customer' ? 'Customers' : 'Turf Admins'}
              </button>
            ))}
          </div>
        </div>

        <div className="sa-table-wrap">
          <table className="sa-table">
            <thead>
              <tr>
                <th>#</th><th>Name</th><th>Email</th><th>Phone</th>
                <th>Role</th><th>Joined</th><th>Bookings</th><th>Status</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u, i) => (
                <tr key={u.id}>
                  <td style={{ color: 'var(--text-muted)', fontSize: 12 }}>{i + 1}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div className="user-avatar">{u.name.slice(0,2).toUpperCase()}</div>
                      <span style={{ fontWeight: 600, color: 'var(--text-heading)' }}>{u.name}</span>
                    </div>
                  </td>
                  <td style={{ fontSize: 13 }}>{u.email}</td>
                  <td style={{ fontSize: 13 }}>{u.phone}</td>
                  <td>
                    <span className={`badge ${u.role === 'turfadmin' ? 'badge-info' : 'badge-gray'}`}>
                      {u.role === 'turfadmin' ? 'Turf Admin' : 'Customer'}
                    </span>
                  </td>
                  <td style={{ fontSize: 12, color: 'var(--text-muted)' }}>{u.joined}</td>
                  <td style={{ fontWeight: 600 }}>{u.bookings}</td>
                  <td>
                    <span className={`badge ${u.status === 'active' ? 'badge-success' : 'badge-gray'}`}>
                      {u.status}
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
                      <button className="icon-btn danger" title="Block">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
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
