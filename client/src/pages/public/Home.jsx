
import { Fade, Zoom } from 'react-awesome-reveal'; // Animacijos
import { useNavigate } from 'react-router';
export function HomePage() {
        const navigate = useNavigate();
return (
    <div
      className="home-wrapper"
      style={{
        backgroundImage: `url('https://i.gifer.com/9ZXP.gif')`,
        backgroundSize: 'cover',
        backgroundPosition: 'top',
        minHeight: '100vh',
        color: '#fff',
        padding: '60px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        textAlign: 'center'
      }}
    >
      <Fade direction="down" triggerOnce>
        <h1 style={{ fontSize: '3rem', fontWeight: 'bold', textShadow: '2px 2px 4px #000' }}>
          ✨ Sveiki atvykę į mūsų grožio kampelį! ✨
        </h1>
      </Fade>

      <Zoom delay={300} triggerOnce>
        <p style={{ fontSize: '1.5rem', maxWidth: '600px', marginTop: '20px', textShadow: '1px 1px 3px #000' }}>
          💄 Čia rasite visas grožio paslaugas, kurių jums reikia. Užsiregistruokite 👩‍💻, prisijunkite 🔐 ir pradėkite savo grožio kelionę jau šiandien! 🌸
        </p>
      </Zoom>

      <Fade delay={800} triggerOnce>
      <button
      style={{
        marginTop: '40px',
        padding: '12px 30px',
        fontSize: '1.1rem',
        borderRadius: '30px',
        border: 'none',
        backgroundColor: '#ff69b4',
        color: '#fff',
        boxShadow: '2px 2px 10px rgba(0,0,0,0.3)',
        cursor: 'pointer',
        transition: '0.3s ease'
      }}
      onMouseOver={e => e.currentTarget.style.backgroundColor = '#e754a3'}
      onMouseOut={e => e.currentTarget.style.backgroundColor = '#ff69b4'}
      onClick={() => navigate('/login')} // 👈 čia nukreipimas į /login
    >
      🌟 Pradėti dabar
    </button>
      </Fade>
    </div>
  );
}

