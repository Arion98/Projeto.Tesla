import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";

import ClientesForm from "./ClientesForm";
import ClienteService from "../../service/Clientes-service";

import "../../style/style.css";

const TaskList = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [Clientes, setClientes] = useState([]);
    const [page, setPage] = useState(1);
    const [currentClientesId, setCurrentClientesId] = useState(null);
    const [loading, setLoading] = useState(false);

    //hook que serve para controlar efeitos colaterais de comportamento do componente
    useEffect(() => {
     fetchTasks();
    }, [page]);

    const fetchTasks = async () => {
        const data = await ClienteService.getClientes(page,4);

        if(page === 1){
            setClientes(data);
            return;
        }
        setClientes([...Clientes, ...data]);
    };

    const loadMore = () => {
        setPage(page + 1);
    }

    const handleCloseModal = () => {
        setModalIsOpen(false);
    }

    const handleNew = () => {
        setModalIsOpen(true);
        setCurrentClientesId(0);
    }

    const handleEdit = (id) => {
        setCurrentClientesId(id);
        setModalIsOpen(true);
    }

    const handleDelete = (id) => {
        ClienteService.deleteCliente(id)
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
                <h1>Lista de Clientes</h1>
            </center>
            <div className="button-new-task-container">
                <button className="sucess" onClick={() => handleNew()}>Adicionar um novo cliente</button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>nome</th>
                        <th>email</th>
                        <th>telefone</th>
                        <th>endereco</th>
                        <th>Acões</th>
                    </tr>
                </thead>
                <tbody>
                    {Clientes.map((Cliente) => (
                        <tr key={Cliente.id}>
                            <td>{Cliente.id}</td>
                            <td>{Cliente.nome}</td>
                            <td>{Cliente.email}</td>
                            <td>{Cliente.telefone}</td>
                            <td>{Cliente.endereco}</td>
                            <td>
                                <button onClick={() => handleEdit(Cliente.id)}>Editar</button>
                                <button onClick={() => handleDelete(Cliente.id)}>Excluir</button>
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
                <h2>{currentClientesId ? "Edite o nome" : "Novo modelo"}</h2>
                <ClientesForm id={currentClientesId} onSave={handleSave}/>
            </Modal>
            <ToastContainer />
        </div>
    )
};

export default TaskList;
