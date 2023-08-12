import React, {useState, useEffect} from "react";
import PedidosService from "../../service/Pedidos-service";

import Styles from "../../style/Input.module.css"

const TaskForm = (props) => {
    const [Pedidos, setPedidos] = useState({});
    const [Clientes, setClientes] = useState({});
    const {id, onSave} = props;

    useEffect(() => {
        if(!id) return;
        const load = async() => {
            const Pedidos = await PedidosService.getPedido(id);
            setPedidos(Pedidos);
        };
        load();
    },[id]);

    const handleChange = (e) => {
        setPedidos({
            ...Pedidos,
            clienteId:e.target.value,
        });
    };
    const handleChanges = (e) => {
        setPedidos({
            ...Pedidos,
            carroId:e.target.value,
        });
    };
    const handLeChange = (e) => {
        setPedidos({
            ...Pedidos,
            statusPedido:e.target.value,
        });
    };
   

    const handleSubmit = (e) => {
        e.preventDefault();
        if(props.id){
            PedidosService.updatePedido(props.id, Pedidos)
            .then(()=>{
                props.onSave();
            })
            .catch((error)=>{
                console.log(error);
            });
        }else{
            PedidosService.createPedido(Pedidos)
            .then(()=>{
                props.onSave();
            })
            .catch((error)=>{
                console.log(error);
            })
        }
    };
    return (
        <form onSubmit={handleSubmit}>
                <div className={Styles.input}>
                <label htmlFor="clienteId">Indentificação do cliente:</label>
                <input type="number"
                    id="clienteId"
                    name="clienteId"
                    placeholder="Digite a identificação do cliente"
                    onChange={handleChange}
                    required = {true}
                    value={Pedidos.clienteId ? Pedidos.clienteId:""} />
            </div>
           
            <div className={Styles.input}>
                <label htmlFor="carroId">Indentificação do carro:</label>
                <input type="number"
                    name="carroId"
                    id="carroId"
                    placeholder="Digite a indentificação do carro"
                    onChange={handleChanges}
                    required = {true}
                    value={Pedidos.carroId ? Pedidos.carroId:""} />
            </div>
           
           
            <div >
                <label htmlFor="statusPedido">Status do pedido:</label>
                <select 
                onChange={handLeChange}
                required = {true}
                selected = {true}
                >
                <option value="" disabled selected >Selecione uma opção</option>
                <option value={Pedidos.statusPedido ? Pedidos.statusPedido:"Pendente"}>Pendente</option>
                <option value={Pedidos.statusPedido ? Pedidos.statusPedido:"Concluido"}>Concluido</option>
                </select>
               
                    <button type="submit">Save</button>
            </div>
        </form>
    );
};

export default TaskForm;