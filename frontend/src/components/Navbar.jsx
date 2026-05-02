import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  const cartCount = cart.items?.length || 0;

  return (
    <nav style={{
      background: 'linear-gradient(135deg, #1E3A5F 0%, #2E75B6 100%)',
      padding: '0 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '65px',
      boxShadow: '0 2px 20px rgba(0,0,0,0.15)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
    }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
        <span style={{ fontSize: '1.8rem' }}>🛍️</span>
        <div>
          <div style={{ color: 'white', fontWeight: 'bold', fontSize: '1.1rem', lineHeight: 1 }}>SME Market</div>
          <div style={{ color: '#90CAF9', fontSize: '0.7rem' }}>Kenya</div>
        </div>
      </Link>

      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <Link to="/products" style={{ color: 'white', textDecoration: 'none', fontSize: '0.95rem', padding: '6px 12px', borderRadius: '20px' }}
          onMouseOver={e => e.target.style.background = 'rgba(255,255,255,0.15)'}
          onMouseOut={e => e.target.style.background = 'transparent'}>
          🏪 Products
        </Link>

        <Link to="/contact" style={{ color: 'white', textDecoration: 'none', fontSize: '0.95rem', padding: '6px 12px', borderRadius: '20px' }}
          onMouseOver={e => e.target.style.background = 'rgba(255,255,255,0.15)'}
          onMouseOut={e => e.target.style.background = 'transparent'}>
          📬 Contact
        </Link>

        {user && (
          <Link to="/cart" style={{ color: 'white', textDecoration: 'none', fontSize: '0.95rem', padding: '6px 12px', borderRadius: '20px', position: 'relative' }}>
            🛒 Cart
            {cartCount > 0 && (
              <span style={{
                position: 'absolute', top: '-5px', right: '-5px',
                background: '#FF5722', color: 'white', borderRadius: '50%',
                width: '20px', height: '20px', fontSize: '0.7rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 'bold'
              }}>{cartCount}</span>
            )}
          </Link>
        )}

        {user?.role === 'admin' && (
          <Link to="/admin" style={{ color: '#FFD700', textDecoration: 'none', fontSize: '0.95rem', padding: '6px 12px', borderRadius: '20px', fontWeight: 'bold' }}>
            ⚙️ Admin
          </Link>
        )}

        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ color: 'white', fontSize: '0.85rem', background: 'rgba(255,255,255,0.15)', padding: '6px 12px', borderRadius: '20px' }}>
              👤 {user.name}
            </span>
            <button onClick={() => { logout(); navigate('/'); }} style={{
              padding: '6px 16px', background: 'transparent',
              color: 'white', border: '1px solid rgba(255,255,255,0.5)',
              borderRadius: '20px', cursor: 'pointer', fontSize: '0.85rem',
            }}>
              Logout
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '10px' }}>
            <Link to="/login" style={{ color: 'white', textDecoration: 'none', padding: '6px 16px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>
              Login
            </Link>
            <Link to="/register" style={{ color: '#1E3A5F', textDecoration: 'none', padding: '6px 16px', borderRadius: '20px', background: 'white', fontWeight: 'bold', fontSize: '0.85rem' }}>
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
