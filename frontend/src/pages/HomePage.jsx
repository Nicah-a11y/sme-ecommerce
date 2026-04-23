import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const navigate = useNavigate();
  const [count, setCount] = useState({ products: 0, sellers: 0, customers: 0 });

  useEffect(() => {
    const targets = { products: 50, sellers: 120, customers: 500 };
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      setCount({
        products: Math.min(Math.floor((targets.products * step) / steps), targets.products),
        sellers: Math.min(Math.floor((targets.sellers * step) / steps), targets.sellers),
        customers: Math.min(Math.floor((targets.customers * step) / steps), targets.customers),
      });
      if (step >= steps) clearInterval(timer);
    }, interval);
    return () => clearInterval(timer);
  }, []);

  const features = [
    { icon: '🏪', title: 'Local SMEs', desc: 'Supporting Kenyan small businesses grow online' },
    { icon: '🔒', title: 'Secure Payments', desc: 'Safe and encrypted transactions always' },
    { icon: '🚚', title: 'Fast Delivery', desc: 'Quick delivery to your doorstep' },
    { icon: '💯', title: 'Quality Products', desc: 'Authentic handcrafted Kenyan products' },
  ];

  const categories = [
    { name: 'Footwear', icon: '👟', color: '#E3F2FD' },
    { name: 'Clothing', icon: '👗', color: '#FCE4EC' },
    { name: 'Accessories', icon: '👜', color: '#F3E5F5' },
    { name: 'Art', icon: '🎨', color: '#E8F5E9' },
    { name: 'Food', icon: '☕', color: '#FFF8E1' },
    { name: 'Beauty', icon: '✨', color: '#E0F7FA' },
    { name: 'Home', icon: '🏠', color: '#FBE9E7' },
  ];

  const testimonials = [
    { name: 'Amina K.', text: 'Amazing products! I love supporting local businesses.', rating: '⭐⭐⭐⭐⭐' },
    { name: 'John M.', text: 'Fast delivery and great quality. Will shop again!', rating: '⭐⭐⭐⭐⭐' },
    { name: 'Grace W.', text: 'Best place to find authentic Kenyan products online.', rating: '⭐⭐⭐⭐⭐' },
  ];

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif" }}>

      {/* ── HERO ── */}
      <div style={{
        minHeight: '92vh',
        background: 'linear-gradient(135deg, #0D2137 0%, #1E3A5F 40%, #1B5E20 100%)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '3rem 2rem',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Background pattern */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(46,117,182,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(27,94,32,0.3) 0%, transparent 50%)',
        }} />

        {/* Floating circles decoration */}
        {[...Array(6)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: `${60 + i * 30}px`, height: `${60 + i * 30}px`,
            borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.08)',
            top: `${10 + i * 12}%`, left: `${5 + i * 15}%`,
            animation: `float ${3 + i}s ease-in-out infinite alternate`,
          }} />
        ))}

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px' }}>
          {/* Badge */}
          <div style={{
            display: 'inline-block',
            background: 'rgba(255,215,0,0.15)',
            border: '1px solid rgba(255,215,0,0.4)',
            color: '#FFD700', padding: '6px 20px',
            borderRadius: '30px', fontSize: '0.85rem',
            marginBottom: '1.5rem', fontWeight: '500',
            letterSpacing: '1px'
          }}>
            🇰🇪 PROUDLY KENYAN MARKETPLACE
          </div>

          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: '800', color: 'white',
            lineHeight: 1.2, marginBottom: '1.5rem',
            textShadow: '0 2px 20px rgba(0,0,0,0.3)'
          }}>
            Discover Authentic<br />
            <span style={{
              background: 'linear-gradient(90deg, #FFD700, #FFA000)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Kenyan Products
            </span>
          </h1>

          <p style={{
            fontSize: '1.15rem', color: 'rgba(255,255,255,0.8)',
            maxWidth: '550px', margin: '0 auto 2.5rem',
            lineHeight: 1.7
          }}>
            Shop handcrafted goods, clothing, art and more from local SMEs.
            Support Kenyan entrepreneurs while getting amazing products!
          </p>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3rem' }}>
            <button onClick={() => navigate('/products')} style={{
              padding: '15px 40px',
              background: 'linear-gradient(135deg, #FFD700, #FFA000)',
              color: '#1E3A5F', border: 'none',
              borderRadius: '35px', cursor: 'pointer',
              fontSize: '1rem', fontWeight: '800',
              boxShadow: '0 4px 20px rgba(255,215,0,0.4)',
              letterSpacing: '0.5px'
            }}>
              🛍️ Shop Now
            </button>
            <button onClick={() => navigate('/register')} style={{
              padding: '15px 40px',
              background: 'transparent', color: 'white',
              border: '2px solid rgba(255,255,255,0.6)',
              borderRadius: '35px', cursor: 'pointer',
              fontSize: '1rem', fontWeight: '600',
              backdropFilter: 'blur(10px)',
            }}>
              Join Free Today
            </button>
          </div>

          {/* Stats */}
          <div style={{
            display: 'flex', gap: '2rem', justifyContent: 'center',
            flexWrap: 'wrap',
          }}>
            {[
              { value: count.products + '+', label: 'Products' },
              { value: count.sellers + '+', label: 'Local Sellers' },
              { value: count.customers + '+', label: 'Happy Customers' },
            ].map(stat => (
              <div key={stat.label} style={{
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
                padding: '1rem 2rem', borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.15)',
                minWidth: '120px'
              }}>
                <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#FFD700' }}>
                  {stat.value}
                </div>
                <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute', bottom: '2rem',
          color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px'
        }}>
          <span>Scroll to explore</span>
          <div style={{ fontSize: '1.2rem', animation: 'bounce 1s infinite' }}>↓</div>
        </div>
      </div>

      {/* ── FEATURES ── */}
      <div style={{ padding: '4rem 2rem', background: 'white' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', color: '#1E3A5F', fontWeight: '700' }}>
            Why Choose SME Market Kenya?
          </h2>
          <p style={{ color: '#888', marginTop: '0.5rem' }}>
            We make it easy to shop local and support Kenyan businesses
          </p>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '1.5rem', maxWidth: '1000px', margin: '0 auto'
        }}>
          {features.map(f => (
            <div key={f.title} style={{
              padding: '2rem 1.5rem', borderRadius: '16px',
              background: 'linear-gradient(135deg, #f8f9fa, #fff)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
              border: '1px solid #eee', textAlign: 'center',
              transition: 'all 0.3s',
              cursor: 'default',
            }}
              onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(30,58,95,0.15)'; }}
              onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.06)'; }}>
              <div style={{
                fontSize: '2.5rem', marginBottom: '1rem',
                background: 'linear-gradient(135deg, #E3F2FD, #E8F5E9)',
                width: '70px', height: '70px', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 1rem'
              }}>{f.icon}</div>
              <h3 style={{ color: '#1E3A5F', marginBottom: '0.5rem', fontSize: '1.1rem' }}>{f.title}</h3>
              <p style={{ color: '#888', fontSize: '0.9rem', lineHeight: 1.5 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── CATEGORIES ── */}
      <div style={{ padding: '4rem 2rem', background: '#f8f9fa' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '2rem', color: '#1E3A5F', fontWeight: '700' }}>
            Shop by Category
          </h2>
          <p style={{ color: '#888', marginTop: '0.5rem' }}>
            Find exactly what you are looking for
          </p>
        </div>
        <div style={{
          display: 'flex', flexWrap: 'wrap',
          gap: '1rem', justifyContent: 'center',
          maxWidth: '900px', margin: '0 auto'
        }}>
          {categories.map(cat => (
            <button key={cat.name}
              onClick={() => navigate('/products')}
              style={{
                padding: '1rem 1.5rem', borderRadius: '16px',
                border: 'none', background: cat.color,
                cursor: 'pointer', fontSize: '1rem',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: '6px',
                minWidth: '100px', transition: 'all 0.3s',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
              }}
              onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.12)'; }}
              onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)'; }}>
              <span style={{ fontSize: '2rem' }}>{cat.icon}</span>
              <span style={{ color: '#1E3A5F', fontWeight: '600', fontSize: '0.9rem' }}>{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── TESTIMONIALS ── */}
      <div style={{ padding: '4rem 2rem', background: 'white' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '2rem', color: '#1E3A5F', fontWeight: '700' }}>
            What Our Customers Say
          </h2>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '1.5rem', maxWidth: '900px', margin: '0 auto'
        }}>
          {testimonials.map(t => (
            <div key={t.name} style={{
              padding: '2rem', borderRadius: '16px',
              background: 'linear-gradient(135deg, #f8f9fa, #fff)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
              border: '1px solid #eee',
            }}>
              <div style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{t.rating}</div>
              <p style={{ color: '#555', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1rem', fontStyle: 'italic' }}>
                "{t.text}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, #1E3A5F, #2E75B6)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white', fontWeight: 'bold', fontSize: '1rem'
                }}>
                  {t.name[0]}
                </div>
                <span style={{ color: '#1E3A5F', fontWeight: '600' }}>{t.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA BANNER ── */}
      <div style={{
        background: 'linear-gradient(135deg, #1E3A5F, #1B5E20)',
        padding: '4rem 2rem', textAlign: 'center', color: 'white'
      }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem', fontWeight: '700' }}>
          Ready to Start Shopping? 🛍️
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '2rem', fontSize: '1.1rem' }}>
          Join thousands of Kenyans shopping local today!
        </p>
        <button onClick={() => navigate('/products')} style={{
          padding: '15px 40px',
          background: 'linear-gradient(135deg, #FFD700, #FFA000)',
          color: '#1E3A5F', border: 'none',
          borderRadius: '35px', cursor: 'pointer',
          fontSize: '1rem', fontWeight: '800',
          boxShadow: '0 4px 20px rgba(255,215,0,0.3)',
        }}>
          🛒 Start Shopping Now
        </button>
      </div>

      {/* ── FOOTER ── */}
      <footer style={{
        background: '#0D2137', color: 'white',
        padding: '2rem', textAlign: 'center'
      }}>
        <p style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>🛍️ SME Market Kenya</p>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>
          Supporting local Kenyan businesses © 2024 | Built with ❤️ in Kenya 🇰🇪
        </p>
      </footer>
    </div>
  );
}
