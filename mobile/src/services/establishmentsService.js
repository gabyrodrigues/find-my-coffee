import api from './api';

const EstablishmentsService = {
    index: (latitude, longitude) => api.get(`/google_stores?latitude=${latitude}&longitude=${longitude}`),
}

export default EstablishmentsService;