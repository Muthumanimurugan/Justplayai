import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './pages.css';

interface VenueRequest {
  id: number;
  name: string;
  phone: string;
  venueName: string;
  location: string;
  status: 'pending' | 'approved' | 'rejected';
}

const initialRequests: VenueRequest[] = [
  { id: 1, name: 'Raghul Uthay', phone: '+91 7639542136', venueName: 'Tot Turf', location: 'SF no-174/1, Sivaram Nagar, Sungam Bypass Rd, extension, Ramanathapuram, Coimbatore, Tamil Nadu 641045', status: 'pending' },
  { id: 2, name: 'Raghul Uthay', phone: '+91 7639542136', venueName: 'Tot Turf', location: 'SF no-174/1, Sivaram Nagar, Sungam Bypass Rd, extension, Ramanathapuram, Coimbatore, Tamil Nadu 641045', status: 'pending' },
  { id: 3, name: 'Raghul Uthay', phone: '+91 7639542136', venueName: 'Tot Turf', location: 'SF no-174/1, Sivaram Nagar, Sungam Bypass Rd, extension, Ramanathapuram, Coimbatore, Tamil Nadu 641045', status: 'pending' },
  { id: 4, name: 'Raghul Uthay', phone: '+91 7639542136', venueName: 'Tot Turf', location: 'SF no-174/1, Sivaram Nagar, Sungam Bypass Rd, extension, Ramanathapuram, Coimbatore, Tamil Nadu 641045', status: 'pending' },
  { id: 5, name: 'Raghul Uthay', phone: '+91 7639542136', venueName: 'Tot Turf', location: 'SF no-174/1, Sivaram Nagar, Sungam Bypass Rd, extension, Ramanathapuram, Coimbatore, Tamil Nadu 641045', status: 'pending' },
];

type ModalType = 'approve' | 'reject' | null;

