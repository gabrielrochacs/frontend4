import React from 'react';
import { Table, Button, Container } from 'react-bootstrap';

export default function TabelaItensVenda(props) {
    
    function editaritensVenda(itensVenda) {
        // Adicione o campo 'cliente_id' ao objeto venda aqui
        const itensVendaParaEditar = { ...itensVenda, cliente_id: null }; // Defina o valor apropriado para 'cliente_id'
        props.editaritensVenda(itensVendaParaEditar);
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
                    {props.listaItensVenda?.map((itensVenda) => {
                        return (
                            <tr key={itensVenda.id}>
                                <td>{itensVenda.id}</td>
                                <td>{itensVenda.produto_id}</td>
                                <td>{itensVenda.quantidade}</td>
                                <td>{itensVenda.venda_id}</td>
                                <td>
                                    <Button variant='warning' onClick={() => editaritensVenda(itensVenda)}>
                                        Editar
                                    </Button>{' '}
                                    <Button variant='danger' onClick={() => {
                                        if (window.confirm("Confirma a exclusão do item de venda?"))
                                            props.excluiritensVenda(itensVenda);
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