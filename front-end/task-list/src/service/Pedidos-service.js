//aqui será implementado todas as chamadas a API usando axios
import axios from 'axios';
//URL da api
const apiUrl = 'http://localhost:8081/Pedidos';
const apUrl = 'http://localhost:8081/Clientes';
const axiosInstance = axios.create({
    baseURL: apiUrl
});
const axiosPeople = axios.create({
    baseURL: apUrl
});

class _TaskService {
    async getPedidos(page = 1, limit = 10) {
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

    async getPedido(id) {
        try{
            //faz uma chamada GET à Api passando o ID
            const response = await axiosInstance.get(`/${id}`);
            //retorna os dados da resposta
            return response.data.Pedidos;
        }catch(error){
            //trata o erro
            throw error;
        }
    }

    async createPedido(Pedidos) {
        try{
            //faz uma chamada POST ao Api
            const response = await axiosInstance.post(`/`, Pedidos);
            //retorna os dados da resposta
            return response.data;
        }catch(error){
            //trata o erro
            throw error;
        }
    };

    async updatePedido(id, Pedidos) {
        try{
            //faz uma chamada PUT ao Api passando o ID
            const response = await axiosInstance.put(`/${id}`, Pedidos);
            //retorna os dados da resposta
            return response.data;
        }catch(error){
            //trata o erro
            throw error;
        }
    };

    async deletePedido(id) {
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




















    async getClientes(page = 1, limit = 10) {
        try{
            //faz uma chamada GET à Api passando os parametros de página e limite
            const response = await axiosPeople.get(`?page=${page}&limit=${limit}`);
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
            const response = await axiosPeople.get(`/${id}`);
            //retorna os dados da resposta
            return response.data.Pedidos;
        }catch(error){
            //trata o erro
            throw error;
        }
    }

    async createClientes(Pedidos) {
        try{
            //faz uma chamada POST ao Api
            const response = await axiosPeople.post(`/`, Pedidos);
            //retorna os dados da resposta
            return response.data;
        }catch(error){
            //trata o erro
            throw error;
        }
    };

    async updateClientes(id, Pedidos) {
        try{
            //faz uma chamada PUT ao Api passando o ID
            const response = await axiosPeople.put(`/${id}`, Pedidos);
            //retorna os dados da resposta
            return response.data;
        }catch(error){
            //trata o erro
            throw error;
        }
    };

    async deleteClientes(id) {
        try{
            //faz uma chamada DELETE ao Api passando o ID
            const response = await axiosPeople.delete(`/${id}`);
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
