import React, {useState, useEffect} from "react";
import CarrosService from "../../service/Carros-service";

import Styles from "../../style/Input.module.css"

const CarrosForm = (props) => {
    const [Carros, setCarro] = useState({});
    const {id, onSave} = props;

    useEffect(() => {
        if(!id) return;
        const load = async() => {
            const Carro = await CarrosService.getCarro(id);
            setCarro(Carro);
        };
        load();
    },[id]);

    const handleChange = (e) => {
        setCarro({
            ...Carros,
            modelo:e.target.value,
        });
    }; 
    const handleChanges = (e) => {
        setCarro({
            ...Carros,
                preco:e.target.value,
        });
    };
    const handLeChange = (e) => {
        setCarro({
            ...Carros,
            caracteristicas:e.target.value,
        });
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        if(props.id){
            CarrosService.updateCarro(props.id, Carros)
            .then(()=>{
                props.onSave()
            })
            .catch((error)=>{
                console.log(error);
            });
        }else{
            CarrosService.createCarro(Carros)
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
                <label htmlFor="modelo">modelo:</label>
                <input type="text"
                    id="modelo"
                    name="modelo"
                    placeholder="Adicione um novo modelo"
                    onChange={handleChange}
                    required = {true}
                    value={Carros.modelo ? Carros.modelo:""} />
            </div>
           
            <div className={Styles.input}>
                <label htmlFor="preco">preco:</label>
                <input type="number"
                    name="preco"
                    id="preco"
                    placeholder="Adicione um novo preço"
                    onChange={handleChanges}
                    required = {true}
                    value={Carros.preco ? Carros.preco:""} />
            </div>
           
            <div >
                <label htmlFor="caracteristicas">caracteristicas:</label>
                <input type="text"
                    name="caracteristicas"
                    id="caracteristicas"
                    placeholder="Adicione um nova caracteristica"
                    onChange={handLeChange}
                    required = {true}
                    value={Carros.caracteristicas ? Carros.caracteristicas:""} />
                <button type="submit">Save</button>
            </div>
        </form>
    );
};

export default CarrosForm;