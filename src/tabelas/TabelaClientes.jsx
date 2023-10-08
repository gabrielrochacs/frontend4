import React from 'react';
import { Table, Button, Container, Form, Row } from 'react-bootstrap';
import { urlBase } from '../utilitarios/definicoes';

export default function TabelaClientes(props) {

    function filtrarClientes(e) {
        const termoBusca = e.currentTarget.value.toLowerCase();
        fetch(urlBase + "/cliente", { method: "GET" })
            .then((resposta) => resposta.json())
            .then((listaClientes) => {
                if (Array.isArray(listaClientes)) {
                    const resultadoBusca = listaClientes.filter((cliente) =>
                        cliente.nome.toLowerCase().includes(termoBusca)
                    );
                    props.setClientes(resultadoBusca);
                }
            })
            .catch((erro) => {
                console.error("Erro ao buscar os dados do banco: " + erro);
            });
    }

    function editarCliente(cliente) {
        // Adicione o campo 'contato' ao objeto cliente aqui
        const clienteParaEditar = { ...cliente, contato: "" }; // Você pode definir o valor apropriado para 'contato'
        props.editarCliente(clienteParaEditar);
    }

    return (
        <Container className='m-3'>
            <Button onClick={() => {
                props.exibirTabela(false);
            }} className="mb-2">
                Cadastrar
            </Button>

            <Container className='mb-1'>
                <Row>
                    <Form.Control type="text" id="termoBusca" onChange={filtrarClientes} />
                </Row>
            </Container>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>CPF</th>
                        <th>Nome</th>
                        <th>Data de Nascimento</th>
                        <th>Telefone</th>
                        <th>Email</th>
                        <th>CEP</th>
                        <th>Logradouro</th>
                        <th>Número</th>
                        <th>Complemento</th>
                        <th>Bairro</th>
                        <th>Cidade</th>
                        <th>UF</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.listaClientes?.map((cliente) => {
                            return (
                                <tr key={cliente.cpf}>
                                    <td>{cliente.cpf}</td>
                                    <td>{cliente.nome}</td>
                                    <td>{cliente.dataNasc}</td>
                                    <td>{cliente.telefone}</td>
                                    <td>{cliente.email}</td>
                                    <td>{cliente.cep}</td>
                                    <td>{cliente.logradouro}</td>
                                    <td>{cliente.numero}</td>
                                    <td>{cliente.complemento}</td>
                                    <td>{cliente.bairro}</td>
                                    <td>{cliente.cidade}</td>
                                    <td>{cliente.uf}</td>
                                    <td>
                                        <Button variant='warning' onClick={() => editarCliente(cliente)}>
                                            Editar
                                        </Button>{' '}
                                        <Button variant='danger' onClick={() => {
                                            if (window.confirm("Confirma a exclusão do cliente?"))
                                                props.excluirCliente(cliente);
                                        }}>
                                            Excluir
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </Table>
        </Container>
    );
}