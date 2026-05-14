import React, { useEffect, useState } from 'react';
import { Button } from 'pets-ui-lib';
import 'pets-ui-lib/dist/styles/pets-ui-lib.css';
import { LogOut, PawPrint, Heart, Calendar, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import patientService from '../services/patientService';
import historialService from '../services/historialService';
import './Home.css';

function Home() {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated, loading: authLoading } = useAuth();
  const [pets, setPets] = useState([]);
  const [recentHistory, setRecentHistory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const ownerId = user?.id || user?._id;
  const firstPetId = pets[0]?.id;

  // Redirigir a login si no está autenticado
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, authLoading, navigate]);

  useEffect(() => {
    const loadPetsAndHistory = async () => {
      if (!ownerId) {
        setError('No se encontró el id del usuario.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const fetchedPets = await patientService.getPetsByOwner(ownerId);
        setPets(fetchedPets || []);

        if (fetchedPets && fetchedPets.length > 0) {
          const patientHistory = await historialService.getPatientHistory(fetchedPets[0].id);
          setRecentHistory(patientHistory);
        }
      } catch (err) {
        setError(err?.message || 'Error al cargar las mascotas y el historial.');
      } finally {
        setLoading(false);
      }
    };

    if (ownerId) {
      loadPetsAndHistory();
    }
  }, [ownerId]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handlePetDetails = (id) => {
    navigate(`/pets/${id}`);
  };

  const handleHistory = () => {
    if (firstPetId) {
      navigate(`/history/${firstPetId}`);
    }
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
            <span>{user?.name || 'Usuario'}</span>
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

        <div className="summary-grid">
          <div className="pet-summary-card">
            <h3>Mis mascotas</h3>
            <p>{pets.length ? `${pets.length} mascota(s) encontradas` : 'No se encontraron mascotas aún'}</p>
            <Button variant="secondary" onClick={() => navigate('/pets')}>
              Ver todas
            </Button>
          </div>

          <div className="history-summary-card">
            <h3>Historial rápido</h3>
            <p>{recentHistory ? `${recentHistory.consultations?.length ?? 0} consultas recientes` : 'Historial no disponible'}</p>
            <Button variant="secondary" onClick={handleHistory} disabled={!firstPetId}>
              Ver historial
            </Button>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}
        {loading ? (
          <div className="loading-message">Cargando información...</div>
        ) : (
          <section className="pets-grid">
            {pets.length ? (
              pets.slice(0, 4).map((pet) => (
                <article key={pet.id} className="pet-card">
                  <div className="pet-card-header">
                    <h3>{pet.name}</h3>
                    <span>{pet.species || 'Mascota'}</span>
                  </div>
                  <p><strong>Raza:</strong> {pet.breed || 'No definida'}</p>
                  <p><strong>Edad / Sexo:</strong> {pet.birthDate ? new Date(pet.birthDate).getFullYear() : 'N/A'} / {pet.gender || 'N/A'}</p>
                  <div className="pet-card-actions">
                    <Button variant="secondary" onClick={() => handlePetDetails(pet.id)}>
                      Más detalles
                    </Button>
                  </div>
                </article>
              ))
            ) : (
              <div className="empty-state">
                <p>Aún no tienes mascotas registradas. Registra una para comenzar.</p>
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
}

export default Home;
