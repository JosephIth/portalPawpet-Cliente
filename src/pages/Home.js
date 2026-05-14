import React from 'react';
import { Button } from 'pets-ui-lib';
import 'pets-ui-lib/dist/styles/pets-ui-lib.css';
import { LogOut, PawPrint, Heart, Calendar, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('Cerrar sesión');
    navigate('/login');
  };

  return (
    <div className="home-container">
      <nav className="home-nav">
        <div className="nav-brand">
          <PawPrint className="brand-icon" size={32} />
          <span>PawPet Portal</span>
        </div>
        <div className="nav-actions">
          <div className="user-info">
            <User size={20} />
            <span>Usuario</span>
          </div>
          <Button variant="outline" onClick={handleLogout} icon={<LogOut size={18} />}>
            Cerrar Sesión
          </Button>
        </div>
      </nav>

      <main className="home-main">
        <div className="welcome-section">
          <h1>¡Bienvenido a PawPet Portal!</h1>
          <p>Gestiona el cuidado de tus mascotas de manera sencilla</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <Heart className="feature-icon" size={48} />
            <h3>Salud de Mascotas</h3>
            <p>Controla vacunas y revisiones</p>
            <Button variant="accent">Ver Detalles</Button>
          </div>

          <div className="feature-card">
            <Calendar className="feature-icon" size={48} />
            <h3>Citas Veterinarias</h3>
            <p>Agenda y gestiona citas</p>
            <Button variant="accent">Ver Detalles</Button>
          </div>

          <div className="feature-card">
            <PawPrint className="feature-icon" size={48} />
            <h3>Perfil de Mascotas</h3>
            <p>Información de tus compañeros</p>
            <Button variant="accent">Ver Detalles</Button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
