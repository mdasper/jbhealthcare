import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Calendar, Clock, User, Phone, Stethoscope, MessageSquare, CheckCircle, Shield } from 'lucide-react';
import { client } from '../sanity';

const Appointment = () => {
  const location = useLocation();
  const passedState = location.state || {};

  const [settings, setSettings] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    department: passedState.department || '',
    doctor: passedState.doctorName || '',
    type: 'In-Person',
    date: '',
    message: ''
  });

  useEffect(() => {
    if (passedState.department || passedState.doctorName) {
      setFormData(prev => ({
        ...prev,
        department: passedState.department || prev.department,
        doctor: passedState.doctorName || prev.doctor
      }));
    }
  }, [passedState.department, passedState.doctorName]);

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
        background: 'linear-gradient(rgba(10, 43, 78, 0.9), rgba(10, 43, 78, 0.8)), url(https://images.unsplash.com/photo-1516549655169-df83a0774514?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'var(--white)'
      }}>
        <div className="container text-center" data-aos="fade-up">
          <h1 style={{ color: 'var(--white)', fontSize: '3.5rem', marginBottom: '20px', letterSpacing: '1px' }}>Book Your Consultation</h1>
          <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto', color: 'rgba(255,255,255,0.9)' }}>
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
              <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', borderRadius: '50%', background: 'linear-gradient(135deg, rgba(224,169,109,0.3), transparent)' }}></div>

              <h2 style={{ color: 'var(--accent)', fontSize: '2.2rem', marginBottom: '20px', position: 'relative', zIndex: 1 }}>Why Choose JB Healthcare?</h2>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '40px', position: 'relative', zIndex: 1 }}>
                Our commitment to your well-being goes beyond treatments. We offer compassionate care backed by cutting-edge technology.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                  <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '12px', borderRadius: '50%', color: 'var(--accent)' }}>
                    <Shield size={24} />
                  </div>
                  <div>
                    <h4 style={{ color: 'var(--white)', fontSize: '1.1rem', marginBottom: '5px' }}>100% Confidential & Secure</h4>
                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', margin: 0 }}>Your medical records and details are strictly private.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                  <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '12px', borderRadius: '50%', color: 'var(--accent)' }}>
                    <CheckCircle size={24} />
                  </div>
                  <div>
                    <h4 style={{ color: 'var(--white)', fontSize: '1.1rem', marginBottom: '5px' }}>No Hidden Wait Times</h4>
                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', margin: 0 }}>Book in advance and get priority consultation slots.</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                  <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '12px', borderRadius: '50%', color: 'var(--accent)' }}>
                    <Stethoscope size={24} />
                  </div>
                  <div>
                    <h4 style={{ color: 'var(--white)', fontSize: '1.1rem', marginBottom: '5px' }}>Top Medical Experts</h4>
                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', margin: 0 }}>Consult with the most experienced doctors in Anaiyur.</p>
                  </div>
                </div>
              </div>

              {/* Emergency Contact Box to fill the bottom space */}
              <div style={{ marginTop: 'auto', backgroundColor: 'rgba(255,255,255,0.05)', padding: '30px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', position: 'relative', zIndex: 1, paddingTop: '30px' }}>
                <h4 style={{ color: 'var(--accent)', fontSize: '1.2rem', marginBottom: '20px' }}>Need Urgent Help?</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                  <Phone size={22} color="var(--white)" />
                  <span style={{ color: 'var(--white)', fontSize: '1.1rem', fontWeight: 'bold' }}>+91 93455 10905</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <MessageSquare size={22} color="var(--white)" />
                  <span style={{ color: 'var(--white)', fontSize: '1rem' }}>Available 24/7 for Emergencies</span>
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
                    <label style={{ flex: '1', display: 'flex', alignItems: 'center', gap: '12px', padding: '18px', border: formData.type === 'In-Person' ? '2px solid var(--accent)' : '1px solid #e1e8ed', borderRadius: '12px', cursor: 'pointer', backgroundColor: formData.type === 'In-Person' ? '#fffaf4' : '#f9fafb', transition: 'all 0.3s' }}>
                      <input type="radio" name="type" value="In-Person" checked={formData.type === 'In-Person'} onChange={handleChange} style={{ width: '20px', height: '20px', accentColor: 'var(--accent)' }} />
                      <div>
                        <span style={{ fontWeight: '600', color: 'var(--primary)', display: 'block' }}>Clinic Visit</span>
                        <span style={{ fontSize: '0.85rem', color: '#666' }}>In-person at Hospital</span>
                      </div>
                    </label>
                    
                    <label style={{ flex: '1', display: 'flex', alignItems: 'center', gap: '12px', padding: '18px', border: formData.type === 'Online Consultation' ? '2px solid var(--accent)' : '1px solid #e1e8ed', borderRadius: '12px', cursor: 'pointer', backgroundColor: formData.type === 'Online Consultation' ? '#fffaf4' : '#f9fafb', transition: 'all 0.3s' }}>
                      <input type="radio" name="type" value="Online Consultation" checked={formData.type === 'Online Consultation'} onChange={handleChange} style={{ width: '20px', height: '20px', accentColor: 'var(--accent)' }} />
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
                      {formData.department && !['General Medicine', 'Cardiology', 'Laparoscopic Surgery', 'Paediatrics', 'Orthopaedics', 'Neurology', 'Gynaecology'].includes(formData.department) && (
                        <option value={formData.department}>{formData.department}</option>
                      )}
                      <option value="General Medicine">General Medicine</option>
                      <option value="Cardiology">Cardiology</option>
                      <option value="Laparoscopic Surgery">Laparoscopic Surgery</option>
                      <option value="Paediatrics">Paediatrics</option>
                      <option value="Orthopaedics">Orthopaedics</option>
                      <option value="Neurology">Neurology</option>
                      <option value="Gynaecology">Gynaecology</option>
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
                  <input type="text" name="doctor" value={formData.doctor} onChange={handleChange} placeholder="e.g. Dr. Arun Kumar" style={{ width: '100%', padding: '16px', border: '1px solid #e1e8ed', borderRadius: '8px', fontSize: '1rem', backgroundColor: '#f9fafb', transition: 'all 0.3s' }} />
                </div>

                <div className="form-group" style={{ marginBottom: '35px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: '600', marginBottom: '8px', fontSize: '0.95rem' }}>
                    <MessageSquare size={16} /> Additional Notes (Optional)
                  </label>
                  <textarea name="message" value={formData.message} onChange={handleChange} rows="3" placeholder="Describe your symptoms or reason for the visit..." style={{ width: '100%', padding: '16px', border: '1px solid #e1e8ed', borderRadius: '8px', fontSize: '1rem', backgroundColor: '#f9fafb', resize: 'vertical' }}></textarea>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                  <button type="submit" className="btn btn-accent" style={{ padding: '16px 40px', fontSize: '1.1rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', borderRadius: '8px' }}>
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
          box-shadow: 0 0 0 3px rgba(224, 169, 109, 0.15);
        }
      `}</style>
      
    </div>
  );
};

export default Appointment;
