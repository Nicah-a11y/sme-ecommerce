import { useState } from 'react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setSent(true);
      setLoading(false);
    }, 1500);
  };

  if (sent) return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0D2137, #1E3A5F)',
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{
        background: 'white', borderRadius: '24px', padding: '3rem',
        textAlign: 'center', maxWidth: '400px', width: '100%',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
        <h2 style={{ color: '#1B5E20', marginBottom: '0.5rem' }}>Message Sent!</h2>
        <p style={{ color: '#666' }}>Thank you for contacting SME Market Kenya. We will get back to you within 24 hours!</p>
        <button onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
          style={{
            marginTop: '1.5rem', padding: '10px 24px',
            background: 'linear-gradient(135deg, #1E3A5F, #2E75B6)',
            color: 'white', border: 'none', borderRadius: '12px',
            cursor: 'pointer', fontWeight: '600'
          }}>
          Send Another Message
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1E3A5F, #2E75B6)',
        padding: '3rem 2rem', color: 'white', textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' }}>📬 Contact Us</h1>
        <p style={{ color: 'rgba(255,255,255,0.8)' }}>We are here to help! Send us a message and we will respond within 24 hours.</p>
      </div>

      <div style={{ maxWidth: '900px', margin: '2rem auto', padding: '0 1rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>

        {/* Contact Info */}
        <div>
          <div style={{ background: 'white', borderRadius: '16px', padding: '2rem', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', marginBottom: '1rem' }}>
            <h3 style={{ color: '#1E3A5F', marginBottom: '1.5rem' }}>Get In Touch</h3>
            {[
              { icon: '📍', title: 'Address', info: 'Moi Avenue, Nairobi, Kenya' },
              { icon: '📧', title: 'Email', info: 'support@smemarket.co.ke' },
              { icon: '📞', title: 'Phone', info: '+254 700 000 000' },
              { icon: '🕐', title: 'Working Hours', info: 'Mon-Fri: 8AM - 6PM EAT' },
            ].map(item => (
              <div key={item.title} style={{ display: 'flex', gap: '1rem', marginBottom: '1.2rem', alignItems: 'flex-start' }}>
                <div style={{
                  width: '45px', height: '45px', borderRadius: '12px',
                  background: '#E3F2FD', display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.3rem', flexShrink: 0
                }}>
                  {item.icon}
                </div>
                <div>
                  <p style={{ margin: 0, fontWeight: '600', color: '#1E3A5F', fontSize: '0.9rem' }}>{item.title}</p>
                  <p style={{ margin: 0, color: '#666', fontSize: '0.85rem' }}>{item.info}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: 'linear-gradient(135deg, #1E3A5F, #2E75B6)', borderRadius: '16px', padding: '2rem', color: 'white' }}>
            <h3 style={{ marginBottom: '1rem' }}>🇰🇪 SME Market Kenya</h3>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              Supporting local Kenyan businesses grow online. Shop authentic handcrafted products from SMEs across Kenya.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '2rem', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
          <h3 style={{ color: '#1E3A5F', marginBottom: '1.5rem' }}>Send a Message</h3>
          <form onSubmit={handleSubmit}>
            {[
              { label: 'Full Name', key: 'name', type: 'text', placeholder: 'John Doe' },
              { label: 'Email Address', key: 'email', type: 'email', placeholder: 'john@example.com' },
              { label: 'Subject', key: 'subject', type: 'text', placeholder: 'How can we help?' },
            ].map(field => (
              <div key={field.key} style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', color: '#555', fontSize: '0.9rem', marginBottom: '6px', fontWeight: '600' }}>{field.label}</label>
                <input type={field.type} placeholder={field.placeholder} required value={form[field.key]}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '2px solid #eee', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }}
                  onFocus={e => e.target.style.border = '2px solid #1E3A5F'}
                  onBlur={e => e.target.style.border = '2px solid #eee'}
                  onChange={e => setForm({ ...form, [field.key]: e.target.value })} />
              </div>
            ))}

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', color: '#555', fontSize: '0.9rem', marginBottom: '6px', fontWeight: '600' }}>Message</label>
              <textarea placeholder="Write your message here..." required rows={5} value={form.message}
                style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '2px solid #eee', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box', resize: 'vertical', fontFamily: 'inherit' }}
                onFocus={e => e.target.style.border = '2px solid #1E3A5F'}
                onBlur={e => e.target.style.border = '2px solid #eee'}
                onChange={e => setForm({ ...form, message: e.target.value })} />
            </div>

            <button type="submit" disabled={loading}
              style={{
                width: '100%', padding: '14px',
                background: loading ? '#ccc' : 'linear-gradient(135deg, #1E3A5F, #2E75B6)',
                color: 'white', border: 'none', borderRadius: '12px',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '1rem', fontWeight: '700',
              }}>
              {loading ? '⏳ Sending...' : '📬 Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