export default function VenueRequests() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState<VenueRequest[]>(initialRequests);
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState<ModalType>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // Approve modal state
  const [approveForm, setApproveForm] = useState({
    venueName: 'SHA Turf',
    registrationId: '12',
    status: 'Pending',
    verifiedBy: '',
    uploadDoc: '',
    comments: '',
  });

  // Reject modal state
  const [rejectForm, setRejectForm] = useState({ rejectedBy: '', reason: '' });

  const filtered = requests.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.venueName.toLowerCase().includes(search.toLowerCase())
  );

  const openApprove = (id: number) => { setSelectedId(id); setModal('approve'); };
  const openReject  = (id: number) => { setSelectedId(id); setModal('reject'); };
  const closeModal  = () => { setModal(null); setSelectedId(null); };

  const handleApprove = () => {
    if (selectedId !== null) {
      setRequests(prev => prev.map(r => r.id === selectedId ? { ...r, status: 'approved' } : r));
    }
    closeModal();
  };

  const handleReject = () => {
    if (selectedId !== null) {
      setRequests(prev => prev.map(r => r.id === selectedId ? { ...r, status: 'rejected' } : r));
    }
    closeModal();
  };

  return (
    <div className="page-root">
      {/* Back header + search */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, position: 'relative', zIndex: 1 }}>
        <div className="page-back-header">
          <button className="back-btn" onClick={() => navigate('/superadmin/turfs')} aria-label="Back">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="19" y1="12" x2="5" y2="12"/>
              <polyline points="12 19 5 12 12 5"/>
            </svg>
          </button>
          <span className="page-back-title">New Venue Request</span>
        </div>
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
      </div>

      {/* Venue request cards */}
      <div className="venue-list">
        {filtered.map(req => (
          <div className="venue-card" key={req.id}>
            <div className="venue-card-body">
              <p className="venue-card-name">{req.name}</p>
              <p className="venue-card-phone">{req.phone}</p>
              <p className="venue-card-info">
                Venue Name: {req.venueName}<br />
                Location: {req.location}
              </p>
            </div>
            <div className="venue-card-actions">
              <button className="btn-approve" onClick={() => openApprove(req.id)}>Approve</button>
              <button className="btn-reject"  onClick={() => openReject(req.id)}>Reject</button>
            </div>
          </div>
        ))}
      </div>

      {/* ── Venue Approval Modal ── */}
      {modal === 'approve' && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && closeModal()}>
          <div className="modal-box">
            <div className="modal-header">
              <span className="modal-title">Venue Approval</span>
              <button className="modal-close" onClick={closeModal} aria-label="Close">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            <div className="modal-body">
              <div className="modal-grid">
                <div className="modal-field">
                  <label className="modal-label">Venue Name <span className="req">*</span></label>
                  <input
                    className="modal-input"
                    value={approveForm.venueName}
                    onChange={e => setApproveForm(p => ({ ...p, venueName: e.target.value }))}
                  />
                </div>
                <div className="modal-field">
                  <label className="modal-label">Registration ID <span className="req">*</span></label>
                  <input
                    className="modal-input"
                    value={approveForm.registrationId}
                    onChange={e => setApproveForm(p => ({ ...p, registrationId: e.target.value }))}
                  />
                </div>
                <div className="modal-field">
                  <label className="modal-label">Change Status <span className="req">*</span></label>
                  <select
                    className="modal-select"
                    value={approveForm.status}
                    onChange={e => setApproveForm(p => ({ ...p, status: e.target.value }))}
                  >
                    <option>Pending</option>
                    <option>Approved</option>
                    <option>Rejected</option>
                  </select>
                </div>
                <div className="modal-field">
                  <label className="modal-label">Verified By <span className="req">*</span></label>
                  <input
                    className="modal-input"
                    placeholder="Enter your name"
                    value={approveForm.verifiedBy}
                    onChange={e => setApproveForm(p => ({ ...p, verifiedBy: e.target.value }))}
                  />
                </div>
                <div className="modal-field">
                  <label className="modal-label">Upload Verification Document <span className="req">*</span></label>
                  <input
                    className="modal-input"
                    placeholder="Enter your name"
                    value={approveForm.uploadDoc}
                    onChange={e => setApproveForm(p => ({ ...p, uploadDoc: e.target.value }))}
                  />
                </div>
                <div className="modal-field">
                  <label className="modal-label">Comments</label>
                  <textarea
                    className="modal-textarea"
                    placeholder="Enter reason"
                    value={approveForm.comments}
                    onChange={e => setApproveForm(p => ({ ...p, comments: e.target.value }))}
                    style={{ minHeight: 64 }}
                  />
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="modal-cancel" onClick={closeModal}>Cancel</button>
              <button className="modal-approve" onClick={handleApprove}>Approve</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Reject Request Modal ── */}
      {modal === 'reject' && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && closeModal()}>
          <div className="modal-box" style={{ maxWidth: 420 }}>
            <div className="modal-header">
              <span className="modal-title">Reject Request</span>
              <button className="modal-close" onClick={closeModal} aria-label="Close">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            <div className="modal-body">
              <div className="modal-field">
                <label className="modal-label">Rejected By</label>
                <input
                  className="modal-input"
                  placeholder="Enter Name"
                  value={rejectForm.rejectedBy}
                  onChange={e => setRejectForm(p => ({ ...p, rejectedBy: e.target.value }))}
                />
              </div>
              <div className="modal-field">
                <label className="modal-label">Reason For Rejection</label>
                <textarea
                  className="modal-textarea"
                  placeholder="Enter reason"
                  value={rejectForm.reason}
                  onChange={e => setRejectForm(p => ({ ...p, reason: e.target.value }))}
                  style={{ minHeight: 90 }}
                />
              </div>
              <p className="modal-confirm-text">Are you sure  want to reject this turf?</p>
            </div>

            <div className="modal-footer">
              <button className="modal-cancel" onClick={closeModal}>Cancel</button>
              <button className="modal-reject-btn" onClick={handleReject}>Reject</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
