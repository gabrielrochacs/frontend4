import React from 'react';
import { Table, Button, Container, Form, Row } from 'react-bootstrap';
import { urlBase } from '../utilitarios/definicoes';

export default function TabelaProdutos(props) {

    function filtrarProdutos(e) {
        const termoBusca = e.currentTarget.value.toLowerCase();
        fetch(urlBase + "/produtos", { method: "GET" })
            .then((resposta) => resposta.json())
            .then((listaProdutos) => {
                if (Array.isArray(listaProdutos)) {
                    const resultadoBusca = listaProdutos.filter((produto) =>
                        produto.nome.toLowerCase().includes(termoBusca)
                    );
                    props.setProdutos(resultadoBusca);
                }
            })
            .catch((erro) => {
                console.error("Erro ao buscar os dados do banco: " + erro);
            });
    }

    function editarProduto(produto) {
        // Adicione o campo 'contato' ao objeto produto aqui
        const produtoParaEditar = { ...produto, contato: "" }; // Você pode definir o valor apropriado para 'contato'
        props.editarProduto(produtoParaEditar);
    }

    return (
        <Container className='m-3'>
            <Button onClick={() => {
                props.exibirTabela(false);
            }} className="mb-2">
                Cadastrar Produto
            </Button>

            <Container className='mb-1'>
                <Row>
                    <Form.Control type="text" id="termoBusca" onChange={filtrarProdutos} />
                </Row>
            </Container>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Preço</th>
                        <th>Descrição</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.listaProdutos?.map((produto) => {
                            return (
                                <tr key={produto.id}>
                                    <td>{produto.id}</td>
                                    <td>{produto.nome}</td>
                                    <td>{produto.preco}</td>
                                    <td>{produto.descricao}</td>
                                    <td>
                                        <Button variant='warning' onClick={() => editarProduto(produto)}>
                                            Editar
                                        </Button>{' '}
                                        <Button variant='danger' onClick={() => {
                                            if (window.confirm("Confirma a exclusão do produto?"))
                                                props.excluirProduto(produto);
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