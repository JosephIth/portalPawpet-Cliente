import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'pets-ui-lib';
import 'pets-ui-lib/dist/styles/pets-ui-lib.css';
import { useAuth } from '../context/AuthContext';
import patientService from '../services/patientService';
import historialService from '../services/historialService';
import './Pets.css';

function PetDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, authLoading } = useAuth();
  const [pet, setPet] = useState(null);
  const [history, setHistory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [authLoading, isAuthenticated, navigate]);

  useEffect(() => {
    const loadDetails = async () => {
      try {
        setLoading(true);
        const [petResult, historyResult] = await Promise.all([
          patientService.getPetById(id),
          historialService.getPatientHistory(id)
        ]);
        setPet(petResult);
        setHistory(historyResult);
      } catch (err) {
        setError(err?.message || 'Error al cargar los detalles de la mascota');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadDetails();
    }
  }, [id]);

  const handleBack = () => navigate('/home');
  const handleViewHistory = () => navigate(`/history/${id}`);

  if (loading) {
    return <div className="page-container">Cargando detalles...</div>;
  }

  if (error) {
    return (
      <div className="page-container">
        <div className="error-message">{error}</div>
        <Button variant="outline" onClick={handleBack}>Volver al Home</Button>
      </div>
    );
  }

  if (!pet) {
    return (
      <div className="page-container">
        <p>No se encontró la mascota.</p>
        <Button variant="primary" onClick={handleBack}>Volver</Button>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="detail-card">
        <h2>{pet.name}</h2>
        <p><strong>Especie:</strong> {pet.species || 'No disponible'}</p>
        <p><strong>Raza:</strong> {pet.breed || 'No disponible'}</p>
        <p><strong>Sexo:</strong> {pet.gender || 'No disponible'}</p>
        <p><strong>Color:</strong> {pet.color || 'No disponible'}</p>
        <p><strong>Fecha de nacimiento:</strong> {pet.birthDate || 'No disponible'}</p>
        <p><strong>Peso:</strong> {pet.weight || 'No disponible'}</p>
        <p><strong>Microchip:</strong> {pet.microchip || 'No disponible'}</p>
        <p><strong>Notas:</strong> {pet.notes || 'Sin notas'}</p>
        <div className="detail-actions">
          <Button variant="primary" onClick={handleBack}>Volver</Button>
          <Button variant="accent" onClick={handleViewHistory}>Ver Historial</Button>
        </div>
      </div>

      <div className="history-card">
        <h3>Resumen rápido del historial</h3>
        {history ? (
          <>
            <p><strong>Consultas recientes:</strong> {history.consultations?.length ?? 0}</p>
            <p><strong>Vacunaciones registradas:</strong> {history.vaccinations?.length ?? 0}</p>
            <p><strong>Última consulta:</strong> {history.summary?.lastConsultation ? new Date(history.summary.lastConsultation).toLocaleDateString() : 'No disponible'}</p>
          </>
        ) : (
          <p>No hay historial disponible.</p>
        )}
      </div>
    </div>
  );
}

export default PetDetails;
