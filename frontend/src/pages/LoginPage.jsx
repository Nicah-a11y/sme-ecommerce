import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/auth/login', form);
      login(res.data.user, res.data.token);
      navigate('/');
    } catch (err) {
      setError('Invalid email or password');
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0D2137 0%, #1E3A5F 50%, #1B5E20 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '2rem'
    }}>
      <div style={{
        background: 'white', borderRadius: '24px',
        padding: '3rem', width: '100%', maxWidth: '420px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🛍️</div>
          <h2 style={{ color: '#1E3A5F', fontSize: '1.8rem', fontWeight: '700' }}>Welcome Back!</h2>
          <p style={{ color: '#888', fontSize: '0.9rem' }}>Login to your SME Market account</p>
        </div>

        {error && (
          <div style={{
            background: '#FFEBEE', color: '#C62828',
            padding: '12px 16px', borderRadius: '10px',
            marginBottom: '1rem', fontSize: '0.9rem',
            border: '1px solid #FFCDD2', display: 'flex', alignItems: 'center', gap: '8px'
          }}>
            ❌ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', color: '#555', fontSize: '0.9rem', marginBottom: '6px', fontWeight: '600' }}>
              📧 Email Address
            </label>
            <input type="email" placeholder="you@example.com" required
              style={{
                width: '100%', padding: '12px 16px', borderRadius: '12px',
                border: '2px solid #eee', fontSize: '0.95rem', outline: 'none',
                boxSizing: 'border-box', transition: 'border 0.3s',
              }}
              onFocus={e => e.target.style.border = '2px solid #1E3A5F'}
              onBlur={e => e.target.style.border = '2px solid #eee'}
              onChange={e => setForm({ ...form, email: e.target.value })} />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', color: '#555', fontSize: '0.9rem', marginBottom: '6px', fontWeight: '600' }}>
              🔒 Password
            </label>
            <input type="password" placeholder="Enter your password" required
              style={{
                width: '100%', padding: '12px 16px', borderRadius: '12px',
                border: '2px solid #eee', fontSize: '0.95rem', outline: 'none',
                boxSizing: 'border-box', transition: 'border 0.3s',
              }}
              onFocus={e => e.target.style.border = '2px solid #1E3A5F'}
              onBlur={e => e.target.style.border = '2px solid #eee'}
              onChange={e => setForm({ ...form, password: e.target.value })} />
          </div>

          <button type="submit" disabled={loading}
            style={{
              width: '100%', padding: '14px',
              background: loading ? '#ccc' : 'linear-gradient(135deg, #1E3A5F, #2E75B6)',
              color: 'white', border: 'none', borderRadius: '12px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '1rem', fontWeight: '700',
              boxShadow: '0 4px 15px rgba(30,58,95,0.3)',
            }}>
            {loading ? '⏳ Logging in...' : '🚀 Login'}
          </button>
        </form>

        <div style={{
          textAlign: 'center', marginTop: '1.5rem',
          padding: '1rem', background: '#f8f9fa',
          borderRadius: '12px', fontSize: '0.9rem', color: '#666'
        }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: '#1E3A5F', fontWeight: '700' }}>
            Register here →
          </Link>
        </div>
      </div>
    </div>
  );
}
