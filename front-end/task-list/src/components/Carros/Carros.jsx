import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";

import CarroForm from "./CarroForm";
import CarrosService from "../../service/Carros-service";

import "../../style/style.css";

const CarrosList = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [Carros, setCarros] = useState([]);
    const [page, setPage] = useState(1);
    const [currentCarrosId, setCurrentCarrosId] = useState(null);
    const [loading, setLoading] = useState(false);

    //hook que serve para controlar efeitos colaterais de comportamento do componente
    useEffect(() => {
     fetchTasks();
    }, [page]);

    const fetchTasks = async () => {
        const data = await CarrosService.getCarros(page,4);

        if(page === 1){
            setCarros(data);
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
        setCurrentCarrosId(0);
    }

    const handleEdit = (id) => {
        setCurrentCarrosId(id);
        setModalIsOpen(true);
    }

    const handleDelete = (id) => {
        CarrosService.deleteCarro(id)
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
                <h1>Lista de Carros</h1>
            </center>
            <div className="button-new-task-container">
                <button className="sucess" onClick={() => handleNew()}>Adicionar um novo modelo</button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Marca</th>
                        <th>preço</th>
                        <th>caracteristicas</th>
                        <th>Acões</th>
                    </tr>
                </thead>
                <tbody>
                    {Carros.map((Carros) => (
                        <tr key={Carros.id}>
                            <td>{Carros.id}</td>
                            <td>{Carros.modelo}</td>
                            <td>{Carros.preco}</td>
                            <td>{Carros.caracteristicas}</td>
                            <td>
                                <button onClick={() => handleEdit(Carros.id)}>Editar</button>
                                <button onClick={() => handleDelete(Carros.id)}>Excluir</button>
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
                <h2>{currentCarrosId ? "Editar preço" : "Adicione um Novo automóvel"}</h2>
                <CarroForm id={currentCarrosId} onSave={handleSave}/>
            </Modal>
            <ToastContainer />
        </div>
    )
};

export default CarrosList;
