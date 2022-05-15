import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';

const apiClient: AxiosInstance = axios.create({
    baseURL: process.env.VUE_APP_URL_API,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
    }
});

const requestApiInterceptor = (config: AxiosRequestConfig ) : AxiosRequestConfig => {
    if (!config.headers) 
        return config.headers = {}
        
    const token = localStorage.getItem("__chave_usuario");
    if (token) {
        config.headers.Authorization =  token;
    }

    return config;
}

apiClient.interceptors.request.use(requestApiInterceptor);

export { apiClient };