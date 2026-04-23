import { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate, Link } from 'react-router-dom';

export default function CartPage() {
  const { cart, fetchCart, removeFromCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => { fetchCart(); }, []);

  const total = cart.items?.reduce((sum, i) => sum + i.price * i.quantity, 0) || 0;

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1E3A5F, #2E75B6)',
        padding: '2rem', color: 'white', textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '700' }}>🛒 Your Cart</h1>
        <p style={{ color: 'rgba(255,255,255,0.8)', marginTop: '0.5rem' }}>
          {cart.items?.length || 0} item(s) in your cart
        </p>
      </div>

      <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '0 1rem' }}>
        {!cart.items?.length ? (
          <div style={{
            textAlign: 'center', padding: '4rem 2rem',
            background: 'white', borderRadius: '16px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🛒</div>
            <h3 style={{ color: '#1E3A5F', marginBottom: '0.5rem' }}>Your cart is empty!</h3>
            <p style={{ color: '#888', marginBottom: '2rem' }}>Add some amazing Kenyan products to your cart</p>
            <button onClick={() => navigate('/products')} style={{
              padding: '12px 30px',
              background: 'linear-gradient(135deg, #1E3A5F, #2E75B6)',
              color: 'white', border: 'none', borderRadius: '25px',
              cursor: 'pointer', fontSize: '1rem', fontWeight: '600'
            }}>
              🛍️ Shop Now
            </button>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div style={{
              background: 'white', borderRadius: '16px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
              overflow: 'hidden', marginBottom: '1.5rem'
            }}>
              {cart.items?.map((item, i) => (
                <div key={item._id} style={{
                  display: 'flex', justifyContent: 'space-between',
                  alignItems: 'center', padding: '1.2rem 1.5rem',
                  borderBottom: i < cart.items.length - 1 ? '1px solid #f0f0f0' : 'none',
                  gap: '1rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                      width: '60px', height: '60px', borderRadius: '12px',
                      background: 'linear-gradient(135deg, #e3f2fd, #f3e5f5)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '1.8rem', flexShrink: 0
                    }}>
                      {item.product?.imageUrl
                        ? <img src={item.product.imageUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }} />
                        : '🛍️'}
                    </div>
                    <div>
                      <h4 style={{ color: '#1E3A5F', margin: '0 0 4px', fontSize: '1rem' }}>
                        {item.product?.name}
                      </h4>
                      <p style={{ color: '#888', margin: 0, fontSize: '0.85rem' }}>
                        Qty: {item.quantity} × KES {item.price?.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ fontWeight: '700', color: '#1B5E20', fontSize: '1.1rem', whiteSpace: 'nowrap' }}>
                      KES {(item.price * item.quantity).toLocaleString()}
                    </span>
                    <button onClick={() => removeFromCart(item.product?._id)}
                      style={{
                        width: '35px', height: '35px', borderRadius: '50%',
                        background: '#FFEBEE', color: '#C62828',
                        border: 'none', cursor: 'pointer', fontSize: '1rem',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                      }}>
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div style={{
              background: 'white', borderRadius: '16px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
              padding: '1.5rem'
            }}>
              <h3 style={{ color: '#1E3A5F', marginBottom: '1rem' }}>Order Summary</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: '#666' }}>
                <span>Subtotal</span>
                <span>KES {total.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: '#666' }}>
                <span>Delivery</span>
                <span style={{ color: '#1B5E20' }}>Free</span>
              </div>
              <div style={{ borderTop: '2px solid #f0f0f0', paddingTop: '1rem', marginTop: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                  <span style={{ fontWeight: '700', fontSize: '1.1rem', color: '#1E3A5F' }}>Total</span>
                  <span style={{ fontWeight: '700', fontSize: '1.3rem', color: '#1B5E20' }}>
                    KES {total.toLocaleString()}
                  </span>
                </div>
                <button onClick={() => navigate('/checkout')} style={{
                  width: '100%', padding: '14px',
                  background: 'linear-gradient(135deg, #1E3A5F, #2E75B6)',
                  color: 'white', border: 'none', borderRadius: '12px',
                  cursor: 'pointer', fontSize: '1rem', fontWeight: '700',
                  boxShadow: '0 4px 15px rgba(30,58,95,0.3)',
                }}>
                  🚀 Proceed to Checkout
                </button>
                <Link to="/products" style={{
                  display: 'block', textAlign: 'center',
                  marginTop: '1rem', color: '#888', fontSize: '0.9rem'
                }}>
                  ← Continue Shopping
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
