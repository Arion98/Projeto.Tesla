//aqui será implementado todas as chamadas a API usando axios
import axios from 'axios';

//URL da api
const apiUrl = 'http://localhost:8081/Inventarios';
const IpiUrl = 'http://localhost:8081/Carros';
const axiosInstance = axios.create({
    baseURL: apiUrl,
   
});
const axiosCarros = axios.create({
    baseURL: IpiUrl
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
            return response.data.Inventarios;
        }catch(error){
            //trata o erro
            throw error;
        }
    }

    async createTask(Inventarios) {
        try{
            //faz uma chamada POST ao Api
            const response = await axiosInstance.post(`/`, Inventarios);
            //retorna os dados da resposta
            return response.data;
        }catch(error){
            //trata o erro
            throw error;
        }
    };

    async updateTask(id, Inventarios) {
        try{
            //faz uma chamada PUT ao Api passando o ID
            const response = await axiosInstance.put(`/${id}`, Inventarios);
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









    // Carros

















    async getCarros(page = 1, limit = 10) {
        try{
            //faz uma chamada GET à Api passando os parametros de página e limite
            const response = await axiosCarros.get(`?page=${page}&limit=${limit}`);
            //retorna os dados da resposta
            return response.data;
        }catch(error){
            //trata o erro
            throw error;
        }
        
    };

    async getcarros(id) {
        try{
            //faz uma chamada GET à Api passando o ID
            const response = await axiosCarros.get(`/${id}`);
            //retorna os dados da resposta
            return response.data.Inventarios;
        }catch(error){
            //trata o erro
            throw error;
        }
    }

    async createCarros(Inventarios) {
        try{
            //faz uma chamada POST ao Api
            const response = await axiosCarros.post(`/`, Inventarios);
            //retorna os dados da resposta
            return response.data;
        }catch(error){
            //trata o erro
            throw error;
        }
    };

    async updateCarros(id, Inventarios) {
        try{
            //faz uma chamada PUT ao Api passando o ID
            const response = await axiosCarros.put(`/${id}`, Inventarios);
            //retorna os dados da resposta
            return response.data;
        }catch(error){
            //trata o erro
            throw error;
        }
    };

    async deleteCarros(id) {
        try{
            //faz uma chamada DELETE ao Api passando o ID
            const response = await axiosCarros.delete(`/${id}`);
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
