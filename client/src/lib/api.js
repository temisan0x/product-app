import { API_BASE_URL } from './constant';

export const apiClient = {
    async get(endpoint) {

        const url = `${API_BASE_URL}${endpoint}`;
        console.log(url)
        console.log('Fetching from:', url);
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    },

    async post(endpoint, data) {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Request failed');
        }

        return response.json();
    },

    async getProducts() {
        return this.get('/api/v1/products');
    },

    async login(credentials) {
        return this.post('/api/v1/auth/signin', credentials);
    },

    async register(userData) {
        return this.post('/api/v1/auth/signup', userData);
    },
};