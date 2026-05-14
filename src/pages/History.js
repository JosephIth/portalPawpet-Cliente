import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'pets-ui-lib';
import 'pets-ui-lib/dist/styles/pets-ui-lib.css';
import { useAuth } from '../context/AuthContext';
import historialService from '../services/historialService';
import './History.css';

function History() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, authLoading } = useAuth();
  const [historyData, setHistoryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [authLoading, isAuthenticated, navigate]);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        setLoading(true);
        const result = await historialService.getPatientHistory(id);
        setHistoryData(result);
      } catch (err) {
        setError(err?.message || 'Error al cargar el historial');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadHistory();
    }
  }, [id]);

  const handleBack = () => navigate(`/pets/${id}`);

  if (loading) {
    return <div className="page-container">Cargando historial...</div>;
  }

  if (error) {
    return (
      <div className="page-container">
        <div className="error-message">{error}</div>
        <Button variant="outline" onClick={() => navigate('/home')}>Volver al Home</Button>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="history-header">
        <h2>Historial clínico</h2>
        <Button variant="primary" onClick={handleBack}>Volver a la mascota</Button>
      </div>

      {historyData ? (
        <>
          <div className="history-summary">
            <p><strong>Total consultas:</strong> {historyData.consultations?.length ?? 0}</p>
            <p><strong>Total vacunaciones:</strong> {historyData.vaccinations?.length ?? 0}</p>
          </div>

          <section className="history-section">
            <h3>Consultas</h3>
            {historyData.consultations?.length ? (
              <ul className="timeline-list">
                {historyData.consultations.map((consultation) => (
                  <li key={consultation.id} className="timeline-item">
                    <div>
                      <strong>{consultation.reason || 'Consulta'}</strong>
                      <p>{consultation.diagnosis || 'Sin diagnóstico registrado'}</p>
                    </div>
                    <span>{new Date(consultation.date || consultation.createdAt).toLocaleDateString()}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No hay consultas registradas para esta mascota.</p>
            )}
          </section>

          <section className="history-section">
            <h3>Vacunaciones</h3>
            {historyData.vaccinations?.length ? (
              <ul className="timeline-list">
                {historyData.vaccinations.map((vaccination) => (
                  <li key={vaccination.id} className="timeline-item">
                    <div>
                      <strong>{vaccination.vaccineName || vaccination.vaccine || 'Vacuna'}</strong>
                      <p>{vaccination.notes || 'Sin notas adicionales'}</p>
                    </div>
                    <span>{new Date(vaccination.applicationDate || vaccination.date || vaccination.createdAt).toLocaleDateString()}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No hay registros de vacunación para esta mascota.</p>
            )}
          </section>
        </>
      ) : (
        <p>No se encontró historial para esta mascota.</p>
      )}
    </div>
  );
}

export default History;
