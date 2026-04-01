import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function CheckoutPage() {
  const [address, setAddress] = useState({ street: '', city: '', country: 'Kenya', postalCode: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/orders', { shippingAddress: address });
      setMessage('Order placed successfully!');
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      setMessage('Failed to place order. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: '500px', margin: '50px auto', padding: '2rem', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', borderRadius: '8px' }}>
      <h2 style={{ color: '#1E3A5F' }}>Checkout</h2>
      {message && <p style={{ color: 'green', fontWeight: 'bold' }}>{message}</p>}
      <form onSubmit={handleOrder}>
        <input type="text" placeholder="Street Address" required
          style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
          onChange={e => setAddress({ ...address, street: e.target.value })} />
        <input type="text" placeholder="City" required
          style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
          onChange={e => setAddress({ ...address, city: e.target.value })} />
        <input type="text" placeholder="Postal Code" required
          style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
          onChange={e => setAddress({ ...address, postalCode: e.target.value })} />
        <input type="text" value="Kenya" readOnly
          style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box', background: '#f5f5f5' }} />
        <button type="submit" disabled={loading}
          style={{ width: '100%', padding: '10px', background: '#1E3A5F', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem' }}>
          {loading ? 'Placing Order...' : 'Place Order'}
        </button>
      </form>
    </div>
  );
}
