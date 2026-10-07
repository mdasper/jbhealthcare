import React, { useState, useEffect } from 'react';
import { client, urlFor } from '../sanity';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Video, User, MapPin } from 'lucide-react';

const fallbackImages = [
  'https://images.unsplash.com/photo-1612349317150-e410f624c400?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1594824432258-f93129849202?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1618498082410-b4aa22193b38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
];

const fallbackDoctors = [
  { _id: '1', name: 'Dr. Arun Kumar', specialization: 'Cardiology', experience: '15 Years', department: 'Cardiology' },
  { _id: '2', name: 'Dr. Sneha Iyer', specialization: 'Paediatrics', experience: '10 Years', department: 'Paediatrics' },
  { _id: '3', name: 'Dr. Ramesh Raj', specialization: 'Orthopaedics', experience: '20 Years', department: 'Orthopaedics' },
  { _id: '4', name: 'Dr. Priya Sharma', specialization: 'Gynaecology', experience: '12 Years', department: 'Gynaecology' },
  { _id: '5', name: 'Dr. Vikram Singh', specialization: 'Neurology', experience: '18 Years', department: 'Neurology' },
  { _id: '6', name: 'Dr. Anjali Desai', specialization: 'General Medicine', experience: '8 Years', department: 'General Medicine' }
];

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client.fetch(`*[_type == "doctor"]`).then((data) => {
      if(data && data.length > 0) {
        setDoctors(data);
      } else {
        setDoctors(fallbackDoctors);
      }
      setLoading(false);
    }).catch((err) => {
      console.error(err);
      setDoctors(fallbackDoctors);
      setLoading(false);
    });
  }, []);

  return (
    <div className="page-transition" style={{ backgroundColor: 'var(--secondary)', minHeight: '100vh' }}>
      
      {/* Premium Hero Section */}
      <section style={{ 
        padding: '160px 0 100px', 
        background: 'linear-gradient(rgba(10, 43, 78, 0.9), rgba(10, 43, 78, 0.8)), url(https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'var(--white)',
        textAlign: 'center'
      }}>
        <div className="container" data-aos="fade-up">
          <h1 style={{ color: 'var(--accent)', fontSize: '3.5rem', marginBottom: '20px', letterSpacing: '1px' }}>Meet Our Specialists</h1>
          <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto', color: 'rgba(255,255,255,0.9)' }}>
            Our team of highly qualified medical professionals is dedicated to providing compassionate, world-class healthcare tailored to your needs.
          </p>
        </div>
      </section>

      {/* Doctors Grid Section */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          
          {loading ? (
            <div style={{ textAlign: 'center', padding: '50px' }}>
              <h3 style={{ color: 'var(--primary)' }}>Loading Doctors...</h3>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px' }}>
              {doctors.map((doc, index) => (
                <div key={doc._id} style={{ backgroundColor: 'var(--white)', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 15px 40px rgba(0,0,0,0.08)', transition: 'transform 0.3s ease, box-shadow 0.3s ease', display: 'flex', flexDirection: 'column' }} data-aos="fade-up" data-aos-delay={`${(index % 3 + 1) * 100}`} className="doctor-card-hover">
                  
                  {/* Doctor Image */}
                  <div style={{ height: '300px', overflow: 'hidden', position: 'relative' }}>
                    <img 
                      src={doc.image ? urlFor(doc.image).url() : fallbackImages[index % fallbackImages.length]} 
                      alt={doc.name} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{ position: 'absolute', bottom: '15px', right: '15px', backgroundColor: 'var(--accent)', color: 'var(--white)', padding: '6px 15px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}>
                      {doc.experience || '10+ Years'} Exp
                    </div>
                  </div>

                  {/* Doctor Details */}
                  <div style={{ padding: '30px', flex: '1', display: 'flex', flexDirection: 'column' }}>
                    
                    {/* Header: Name & Department */}
                    <div style={{ marginBottom: '25px', borderBottom: '1px solid #f0f0f0', paddingBottom: '20px' }}>
                      <h3 style={{ color: 'var(--primary)', fontSize: '1.6rem', marginBottom: '8px' }}>{doc.name}</h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent)', fontWeight: '600', fontSize: '1rem' }}>
                        <User size={16} /> {doc.specialization}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#666', fontSize: '0.9rem', marginTop: '8px' }}>
                        <MapPin size={16} /> Department of {doc.department || doc.specialization}
                      </div>
                    </div>

                    {/* Consultation Timings */}
                    <div style={{ marginBottom: '30px', flex: '1' }}>
                      <h4 style={{ fontSize: '1rem', color: 'var(--primary)', marginBottom: '15px' }}>Consultation Timings</h4>
                      
                      {/* In-Person */}
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '15px', backgroundColor: '#f9fafb', padding: '12px', borderRadius: '10px' }}>
                        <Clock size={20} color="var(--primary)" style={{ marginTop: '2px' }} />
                        <div>
                          <span style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: 'var(--primary)', marginBottom: '2px' }}>In-Person Visit</span>
                          <span style={{ fontSize: '0.85rem', color: '#666' }}>10:00 AM - 01:00 PM | 05:00 PM - 08:00 PM</span>
                        </div>
                      </div>

                      {/* Online Consultation - Highlighted */}
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', backgroundColor: '#fffaf4', border: '1px solid rgba(224, 169, 109, 0.3)', padding: '12px', borderRadius: '10px' }}>
                        <Video size={20} color="var(--accent)" style={{ marginTop: '2px' }} />
                        <div>
                          <span style={{ display: 'block', fontSize: '0.9rem', fontWeight: '600', color: 'var(--accent)', marginBottom: '2px' }}>Online Video Consultation</span>
                          <span style={{ fontSize: '0.85rem', color: '#856404', fontWeight: '500' }}>Exclusive: 12:00 PM - 12:30 PM</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <Link 
                      to="/appointment" 
                      state={{ doctorName: doc.name, department: doc.department || doc.specialization }}
                      className="btn btn-accent" 
                      style={{ width: '100%', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', padding: '15px', borderRadius: '12px', fontSize: '1.05rem' }}
                    >
                      <Calendar size={18} /> Book Appointment
                    </Link>

                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>
      
      <style>{`
        .doctor-card-hover:hover {
          transform: translateY(-10px);
          box-shadow: 0 25px 50px rgba(0,0,0,0.15) !important;
        }
      `}</style>
      
    </div>
  );
};

export default Doctors;
