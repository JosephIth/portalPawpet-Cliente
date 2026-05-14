import api from './api';

const parseResponse = (response) => {
  return response?.data?.data ?? response?.data ?? response;
};

const historialService = {
  async getPatientHistory(patientId) {
    const response = await api.get(`/historial/patient/${patientId}/history`);
    return parseResponse(response);
  },

  async getConsultationById(consultationId) {
    const response = await api.get(`/historial/consultations/${consultationId}`);
    return parseResponse(response);
  }
};

export default historialService;
