import { useState, useEffect } from 'react';
import { client, urlFor } from '../sanity';

const fallbackImages = [
  'https://images.unsplash.com/photo-1612349317150-e410f624c400?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1594824432258-f93129849202?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1651008376811-b93246343545?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
];

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    client.fetch(`*[_type == "doctor"]`).then((data) => {
      setDoctors(data);
    }).catch(console.error);
  }, []);

  return (
    <div className="page-transition" style={{ paddingTop: '80px' }}>
      <section className="section" style={{ backgroundColor: 'var(--primary)', color: 'var(--white)', padding: '140px 0 100px' }}>
        <div className="container text-center" data-aos="fade-up">
          <h1 style={{ color: 'var(--white)', fontSize: '3.5rem', marginBottom: '20px' }}>Our Medical Experts</h1>
          <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto', color: 'rgba(255,255,255,0.9)' }}>
            Meet our highly qualified team of doctors who are dedicated to providing the best healthcare services with compassion and expertise.
          </p>
        </div>
      </section>

      <section className="section" style={{ backgroundColor: 'var(--secondary)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {doctors.length > 0 ? doctors.map((doc, index) => (
              <div key={doc._id || index} style={{ backgroundColor: 'var(--white)', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} data-aos="fade-up" data-aos-delay={`${(index % 3 + 1) * 100}`}>
                <div style={{ height: '350px', overflow: 'hidden' }}>
                  <img 
                    src={doc.image ? urlFor(doc.image).url() : fallbackImages[index % fallbackImages.length]} 
                    alt={doc.name} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ padding: '25px', textAlign: 'center' }}>
                  <h3 style={{ color: 'var(--primary)', fontSize: '1.5rem', marginBottom: '5px' }}>{doc.name}</h3>
                  <h4 style={{ color: 'var(--accent)', fontSize: '1.1rem', marginBottom: '15px' }}>{doc.specialization}</h4>
                  <p style={{ color: '#666', fontSize: '0.95rem', marginBottom: '15px', fontWeight: 'bold' }}>{doc.experience} Experience</p>
                  <p style={{ color: '#555', fontSize: '0.95rem', lineHeight: '1.6' }}>{doc.bio}</p>
                </div>
              </div>
            )) : (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '50px' }}>
                <h3>Loading Doctors...</h3>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Doctors;
