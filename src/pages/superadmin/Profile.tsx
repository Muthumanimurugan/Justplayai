import { useNavigate } from 'react-router-dom';
import './pages.css';

export default function Profile() {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/login');
  };

  return (
    <div className="page-root">
      <div className="profile-card">
        {/* Header */}
        <div className="profile-card-header">
          <span className="profile-card-title">My Profile</span>
          <button
            className="profile-edit-link"
            onClick={() => navigate('/superadmin/profile/edit')}
          >
            Edit
          </button>
        </div>

        {/* Avatar */}
        <div className="profile-avatar-wrap">
          <div className="profile-avatar">
            {/* Person illustration SVG */}
            <svg viewBox="0 0 88 88" width="88" height="88" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="88" height="88" rx="44" fill="#b0d8c8"/>
              {/* Body */}
              <ellipse cx="44" cy="70" rx="26" ry="16" fill="#7ab8a0"/>
              {/* Head */}
              <circle cx="44" cy="34" r="16" fill="#d4a882"/>
              {/* Hair */}
              <ellipse cx="44" cy="22" rx="16" ry="8" fill="#4a3020"/>
              <rect x="28" y="22" width="32" height="8" fill="#4a3020" rx="4"/>
            </svg>
          </div>
          {/* Camera edit button */}
          <div className="profile-avatar-edit">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
              <circle cx="12" cy="13" r="4"/>
            </svg>
          </div>
        </div>

        {/* Info */}
        <div className="profile-info">
          <div className="profile-info-row">
            <strong>Name:</strong> Jack Henry
          </div>
          <div className="profile-info-row">
            <strong>Email:</strong> Jackhenry23@gamil.com
          </div>
          <div className="profile-info-row">
            <button className="profile-change-pwd">Change Password</button>
          </div>
        </div>

        {/* Logout */}
        <button className="profile-logout" onClick={handleLogout}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          Logout
        </button>
      </div>
    </div>
  );
}
