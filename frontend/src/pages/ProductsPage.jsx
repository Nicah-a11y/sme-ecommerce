import { useEffect, useState } from 'react';
import api from '../api/axios';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const url = category ? '/products?category=' + category : '/products';
    api.get(url).then(res => { setProducts(res.data); setLoading(false); });
  }, [category]);

  const handleAddToCart = async (productId) => {
    if (!user) return navigate('/login');
    await addToCart(productId, 1);
    alert('Added to cart! 🛒');
  };

  const categories = [
    { name: 'All', icon: '🏪' },
    { name: 'Footwear', icon: '👟' },
    { name: 'Accessories', icon: '👜' },
    { name: 'Clothing', icon: '👗' },
    { name: 'Art', icon: '🎨' },
    { name: 'Food', icon: '☕' },
    { name: 'Home', icon: '🏠' },
    { name: 'Beauty', icon: '✨' },
  ];

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1E3A5F, #2E75B6)',
        padding: '2rem', color: 'white', textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>🛍️ Our Products</h1>
        <input
          type="text" placeholder="🔍 Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            width: '100%', maxWidth: '400px', padding: '12px 20px',
            borderRadius: '30px', border: 'none', fontSize: '1rem',
            outline: 'none', boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}
        />
      </div>

      {/* Category Filter */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: '8px',
        padding: '1.5rem 2rem', background: 'white',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
      }}>
        {categories.map(cat => (
          <button key={cat.name}
            onClick={() => setCategory(cat.name === 'All' ? '' : cat.name)}
            style={{
              padding: '8px 18px', borderRadius: '20px', cursor: 'pointer',
              border: '2px solid #1E3A5F', fontSize: '0.9rem',
              background: category === (cat.name === 'All' ? '' : cat.name) ? '#1E3A5F' : 'white',
              color: category === (cat.name === 'All' ? '' : cat.name) ? 'white' : '#1E3A5F',
              fontWeight: '500',
            }}>
            {cat.icon} {cat.name}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div style={{ padding: '2rem' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#666' }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
            <p>Loading products...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#666' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>😔</div>
            <p>No products found!</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '1.5rem'
          }}>
            {filtered.map(product => (
              <div key={product._id} style={{
                background: 'white', borderRadius: '16px',
                overflow: 'hidden', boxShadow: '0 2px 15px rgba(0,0,0,0.08)',
                transition: 'transform 0.3s, box-shadow 0.3s',
              }}
                onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)'; }}
                onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 15px rgba(0,0,0,0.08)'; }}>
                <div style={{
                  height: '180px', background: 'linear-gradient(135deg, #e3f2fd, #f3e5f5)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '4rem', position: 'relative'
                }}>
                  {product.imageUrl
                    ? <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : <span>🛍️</span>}
                  <span style={{
                    position: 'absolute', top: '10px', right: '10px',
                    background: product.stock > 0 ? '#4CAF50' : '#f44336',
                    color: 'white', padding: '4px 10px', borderRadius: '12px',
                    fontSize: '0.75rem', fontWeight: 'bold'
                  }}>
                    {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
                <div style={{ padding: '1.2rem' }}>
                  <span style={{
                    background: '#e3f2fd', color: '#1E3A5F',
                    padding: '3px 10px', borderRadius: '12px',
                    fontSize: '0.75rem', fontWeight: '500'
                  }}>
                    {product.category}
                  </span>
                  <h3 style={{ color: '#1E3A5F', margin: '8px 0 4px', fontSize: '1rem' }}>
                    {product.name}
                  </h3>
                  <p style={{ color: '#888', fontSize: '0.85rem', marginBottom: '10px', lineHeight: 1.4 }}>
                    {product.description}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#1B5E20' }}>
                      KES {product.price.toLocaleString()}
                    </span>
                    <button onClick={() => handleAddToCart(product._id)}
                      disabled={product.stock === 0}
                      style={{
                        padding: '8px 16px', background: product.stock > 0 ? 'linear-gradient(135deg, #1E3A5F, #2E75B6)' : '#ccc',
                        color: 'white', border: 'none', borderRadius: '20px',
                        cursor: product.stock > 0 ? 'pointer' : 'not-allowed',
                        fontSize: '0.85rem', fontWeight: '500'
                      }}>
                      🛒 Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
