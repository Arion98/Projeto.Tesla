//aqui será implementado todas as chamadas a API usando axios
import axios from 'axios';
//URL da api
const apiUrl = 'http://localhost:8081/Clientes';
const axiosInstance = axios.create({
    baseURL: apiUrl
});

class _TaskService {
    async getClientes(page = 1, limit = 10) {
        try{
            //faz uma chamada GET à Api passando os parametros de página e limite
            const response = await axiosInstance.get(`?page=${page}&limit=${limit}`);
            //retorna os dados da resposta
            return response.data;
        }catch(error){
            //trata o erro
            throw error;
        }
        
    };

    async getCliente(id) {
        try{
            //faz uma chamada GET à Api passando o ID
            const response = await axiosInstance.get(`/${id}`);
            //retorna os dados da resposta
            return response.data.Clientes;
        }catch(error){
            //trata o erro
            throw error;
        }
    }

    async createCliente(Clientes) {
        try{
            //faz uma chamada POST ao Api
            const response = await axiosInstance.post(`/`, Clientes);
            //retorna os dados da resposta
            return response.data;
        }catch(error){
            //trata o erro
            throw error;
        }
    };

    async updateCliente(id, Clientes) {
        try{
            //faz uma chamada PUT ao Api passando o ID
            const response = await axiosInstance.put(`/${id}`, Clientes);
            //retorna os dados da resposta
            return response.data;
        }catch(error){
            //trata o erro
            throw error;
        }
    };

    async deleteCliente(id) {
        try{
            //faz uma chamada DELETE ao Api passando o ID
            const response = await axiosInstance.delete(`/${id}`);
            //retorna os dados da resposta
            return response.data;
        }catch(error){
            //trata o erro
            throw error;
        }
    };
}
    const TaskService = new _TaskService();
    export default TaskService;
