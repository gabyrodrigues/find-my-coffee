import axios from 'axios';

const api = axios.create({
    baseURL: "https://1dec3202be3e.ngrok.io/api/v1" //url através do comando ngrok http 3001
});

export default api;