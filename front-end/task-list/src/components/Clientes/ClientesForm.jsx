import React, {useState, useEffect} from "react";
import ClientesService from "../../service/Clientes-service";

import Styles from "../../style/Input.module.css"

const TaskForm = (props) => {
    const [Clientes, setClientes] = useState({});
    const {id, onSave} = props;

    useEffect(() => {
        if(!id) return;
        const load = async() => {
            const Clientes = await ClientesService.getCliente(id);
            setClientes(Clientes);
        };
        load();
    },[id]);

    const handleChange = (e) => {
        setClientes({
            ...Clientes,
            nome:e.target.value,
        });
    };
    const handleChanges = (e) => {
        setClientes({
            ...Clientes,
            email:e.target.value,
        });
    };
    const handLeChange = (e) => {
        setClientes({
            ...Clientes,
            telefone:e.target.value,
        });
    };
    const handlechange = (e) => {
        setClientes({
            ...Clientes,
            endereco:e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(props.id){
            ClientesService.updateCliente(props.id, Clientes)
            .then(()=>{
                props.onSave();
            })
            .catch((error)=>{
                console.log(error);
            });
        }else{
            ClientesService.createCliente(Clientes)
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
                <label htmlFor="nome">nome:</label>
                <input type="text"
                    id="nome"
                    name="nome"
                    placeholder="Digite seu nome"
                    onChange={handleChange}
                    required = {true}
                    value={Clientes.nome ? Clientes.nome:""} />
            </div>
           
            <div className={Styles.input}>
                <label htmlFor="email">E-mail:</label>
                <input type="email"
                    name="email"
                    id="email"
                    placeholder="Digite seu email"
                    onChange={handleChanges}
                    required = {true}
                    value={Clientes.email ? Clientes.email:""} />
            </div>
           
            <div className={Styles.input}>
                <label htmlFor="telefone">telefone:</label>
                <input type="number"
                    name="telefone"
                    id="telefone"
                    placeholder="Digite seu telefone"
                    onChange={handLeChange}
                    required = {true}
                    value={Clientes.telefone ? Clientes.telefone:""} />
                
            </div>
            <div >
                <label htmlFor="endereco">endereco:</label>
                <input type="text"
                    name="endereco"
                    id="endereco"
                    placeholder="Digite seu numero"
                    onChange={handlechange}
                    required = {true}
                    value={Clientes.endereco ? Clientes.endereco:""} />
                    <button type="submit">Save</button>
            </div>
        </form>
    );
};

export default TaskForm;