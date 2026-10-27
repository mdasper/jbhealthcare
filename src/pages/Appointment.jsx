import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Calendar, Clock, User, Phone, Stethoscope, MessageSquare, CheckCircle, Shield } from 'lucide-react';
import { client } from '../sanity';

const Appointment = () => {
  const location = useLocation();
  const passedState = location.state || {};

  const [settings, setSettings] = useState(null);
  const [agreed, setAgreed] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    department: passedState.department || '',
    doctor: passedState.doctorName || '',
    type: 'In-Person',
    date: '',
    message: passedState.symptomNote || ''
  });

  useEffect(() => {
    if (passedState.department || passedState.doctorName || passedState.symptomNote) {
      setFormData(prev => ({
        ...prev,
        department: passedState.department || prev.department,
        doctor: passedState.doctorName || prev.doctor,
        message: passedState.symptomNote || prev.message
      }));
    }
  }, [passedState.department, passedState.doctorName, passedState.symptomNote]);

  useEffect(() => {
    client.fetch(`*[_type == "siteSettings"][0]`).then((data) => {
      setSettings(data);
    }).catch(console.error);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agreed) return;
    
    const whatsappNumber = '919345510905';
    let text = `*🏥 JB Healthcare - Appointment Booking*\n\n`;
    text += `*Patient Name:* ${formData.name}\n`;
    text += `*Phone:* ${formData.phone}\n`;
    text += `*Consultation Type:* ${formData.type}\n`;
    text += `*Department:* ${formData.department}\n`;
    if (formData.doctor) {
      text += `*Preferred Doctor:* ${formData.doctor}\n`;
    }
    text += `*Preferred Date:* ${formData.date}\n`;
    
    if (formData.type === 'Online Consultation') {
      text += `*Preferred Time:* 12:00 PM - 12:30 PM (Fixed)\n`;
    }
    
    if (formData.message) {
      text += `*Notes:* ${formData.message}\n`;
    }
    
    window.open(`https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="page-transition" style={{ backgroundColor: 'var(--secondary)', minHeight: '100vh' }}>
      
      {/* Premium Hero Section */}
      <section style={{ 
        padding: '160px 0 200px', 
        background: 'linear-gradient(rgba(0, 180, 216, 0.92), rgba(0, 140, 190, 0.94)), url(https://images.unsplash.com/photo-1516549655169-df83a0774514?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'var(--white)'
      }}>
        <div className="container text-center" data-aos="fade-up">
          <h1 style={{ color: '#FFFFFF', fontSize: '3.5rem', marginBottom: '20px', letterSpacing: '1px', fontWeight: '800', textShadow: '0 2px 4px rgba(0, 30, 60, 0.25)' }}>Book Your Consultation</h1>
          <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto', color: '#FFFFFF', fontWeight: '500', lineHeight: '1.7', textShadow: '0 1px 2px rgba(0, 30, 60, 0.25)' }}>
            Experience world-class healthcare. Schedule an in-person visit or an exclusive online video consultation from the comfort of your home.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section style={{ padding: '0', backgroundColor: 'var(--secondary)' }}>
        <div style={{ width: '100%' }}>
          <div className="appointment-grid">
            
            {/* Left Side: Information & Trust */}
            <div style={{ backgroundColor: 'var(--primary)', padding: '60px 40px', color: 'var(--white)', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              
              {/* Decorative Circle */}
              <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', borderRadius: '50%', background: 'linear-gradient(135deg, rgba(255,255,255,0.25), transparent)' }}></div>

              <h2 style={{ color: '#061D38', fontSize: '2.2rem', marginBottom: '20px', position: 'relative', zIndex: 1, fontWeight: '800' }}>Why Choose JB Healthcare?</h2>
              <p style={{ color: '#061D38', opacity: 0.95, fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '40px', position: 'relative', zIndex: 1, fontWeight: '500' }}>
                Our commitment to your well-being goes beyond treatments. We offer compassionate care backed by cutting-edge technology.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                  <div style={{ backgroundColor: 'rgba(6, 29, 56, 0.15)', padding: '12px', borderRadius: '50%', color: '#061D38' }}>
                    <Shield size={24} />
                  </div>
                  <div>
                    <h4 style={{ color: '#061D38', fontSize: '1.1rem', marginBottom: '5px', fontWeight: '800' }}>100% Confidential & Secure</h4>
                    <p style={{ color: '#061D38', opacity: 0.9, fontSize: '0.9rem', margin: 0, fontWeight: '500' }}>Your medical records and details are strictly private.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                  <div style={{ backgroundColor: 'rgba(6, 29, 56, 0.15)', padding: '12px', borderRadius: '50%', color: '#061D38' }}>
                    <CheckCircle size={24} />
                  </div>
                  <div>
                    <h4 style={{ color: '#061D38', fontSize: '1.1rem', marginBottom: '5px', fontWeight: '800' }}>No Hidden Wait Times</h4>
                    <p style={{ color: '#061D38', opacity: 0.9, fontSize: '0.9rem', margin: 0, fontWeight: '500' }}>Book in advance and get priority consultation slots.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                  <div style={{ backgroundColor: 'rgba(6, 29, 56, 0.15)', padding: '12px', borderRadius: '50%', color: '#061D38' }}>
                    <Stethoscope size={24} />
                  </div>
                  <div>
                    <h4 style={{ color: '#061D38', fontSize: '1.1rem', marginBottom: '5px', fontWeight: '800' }}>Top Medical Experts</h4>
                    <p style={{ color: '#061D38', opacity: 0.9, fontSize: '0.9rem', margin: 0, fontWeight: '500' }}>Consult with the most experienced doctors in Anaiyur.</p>
                  </div>
                </div>
              </div>

              {/* Emergency Contact Box to fill the bottom space */}
              <div style={{ marginTop: 'auto', backgroundColor: 'rgba(255,255,255,0.2)', padding: '25px', borderRadius: '16px', border: '1.5px solid rgba(6, 29, 56, 0.2)', position: 'relative', zIndex: 1, paddingTop: '25px' }}>
                <h4 style={{ color: '#061D38', fontSize: '1.2rem', marginBottom: '16px', fontWeight: '800' }}>Need Urgent Help?</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '12px' }}>
                  <Phone size={22} color="#061D38" />
                  <div>
                    <span style={{ color: '#061D38', fontSize: '1.1rem', fontWeight: '800', display: 'block' }}>+91 93455 10905</span>
                    <span style={{ color: '#061D38', opacity: 0.9, fontSize: '0.85rem', fontWeight: '600' }}>Hospital Front Desk</span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '12px' }}>
                  <Phone size={22} color="#061D38" />
                  <div>
                    <span style={{ color: '#061D38', fontSize: '1.05rem', fontWeight: '800', display: 'block' }}>+91 93455 10905</span>
                    <span style={{ color: '#061D38', opacity: 0.9, fontSize: '0.85rem', fontWeight: '600' }}>Appointments & WhatsApp</span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <MessageSquare size={22} color="#061D38" />
                  <span style={{ color: '#061D38', fontSize: '0.95rem', fontWeight: '800' }}>24/7 Casualty & Emergency Available</span>
                </div>
              </div>

            </div>

            {/* Right Side: The Premium Form */}
            <div style={{ padding: '60px 50px', backgroundColor: 'var(--white)' }}>
              <h3 style={{ color: 'var(--primary)', fontSize: '1.8rem', marginBottom: '5px' }}>Patient Details</h3>
              <p style={{ color: '#666', marginBottom: '40px' }}>Please fill out the information below to request a consultation.</p>
              
              <form onSubmit={handleSubmit}>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '25px', marginBottom: '25px' }}>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: '600', marginBottom: '8px', fontSize: '0.95rem' }}>
                      <User size={16} /> Full Name
                    </label>
                    <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="e.g. John Doe" style={{ width: '100%', padding: '16px', border: '1px solid #e1e8ed', borderRadius: '8px', fontSize: '1rem', backgroundColor: '#f9fafb', transition: 'all 0.3s' }} />
                  </div>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: '600', marginBottom: '8px', fontSize: '0.95rem' }}>
                      <Phone size={16} /> Mobile Number
                    </label>
                    <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} placeholder="+91 98765 43210" style={{ width: '100%', padding: '16px', border: '1px solid #e1e8ed', borderRadius: '8px', fontSize: '1rem', backgroundColor: '#f9fafb', transition: 'all 0.3s' }} />
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: '30px' }}>
                  <label style={{ display: 'block', color: 'var(--primary)', fontWeight: '600', marginBottom: '12px', fontSize: '0.95rem' }}>
                    Consultation Type
                  </label>
                  <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                    <label style={{ flex: '1', display: 'flex', alignItems: 'center', gap: '12px', padding: '18px', border: formData.type === 'In-Person' ? '2px solid #0077B6' : '1px solid #e1e8ed', borderRadius: '12px', cursor: 'pointer', backgroundColor: formData.type === 'In-Person' ? '#f0f9ff' : '#f9fafb', transition: 'all 0.3s' }}>
                      <input type="radio" name="type" value="In-Person" checked={formData.type === 'In-Person'} onChange={handleChange} style={{ width: '20px', height: '20px', accentColor: '#0077B6' }} />
                      <div>
                        <span style={{ fontWeight: '600', color: 'var(--primary)', display: 'block' }}>Clinic Visit</span>
                        <span style={{ fontSize: '0.85rem', color: '#666' }}>In-person at Hospital</span>
                      </div>
                    </label>
                    
                    <label style={{ flex: '1', display: 'flex', alignItems: 'center', gap: '12px', padding: '18px', border: formData.type === 'Online Consultation' ? '2px solid #0077B6' : '1px solid #e1e8ed', borderRadius: '12px', cursor: 'pointer', backgroundColor: formData.type === 'Online Consultation' ? '#f0f9ff' : '#f9fafb', transition: 'all 0.3s' }}>
                      <input type="radio" name="type" value="Online Consultation" checked={formData.type === 'Online Consultation'} onChange={handleChange} style={{ width: '20px', height: '20px', accentColor: '#0077B6' }} />
                      <div>
                        <span style={{ fontWeight: '600', color: 'var(--primary)', display: 'block' }}>Video Call</span>
                        <span style={{ fontSize: '0.85rem', color: '#666' }}>Exclusive 12:00-12:30 PM</span>
                      </div>
                    </label>
                  </div>
                  {formData.type === 'Online Consultation' && (
                    <div style={{ backgroundColor: '#fff3cd', borderLeft: '4px solid #ffc107', padding: '12px 16px', borderRadius: '0 8px 8px 0', marginTop: '15px' }}>
                      <p style={{ color: '#856404', fontSize: '0.9rem', margin: 0, fontWeight: '500', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Clock size={16} /> Note: Online video consultations are strictly allocated between 12:00 PM and 12:30 PM daily.
                      </p>
                    </div>
                  )}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '25px', marginBottom: '25px' }}>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: '600', marginBottom: '8px', fontSize: '0.95rem' }}>
                      <Stethoscope size={16} /> Department
                    </label>
                    <select name="department" required value={formData.department} onChange={handleChange} style={{ width: '100%', padding: '16px', border: '1px solid #e1e8ed', borderRadius: '8px', fontSize: '1rem', backgroundColor: '#f9fafb', color: 'var(--primary)' }}>
                      <option value="">Select a specialisation</option>
                      {formData.department && ![
                        'Laparoscopic & General Surgery',
                        'Surgical Oncology (Cancer Surgery)',
                        'Medical Gastroenterology & Hepatology',
                        'Plastic & Reconstructive Surgery',
                        'Paediatric Surgery (Child Specialist)',
                        'Urology & Renal Sciences',
                        'Orthopaedics & Trauma Surgery',
                        'Anaesthesiology & Critical Care',
                        '24/7 Casualty & Emergency',
                        'General Medicine',
                        'Gynaecology & Obstetrics'
                      ].includes(formData.department) && (
                        <option value={formData.department}>{formData.department}</option>
                      )}
                      <option value="Laparoscopic & General Surgery">Laparoscopic & General Surgery (Chief Surgeon)</option>
                      <option value="Surgical Oncology (Cancer Surgery)">Surgical Oncology (Cancer Surgery)</option>
                      <option value="Medical Gastroenterology & Hepatology">Medical Gastroenterology & Hepatology (குடல் & கல்லீரல்)</option>
                      <option value="Plastic & Reconstructive Surgery">Plastic & Reconstructive Surgery (ஒட்டுறுப்பு)</option>
                      <option value="Paediatric Surgery (Child Specialist)">Paediatric Surgery (குழந்தைகள் அறுவை சிகிச்சை)</option>
                      <option value="Urology & Renal Sciences">Urology & Renal Sciences (சிறுநீரகம்)</option>
                      <option value="Orthopaedics & Trauma Surgery">Orthopaedics & Trauma Surgery (எலும்பு முறிவு)</option>
                      <option value="Anaesthesiology & Critical Care">Anaesthesiology & Critical Care (மயக்கவியல்)</option>
                      <option value="24/7 Casualty & Emergency">24/7 Casualty & Emergency</option>
                      <option value="General Medicine">General Medicine</option>
                      <option value="Gynaecology & Obstetrics">Gynaecology & Obstetrics</option>
                    </select>
                  </div>
                  
                  <div className="form-group" style={{ margin: 0 }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: '600', marginBottom: '8px', fontSize: '0.95rem' }}>
                      <Calendar size={16} /> Preferred Date
                    </label>
                    <input type="date" name="date" required value={formData.date} onChange={handleChange} min={new Date().toISOString().split('T')[0]} style={{ width: '100%', padding: '16px', border: '1px solid #e1e8ed', borderRadius: '8px', fontSize: '1rem', backgroundColor: '#f9fafb', color: 'var(--primary)' }} />
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: '25px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: '600', marginBottom: '8px', fontSize: '0.95rem' }}>
                    <User size={16} /> Preferred Doctor (Optional)
                  </label>
                  <input 
                    type="text" 
                    name="doctor" 
                    list="doctors-list"
                    value={formData.doctor} 
                    onChange={handleChange} 
                    placeholder="Type or select a doctor (e.g. Dr. B. Saileshkumar, Dr. A.C. Arun)..." 
                    style={{ width: '100%', padding: '16px', border: '1px solid #e1e8ed', borderRadius: '8px', fontSize: '1rem', backgroundColor: '#f9fafb', transition: 'all 0.3s' }} 
                  />
                  <datalist id="doctors-list">
                    <option value="Dr. B. Saileshkumar (Chief Laparoscopic & General Surgeon)">Chief Surgeon</option>
                    <option value="Dr. A.C. Arun (M.D., D.M. - Gastroenterologist & Hepatologist)">குடல் மற்றும் கல்லீரல் சிறப்பு நிபுணர்</option>
                    <option value="Dr. Gurumoorthi (M.S., M.Ch. - Surgical Oncologist)">புற்று நோய் அறுவை சிகிச்சை நிபுணர்</option>
                    <option value="Dr. Manikandan (M.S., M.Ch. - Surgical Oncologist)">புற்று நோய் அறுவை சிகிச்சை நிபுணர்</option>
                    <option value="Dr. R. Arunkumar (M.S., M.Ch. - Plastic & Reconstructive Surgeon)">ஒட்டுறுப்பு அறுவை சிகிச்சை நிபுணர்</option>
                    <option value="Dr. J. Arunkumar (M.S., M.Ch. - Paediatric Surgeon)">குழந்தைகள் அறுவை சிகிச்சை நிபுணர்</option>
                    <option value="Dr. G. Sankar (M.S., M.Ch. - Urologist & Renal Surgeon)">சிறுநீரக அறுவை சிகிச்சை நிபுணர்</option>
                    <option value="Dr. Deepan Ramkumar (M.S. Ortho - Orthopaedic Surgeon)">எலும்பு முறிவு அறுவை சிகிச்சை நிபுணர்</option>
                    <option value="Dr. Sivaram (MBBS, DNB - Consultant Physician)">பொது மற்றும் நீரிழிவு மருத்துவர்</option>
                    <option value="Dr. Sangeetha (MBBS, DGO - Gynaecologist)">மகளிர் மற்றும் மகப்பேறு சிறப்பு நிபுணர்</option>
                    <option value="Dr. P. Karthikeyan (MBBS, MD - Consultant Physician)">பொது மற்றும் உள்மருத்துவ நிபுணர் (MD)</option>
                    <option value="Dr. S. Sri Kishore Ganesh (M.D. - Anaesthesiologist)">மயக்கவியல் நிபுணர்</option>
                    <option value="Dr. M. Jeganatha Prabhu (D.A. - Anaesthesiologist)">மயக்கவியல் நிபுணர்</option>
                  </datalist>
                </div>

                <div className="form-group" style={{ marginBottom: '35px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: '600', marginBottom: '8px', fontSize: '0.95rem' }}>
                    <MessageSquare size={16} /> Additional Notes (Optional)
                  </label>
                  <textarea name="message" value={formData.message} onChange={handleChange} rows="3" placeholder="Describe your symptoms or reason for the visit..." style={{ width: '100%', padding: '16px', border: '1px solid #e1e8ed', borderRadius: '8px', fontSize: '1rem', backgroundColor: '#f9fafb', resize: 'vertical' }}></textarea>
                </div>

                {/* Terms Agreement Checkbox */}
                <div style={{ 
                  marginBottom: '25px', 
                  display: 'flex', 
                  alignItems: 'flex-start', 
                  gap: '12px', 
                  padding: '14px 18px', 
                  backgroundColor: agreed ? 'rgba(0, 180, 216, 0.08)' : '#f8f9fa', 
                  borderRadius: '10px', 
                  border: agreed ? '1.5px solid var(--primary)' : '1px solid #e1e8ed', 
                  transition: 'all 0.3s ease' 
                }}>
                  <input 
                    type="checkbox" 
                    id="appointment-agree"
                    name="agree" 
                    checked={agreed} 
                    onChange={(e) => setAgreed(e.target.checked)} 
                    style={{ width: '20px', height: '20px', marginTop: '2px', cursor: 'pointer', accentColor: 'var(--primary)' }} 
                  />
                  <label htmlFor="appointment-agree" style={{ color: '#333', fontSize: '0.95rem', cursor: 'pointer', userSelect: 'none', lineHeight: '1.5', fontWeight: '500' }}>
                    I confirm that I am providing my personal and medical details with my full consent for this consultation.
                  </label>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                  <button 
                    type="submit" 
                    disabled={!agreed}
                    className="btn btn-magnetic" 
                    style={{ 
                      padding: '16px 40px', 
                      fontSize: '1.1rem', 
                      fontWeight: 'bold', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      gap: '10px', 
                      borderRadius: '8px',
                      backgroundColor: agreed ? 'var(--primary)' : '#cbd5e1',
                      color: agreed ? '#FFFFFF' : '#64748b',
                      cursor: agreed ? 'pointer' : 'not-allowed',
                      border: 'none',
                      boxShadow: agreed ? '0 6px 20px rgba(0, 180, 216, 0.35)' : 'none',
                      transition: 'all 0.3s ease',
                      opacity: agreed ? 1 : 0.7
                    }}
                  >
                    Submit Appointment Request
                  </button>
                </div>

              </form>
            </div>

          </div>
        </div>
      </section>

      <style>{`
        input:focus, select:focus, textarea:focus {
          outline: none;
          border-color: var(--accent) !important;
          background-color: var(--white) !important;
          box-shadow: 0 0 0 3px rgba(0, 180, 216, 0.2);
        }
      `}</style>
      
    </div>
  );
};

export default Appointment;
