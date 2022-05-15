import { apiClient } from '@/services/Connection';
import { Login } from "@/types/index";

export default {
    login (login: Login) {
        return apiClient.post('authentication/login', login)
            .then((response) => {
                return response.data;
            })
            .catch((err) => {
                return { 
                    err_status: err.response.status, 
                    message: err.response.data.message
                };
            });
    }
}