import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-modal";

import PedidosForm from "./PedidosForm";
import Pedidoservice from "../../service/Pedidos-service";
import Clientesservice from "../../service/Clientes-service";

import "../../style/style.css";

const TaskList = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [Pedidos, setPedidos] = useState([]);
    const [Clientes, setClientes] = useState([]);
    const [page, setPage] = useState(1);
    const [currentPedidosId, setCurrentPedidosId] = useState(null);
    const [loading, setLoading] = useState(false);

    //hook que serve para controlar efeitos colaterais de comportamento do componente
    useEffect(() => {
        fetchClientes();
        fetchTasks();
    }, [page]);

    const fetchTasks = async () => {
        const data = await Pedidoservice.getPedidos(page,4);

        if(page === 1){
            setPedidos(data);
            return;
        }
        setPedidos([...Pedidos, ...data]);
    };
    const fetchClientes = async () => {
        const data = await Clientesservice.getClientes(page,4);

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
        setCurrentPedidosId(0);
    }

    const handleEdit = (id) => {
        setCurrentPedidosId(id);
        setModalIsOpen(true);
    }

    const handleDelete = (id) => {
        Pedidoservice.deletePedido(id)
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
                <h1>Lista de Pedidos</h1>
            </center>
            <div className="button-new-task-container">
                <button className="sucess" onClick={() => handleNew()}>Adicionar um novo cliente</button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nome do cliente</th>
                        <th>Indentificação do Carro</th>
                        <th>Data do pedido</th>
                        <th>Status do pedido</th>
                        <th>Acões</th>
                    </tr>
                </thead>
                <tbody>
                    {Pedidos.map((pedido) => (
                        <tr key={pedido.id}>
                            <td>{pedido.id}</td>
                            <td>{pedido.clienteId}</td>
                            <td>{pedido.carroId}</td>
                            <td>{pedido.dataPedido}</td>
                            <td>{pedido.statusPedido}</td>
                            <td>
                                <button onClick={() => handleEdit(pedido.id)}>Editar</button>
                                <button onClick={() => handleDelete(pedido.id)}>Excluir</button>
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
                <h2>{currentPedidosId ? "Modificar status" : "Novo modelo"}</h2>
                <PedidosForm id={currentPedidosId} onSave={handleSave}/>
            </Modal>
            <ToastContainer />
        </div>
    )
};

export default TaskList;
