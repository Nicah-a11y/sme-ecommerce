import { useEffect, useState } from 'react';
import api from '../api/axios';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('');
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const url = category ? '/products?category=' + category : '/products';
    api.get(url).then(res => setProducts(res.data));
  }, [category]);

  const handleAddToCart = async (productId) => {
    if (!user) return navigate('/login');
    await addToCart(productId, 1);
    alert('Added to cart!');
  };

  const categories = ['All','Footwear','Accessories','Clothing','Art','Food','Home','Beauty'];

  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ color: '#1E3A5F' }}>Our Products</h2>
      <div style={{ marginBottom: '1rem' }}>
        {categories.map(cat => (
          <button key={cat}
            onClick={() => setCategory(cat === 'All' ? '' : cat)}
            style={{ marginRight: '8px', marginBottom: '8px', padding: '6px 14px', borderRadius: '20px',
              border: '1px solid #1E3A5F',
              background: category === (cat === 'All' ? '' : cat) ? '#1E3A5F' : 'white',
              color: category === (cat === 'All' ? '' : cat) ? 'white' : '#1E3A5F',
              cursor: 'pointer' }}>
            {cat}
          </button>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.5rem' }}>
        {products.map(product => (
          <div key={product._id} style={{ border: '1px solid #eee', borderRadius: '8px', padding: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
            <div style={{ height: '150px', background: '#f5f5f5', borderRadius: '4px', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {product.imageUrl
                ? <img src={product.imageUrl} alt={product.name} style={{ maxHeight: '100%', maxWidth: '100%' }} />
                : <span style={{ color: '#aaa' }}>No image</span>}
            </div>
            <h4 style={{ margin: '0 0 4px', color: '#1E3A5F' }}>{product.name}</h4>
            <p style={{ margin: '0 0 4px', fontSize: '0.85rem', color: '#666' }}>{product.description}</p>
            <p style={{ margin: '0 0 8px', fontWeight: 'bold', color: '#2E75B6' }}>KES {product.price.toLocaleString()}</p>
            <p style={{ margin: '0 0 8px', fontSize: '0.8rem', color: product.stock > 0 ? 'green' : 'red' }}>
              {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
            </p>
            <button onClick={() => handleAddToCart(product._id)}
              disabled={product.stock === 0}
              style={{ width: '100%', padding: '8px', background: '#1E3A5F', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
