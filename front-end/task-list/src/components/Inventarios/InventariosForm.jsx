import React, {useState, useEffect} from "react";
import InventariosService from "../../service/Inventarios-service";

import Styles from "../../style/Input.module.css"

const TaskForm = (props) => {
    const [Inventarios, setInventarios] = useState({});
    const {id, onSave} = props;

    useEffect(() => {
        if(!id) return;
        const load = async() => {
            const Inventarios = await InventariosService.getTask(id);
            setInventarios(Inventarios);
        };
        load();
    },[id]);

    const handleChange = (e) => {
        setInventarios({
            ...Inventarios,
            carroId:e.target.value,
        });
    };
    const handLeChanges = (e) => {
        setInventarios({
            ...Inventarios,
            quantidade:e.target.value,
        });
    };
   
    const handleSubmit = (e) => {
        e.preventDefault();
        if(props.id){
            InventariosService.updateTask(props.id, Inventarios)
            .then(()=>{
                props.onSave();
            })
            .catch((error)=>{
                console.log(error);
            });
        }else{
            InventariosService.createTask(Inventarios)
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
                <label htmlFor="carroId">Identificação do carro:</label>
                <input type="number"
                    id="carroId"
                    name="carroId"
                    placeholder="Digite a identificação do carro"
                    onChange={handleChange}
                    required = {true}
                    value={Inventarios.carroId ? Inventarios.carroId:""} />
            </div>
           
            <div >
                <label htmlFor="quantidade">quantidade:</label>
                <input type="number"
                    name="quantidade"
                    id="quantidade"
                    placeholder="Adicione uma quantidade"
                    onChange={handLeChanges}
                    required = {true}
                    value={Inventarios.quantidade ? Inventarios.quantidade:""} />
                <button type="submit">Save</button>
            </div>
        </form>
    );
};

export default TaskForm;