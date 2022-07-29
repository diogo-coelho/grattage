import { apiClient } from '@/services/Connection';
import { HttpResponseError, Login } from "@/types/index";

export default {
    login (login: Login) {
        return apiClient.post('authentication/login', login)
            .then((response) => {
                return response.data;
            })
            .catch((err: any) => {
                return this.handleHTTPResponseError(err.response?.data)
            });
    },
    handleHTTPResponseError(err: HttpResponseError) {
        switch (err.statusCode) {
            case 401:
                return ({
                    err_status: true, 
                    message: "Usuário não autorizado"
                })

            default:
                return ({
                    err_status: true, 
                    message: "Ocorreu um erro inesperado"
                })
            
        }
    }
}