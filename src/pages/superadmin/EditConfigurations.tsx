import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EditConfigurations.css';

/* ── Types ───────────────────────────────────────────────────────────────── */
type TabId = 'amenities' | 'sports' | 'accessories' | 'cancellation' | 'ratecategory' | 'imagelimit' | 'surface';

interface Amenity  { id: string; name: string; img: string; }
interface Sport    { id: string; name: string; }
interface Accessory{ id: string; name: string; }
interface RateCat  { id: string; category: string; description: string; }
interface Surface  { id: string; name: string; }

/* ── Initial data ────────────────────────────────────────────────────────── */
const initAmenities: Amenity[] = [
  { id: '01', name: 'Parkings',      img: '' },
  { id: '02', name: 'Drinking Water', img: '' },
  { id: '03', name: 'Washroom',      img: '' },
  { id: '04', name: 'Cantean',       img: '' },
];

const initSports: Sport[] = [
  { id: '01', name: 'Cricket' },
  { id: '02', name: 'Volley Ball' },
  { id: '03', name: 'Football' },
  { id: '04', name: 'Futsal' },
  { id: '05', name: 'Basketball' },
  { id: '06', name: 'Badminton' },
];

const accessoriesBySport: Record<string, Accessory[]> = {
  Cricket:    [{ id:'1',name:'Ball'},{id:'2',name:'Bat'},{id:'3',name:'Batting Pad'},{id:'4',name:'Batting Gloves'},{id:'5',name:'Wicketset'}],
  'Volley Ball': [{id:'1',name:'Ball'},{id:'2',name:'Net'}],
  Football:   [{id:'1',name:'Ball'},{id:'2',name:'Shin Guards'},{id:'3',name:'Gloves'}],
  Futsal:     [{id:'1',name:'Ball'},{id:'2',name:'Shin Guards'}],
  Basketball: [{id:'1',name:'Ball'},{id:'2',name:'Hoop'}],
  Badminton:  [{id:'1',name:'Shuttlecock'},{id:'2',name:'Racket'},{id:'3',name:'Net'}],
};

const initRateCategories: RateCat[] = [
  { id:'1', category:'silver', description:'access the policywe' },
  { id:'2', category:'Gold',   description:'Good move' },
  { id:'3', category:'Elite',  description:'dfghjkfghjkl' },
];

const surfacesBySport: Record<string, Surface[]> = {
  Cricket:    [{id:'1',name:'Natural Grass'},{id:'2',name:'Artificial Turf'},{id:'3',name:'Clay Court'},{id:'4',name:'Synthetic Court'},{id:'5',name:'String'}],
  'Volley Ball': [{id:'1',name:'Sand'},{id:'2',name:'Hardwood'}],
  Football:   [{id:'1',name:'Natural Grass'},{id:'2',name:'Artificial Turf'}],
  Futsal:     [{id:'1',name:'Hardwood'},{id:'2',name:'Synthetic'}],
  Basketball: [{id:'1',name:'Hardwood'},{id:'2',name:'Asphalt'}],
  Badminton:  [{id:'1',name:'Synthetic Mat'},{id:'2',name:'Wooden'}],
};

/* ── Reusable modal ──────────────────────────────────────────────────────── */
function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="ec-modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="ec-modal">
        <div className="ec-modal-header">
          <span className="ec-modal-title">{title}</span>
          <button className="ec-modal-close" onClick={onClose} aria-label="Close">✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

/* ── Edit / Delete icon buttons ─────────────────────────────────────────── */
function EditIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  );
}
function TrashIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
      <polyline points="3 6 5 6 21 6"/>
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
      <path d="M10 11v6"/><path d="M14 11v6"/>
      <path d="M9 6V4h6v2"/>
    </svg>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════════════════════════════════════════════ */
