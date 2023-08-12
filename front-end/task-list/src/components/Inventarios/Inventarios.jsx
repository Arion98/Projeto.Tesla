import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";

import InventariosForm from "./InventariosForm";
import InventariosService from "../../service/Inventarios-service";
import CarrosService from "../../service/Carros-service";

import "../../style/style.css";

const TaskList = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [Inventario, setInventarios] = useState([]);
    const [Carros, setCarros] = useState([]);
    const [page, setPage] = useState(1);
    const [currentInventariosId, setCurrentInventariosId] = useState(null);
    const [loading, setLoading] = useState(false);

    //hook que serve para controlar efeitos colaterais de comportamento do componente
    useEffect(() => {
     fetchTasks();
     fetchCarros();
    }, [page]);

    const fetchTasks = async () => {
        const data = await InventariosService.getTasks(page,4);

        if(page === 1){
            setInventarios(data);
            return;
        }
        setInventarios([...Inventario, ...data]);
    };
                const fetchCarros = async () => {
                    const data = await CarrosService.getCarros(page, 4); // Implemente esta função
                    if (page === 1) {
                        setCarros(Carros);
                        return;
                    }
                    setCarros([...Carros, ...data]);
                };

    const loadMore = () => {
        setPage(page + 1);
    }

    const handleCloseModal = () => {
        setModalIsOpen(false);
    }

    const handleNew = () => {
        setModalIsOpen(true);
        setCurrentInventariosId(0);
    }

    const handleEdit = (id) => {
        setCurrentInventariosId(id);
        setModalIsOpen(true);
    }

    const handleDelete = (id) => {
        InventariosService.deleteTask(id)
            .then(() => {
                fetchTasks();
                toast.success("Tarefa deletada com sucesso!");
            })
            .catch((error) => {
                console.log(error);
                toast.error("Erro ao deletar tarefa!");
            })
    }

    const handleSave = async () => {
        handleCloseModal();
        toast.success("Dados atualizados com sucesso!");
        setPage(1);
        await fetchTasks();
        //o método fetchTasks() reinicia a paginação sempre que um elemento for salvo
    }

    //O retorno é inserido em JSX que utiliza HTML para ser renderizado dentro do javascript
    //o return de um componente react deve sempre retornar um único elemento, seja ele uma section, uma div ou um elemento vazio
    return (
        <div className="main">
            <center>
                <h1>Inventário de carros</h1>
            </center>
            <div className="button-new-task-container">
                <button className="sucess" onClick={() => handleNew()}>Adicionar um novo cliente</button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Identificação do carro</th>
                        <th>quantidade</th>
                    
                        <th>Acões</th>
                    </tr>
                </thead>
                <tbody>
                    {Inventario.map((Inventario,Carros) => (
                        <tr key={Inventario.id}>
                            <td>{Inventario.id}</td>
                            <td>{Inventario.carroId}</td>
                            <td>{Inventario.quantidade}</td>                     
                            <td>
                                <button onClick={() => handleEdit(Inventario.id)}>Editar</button>
                                <button onClick={() => handleDelete(Inventario.id)}>Excluir</button>
                            </td>
                        </tr>
                    ))}
                    {Carros.map((Carro) => (
                        <tr key={Carro.id}>
                            <td>{Carro.id}</td>
                            <td>{Carro.modelo}</td>
                            <td>{Carro.quantidade}</td>                     
                            <td>
                                <button onClick={() => handleEdit(Carro.id)}>Editar</button>
                                <button onClick={() => handleDelete(Carro.id)}>Excluir</button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
            <div className="load-button-container">
                {loading ?(
                    <p>Carregando...</p>
                ):(
                    <button onClick={loadMore}>Carregar mais</button>
                )}
            </div>

            <Modal 
                className="modal"
                ariaHideApp={false}
                isOpen={modalIsOpen}
                onRequestClose={handleCloseModal}
            >
                <h2>{currentInventariosId ? "Alterar quantidade" : "Novo modelo"}</h2>
                <InventariosForm id={currentInventariosId} onSave={handleSave}/>
            </Modal>
            <ToastContainer />
        </div>
    )
};

export default TaskList;
