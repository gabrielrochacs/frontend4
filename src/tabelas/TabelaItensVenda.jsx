import React from 'react';
import { Table, Button, Container } from 'react-bootstrap';

export default function TabelaItensVenda(props) {
    function editarItemVenda(itemVenda) {
        // Adicione o campo 'cliente_id' ao objeto venda aqui
        const itemVendaParaEditar = { ...itemVenda, cliente_id: null }; // Defina o valor apropriado para 'cliente_id'
        props.editarItemVenda(itemVendaParaEditar);
    }

    return (
        <Container className='m-3'>
            <Button onClick={() => {
                props.exibirTabela(false);
            }} className="mb-2">
                Cadastrar Item de Venda
            </Button>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Produto ID</th>
                        <th>Quantidade</th>
                        <th>Venda ID</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {props.listaItensVenda?.map((itemVenda) => {
                        return (
                            <tr key={itemVenda.id}>
                                <td>{itemVenda.id}</td>
                                <td>{itemVenda.produto_id}</td>
                                <td>{itemVenda.quantidade}</td>
                                <td>{itemVenda.venda_id}</td>
                                <td>
                                    <Button variant='warning' onClick={() => editarItemVenda(itemVenda)}>
                                        Editar
                                    </Button>{' '}
                                    <Button variant='danger' onClick={() => {
                                        if (window.confirm("Confirma a exclusão do item de venda?"))
                                            props.excluirItemVenda(itemVenda);
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