import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Auth
import Login from './pages/auth/Login';

// Layouts
import SuperAdminLayout from './layouts/SuperAdminLayout';

// Super Admin pages
import Dashboard      from './pages/superadmin/Dashboard';
import TurfManagement from './pages/superadmin/TurfManagement';
import VenueRequests  from './pages/superadmin/VenueRequests';
import Users          from './pages/superadmin/Users';
import Bookings       from './pages/superadmin/Bookings';
import TurfAdmins     from './pages/superadmin/TurfAdmins';
import Revenue        from './pages/superadmin/Revenue';
import Settings       from './pages/superadmin/Settings';
import EditConfigurations from './pages/superadmin/EditConfigurations';
import Corporate      from './pages/superadmin/Corporate';
import Report         from './pages/superadmin/Report';
import Feedbacks      from './pages/superadmin/Feedbacks';
import Profile        from './pages/superadmin/Profile';
import EditProfile    from './pages/superadmin/EditProfile';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />

        {/* Super Admin */}
        <Route path="/superadmin" element={<SuperAdminLayout />}>
          <Route index element={<Navigate to="/superadmin/dashboard" replace />} />

          {/* Core pages */}
          <Route path="dashboard"              element={<Dashboard />} />
          <Route path="turfs"                  element={<TurfManagement />} />
          <Route path="turfs/venue-requests"   element={<VenueRequests />} />
          <Route path="bookings"               element={<Bookings />} />
          <Route path="users"                  element={<Users />} />
          <Route path="revenue"                element={<Revenue />} />
          <Route path="corporate"              element={<Corporate />} />
          <Route path="turf-admins"            element={<TurfAdmins />} />
          <Route path="report"                 element={<Report />} />
          <Route path="feedbacks"              element={<Feedbacks />} />
          <Route path="settings"               element={<Settings />} />
          <Route path="settings/edit-configurations" element={<EditConfigurations />} />

          {/* Profile */}
          <Route path="profile"                element={<Profile />} />
          <Route path="profile/edit"           element={<EditProfile />} />
        </Route>

        {/* Turf Admin – placeholder */}
        <Route path="/turfadmin/*" element={
          <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100vh', flexDirection:'column', gap:12 }}>
            <h2 style={{ color:'#1a1a2e' }}>Turf Admin Panel</h2>
            <p style={{ color:'#9a9ab0' }}>Coming soon</p>
          </div>
        } />

        {/* Customer – placeholder */}
        <Route path="/customer/*" element={
          <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100vh', flexDirection:'column', gap:12 }}>
            <h2 style={{ color:'#1a1a2e' }}>Customer App</h2>
            <p style={{ color:'#9a9ab0' }}>Coming soon</p>
          </div>
        } />

        {/* 404 */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
