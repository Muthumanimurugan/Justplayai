import PageHeader from '../../components/superadmin/PageHeader';
import '../../components/superadmin/superadmin.css';
import './Settings.css';

export default function Settings() {
  return (
    <div className="sa-page">
      <PageHeader title="Settings" subtitle="Manage platform configuration" />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Profile */}
        <div className="sa-card settings-card">
          <div className="sa-card-header"><span className="sa-card-title">Admin Profile</span></div>
          <div className="settings-body">
            <div className="settings-avatar-row">
              <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'linear-gradient(135deg,#00b14f,#009140)', color: '#fff', fontSize: 20, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>SA</div>
              <button className="btn btn-outline btn-sm">Change photo</button>
            </div>
            <div className="settings-field"><label>Full Name</label><input defaultValue="Super Admin" /></div>
            <div className="settings-field"><label>Email</label><input defaultValue="admin@justplay.com" type="email" /></div>
            <div className="settings-field"><label>Phone</label><input defaultValue="+91 9876543210" /></div>
            <button className="btn btn-primary" style={{ marginTop: 8 }}>Save changes</button>
          </div>
        </div>

        {/* Password */}
        <div className="sa-card settings-card">
          <div className="sa-card-header"><span className="sa-card-title">Change Password</span></div>
          <div className="settings-body">
            <div className="settings-field"><label>Current Password</label><input type="password" placeholder="••••••••" /></div>
            <div className="settings-field"><label>New Password</label><input type="password" placeholder="••••••••" /></div>
            <div className="settings-field"><label>Confirm Password</label><input type="password" placeholder="••••••••" /></div>
            <button className="btn btn-primary" style={{ marginTop: 8 }}>Update password</button>
          </div>
        </div>

        {/* Platform config */}
        <div className="sa-card settings-card">
          <div className="sa-card-header"><span className="sa-card-title">Platform Settings</span></div>
          <div className="settings-body">
            <div className="settings-toggle-row">
              <div><p className="settings-toggle-label">Maintenance Mode</p><p className="settings-toggle-desc">Take the platform offline for maintenance</p></div>
              <label className="toggle"><input type="checkbox" /><span className="toggle-slider" /></label>
            </div>
            <div className="settings-toggle-row">
              <div><p className="settings-toggle-label">New Registrations</p><p className="settings-toggle-desc">Allow new user sign-ups</p></div>
              <label className="toggle"><input type="checkbox" defaultChecked /><span className="toggle-slider" /></label>
            </div>
            <div className="settings-toggle-row">
              <div><p className="settings-toggle-label">Email Notifications</p><p className="settings-toggle-desc">Send automated email alerts</p></div>
              <label className="toggle"><input type="checkbox" defaultChecked /><span className="toggle-slider" /></label>
            </div>
            <div className="settings-field"><label>Platform Commission (%)</label><input type="number" defaultValue={10} min={0} max={100} /></div>
            <button className="btn btn-primary" style={{ marginTop: 8 }}>Save settings</button>
          </div>
        </div>

        {/* Notifications */}
        <div className="sa-card settings-card">
          <div className="sa-card-header"><span className="sa-card-title">Notification Preferences</span></div>
          <div className="settings-body">
            {['New booking alerts','Cancellation alerts','New user registrations','Revenue milestones','Turf approval requests'].map(n => (
              <div className="settings-toggle-row" key={n}>
                <p className="settings-toggle-label">{n}</p>
                <label className="toggle"><input type="checkbox" defaultChecked /><span className="toggle-slider" /></label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
