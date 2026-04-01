import { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function CartPage() {
  const { cart, fetchCart, removeFromCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => { fetchCart(); }, []);

  const total = cart.items?.reduce((sum, i) => sum + i.price * i.quantity, 0) || 0;

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ color: '#1E3A5F' }}>Your Cart</h2>
      {cart.items?.length === 0 ? (
        <p>Your cart is empty. <a href="/products">Shop now</a></p>
      ) : (
        <>
          {cart.items?.map(item => (
            <div key={item._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', borderBottom: '1px solid #eee' }}>
              <div>
                <h4 style={{ margin: 0, color: '#1E3A5F' }}>{item.product?.name}</h4>
                <p style={{ margin: 0, color: '#666' }}>Qty: {item.quantity}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontWeight: 'bold', color: '#2E75B6' }}>KES {(item.price * item.quantity).toLocaleString()}</p>
                <button onClick={() => removeFromCart(item.product?._id)}
                  style={{ padding: '4px 10px', background: 'red', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div style={{ textAlign: 'right', marginTop: '1rem' }}>
            <h3 style={{ color: '#1E3A5F' }}>Total: KES {total.toLocaleString()}</h3>
            <button onClick={() => navigate('/checkout')}
              style={{ padding: '10px 24px', background: '#1E3A5F', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem' }}>
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
