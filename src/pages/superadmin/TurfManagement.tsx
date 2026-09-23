import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './pages.css';

type TurfStatus = 'active' | 'inactive';
type TabType = 'turf' | 'venue' | 'rejected';

interface Turf {
  id: number;
  name: string;
  location: string;
  sports: string;
  hours: string;
  status: TurfStatus;
}

const initialTurfs: Turf[] = [
  { id: 1, name: 'Shah Turf', location: 'Ganapathy', sports: 'Sports: Cricket, Foot Ball, Hand Ball', hours: '09:00 - 22:00', status: 'active' },
  { id: 2, name: 'Shah Turf', location: 'Ganapathy', sports: 'Sports: Cricket, Foot Ball, Hand Ball', hours: '09:00 - 22:00', status: 'active' },
  { id: 3, name: 'Shah Turf', location: 'Ganapathy', sports: 'Sports: Cricket, Foot Ball, Hand Ball', hours: '09:00 - 22:00', status: 'active' },
  { id: 4, name: 'Shah Turf', location: 'Ganapathy', sports: 'Sports: Cricket, Foot Ball, Hand Ball', hours: '09:00 - 22:00', status: 'inactive' },
  { id: 5, name: 'Shah Turf', location: 'Ganapathy', sports: 'Sports: Cricket, Foot Ball, Hand Ball', hours: '09:00 - 22:00', status: 'active' },
];

export default function TurfManagement() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<TabType>('turf');
  const [search, setSearch] = useState('');
  const [turfs, setTurfs] = useState<Turf[]>(initialTurfs);

  const filtered = turfs.filter(t => {
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase()) ||
                        t.location.toLowerCase().includes(search.toLowerCase());
    if (tab === 'rejected') return t.status === 'inactive' && matchSearch;
    return matchSearch;
  });

  const toggleStatus = (id: number) => {
    setTurfs(prev => prev.map(t =>
      t.id === id ? { ...t, status: t.status === 'active' ? 'inactive' : 'active' } : t
    ));
  };

  return (
    <div className="page-root">
      {/* Toolbar */}
      <div className="page-toolbar">
        <div className="page-search">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            placeholder="|Search by turf name, sports..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="tab-btns">
          <button
            className={`tab-btn ${tab === 'venue' ? 'tab-btn-green' : 'tab-btn-green'}`}
            onClick={() => navigate('/superadmin/turfs/venue-requests')}
          >
            Venue Request
          </button>
          <button
            className={`tab-btn ${tab === 'turf' ? 'tab-btn-green' : 'tab-btn-green'}`}
            onClick={() => setTab('turf')}
          >
            Turf Request
          </button>
          <button
            className={`tab-btn tab-btn-pink`}
            onClick={() => setTab('rejected')}
          >
            Rejected turf
          </button>
        </div>
      </div>

      {/* Turf cards */}
      <div className="turf-list">
        {filtered.map(turf => (
          <div className="turf-card" key={turf.id}>
            <div className="turf-card-top">
              <div>
                <p className="turf-card-name">{turf.name}</p>
                <p className="turf-card-location">{turf.location}</p>
              </div>
              <span className={turf.status === 'active' ? 'badge-active' : 'badge-inactive'}>
                {turf.status === 'active' ? 'Active' : 'Inactive'}
              </span>
            </div>
            <p className="turf-card-sports">{turf.sports}</p>
            <div className="turf-card-bottom" style={{ justifyContent: 'space-between' }}>
              <p className="turf-card-hours">{turf.hours}</p>
              {turf.status === 'active' ? (
                <button className="btn-deactivate" onClick={() => toggleStatus(turf.id)}>
                  Deactivate
                </button>
              ) : (
                <button className="btn-activate" onClick={() => toggleStatus(turf.id)}>
                  Activate
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
