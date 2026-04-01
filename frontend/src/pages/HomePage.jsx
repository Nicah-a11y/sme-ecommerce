import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
      <h1 style={{ color: '#1E3A5F', fontSize: '2.5rem' }}>Welcome to SME Market Kenya 🛍️</h1>
      <p style={{ color: '#555', fontSize: '1.2rem', maxWidth: '600px', margin: '1rem auto' }}>
        Discover authentic Kenyan products from local SMEs. Shop handcrafted goods, clothing, art and more!
      </p>
      <button onClick={() => navigate('/products')}
        style={{ padding: '12px 32px', background: '#1E3A5F', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem' }}>
        Shop Now
      </button>
    </div>
  );
}
