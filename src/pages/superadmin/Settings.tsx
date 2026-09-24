import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Settings.css';

export default function Settings() {
  const navigate = useNavigate();
  const [notif1, setNotif1] = useState(true);
  const [notif2, setNotif2] = useState(true);
  const [autoUpdate, setAutoUpdate] = useState(true);

  return (
    <div className="settings-root">

      {/* ── App Notifications ── */}
      <section className="settings-section">
        <h2 className="settings-section-title">App Notifications</h2>

        <div className="settings-list-card">
          {/* Row 1 */}
          <div className="settings-row">
            <div className="settings-row-text">
              <p className="settings-row-label">Notifications</p>
              <p className="settings-row-desc">You can edit your notification status</p>
            </div>
            <div className="settings-row-right">
              <label className="stg-toggle">
                <input
                  type="checkbox"
                  checked={notif1}
                  onChange={e => setNotif1(e.target.checked)}
                />
                <span className="stg-slider" />
              </label>
              <button className="settings-chevron" aria-label="Edit notification">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>

          <div className="settings-divider" />

          {/* Row 2 */}
          <div className="settings-row">
            <div className="settings-row-text">
              <p className="settings-row-label">Notifications</p>
              <p className="settings-row-desc">You can edit your notification status</p>
            </div>
            <div className="settings-row-right">
              <label className="stg-toggle">
                <input
                  type="checkbox"
                  checked={notif2}
                  onChange={e => setNotif2(e.target.checked)}
                />
                <span className="stg-slider" />
              </label>
              <button className="settings-chevron" aria-label="Edit notification">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── More Settings ── */}
      <section className="settings-section">
        <h2 className="settings-section-title">More Settings</h2>

        <div className="settings-list-card">
          {/* Auto Updates */}
          <div className="settings-row">
            <div className="settings-row-text">
              <p className="settings-row-label">Auto Updates</p>
              <p className="settings-row-desc">
                Please{' '}
                <span className="settings-link">enable auto-updates</span>
                {' '}to receive the latest features and{' '}
                <span className="settings-link">improvements for your</span>
                {' '}system.
              </p>
            </div>
            <div className="settings-row-right">
              <label className="stg-toggle">
                <input
                  type="checkbox"
                  checked={autoUpdate}
                  onChange={e => setAutoUpdate(e.target.checked)}
                />
                <span className="stg-slider" />
              </label>
              <button className="settings-chevron" aria-label="Edit auto updates">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>

          <div className="settings-divider" />

          {/* Customize Configuration — clickable → Edit Configurations */}
          <div
            className="settings-row settings-row-clickable"
            onClick={() => navigate('/superadmin/settings/edit-configurations')}
            role="button"
            tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && navigate('/superadmin/settings/edit-configurations')}
          >
            <div className="settings-row-text">
              <p className="settings-row-label">Customize Configuration</p>
              <p className="settings-row-desc">
                You can{' '}
                <span className="settings-link">customize your turf's</span>
                {' '}operating hours and{' '}
                <span className="settings-link">pricing configuration</span>.
              </p>
            </div>
            <div className="settings-row-right">
              <button className="settings-chevron" aria-label="Customize configuration">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
