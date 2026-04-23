import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function CheckoutPage() {
  const [address, setAddress] = useState({ street: '', city: '', country: 'Kenya', postalCode: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/orders', { shippingAddress: address });
      setSuccess(true);
      setTimeout(() => navigate('/'), 3000);
    } catch (err) {
      alert('Failed to place order. Please try again.');
    }
    setLoading(false);
  };

  if (success) return (
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
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
        <h2 style={{ color: '#1B5E20', marginBottom: '0.5rem' }}>Order Placed!</h2>
        <p style={{ color: '#666' }}>Thank you for shopping with SME Market Kenya!</p>
        <p style={{ color: '#888', fontSize: '0.85rem', marginTop: '1rem' }}>Redirecting to homepage...</p>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      <div style={{
        background: 'linear-gradient(135deg, #1E3A5F, #2E75B6)',
        padding: '2rem', color: 'white', textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '700' }}>🚀 Checkout</h1>
        <p style={{ color: 'rgba(255,255,255,0.8)', marginTop: '0.5rem' }}>
          Almost there! Fill in your delivery details
        </p>
      </div>

      <div style={{ maxWidth: '500px', margin: '2rem auto', padding: '0 1rem' }}>
        <div style={{
          background: 'white', borderRadius: '16px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)', padding: '2rem'
        }}>
          <h3 style={{ color: '#1E3A5F', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            📦 Shipping Address
          </h3>

          <form onSubmit={handleOrder}>
            {[
              { label: '🏠 Street Address', key: 'street', placeholder: 'e.g. Moi Avenue, House 12' },
              { label: '🏙️ City', key: 'city', placeholder: 'e.g. Nairobi' },
              { label: '📮 Postal Code', key: 'postalCode', placeholder: 'e.g. 00100' },
            ].map(field => (
              <div key={field.key} style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', color: '#555', fontSize: '0.9rem', marginBottom: '6px', fontWeight: '600' }}>
                  {field.label}
                </label>
                <input type="text" placeholder={field.placeholder} required
                  style={{
                    width: '100%', padding: '12px 16px', borderRadius: '12px',
                    border: '2px solid #eee', fontSize: '0.95rem', outline: 'none',
                    boxSizing: 'border-box', transition: 'border 0.3s',
                  }}
                  onFocus={e => e.target.style.border = '2px solid #1E3A5F'}
                  onBlur={e => e.target.style.border = '2px solid #eee'}
                  onChange={e => setAddress({ ...address, [field.key]: e.target.value })} />
              </div>
            ))}

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', color: '#555', fontSize: '0.9rem', marginBottom: '6px', fontWeight: '600' }}>
                🌍 Country
              </label>
              <input type="text" value="Kenya" readOnly
                style={{
                  width: '100%', padding: '12px 16px', borderRadius: '12px',
                  border: '2px solid #eee', fontSize: '0.95rem',
                  background: '#f8f9fa', boxSizing: 'border-box', color: '#666'
                }} />
            </div>

            <div style={{
              background: '#E8F5E9', padding: '1rem', borderRadius: '12px',
              marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px'
            }}>
              <span style={{ fontSize: '1.5rem' }}>🔒</span>
              <p style={{ margin: 0, color: '#1B5E20', fontSize: '0.85rem' }}>
                Your order is secure and will be delivered to your address
              </p>
            </div>

            <button type="submit" disabled={loading}
              style={{
                width: '100%', padding: '14px',
                background: loading ? '#ccc' : 'linear-gradient(135deg, #1B5E20, #2E7D32)',
                color: 'white', border: 'none', borderRadius: '12px',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '1rem', fontWeight: '700',
                boxShadow: '0 4px 15px rgba(27,94,32,0.3)',
              }}>
              {loading ? '⏳ Placing Order...' : '✅ Place Order'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
