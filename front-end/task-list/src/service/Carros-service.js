//aqui será implementado todas as chamadas a API usando axios
import axios from 'axios';
//URL da api
const apiUrl = 'http://localhost:8081/Carros';
const axiosInstance = axios.create({
    baseURL: apiUrl
});

class _CarService {
    async getCarros(page = 1, limit = 10) {
        try{
            //faz uma a GET à Api passando os parametros de página e limite
            const response = await axiosInstance.get(`?page=${page}&limit=${limit}`);
            //retorna os dados da resposta
            return response.data;
        }catch(error){
            //trata o erro
            throw error;
        }
        
    };

    async getCarro(id) {
        try{
            //faz uma chamada GET à Api passando o ID
            const response = await axiosInstance.get(`/${id}`);
            //retorna os dados da resposta
            return response.data.Carros;
        }catch(error){
            //trata o erro
            throw error;
        }
    }

    async createCarro(Carros) {
        try{
            //faz uma chamada POST ao Api
            const response = await axiosInstance.post(`/`, Carros);
            //retorna os dados da resposta
            return response.data;
        }catch(error){
            //trata o erro
            throw error;
        }
    };

    async updateCarro(id, Carros) {
        try{
            //faz uma chamada PUT ao Api passando o ID
            const response = await axiosInstance.put(`/${id}`, Carros);
            //retorna os dados da resposta
            return response.data;
        }catch(error){
            //trata o erro
            throw error;
        }
    };

    async deleteCarro(id) {
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
    const CarService = new _CarService();
    export default CarService;
