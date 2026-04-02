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
      setMessage('Product created successfully!');
      setNewProduct({ name: '', description: '', price: '', category: '', stock: '' });
      fetchProducts();
    } catch (err) {
      setMessage('Failed to create product');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await api.delete('/products/' + id);
      setMessage('Product deleted!');
      fetchProducts();
    } catch (err) {
      setMessage('Failed to delete product');
    }
  };

  const handleUpdateOrderStatus = async (id, status) => {
    try {
      await api.put('/orders/' + id, { status });
      setMessage('Order status updated!');
      fetchOrders();
    } catch (err) {
      setMessage('Failed to update order');
    }
  };

  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const tabStyle = (tab) => ({
    padding: '10px 20px', cursor: 'pointer', border: 'none',
    background: activeTab === tab ? '#1E3A5F' : '#f0f0f0',
    color: activeTab === tab ? 'white' : '#333',
    borderRadius: '4px', marginRight: '8px', fontWeight: 'bold'
  });
  const categories = ['Footwear','Accessories','Clothing','Art','Food','Home','Beauty'];
  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ color: '#1E3A5F' }}>Admin Dashboard</h1>
      {message && <p style={{ color: 'green', fontWeight: 'bold', background: '#e8f5e9', padding: '10px', borderRadius: '4px' }}>{message}</p>}
      <div style={{ marginBottom: '1.5rem' }}>
        <button style={tabStyle('overview')} onClick={() => setActiveTab('overview')}>Overview</button>
        <button style={tabStyle('products')} onClick={() => setActiveTab('products')}>Products</button>
        <button style={tabStyle('orders')} onClick={() => setActiveTab('orders')}>Orders</button>
        <button style={tabStyle('add')} onClick={() => setActiveTab('add')}>Add Product</button>
      </div>
      {activeTab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
          {[
            { label: 'Total Products', value: products.length, color: '#1E3A5F' },
            { label: 'Total Orders', value: orders.length, color: '#2E75B6' },
            { label: 'Total Revenue', value: 'KES ' + totalRevenue.toLocaleString(), color: '#1B5E20' },
            { label: 'Pending Orders', value: orders.filter(o => o.status === 'pending').length, color: '#E65100' },
          ].map(stat => (
            <div key={stat.label} style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', borderLeft: '4px solid ' + stat.color }}>
              <p style={{ margin: 0, color: '#666' }}>{stat.label}</p>
              <h2 style={{ margin: '8px 0 0', color: stat.color }}>{stat.value}</h2>
            </div>
          ))}
        </div>
      )}
      {activeTab === 'products' && (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#1E3A5F', color: 'white' }}>
              <th style={{ padding: '10px', textAlign: 'left' }}>Name</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Category</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Price (KES)</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Stock</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, i) => (
              <tr key={p._id} style={{ background: i % 2 === 0 ? '#f9f9f9' : 'white' }}>
                <td style={{ padding: '10px' }}>{p.name}</td>
                <td style={{ padding: '10px' }}>{p.category}</td>
                <td style={{ padding: '10px' }}>KES {p.price.toLocaleString()}</td>
                <td style={{ padding: '10px' }}>{p.stock}</td>
                <td style={{ padding: '10px' }}>
                  <button onClick={() => handleDeleteProduct(p._id)}
                    style={{ padding: '4px 10px', background: 'red', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {activeTab === 'orders' && (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#1E3A5F', color: 'white' }}>
              <th style={{ padding: '10px', textAlign: 'left' }}>Order ID</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Total (KES)</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Status</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Update</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o, i) => (
              <tr key={o._id} style={{ background: i % 2 === 0 ? '#f9f9f9' : 'white' }}>
                <td style={{ padding: '10px', fontSize: '0.8rem' }}>{o._id.slice(-8)}</td>
                <td style={{ padding: '10px' }}>KES {o.total.toLocaleString()}</td>
                <td style={{ padding: '10px' }}>
                  <span style={{ padding: '4px 8px', borderRadius: '12px', fontSize: '0.8rem',
                    background: o.status === 'delivered' ? '#e8f5e9' : o.status === 'pending' ? '#fff3e0' : '#e3f2fd',
                    color: o.status === 'delivered' ? 'green' : o.status === 'pending' ? 'orange' : 'blue' }}>
                    {o.status}
                  </span>
                </td>
                <td style={{ padding: '10px' }}>
                  <select onChange={e => handleUpdateOrderStatus(o._id, e.target.value)} defaultValue={o.status}
                    style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #ccc' }}>
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {activeTab === 'add' && (
        <div style={{ maxWidth: '500px' }}>
          <h2 style={{ color: '#2E75B6' }}>Add New Product</h2>
          <form onSubmit={handleCreateProduct}>
            <input type="text" placeholder="Product Name" required value={newProduct.name}
              style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
              onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} />
            <input type="text" placeholder="Description" required value={newProduct.description}
              style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
              onChange={e => setNewProduct({ ...newProduct, description: e.target.value })} />
            <input type="number" placeholder="Price in KES" required value={newProduct.price}
              style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
              onChange={e => setNewProduct({ ...newProduct, price: e.target.value })} />
            <select required value={newProduct.category}
              style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
              onChange={e => setNewProduct({ ...newProduct, category: e.target.value })}>
              <option value="">Select Category</option>
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
            <input type="number" placeholder="Stock quantity" required value={newProduct.stock}
              style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
              onChange={e => setNewProduct({ ...newProduct, stock: e.target.value })} />
            <button type="submit"
              style={{ width: '100%', padding: '10px', background: '#1E3A5F', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Add Product
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
