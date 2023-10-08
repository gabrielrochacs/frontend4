import React from 'react';
import { Table, Button, Container, Form, Row } from 'react-bootstrap';
import { urlBase } from '../utilitarios/definicoes';

export default function TabelaVendas(props) {
    function filtrarVendas(e) {
        const termoBusca = e.currentTarget.value.toLowerCase();
        fetch(urlBase + "/venda", { method: "GET" })
            .then((resposta) => resposta.json())
            .then((listaVendas) => {
                if (Array.isArray(listaVendas)) {
                    const resultadoBusca = listaVendas.filter((venda) =>
                        venda.data.toLowerCase().includes(termoBusca)
                    );
                    props.setVendas(resultadoBusca);
                }
            })
            .catch((erro) => {
                console.error("Erro ao buscar os dados do banco: " + erro);
            });
    }

    function editarVenda(venda) {
        // Adicione o campo 'cliente_id' ao objeto venda aqui
        const vendaParaEditar = { ...venda, cliente_id: null }; // Defina o valor apropriado para 'cliente_id'
        props.editarVenda(vendaParaEditar);
    }

    return (
        <Container className='m-3'>
            <Button onClick={() => {
                props.exibirTabela(false);
            }} className="mb-2">
                Cadastrar Venda
            </Button>

            <Container className='mb-1'>
                <Row>
                    <Form.Control type="text" id="termoBusca" onChange={filtrarVendas} />
                </Row>
            </Container>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Data</th>
                        <th>Valor</th>
                        <th>Cliente ID</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {props.listaVendas?.map((venda) => {
                        return (
                            <tr key={venda.id}>
                                <td>{venda.id}</td>
                                <td>{venda.data}</td>
                                <td>{venda.valor}</td>
                                <td>{venda.cliente_id}</td>
                                <td>
                                    <Button variant='warning' onClick={() => editarVenda(venda)}>
                                        Editar
                                    </Button>{' '}
                                    <Button variant='danger' onClick={() => {
                                        if (window.confirm("Confirma a exclusão da venda?"))
                                            props.excluirVenda(venda);
                                    }}>
                                        Excluir
                                    </Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </Container>
    );
}