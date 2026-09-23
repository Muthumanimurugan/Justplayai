import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './pages.css';

export default function EditProfile() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: 'Jack',
    lastName: 'Henry',
    email: 'jackmax23@gmail.com',
  });

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // Save logic here
    navigate('/superadmin/profile');
  };

  return (
    <div className="page-root">
      {/* Back header */}
      <div className="page-back-header">
        <button className="back-btn" onClick={() => navigate('/superadmin/profile')} aria-label="Back">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="19" y1="12" x2="5" y2="12"/>
            <polyline points="12 19 5 12 12 5"/>
          </svg>
        </button>
        <span className="page-back-title">Edit Profile</span>
      </div>

      <form className="edit-profile-form" onSubmit={handleUpdate}>
        {/* Avatar with camera */}
        <div className="edit-avatar-wrap">
          <div className="edit-avatar">
            <svg viewBox="0 0 80 80" width="80" height="80" fill="none">
              <rect width="80" height="80" rx="40" fill="#b0d8c8"/>
              <ellipse cx="40" cy="62" rx="22" ry="14" fill="#7ab8a0"/>
              <circle cx="40" cy="30" r="14" fill="#d4a882"/>
              <ellipse cx="40" cy="19" rx="14" ry="7" fill="#4a3020"/>
              <rect x="26" y="19" width="28" height="7" fill="#4a3020" rx="3"/>
            </svg>
          </div>
          <div className="edit-avatar-btn" role="button" aria-label="Change photo">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
              <circle cx="12" cy="13" r="4"/>
            </svg>
          </div>
        </div>

        {/* Fields */}
        <div className="edit-form-grid">
          <div className="edit-field">
            <label className="edit-label">
              First Name <span className="req">*</span>
            </label>
            <input
              className="edit-input"
              value={form.firstName}
              onChange={e => setForm(p => ({ ...p, firstName: e.target.value }))}
              required
            />
          </div>

          <div className="edit-field">
            <label className="edit-label">
              Last Name <span className="req">*</span>
            </label>
            <input
              className="edit-input"
              value={form.lastName}
              onChange={e => setForm(p => ({ ...p, lastName: e.target.value }))}
              required
            />
          </div>

          <div className="edit-field full">
            <label className="edit-label">
              Email Address <span className="req">*</span>
            </label>
            <input
              className="edit-input"
              type="email"
              value={form.email}
              disabled
            />
          </div>
        </div>

        <div className="edit-form-footer">
          <button type="submit" className="btn-update">Update</button>
        </div>
      </form>
    </div>
  );
}
