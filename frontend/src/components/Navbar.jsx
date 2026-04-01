import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const cartCount = cart.items?.length || 0;

  return (
    <nav style={{ background: '#1E3A5F', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '1.3rem', fontWeight: 'bold' }}>
        🛍️ SME Market Kenya
      </Link>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Link to="/products" style={{ color: 'white', textDecoration: 'none' }}>Products</Link>
        {user && (
          <Link to="/cart" style={{ color: 'white', textDecoration: 'none' }}>
            🛒 Cart {cartCount > 0 && <span style={{ background: 'red', borderRadius: '50%', padding: '2px 6px', fontSize: '0.75rem' }}>{cartCount}</span>}
          </Link>
        )}
        {user?.role === 'admin' && (
          <Link to="/admin" style={{ color: '#FFD700', textDecoration: 'none' }}>Admin</Link>
        )}
        {user ? (
          <>
            <span style={{ color: '#ccc' }}>Hi, {user.name}</span>
            <button onClick={handleLogout}
              style={{ padding: '6px 14px', background: 'transparent', color: 'white', border: '1px solid white', borderRadius: '4px', cursor: 'pointer' }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
            <Link to="/register"
              style={{ padding: '6px 14px', background: 'white', color: '#1E3A5F', borderRadius: '4px', textDecoration: 'none' }}>
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
