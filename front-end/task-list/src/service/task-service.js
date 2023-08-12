//aqui será implementado todas as chamadas a API usando axios
import axios from 'axios';
//URL da api
const apiUrl = 'http://localhost:8081/tasks';
const axiosInstance = axios.create({
    baseURL: apiUrl
});

class _TaskService {
    async getTasks(page = 1, limit = 10) {
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

    async getTask(id) {
        try{
            //faz uma chamada GET à Api passando o ID
            const response = await axiosInstance.get(`/${id}`);
            //retorna os dados da resposta
            return response.data.task;
        }catch(error){
            //trata o erro
            throw error;
        }
    }

    async createTask(task) {
        try{
            //faz uma chamada POST ao Api
            const response = await axiosInstance.post(`/`, task);
            //retorna os dados da resposta
            return response.data;
        }catch(error){
            //trata o erro
            throw error;
        }
    };

    async updateTask(id, task) {
        try{
            //faz uma chamada PUT ao Api passando o ID
            const response = await axiosInstance.put(`/${id}`, task);
            //retorna os dados da resposta
            return response.data;
        }catch(error){
            //trata o erro
            throw error;
        }
    };

    async deleteTask(id) {
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