export default function EditConfigurations() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabId>('amenities');

  /* ── Amenities state ── */
  const [amenities, setAmenities]   = useState<Amenity[]>(initAmenities);
  const [amenityModal, setAmenityModal] = useState<{ open: boolean; item: Amenity | null }>({ open: false, item: null });
  const [amenityName, setAmenityName]   = useState('');
  const [amenityImg,  setAmenityImg]    = useState('');

  /* ── Sports state ── */
  const [sports, setSports]       = useState<Sport[]>(initSports);
  const [sportModal, setSportModal] = useState(false);
  const [sportName, setSportName]   = useState('');

  /* ── Accessories state ── */
  const [selSport, setSelSport]   = useState('Cricket');
  const [accessories, setAccessories] = useState<Record<string, Accessory[]>>(accessoriesBySport);
  const [accModal,  setAccModal]  = useState(false);
  const [accName,   setAccName]   = useState('');

  /* ── Cancellation state ── */
  const [cancel, setCancel] = useState({ fullRefundHours:'24', partialRefundHours:'12', partialPct:'50', cancelFeePct:'15', noRefundHours:'12' });

  /* ── Rate Category state ── */
  const [rateCategories, setRateCategories] = useState<RateCat[]>(initRateCategories);
  const [rateModal,  setRateModal]  = useState<{ open: boolean; item: RateCat | null }>({ open: false, item: null });
  const [rateName,   setRateName]   = useState('');
  const [rateDesc,   setRateDesc]   = useState('');

  /* ── Image Limit state ── */
  const [imgLimit, setImgLimit] = useState({ venueDocLink:'4', venueImgLimit:'5', turfImgLimit:'5', maxSizeMb:'5' });

  /* ── Surface state ── */
  const [surfaceSport,  setSurfaceSport]  = useState('Cricket');
  const [surfaces,      setSurfaces]      = useState<Record<string, Surface[]>>(surfacesBySport);
  const [surfaceModal,  setSurfaceModal]  = useState(false);
  const [surfaceName,   setSurfaceName]   = useState('');

  const tabs: { id: TabId; label: string }[] = [
    { id: 'amenities',    label: 'Amenities' },
    { id: 'sports',       label: 'Sports' },
    { id: 'accessories',  label: 'Accessories' },
    { id: 'cancellation', label: 'Cancellation Policy' },
    { id: 'ratecategory', label: 'Rate Category' },
    { id: 'imagelimit',   label: 'Image Limit' },
    { id: 'surface',      label: 'Surface' },
  ];

  /* ─────────────────── helpers ─────────────────── */
  const openAddAmenity  = () => { setAmenityName(''); setAmenityImg(''); setAmenityModal({ open: true, item: null }); };
  const openEditAmenity = (a: Amenity) => { setAmenityName(a.name); setAmenityImg(a.img); setAmenityModal({ open: true, item: a }); };
  const saveAmenity = () => {
    if (amenityModal.item) {
      setAmenities(prev => prev.map(a => a.id === amenityModal.item!.id ? { ...a, name: amenityName, img: amenityImg } : a));
    } else {
      const newId = String(amenities.length + 1).padStart(2, '0');
      setAmenities(prev => [...prev, { id: newId, name: amenityName, img: amenityImg }]);
    }
    setAmenityModal({ open: false, item: null });
  };
  const deleteAmenity = (id: string) => setAmenities(prev => prev.filter(a => a.id !== id));

  const saveSport = () => {
    if (!sportName.trim()) return;
    const newId = String(sports.length + 1).padStart(2, '0');
    setSports(prev => [...prev, { id: newId, name: sportName.trim() }]);
    setSportName(''); setSportModal(false);
  };
  const deleteSport = (id: string) => setSports(prev => prev.filter(s => s.id !== id));

  const saveAccessory = () => {
    if (!accName.trim()) return;
    const list = accessories[selSport] ?? [];
    const newId = String(list.length + 1);
    setAccessories(prev => ({ ...prev, [selSport]: [...list, { id: newId, name: accName.trim() }] }));
    setAccName(''); setAccModal(false);
  };
  const deleteAccessory = (id: string) => {
    setAccessories(prev => ({ ...prev, [selSport]: (prev[selSport] ?? []).filter(a => a.id !== id) }));
  };

  const openAddRate  = () => { setRateName(''); setRateDesc(''); setRateModal({ open: true, item: null }); };
  const openEditRate = (r: RateCat) => { setRateName(r.category); setRateDesc(r.description); setRateModal({ open: true, item: r }); };
  const saveRate = () => {
    if (rateModal.item) {
      setRateCategories(prev => prev.map(r => r.id === rateModal.item!.id ? { ...r, category: rateName, description: rateDesc } : r));
    } else {
      setRateCategories(prev => [...prev, { id: String(prev.length + 1), category: rateName, description: rateDesc }]);
    }
    setRateModal({ open: false, item: null });
  };
  const deleteRate = (id: string) => setRateCategories(prev => prev.filter(r => r.id !== id));

  const saveSurface = () => {
    if (!surfaceName.trim()) return;
    const list = surfaces[surfaceSport] ?? [];
    setSurfaces(prev => ({ ...prev, [surfaceSport]: [...list, { id: String(list.length + 1), name: surfaceName.trim() }] }));
    setSurfaceName(''); setSurfaceModal(false);
  };
  const deleteSurface = (id: string) => {
    setSurfaces(prev => ({ ...prev, [surfaceSport]: (prev[surfaceSport] ?? []).filter(s => s.id !== id) }));
  };

  return (
    <div className="ec-root">

      {/* Back header */}
      <div className="ec-back-header">
        <button className="ec-back-btn" onClick={() => navigate('/superadmin/settings')} aria-label="Back">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
          </svg>
        </button>
        <span className="ec-back-title">Edit Configurations</span>
      </div>

      {/* Tab bar */}
      <div className="ec-tabs">
        {tabs.map(t => (
          <button
            key={t.id}
            className={`ec-tab${activeTab === t.id ? ' active' : ''}`}
            onClick={() => setActiveTab(t.id)}
          >
            {t.label}
          </button>
        ))}
        <div className="ec-tab-edge" />
      </div>

      {/* ══════════ Tab content ══════════ */}
      <div className="ec-content">

        {/* ── AMENITIES ── */}
        {activeTab === 'amenities' && (
          <>
            <div className="ec-add-row">
              <button className="ec-add-btn" onClick={openAddAmenity}>+ Add Amenity</button>
            </div>
            <div className="ec-table-wrap">
              <table className="ec-table">
                <thead>
                  <tr><th>ID</th><th>Amenity Name</th><th>Image/Icon</th><th>Action</th></tr>
                </thead>
                <tbody>
                  {amenities.map(a => (
                    <tr key={a.id}>
                      <td className="td-id">{a.id}</td>
                      <td>{a.name}</td>
                      <td>
                        <div className="ec-img-circle">
                          {a.img
                            ? <img src={a.img} alt={a.name} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                            : a.name.slice(0, 2).toUpperCase()
                          }
                        </div>
                      </td>
                      <td>
                        <div className="ec-actions">
                          <button className="ec-icon-edit" onClick={() => openEditAmenity(a)} title="Edit"><EditIcon /></button>
                          <button className="ec-icon-del"  onClick={() => deleteAmenity(a.id)} title="Delete"><TrashIcon /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* ── SPORTS ── */}
        {activeTab === 'sports' && (
          <>
            <div className="ec-add-row">
              <button className="ec-add-btn" onClick={() => { setSportName(''); setSportModal(true); }}>+ Add Sports</button>
            </div>
            <div className="ec-table-wrap">
              <table className="ec-table">
                <thead>
                  <tr><th>ID</th><th>Sports Name</th><th>Action</th></tr>
                </thead>
                <tbody>
                  {sports.map(s => (
                    <tr key={s.id}>
                      <td className="td-id">{s.id}</td>
                      <td className="td-name">{s.name}</td>
                      <td>
                        <div className="ec-actions">
                          <button className="ec-icon-edit" title="Edit"><EditIcon /></button>
                          <button className="ec-icon-del" onClick={() => deleteSport(s.id)} title="Delete"><TrashIcon /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* ── ACCESSORIES ── */}
        {activeTab === 'accessories' && (
          <>
            <div className="ec-subsection-header">
              <span className="ec-subsection-title">Select your sports to view Accessories</span>
              <button className="ec-add-btn" onClick={() => { setAccName(''); setAccModal(true); }}>+ Add Accessory</button>
            </div>
            <div className="ec-sport-select-row">
              <label className="ec-select-label">Select Sports <span className="req">*</span></label>
              <select className="ec-select" value={selSport} onChange={e => setSelSport(e.target.value)}>
                {sports.map(s => <option key={s.id}>{s.name}</option>)}
              </select>
            </div>
            <div className="ec-table-wrap">
              <table className="ec-table">
                <thead>
                  <tr><th>Accessory Name</th><th>Action</th></tr>
                </thead>
                <tbody>
                  {(accessories[selSport] ?? []).map(a => (
                    <tr key={a.id}>
                      <td>{a.name}</td>
                      <td>
                        <div className="ec-actions">
                          <button className="ec-icon-edit" title="Edit"><EditIcon /></button>
                          <button className="ec-icon-del" onClick={() => deleteAccessory(a.id)} title="Delete"><TrashIcon /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* ── CANCELLATION POLICY ── */}
        {activeTab === 'cancellation' && (
          <div className="ec-form-section">
            <p className="ec-form-title">Refund &amp; Cancellation Policy</p>
            <div className="ec-form-grid">
              <div className="ec-field">
                <label className="ec-field-label">Full Refund Hours <span className="req">*</span></label>
                <input className="ec-field-input" type="number" value={cancel.fullRefundHours}
                  onChange={e => setCancel(p => ({ ...p, fullRefundHours: e.target.value }))} />
              </div>
              <div className="ec-field">
                <label className="ec-field-label">Partial Refund Hours <span className="req">*</span></label>
                <input className="ec-field-input" type="number" value={cancel.partialRefundHours}
                  onChange={e => setCancel(p => ({ ...p, partialRefundHours: e.target.value }))} />
              </div>
              <div className="ec-field">
                <label className="ec-field-label">Partial Refund Percentage <span className="req">*</span></label>
                <input className="ec-field-input" type="number" value={cancel.partialPct}
                  onChange={e => setCancel(p => ({ ...p, partialPct: e.target.value }))} />
              </div>
              <div className="ec-field">
                <label className="ec-field-label">Cancellation Fee Percentage <span className="req">*</span></label>
                <input className="ec-field-input" type="number" value={cancel.cancelFeePct}
                  onChange={e => setCancel(p => ({ ...p, cancelFeePct: e.target.value }))} />
              </div>
              <div className="ec-field full">
                <label className="ec-field-label">No Refund Hours <span className="req">*</span></label>
                <input className="ec-field-input" type="number" value={cancel.noRefundHours}
                  onChange={e => setCancel(p => ({ ...p, noRefundHours: e.target.value }))} />
              </div>
            </div>
            <div className="ec-submit-row">
              <button className="ec-submit-btn">Submit</button>
            </div>
          </div>
        )}

        {/* ── RATE CATEGORY ── */}
        {activeTab === 'ratecategory' && (
          <>
            <div className="ec-subsection-header">
              <span className="ec-subsection-title">Manage rate category with description</span>
              <button className="ec-add-btn" onClick={openAddRate}>+ Add Another</button>
            </div>
            <div className="ec-table-wrap">
              <table className="ec-table">
                <thead>
                  <tr><th>Category</th><th>Description</th><th>Action</th></tr>
                </thead>
                <tbody>
                  {rateCategories.map(r => (
                    <tr key={r.id}>
                      <td className="td-name">{r.category}</td>
                      <td>{r.description}</td>
                      <td>
                        <div className="ec-actions">
                          <button className="ec-icon-edit" onClick={() => openEditRate(r)} title="Edit"><EditIcon /></button>
                          <button className="ec-icon-del"  onClick={() => deleteRate(r.id)} title="Delete"><TrashIcon /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* ── IMAGE LIMIT ── */}
        {activeTab === 'imagelimit' && (
          <div className="ec-form-section">
            <p className="ec-form-title">Configurable</p>
            <div className="ec-form-grid">
              <div className="ec-field">
                <label className="ec-field-label">Venue verification documentation link <span className="req">*</span></label>
                <input className="ec-field-input" type="number" value={imgLimit.venueDocLink}
                  onChange={e => setImgLimit(p => ({ ...p, venueDocLink: e.target.value }))} />
              </div>
              <div className="ec-field">
                <label className="ec-field-label">Venue Image Limit <span className="req">*</span></label>
                <input className="ec-field-input" type="number" value={imgLimit.venueImgLimit}
                  onChange={e => setImgLimit(p => ({ ...p, venueImgLimit: e.target.value }))} />
              </div>
              <div className="ec-field">
                <label className="ec-field-label">Turf Image Limit <span className="req">*</span></label>
                <input className="ec-field-input" type="number" value={imgLimit.turfImgLimit}
                  onChange={e => setImgLimit(p => ({ ...p, turfImgLimit: e.target.value }))} />
              </div>
              <div className="ec-field">
                <label className="ec-field-label">Maximum size of the Images(in mb) <span className="req">*</span></label>
                <input className="ec-field-input" type="number" value={imgLimit.maxSizeMb}
                  onChange={e => setImgLimit(p => ({ ...p, maxSizeMb: e.target.value }))} />
              </div>
            </div>
            <div className="ec-submit-row" style={{ justifyContent: 'flex-start' }}>
              <button className="ec-submit-btn">Submit</button>
            </div>
          </div>
        )}

        {/* ── SURFACE ── */}
        {activeTab === 'surface' && (
          <>
            <div className="ec-subsection-header">
              <span className="ec-subsection-title">Select your sports to view Surfaces</span>
              <button className="ec-add-btn" onClick={() => { setSurfaceName(''); setSurfaceModal(true); }}>+ Add Surface</button>
            </div>
            <div className="ec-sport-select-row">
              <label className="ec-select-label">Select Sports <span className="req">*</span></label>
              <select className="ec-select" value={surfaceSport} onChange={e => setSurfaceSport(e.target.value)}>
                {sports.map(s => <option key={s.id}>{s.name}</option>)}
              </select>
            </div>
            <div className="ec-table-wrap">
              <table className="ec-table">
                <thead>
                  <tr><th>Surface Name</th><th>Action</th></tr>
                </thead>
                <tbody>
                  {(surfaces[surfaceSport] ?? []).map(s => (
                    <tr key={s.id}>
                      <td>{s.name}</td>
                      <td>
                        <div className="ec-actions">
                          <button className="ec-icon-edit" title="Edit"><EditIcon /></button>
                          <button className="ec-icon-del" onClick={() => deleteSurface(s.id)} title="Delete"><TrashIcon /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

      </div>{/* end ec-content */}

      {/* ════════════ MODALS ════════════ */}

      {/* Edit / Add Amenity */}
      {amenityModal.open && (
        <Modal title={amenityModal.item ? 'Edit Amenity' : 'Add Amenity'} onClose={() => setAmenityModal({ open: false, item: null })}>
          <div className="ec-modal-body">
            <div className="ec-modal-field">
              <label className="ec-modal-label">Amenity Name <span className="req">*</span></label>
              <input
                className="ec-modal-input"
                placeholder="Enter amenity name"
                value={amenityName}
                onChange={e => setAmenityName(e.target.value)}
              />
            </div>
            <div className="ec-modal-field">
              <div className="ec-upload-row">
                <label className="ec-modal-label">Image/Icon <span className="req">*</span></label>
                <button className="ec-upload-btn" type="button">Upload</button>
              </div>
              {/* Preview placeholder */}
              {amenityModal.item && (
                <div className="ec-img-preview-wrap">
                  <div className="ec-img-preview">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5">
                      <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
                      <polyline points="21 15 16 10 5 21"/>
                    </svg>
                  </div>
                  <button className="ec-img-remove" onClick={() => setAmenityImg('')}>✕</button>
                </div>
              )}
            </div>
          </div>
          <div className="ec-modal-footer">
            <button className="ec-modal-cancel" onClick={() => setAmenityModal({ open: false, item: null })}>Cancel</button>
            <button className="ec-modal-confirm" onClick={saveAmenity}>
              {amenityModal.item ? 'Update' : 'Add'}
            </button>
          </div>
        </Modal>
      )}

      {/* Add Sport */}
      {sportModal && (
        <Modal title="Add Sport" onClose={() => setSportModal(false)}>
          <div className="ec-modal-body">
            <div className="ec-modal-field">
              <label className="ec-modal-label">Sport Name <span className="req">*</span></label>
              <input
                className="ec-modal-input"
                placeholder="Enter Sport Name (Max 50 characters)"
                maxLength={50}
                value={sportName}
                onChange={e => setSportName(e.target.value)}
              />
            </div>
          </div>
          <div className="ec-modal-footer">
            <button className="ec-modal-cancel" onClick={() => setSportModal(false)}>Cancel</button>
            <button className="ec-modal-confirm" onClick={saveSport}>Add</button>
          </div>
        </Modal>
      )}

      {/* Add Accessory */}
      {accModal && (
        <Modal title="Add Accessory" onClose={() => setAccModal(false)}>
          <div className="ec-modal-body">
            <div className="ec-modal-field">
              <label className="ec-modal-label">Accessory Name <span className="req">*</span></label>
              <input
                className="ec-modal-input"
                placeholder="Enter Accessory Name"
                value={accName}
                onChange={e => setAccName(e.target.value)}
              />
            </div>
          </div>
          <div className="ec-modal-footer">
            <button className="ec-modal-cancel" onClick={() => setAccModal(false)}>Cancel</button>
            <button className="ec-modal-confirm" onClick={saveAccessory}>Add</button>
          </div>
        </Modal>
      )}

      {/* Add / Edit Rate Category */}
      {rateModal.open && (
        <Modal title={rateModal.item ? 'Edit Rate Category' : 'Add Rate Category'} onClose={() => setRateModal({ open: false, item: null })}>
          <div className="ec-modal-body">
            <div className="ec-modal-field">
              <label className="ec-modal-label">Category Name <span className="req">*</span></label>
              <input
                className="ec-modal-input"
                placeholder="Enter Category Name"
                value={rateName}
                onChange={e => setRateName(e.target.value)}
              />
            </div>
            <div className="ec-modal-field">
              <label className="ec-modal-label">Description <span className="req">*</span></label>
              <textarea
                className="ec-modal-textarea"
                placeholder="Type here  (Max characters 250)."
                maxLength={250}
                value={rateDesc}
                onChange={e => setRateDesc(e.target.value)}
              />
            </div>
          </div>
          <div className="ec-modal-footer">
            <button className="ec-modal-cancel" onClick={() => setRateModal({ open: false, item: null })}>Cancel</button>
            <button className="ec-modal-confirm" onClick={saveRate}>
              {rateModal.item ? 'Update' : 'Add'}
            </button>
          </div>
        </Modal>
      )}

      {/* Add Surface */}
      {surfaceModal && (
        <Modal title="Add Surface" onClose={() => setSurfaceModal(false)}>
          <div className="ec-modal-body">
            <div className="ec-modal-field">
              <label className="ec-modal-label">Surface Name <span className="req">*</span></label>
              <input
                className="ec-modal-input"
                placeholder="Enter Surface Name"
                value={surfaceName}
                onChange={e => setSurfaceName(e.target.value)}
              />
            </div>
          </div>
          <div className="ec-modal-footer">
            <button className="ec-modal-cancel" onClick={() => setSurfaceModal(false)}>Cancel</button>
            <button className="ec-modal-confirm" onClick={saveSurface}>Add</button>
          </div>
        </Modal>
      )}

    </div>
  );
}
