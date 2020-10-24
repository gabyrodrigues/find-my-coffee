import api from './api';
const StoreService = {
    index: (latitude, longitude) => api.get('/stores', {params: {latitude: latitude, longitude: longitude}}),
    show: (google_place_id) => api.get(`/stores/${google_place_id}`),
}

export default StoreService;