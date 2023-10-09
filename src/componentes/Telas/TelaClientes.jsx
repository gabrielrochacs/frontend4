import React, { useState, useEffect } from 'react';
import Paginas from '../../Paginas/PaginaComponente';
import FormClientes from '../Formularios/FormClientes.jsx';
import TabelaClientes from '../../tabelas/TabelaClientes';
import { Container, Alert } from 'react-bootstrap';
import { urlBase } from '../../utilitarios/definicoes';

export default function TelaClientes(props) {

    const [clientes, setClientes] = useState([]);
    const [exibirTabela, setExibirTabela] = useState(true);
    const [atualizando, setAtualizando] = useState(false);
    const [atualizarTabela, setAtualizarTabela] = useState(false);
    const [clienteEdicao, setClienteEdicao] = useState({
        cpf: "",
        nome: "",
        dataNasc: "",
        telefone: "",
        email: "",
        cep: "",
        logradouro: "",
        numero: "",
        complemento: "",
        bairro: "",
        cidade: "",
        uf: "",
    })

    function preparaCliente(cliente) {
        setAtualizando(true);
        setClienteEdicao(cliente)
        setExibirTabela(false);
    }

    function excluirCliente(cliente) {
        const cpf = cliente.cpf;

        fetch(urlBase + `/clientes/${cpf}`, {
            method: "DELETE",
            headers: { "Content-Type": 'application/json' }
        })
            .then((resposta) => resposta.json())
            .then((retorno) => {
                if (retorno.status) {
                    setAtualizarTabela(true);
                    window.alert('Dados apagados com sucesso !!!');
                    window.location.reload(); // Recarrega a página após a exclusão
                } else {
                    window.alert('Não foi possível apagar os dados do cliente !!!');
                }
            })
            .catch((erro) => {
                console.error("Erro ao excluir cliente: " + erro);
                window.alert('Erro ao excluir cliente: ' + erro.message);
            });
    }


    useEffect(() => {
        fetch(urlBase + "/clientes", {
            method: "GET"
        })
            .then((resposta) => {
                return resposta.json();
            }).then((dados) => {
                if (Array.isArray(dados)) {
                    setClientes([...dados]);
                }
            })
            .catch((erro) => {
                console.error("Erro ao buscar os dados do banco: " + erro);
            });
        setExibirTabela(true);
    }, []);

    return (
        <Paginas>
            <Container className="border m-3">
                <Alert variant={"secondary"} className='text-center'>Clientes</Alert>
                {
                    exibirTabela ?
                        <TabelaClientes listaClientes={clientes} exibirTabela={setExibirTabela} setClientes={setClientes} editarCliente={preparaCliente} atualizarTabela={atualizarTabela} setAtualizarTabela={setAtualizarTabela} excluirCliente={excluirCliente} />
                        :
                        <FormClientes listaClientes={clientes} exibirTabela={setExibirTabela} setClientes={setClientes} modoEdicao={atualizando} cliente={clienteEdicao} />
                }
            </Container>
        </Paginas>
    );
}