import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'pets-ui-lib';
import { useAuth } from '../context/AuthContext';
import patientService from '../services/patientService';
import 'pets-ui-lib/dist/styles/pets-ui-lib.css';
import './Pets.css';

function Pets() {
  const navigate = useNavigate();
  const { user, isAuthenticated, authLoading } = useAuth();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const ownerId = user?.id || user?._id;

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [authLoading, isAuthenticated, navigate]);

  useEffect(() => {
    const loadPets = async () => {
      if (!ownerId) {
        setError('No se encontró el id del usuario.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const fetchedPets = await patientService.getPetsByOwner(ownerId);
        setPets(fetchedPets || []);
      } catch (err) {
        setError(err?.message || 'No se pudieron cargar las mascotas.');
      } finally {
        setLoading(false);
      }
    };

    loadPets();
  }, [ownerId]);

  const handleDetails = (petId) => {
    navigate(`/pets/${petId}`);
  };

  if (loading) {
    return <div className="page-container">Cargando mascotas...</div>;
  }

  return (
    <div className="page-container">
      <div className="pets-header">
        <h2>Mis mascotas</h2>
        <Button variant="primary" onClick={() => navigate('/home')}>Volver al Home</Button>
      </div>
      {error && <div className="error-message">{error}</div>}
      <div className="pets-grid">
        {pets.length ? (
          pets.map((pet) => (
            <div key={pet.id} className="pet-card">
              <h3>{pet.name}</h3>
              <p><strong>Especie:</strong> {pet.species || 'No disponible'}</p>
              <p><strong>Raza:</strong> {pet.breed || 'No disponible'}</p>
              <p><strong>Sexo:</strong> {pet.gender || 'No disponible'}</p>
              <Button variant="secondary" onClick={() => handleDetails(pet.id)}>
                Más detalles
              </Button>
            </div>
          ))
        ) : (
          <p>No hay mascotas registradas para este usuario.</p>
        )}
      </div>
    </div>
  );
}

export default Pets;
