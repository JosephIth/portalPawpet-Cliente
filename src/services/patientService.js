import api from './api';

const parseResponse = (response) => {
  return response?.data?.data ?? response?.data ?? response;
};

const patientService = {
  async getPetsByOwner(ownerId) {
    const response = await api.get(`/patients/owner/${ownerId}`);
    return parseResponse(response);
  },

  async getPetById(petId) {
    const response = await api.get(`/patients/${petId}`);
    return parseResponse(response);
  }
};

export default patientService;
