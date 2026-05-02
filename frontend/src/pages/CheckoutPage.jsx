import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import api from '../api/axios';

const stripePromise = loadStripe('pk_test_51TSYlCELWbNHdROlRyWMZmnb3H31Q5A2IoCJz5LG0I8vqXFRcebsdkVTvyDVl5b71Js1LvBaB9fgMV3iO31tYLnt00xPWlIlrm');

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [address, setAddress] = useState({ street: '', city: '', country: 'Kenya', postalCode: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [cart, setCart] = useState({ items: [] });

  useEffect(() => {
    api.get('/cart').then(res => setCart(res.data)).catch(console.error);
  }, []);

  const total = cart.items?.reduce((sum, i) => sum + i.price * i.quantity, 0) || 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);
    setError('');

    try {
      const { data } = await api.post('/payment/create-intent', { amount: total });
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: { address: { city: address.city, country: 'KE' } }
        }
      });

      if (result.error) {
        setError(result.error.message);
      } else if (result.paymentIntent.status === 'succeeded') {
        await api.post('/payment/confirm', {
          paymentIntentId: result.paymentIntent.id,
          shippingAddress: address
        });
        setSuccess(true);
        setTimeout(() => navigate('/'), 3000);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
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
        <h2 style={{ color: '#1B5E20', marginBottom: '0.5rem' }}>Payment Successful!</h2>
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
        <h1 style={{ fontSize: '2rem', fontWeight: '700' }}>💳 Checkout</h1>
        <p style={{ color: 'rgba(255,255,255,0.8)' }}>Total: KES {total.toLocaleString()}</p>
      </div>

      <div style={{ maxWidth: '500px', margin: '2rem auto', padding: '0 1rem' }}>
        <form onSubmit={handleSubmit}>

          {/* Shipping Address */}
          <div style={{ background: 'white', borderRadius: '16px', padding: '2rem', marginBottom: '1rem', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
            <h3 style={{ color: '#1E3A5F', marginBottom: '1.5rem' }}>📦 Shipping Address</h3>
            {[
              { label: 'Street Address', key: 'street', placeholder: 'e.g. Moi Avenue' },
              { label: 'City', key: 'city', placeholder: 'e.g. Nairobi' },
              { label: 'Postal Code', key: 'postalCode', placeholder: 'e.g. 00100' },
            ].map(field => (
              <div key={field.key} style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', color: '#555', fontSize: '0.9rem', marginBottom: '6px', fontWeight: '600' }}>{field.label}</label>
                <input type="text" placeholder={field.placeholder} required
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '2px solid #eee', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }}
                  onFocus={e => e.target.style.border = '2px solid #1E3A5F'}
                  onBlur={e => e.target.style.border = '2px solid #eee'}
                  onChange={e => setAddress({ ...address, [field.key]: e.target.value })} />
              </div>
            ))}
          </div>

          {/* Card Payment */}
          <div style={{ background: 'white', borderRadius: '16px', padding: '2rem', marginBottom: '1rem', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
            <h3 style={{ color: '#1E3A5F', marginBottom: '1.5rem' }}>💳 Card Details</h3>
            <div style={{ padding: '12px 16px', borderRadius: '12px', border: '2px solid #eee', marginBottom: '1rem' }}>
              <CardElement options={{
                style: {
                  base: { fontSize: '16px', color: '#333', '::placeholder': { color: '#aab7c4' } },
                  invalid: { color: '#C62828' }
                }
              }} />
            </div>
            <div style={{ background: '#E3F2FD', padding: '10px 16px', borderRadius: '8px', fontSize: '0.85rem', color: '#1565C0' }}>
              🧪 Test card: <strong>4242 4242 4242 4242</strong> | Any future date | Any CVC
            </div>
          </div>

          {error && (
            <div style={{ background: '#FFEBEE', color: '#C62828', padding: '12px 16px', borderRadius: '10px', marginBottom: '1rem', fontWeight: '600' }}>
              ❌ {error}
            </div>
          )}

          <button type="submit" disabled={!stripe || loading}
            style={{
              width: '100%', padding: '14px',
              background: loading ? '#ccc' : 'linear-gradient(135deg, #1B5E20, #2E7D32)',
              color: 'white', border: 'none', borderRadius: '12px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '1rem', fontWeight: '700',
              boxShadow: '0 4px 15px rgba(27,94,32,0.3)',
            }}>
            {loading ? '⏳ Processing Payment...' : `✅ Pay KES ${total.toLocaleString()}`}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}
