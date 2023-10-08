import React, { useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { urlBase } from '../../utilitarios/definicoes';

export default function FormProdutos(props) {
    const [produto, setProduto] = useState({
        id: null, // O ID será gerado automaticamente
        nome: '',
        preco: '',
        descricao: '',
    });

    function manipulaMudanca(e) {
        const { id, value } = e.target;
        setProduto({ ...produto, [id]: value });
    }

    async function manipulaSubmissao(e) {
        e.preventDefault();

        if (validarCampos()) {
            const metodo = props.modoEdicao ? 'PUT' : 'POST';
            const endpoint = props.modoEdicao ? `/produto/${produto.id}` : '/produto';

            try {
                const resposta = await fetch(urlBase + endpoint, {
                    method: metodo,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(produto),
                });

                const dados = await resposta.json();

                if (dados.status) {
                    if (!props.modoEdicao) {
                        const novoProduto = { ...produto, id: dados.novoId };
                        props.setProdutos([...props.listaProdutos, novoProduto]);
                    } else {
                        const listaAtualizada = props.listaProdutos.map((item) =>
                            item.id === produto.id ? produto : item
                        );
                        props.setProdutos(listaAtualizada);
                    }

                    props.exibirTabela(true);
                    window.alert('Produto salvo com sucesso!');
                } else {
                    window.alert(dados.mensagem);
                }
            } catch (erro) {
                window.alert('Erro ao executar a requisição: ' + erro.message);
            }
        }
    }

    function validarCampos() {
        const camposObrigatorios = ['nome', 'preco', 'descricao'];
        for (const campo of camposObrigatorios) {
            if (!produto[campo]) {
                window.alert(`O campo "${campo}" é obrigatório.`);
                return false;
            }
        }
        return true;
    }

    return (
        <Form onSubmit={manipulaSubmissao}>
            <Row>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label>Nome:</Form.Label>
                        <Form.Control type="text" placeholder="Informe o nome" value={produto.nome} id='nome' onChange={manipulaMudanca} required />
                        <Form.Control.Feedback type='invalid'>
                            Por favor, informe o nome.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label>Preço:</Form.Label>
                        <Form.Control type="text" placeholder="Informe o preço" value={produto.preco} id='preco' onChange={manipulaMudanca} required />
                        <Form.Control.Feedback type='invalid'>
                            Por favor, informe o preço.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label>Descrição:</Form.Label>
                        <Form.Control type="text" placeholder="Informe a descrição" value={produto.descricao} id='descricao' onChange={manipulaMudanca} required />
                        <Form.Control.Feedback type='invalid'>
                            Por favor, informe a descrição.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Button variant="primary" type="submit">
                        {props.modoEdicao ? 'Atualizar' : 'Salvar'}
                    </Button>{' '}
                    {!props.modoEdicao && (
                        <Button variant="secondary" onClick={() => props.exibirTabela(true)}>
                            Cancelar
                        </Button>
                    )}
                </Col>
            </Row>
        </Form>
    );
}