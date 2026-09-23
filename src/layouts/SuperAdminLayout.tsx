import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import './SuperAdminLayout.css';

/* ── Puzzle logo icon (matches Figma) ── */
function PuzzleIcon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M13 5h6v3.5a1.5 1.5 0 0 0 1.5 1.5H24v6h-3.5A1.5 1.5 0 0 0 19 17.5V21h-6v-3.5A1.5 1.5 0 0 0 11.5 16H8v-6h3.5A1.5 1.5 0 0 0 13 8.5V5z"
        fill="#1a3a2a"
        opacity="0.85"
      />
    </svg>
  );
}

/* ── Nav items exactly matching screenshot ── */
const navItems = [
  {
    to: '/superadmin/dashboard',
    label: 'Dashboard',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="14" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
  },
  {
    to: '/superadmin/turfs',
    label: 'Turf Management',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="3" width="20" height="18" rx="2"/>
        <path d="M8 3v18M16 3v18M2 9h20M2 15h20"/>
      </svg>
    ),
  },
  {
    to: '/superadmin/bookings',
    label: 'Bookings',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="4" width="18" height="18" rx="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
  },
  {
    to: '/superadmin/users',
    label: 'Users',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    to: '/superadmin/revenue',
    label: 'Payment',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="5" width="20" height="14" rx="2"/>
        <line x1="2" y1="10" x2="22" y2="10"/>
      </svg>
    ),
  },
  {
    to: '/superadmin/corporate',
    label: 'Corporate',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    to: '/superadmin/turf-admins',
    label: 'Turf Admin',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    ),
  },
  {
    to: '/superadmin/report',
    label: 'Report',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
  },
  {
    to: '/superadmin/feedbacks',
    label: 'Feedbacks',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
  },
  {
    to: '/superadmin/settings',
    label: 'Settings',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
      </svg>
    ),
  },
];

export default function SuperAdminLayout() {
  const navigate = useNavigate();
  const userName = 'Jack Henry';

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/login');
  };

  return (
    <div className="sa-root">
      {/* ── Sidebar ── */}
      <aside className="sa-sidebar">
        {/* Logo */}
        <div className="sa-sidebar-logo">
          <div className="sa-logo-icon">
            <PuzzleIcon size={26} />
          </div>
          <div className="sa-logo-text-wrap">
            <span className="sa-logo-name">JUSTPLAY</span>
            <span className="sa-logo-tagline">Game Starts Here...</span>
          </div>
        </div>

        {/* Nav */}
        <nav className="sa-nav" aria-label="Main navigation">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `sa-nav-item${isActive ? ' active' : ''}`}
            >
              <span className="sa-nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="sa-sidebar-footer">
          <div className="sa-avatar">{userName.slice(0, 2).toUpperCase()}</div>
          <div className="sa-user-info">
            <span className="sa-user-name">{userName}</span>
            <span className="sa-user-role">Super Admin</span>
          </div>
          <button className="sa-logout-btn" onClick={handleLogout} title="Logout" aria-label="Logout">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="sa-main">
        {/* Top bar */}
        <header className="sa-topbar">
          <div className="sa-topbar-logo">
            <PuzzleIcon size={22} />
            <div className="sa-logo-text-wrap">
              <span className="sa-topbar-logo-name">JUSTPLAY</span>
              <span className="sa-topbar-logo-tagline">Game Starts Here...</span>
            </div>
          </div>

          <div className="sa-topbar-right">
            {/* Bell */}
            <button className="sa-topbar-bell" aria-label="Notifications">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              <span className="sa-topbar-bell-dot" />
            </button>

        {/* User – click to go to profile */}
            <div className="sa-topbar-user" style={{ cursor: 'pointer' }} onClick={() => navigate('/superadmin/profile')}>
              <div className="sa-topbar-avatar">JH</div>
              <span className="sa-topbar-user-name">{userName}</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="sa-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
