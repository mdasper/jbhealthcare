const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '../src/pages/Appointment.jsx');
let content = fs.readFileSync(targetPath, 'utf8');

// 1. Replace button text: remove "Saving to Database..."
content = content.replace(
  `{isSubmitting ? 'Saving to Database...' : 'Submit Appointment Request'}`,
  `{isSubmitting ? 'Submitting Your Request...' : 'Submit Appointment Request'}`
);

// 2. Replace the success message block
const oldSuccessBlock = `{isSubmitted ? (
                <div style={{ textAlign: 'center', padding: '40px 20px', backgroundColor: '#F0FDF4', border: '2px solid #86EFAC', borderRadius: '16px' }} data-aos="zoom-in">
                  <div style={{ width: '70px', height: '70px', borderRadius: '50%', backgroundColor: '#22C55E', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto', boxShadow: '0 8px 24px rgba(34, 197, 94, 0.35)' }}>
                    <CheckCircle size={38} />
                  </div>
                  <h3 style={{ color: '#15803D', fontSize: '1.8rem', fontWeight: '800', marginBottom: '10px' }}>
                    Appointment Request Stored in Database!
                  </h3>
                  <div style={{ color: '#166534', fontSize: '1rem', fontWeight: '700', marginBottom: '14px' }}>
                    முன்பதிவு மருத்துவமனை அமைப்பில் வெற்றிகரமாகப் பதிவு செய்யப்பட்டது!
                  </div>
                  <p style={{ color: '#374151', fontSize: '1rem', maxWidth: '520px', margin: '0 auto 24px auto', lineHeight: '1.6' }}>
                    Thank you <strong>{formData.name}</strong>. Your consultation details for <strong>{formData.department || 'General'}</strong> have been saved in our hospital database. Our team will contact you at <strong>{formData.phone}</strong> shortly to confirm your time slot.
                  </p>
                  <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          name: '',
                          phone: '',
                          department: '',
                          doctor: '',
                          type: 'In-Person',
                          date: '',
                          message: ''
                        });
                      }}
                      className="btn btn-primary"
                      style={{ padding: '12px 24px', borderRadius: '25px', fontWeight: '700' }}
                    >
                      Book Another Appointment
                    </button>
                  </div>
                </div>
              ) : (`;

const newSuccessBlock = `{isSubmitted ? (
                <div style={{ textAlign: 'center', padding: '45px 25px', backgroundColor: '#F0FDF4', border: '2px solid #86EFAC', borderRadius: '20px', boxShadow: '0 12px 36px rgba(34, 197, 94, 0.12)' }} data-aos="zoom-in">
                  <div style={{ width: '75px', height: '75px', borderRadius: '50%', backgroundColor: '#10B981', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto', boxShadow: '0 10px 25px rgba(16, 185, 129, 0.35)' }}>
                    <CheckCircle size={42} strokeWidth={2.5} />
                  </div>

                  <h3 style={{ color: '#065F46', fontSize: '1.85rem', fontWeight: '800', marginBottom: '8px' }}>
                    Appointment Request Submitted!
                  </h3>
                  <div style={{ color: '#047857', fontSize: '1.02rem', fontWeight: '700', marginBottom: '18px' }}>
                    உங்கள் முன்பதிவு கோரிக்கை வெற்றிகரமாகப் பெறப்பட்டது!
                  </div>

                  <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #D1FAE5', borderRadius: '14px', padding: '22px', maxWidth: '520px', margin: '0 auto 24px auto', textAlign: 'left', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
                    <p style={{ color: '#1F2937', fontSize: '1.05rem', lineHeight: '1.65', margin: '0 0 16px 0' }}>
                      Thank you, <strong>{formData.name || 'valued patient'}</strong>. Your appointment request has been submitted. <strong>As soon as possible, our hospital team will connect with you</strong> to confirm your consultation schedule.
                    </p>
                    <p style={{ color: '#065F46', fontSize: '0.92rem', lineHeight: '1.5', margin: '0 0 16px 0', borderTop: '1px dashed #A7F3D0', paddingTop: '12px' }}>
                      எங்கள் மருத்துவக் குழு மிக விரைவில் உங்களைத் தொடர்பு கொண்டு உங்கள் ஆலோசனை நேரத்தை உறுதி செய்யும்.
                    </p>

                    {/* Booking Details Summary */}
                    <div style={{ backgroundColor: '#F9FAFB', borderRadius: '10px', padding: '14px 16px', fontSize: '0.88rem', color: '#4B5563', lineHeight: '1.7' }}>
                      <div><strong>👤 Patient:</strong> {formData.name}</div>
                      <div><strong>📞 Contact:</strong> {formData.phone}</div>
                      <div><strong>🏥 Department:</strong> {formData.department || 'General Consultation'}</div>
                      {formData.doctor && <div><strong>👨‍⚕️ Doctor:</strong> {formData.doctor}</div>}
                      {formData.date && <div><strong>📅 Date:</strong> {formData.date} ({formData.type})</div>}
                    </div>
                  </div>

                  <p style={{ color: '#6B7280', fontSize: '0.9rem', marginBottom: '25px' }}>
                    Need immediate assistance? Call our 24/7 helpline at <a href="tel:+919345510905" style={{ color: '#0284C7', fontWeight: '700', textDecoration: 'none' }}>+91 93455 10905</a>.
                  </p>

                  <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          name: '',
                          phone: '',
                          department: '',
                          doctor: '',
                          type: 'In-Person',
                          date: '',
                          message: ''
                        });
                      }}
                      className="btn btn-primary"
                      style={{ padding: '12px 28px', borderRadius: '25px', fontWeight: '700', fontSize: '0.95rem' }}
                    >
                      Book Another Appointment
                    </button>
                  </div>
                </div>
              ) : (`;

content = content.replace(oldSuccessBlock, newSuccessBlock);

fs.writeFileSync(targetPath, content, 'utf8');
console.log('✓ Successfully updated Appointment.jsx with patient-centric message!');
