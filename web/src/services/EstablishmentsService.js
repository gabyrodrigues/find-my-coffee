import api from './api';

const EstablishmentsService = {
    index: (latitude, longitude) => api.get(`google_stores?latitude=${latitude}&longitude=${longitude}`),
    show: (place_id) => api.get(`google_stores/${place_id}`)
}

export default EstablishmentsService;