import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const DEMO_USERS = [
  { email: 'admin@justplay.com', password: 'admin123', role: 'superadmin' },
] as const;

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd]   = useState(false);
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));

    const match = DEMO_USERS.find(
      u => u.email === email.trim().toLowerCase() && u.password === password
    );

    if (!match) {
      setError('Invalid email or password.');
      setLoading(false);
      return;
    }

    sessionStorage.setItem('justplay_role', match.role);
    sessionStorage.setItem('justplay_email', match.email);
    navigate('/superadmin/dashboard');
  };

  return (
    <div className="login-root">

      {/* Floating sport ball decorations */}
      <div className="login-bg-balls" aria-hidden="true">
        <div className="ball-basketball" />
        <div className="ball-cricket" />
        <div className="ball-tennis" />
        <div className="ball-soccer" />
      </div>

      <div className="login-wrapper">

        {/* ── Left card: stadium image ── */}
        <div className="login-left-card">
          {/* Stadium photo via CSS background fallback if no real image */}
          <StadiumCard />
        </div>

        {/* ── Right: LOGIN form ── */}
        <div className="login-right">
          <h1 className="login-title">Login</h1>

          <form className="login-form" onSubmit={handleSubmit} noValidate>

            <div className="form-group">
              <label className="form-label" htmlFor="email">
                Email Address <span className="required">*</span>
              </label>
              <div className="input-wrapper">
                <input
                  id="email"
                  className="form-input"
                  type="email"
                  placeholder="jackmax23@gmail.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password">
                Password <span className="required">*</span>
              </label>
              <div className="input-wrapper">
                <input
                  id="password"
                  className="form-input"
                  type={showPwd ? 'text' : 'password'}
                  placeholder="••••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  className="pwd-toggle"
                  onClick={() => setShowPwd(p => !p)}
                  aria-label={showPwd ? 'Hide password' : 'Show password'}
                >
                  {showPwd ? (
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    /* eye-off icon matching the Figma screenshot */
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="forgot-row">
              <a href="#" className="forgot-link">Forgot Password?</a>
            </div>

            {error && (
              <div className="login-error" role="alert">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                {error}
              </div>
            )}

            <button type="submit" className="btn-login" disabled={loading}>
              {loading ? <span className="spinner" /> : 'Login'}
            </button>
          </form>

          {/* Demo quick-fill */}
          <div className="login-demo-hint">
            <p className="text-xs text-muted">Quick fill demo</p>
            <div className="demo-pills">
              <button
                type="button"
                className="demo-pill"
                onClick={() => { setEmail('admin@justplay.com'); setPassword('admin123'); }}
              >
                Super Admin
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

/* ── Stadium card component ── */
function StadiumCard() {
  return (
    <>
      {/* SVG stadium illustration that matches the dark football stadium photo */}
      <svg
        viewBox="0 0 300 480"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%', display: 'block' }}
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Night sky */}
        <defs>
          <radialGradient id="skyGrad" cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#1a2a3a"/>
            <stop offset="100%" stopColor="#0a0e14"/>
          </radialGradient>
          <radialGradient id="fieldGrad" cx="50%" cy="0%" r="100%">
            <stop offset="0%" stopColor="#2d7a2d"/>
            <stop offset="100%" stopColor="#1a4d1a"/>
          </radialGradient>
          <radialGradient id="floodlight1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fffde7" stopOpacity="0.9"/>
            <stop offset="100%" stopColor="#fffde7" stopOpacity="0"/>
          </radialGradient>
          <linearGradient id="standGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2a3a2a"/>
            <stop offset="100%" stopColor="#141e14"/>
          </linearGradient>
        </defs>

        {/* Sky background */}
        <rect width="300" height="480" fill="url(#skyGrad)"/>

        {/* Cloudy sky tones */}
        <ellipse cx="80"  cy="60"  rx="100" ry="30" fill="#1e2e1e" opacity="0.6"/>
        <ellipse cx="220" cy="80"  rx="120" ry="35" fill="#162416" opacity="0.5"/>
        <ellipse cx="150" cy="100" rx="140" ry="40" fill="#0e1c0e" opacity="0.4"/>

        {/* Left floodlight tower */}
        <rect x="30" y="80" width="8" height="180" fill="#263026"/>
        <rect x="22" y="78" width="24" height="8" fill="#304030" rx="2"/>
        {/* Light beam left */}
        <ellipse cx="34" cy="82" rx="60" ry="80" fill="url(#floodlight1)" opacity="0.25" transform="rotate(-30 34 82)"/>

        {/* Right floodlight tower */}
        <rect x="262" y="80" width="8" height="180" fill="#263026"/>
        <rect x="254" y="78" width="24" height="8" fill="#304030" rx="2"/>
        {/* Light beam right */}
        <ellipse cx="266" cy="82" rx="60" ry="80" fill="url(#floodlight1)" opacity="0.25" transform="rotate(30 266 82)"/>

        {/* Stadium stands left */}
        <path d="M0 200 Q50 180 100 195 L100 280 Q50 265 0 280 Z" fill="url(#standGrad)" opacity="0.85"/>
        {/* Stand rows left */}
        {[0,1,2,3,4].map(i => (
          <line key={i} x1="0" y1={208+i*14} x2="100" y2={198+i*14} stroke="#3a4a3a" strokeWidth="1" opacity="0.5"/>
        ))}

        {/* Stadium stands right */}
        <path d="M300 200 Q250 180 200 195 L200 280 Q250 265 300 280 Z" fill="url(#standGrad)" opacity="0.85"/>
        {[0,1,2,3,4].map(i => (
          <line key={i} x1="300" y1={208+i*14} x2="200" y2={198+i*14} stroke="#3a4a3a" strokeWidth="1" opacity="0.5"/>
        ))}

        {/* Football field */}
        <rect x="0" y="260" width="300" height="220" fill="url(#fieldGrad)"/>

        {/* Field lines */}
        <rect x="0" y="260" width="300" height="220" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2"/>
        {/* Center line */}
        <line x1="150" y1="260" x2="150" y2="480" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5"/>
        {/* Center circle */}
        <ellipse cx="150" cy="370" rx="45" ry="30" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5"/>
        {/* Center spot */}
        <circle cx="150" cy="370" r="2.5" fill="rgba(255,255,255,0.5)"/>
        {/* Left penalty box */}
        <rect x="0" y="320" width="60" height="100" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
        {/* Right penalty box */}
        <rect x="240" y="320" width="60" height="100" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
        {/* Left goal box */}
        <rect x="0" y="340" width="28" height="60" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1"/>
        {/* Right goal box */}
        <rect x="272" y="340" width="28" height="60" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1"/>

        {/* Lighter stripe pattern on field */}
        {[0,1,2,3,4,5,6].map(i => (
          <rect key={i} x={i*44} y="260" width="22" height="220" fill="rgba(255,255,255,0.03)"/>
        ))}

        {/* Brand overlay at top */}
        <rect width="300" height="80" fill="rgba(0,0,0,0.45)"/>
      </svg>

      {/* Brand text overlay */}
      <div className="login-left-brand">
        <div className="login-left-logo">
          {/* Puzzle icon */}
          <svg className="login-puzzle-icon" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 6h8v4a2 2 0 0 0 2 2h4v8h-4a2 2 0 0 0-2 2v4h-8v-4a2 2 0 0 0-2-2H8v-8h4a2 2 0 0 0 2-2V6z" fill="white" opacity="0.9"/>
          </svg>
          <span className="login-brand-name">JUSTPLAY</span>
        </div>
        <p className="login-tagline">Game Starts Here...</p>
      </div>
    </>
  );
}
