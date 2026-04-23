import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

export default function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', category: '', stock: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!user || user.role !== 'admin') return navigate('/');
    fetchProducts();
    fetchOrders();
  }, []);

  const fetchProducts = async () => {
    const res = await api.get('/products');
    setProducts(res.data);
  };

  const fetchOrders = async () => {
    const res = await api.get('/orders');
    setOrders(res.data);
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      await api.post('/products', newProduct);
      setMessage('✅ Product created successfully!');
      setNewProduct({ name: '', description: '', price: '', category: '', stock: '' });
      fetchProducts();
    } catch (err) {
      setMessage('❌ Failed to create product');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await api.delete('/products/' + id);
      setMessage('✅ Product deleted!');
      fetchProducts();
    } catch (err) {
      setMessage('❌ Failed to delete product');
    }
  };

  const handleUpdateOrderStatus = async (id, status) => {
    try {
      await api.put('/orders/' + id, { status });
      setMessage('✅ Order status updated!');
      fetchOrders();
    } catch (err) {
      setMessage('❌ Failed to update order');
    }
  };

  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const categories = ['Footwear','Accessories','Clothing','Art','Food','Home','Beauty'];

  const tabs = [
    { id: 'overview', icon: '📊', label: 'Overview' },
    { id: 'products', icon: '🛍️', label: 'Products' },
    { id: 'orders', icon: '📦', label: 'Orders' },
    { id: 'add', icon: '➕', label: 'Add Product' },
  ];

  const stats = [
    { label: 'Total Products', value: products.length, icon: '🛍️', color: '#1E3A5F', bg: '#E3F2FD' },
    { label: 'Total Orders', value: orders.length, icon: '📦', color: '#1B5E20', bg: '#E8F5E9' },
    { label: 'Total Revenue', value: 'KES ' + totalRevenue.toLocaleString(), icon: '💰', color: '#E65100', bg: '#FFF3E0' },
    { label: 'Pending Orders', value: orders.filter(o => o.status === 'pending').length, icon: '⏳', color: '#6A1B9A', bg: '#F3E5F5' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1E3A5F, #2E75B6)',
        padding: '2rem', color: 'white'
      }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: '700' }}>⚙️ Admin Dashboard</h1>
        <p style={{ color: 'rgba(255,255,255,0.8)', marginTop: '0.3rem' }}>
          Welcome back, {user?.name}! Manage your SME Market platform.
        </p>
      </div>

      {/* Tabs */}
      <div style={{
        background: 'white', padding: '0 2rem',
        display: 'flex', gap: '0', borderBottom: '2px solid #f0f0f0',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
      }}>
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '1rem 1.5rem', border: 'none', cursor: 'pointer',
              background: 'transparent', fontSize: '0.95rem', fontWeight: '600',
              color: activeTab === tab.id ? '#1E3A5F' : '#888',
              borderBottom: activeTab === tab.id ? '3px solid #1E3A5F' : '3px solid transparent',
              display: 'flex', alignItems: 'center', gap: '6px',
            }}>
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      <div style={{ padding: '2rem' }}>
        {message && (
          <div style={{
            padding: '12px 16px', borderRadius: '10px', marginBottom: '1.5rem',
            background: message.includes('✅') ? '#E8F5E9' : '#FFEBEE',
            color: message.includes('✅') ? '#1B5E20' : '#C62828',
            border: `1px solid ${message.includes('✅') ? '#C8E6C9' : '#FFCDD2'}`,
            fontWeight: '600'
          }}>
            {message}
          </div>
        )}

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '1.5rem', marginBottom: '2rem'
            }}>
              {stats.map(stat => (
                <div key={stat.label} style={{
                  background: 'white', padding: '1.5rem', borderRadius: '16px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                  borderLeft: `4px solid ${stat.color}`,
                  display: 'flex', alignItems: 'center', gap: '1rem'
                }}>
                  <div style={{
                    width: '50px', height: '50px', borderRadius: '12px',
                    background: stat.bg, display: 'flex',
                    alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem'
                  }}>
                    {stat.icon}
                  </div>
                  <div>
                    <p style={{ margin: 0, color: '#888', fontSize: '0.85rem' }}>{stat.label}</p>
                    <h2 style={{ margin: '4px 0 0', color: stat.color, fontSize: '1.4rem' }}>{stat.value}</h2>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
            <div style={{ padding: '1.5rem', borderBottom: '1px solid #f0f0f0' }}>
              <h3 style={{ color: '#1E3A5F', margin: 0 }}>🛍️ All Products ({products.length})</h3>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8f9fa' }}>
                  {['Name', 'Category', 'Price (KES)', 'Stock', 'Action'].map(h => (
                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', color: '#555', fontSize: '0.85rem', fontWeight: '600' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {products.map((p, i) => (
                  <tr key={p._id} style={{ borderTop: '1px solid #f0f0f0' }}
                    onMouseOver={e => e.currentTarget.style.background = '#f8f9fa'}
                    onMouseOut={e => e.currentTarget.style.background = 'white'}>
                    <td style={{ padding: '12px 16px', color: '#1E3A5F', fontWeight: '600' }}>{p.name}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ background: '#E3F2FD', color: '#1E3A5F', padding: '3px 10px', borderRadius: '12px', fontSize: '0.8rem' }}>
                        {p.category}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px', color: '#1B5E20', fontWeight: '600' }}>KES {p.price.toLocaleString()}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{
                        background: p.stock > 0 ? '#E8F5E9' : '#FFEBEE',
                        color: p.stock > 0 ? '#1B5E20' : '#C62828',
                        padding: '3px 10px', borderRadius: '12px', fontSize: '0.8rem'
                      }}>
                        {p.stock} units
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <button onClick={() => handleDeleteProduct(p._id)}
                        style={{
                          padding: '6px 14px', background: '#FFEBEE', color: '#C62828',
                          border: 'none', borderRadius: '8px', cursor: 'pointer',
                          fontSize: '0.85rem', fontWeight: '600'
                        }}>
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
            <div style={{ padding: '1.5rem', borderBottom: '1px solid #f0f0f0' }}>
              <h3 style={{ color: '#1E3A5F', margin: 0 }}>📦 All Orders ({orders.length})</h3>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8f9fa' }}>
                  {['Order ID', 'Total', 'Status', 'Update Status'].map(h => (
                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', color: '#555', fontSize: '0.85rem', fontWeight: '600' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.map(o => (
                  <tr key={o._id} style={{ borderTop: '1px solid #f0f0f0' }}
                    onMouseOver={e => e.currentTarget.style.background = '#f8f9fa'}
                    onMouseOut={e => e.currentTarget.style.background = 'white'}>
                    <td style={{ padding: '12px 16px', color: '#888', fontSize: '0.85rem', fontFamily: 'monospace' }}>
                      #{o._id.slice(-8).toUpperCase()}
                    </td>
                    <td style={{ padding: '12px 16px', color: '#1B5E20', fontWeight: '700' }}>
                      KES {o.total.toLocaleString()}
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{
                        padding: '4px 12px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: '600',
                        background: o.status === 'delivered' ? '#E8F5E9' : o.status === 'pending' ? '#FFF8E1' : o.status === 'cancelled' ? '#FFEBEE' : '#E3F2FD',
                        color: o.status === 'delivered' ? '#1B5E20' : o.status === 'pending' ? '#F57F17' : o.status === 'cancelled' ? '#C62828' : '#1565C0',
                      }}>
                        {o.status.toUpperCase()}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <select onChange={e => handleUpdateOrderStatus(o._id, e.target.value)} defaultValue={o.status}
                        style={{
                          padding: '6px 12px', borderRadius: '8px',
                          border: '2px solid #eee', fontSize: '0.85rem', cursor: 'pointer'
                        }}>
                        {['pending','paid','shipped','delivered','cancelled'].map(s => (
                          <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Add Product Tab */}
        {activeTab === 'add' && (
          <div style={{ maxWidth: '550px' }}>
            <div style={{
              background: 'white', borderRadius: '16px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.06)', padding: '2rem'
            }}>
              <h3 style={{ color: '#1E3A5F', marginBottom: '1.5rem' }}>➕ Add New Product</h3>
              <form onSubmit={handleCreateProduct}>
                {[
                  { label: '📦 Product Name', key: 'name', type: 'text', placeholder: 'e.g. Maasai Sandals' },
                  { label: '📝 Description', key: 'description', type: 'text', placeholder: 'Brief product description' },
                  { label: '💰 Price (KES)', key: 'price', type: 'number', placeholder: 'e.g. 2500' },
                  { label: '📦 Stock Quantity', key: 'stock', type: 'number', placeholder: 'e.g. 20' },
                ].map(field => (
                  <div key={field.key} style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', color: '#555', fontSize: '0.9rem', marginBottom: '6px', fontWeight: '600' }}>
                      {field.label}
                    </label>
                    <input type={field.type} placeholder={field.placeholder} required value={newProduct[field.key]}
                      style={{
                        width: '100%', padding: '12px 16px', borderRadius: '12px',
                        border: '2px solid #eee', fontSize: '0.95rem', outline: 'none',
                        boxSizing: 'border-box', transition: 'border 0.3s',
                      }}
                      onFocus={e => e.target.style.border = '2px solid #1E3A5F'}
                      onBlur={e => e.target.style.border = '2px solid #eee'}
                      onChange={e => setNewProduct({ ...newProduct, [field.key]: e.target.value })} />
                  </div>
                ))}
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', color: '#555', fontSize: '0.9rem', marginBottom: '6px', fontWeight: '600' }}>
                    🏷️ Category
                  </label>
                  <select required value={newProduct.category}
                    style={{
                      width: '100%', padding: '12px 16px', borderRadius: '12px',
                      border: '2px solid #eee', fontSize: '0.95rem', outline: 'none',
                      boxSizing: 'border-box', cursor: 'pointer'
                    }}
                    onChange={e => setNewProduct({ ...newProduct, category: e.target.value })}>
                    <option value="">Select a category</option>
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
                <button type="submit" style={{
                  width: '100%', padding: '14px',
                  background: 'linear-gradient(135deg, #1E3A5F, #2E75B6)',
                  color: 'white', border: 'none', borderRadius: '12px',
                  cursor: 'pointer', fontSize: '1rem', fontWeight: '700',
                  boxShadow: '0 4px 15px rgba(30,58,95,0.3)',
                }}>
                  ➕ Add Product
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
