import React, { useState, useEffect } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { urlBase } from '../../utilitarios/definicoes';

export default function FormItensVenda(props) {
    const [itensVenda, setitensVenda] = useState(props.itensVenda);
    const [produtos, setProdutos] = useState([]);
    const [vendas, setVendas] = useState([]);

    useEffect(() => {
        // Carregar a lista de produtos do banco de dados ou de onde quer que você obtenha os dados
        fetch(urlBase + "/produtos", {
            method: "GET"
        })
            .then((resposta) => {
                return resposta.json();
            }).then((dados) => {
                if (Array.isArray(dados)) {
                    setProdutos([...dados]);
                }
            })
            .catch((erro) => {
                console.error("Erro ao buscar os dados dos produtos: " + erro);
            });

        // Carregar a lista de vendas do banco de dados ou de onde quer que você obtenha os dados
        fetch(urlBase + "/vendas", {
            method: "GET"
        })
            .then((resposta) => {
                return resposta.json();
            }).then((dados) => {
                if (Array.isArray(dados)) {
                    setVendas([...dados]);
                }
            })
            .catch((erro) => {
                console.error("Erro ao buscar os dados das vendas: " + erro);
            });
    }, []);

    function manipulaMudanca(e) {
        const { id, value } = e.target;
        setitensVenda({ ...itensVenda, [id]: value });
    }

    async function manipulaSubmissao(e) {
        e.preventDefault();

        if (validarCampos()) {
            const metodo = props.modoEdicao ? 'PUT' : 'POST';
            // No método manipulaSubmissao, altere o endpoint para '/itensVenda' (com a primeira letra em maiúscula) ao criar um novo item de venda
            const endpoint = props.modoEdicao ? '/itensVendas' : '/itensVendas';


            try {
                const resposta = await fetch(urlBase + endpoint, {
                    method: metodo,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(itensVenda),
                });

                const dados = await resposta.json();

                if (dados.status) {
                    if (!props.modoEdicao) {
                        const novoitensVenda = { ...itensVenda, id: dados.id };
                        props.setItensVenda([...props.listaItensVenda, novoitensVenda]);
                    } else {
                        const listaAtualizada = props.listaItensVenda.map((item) =>
                            item.id === itensVenda.id ? itensVenda : item
                        );
                        props.setItensVenda(listaAtualizada);
                    }

                    props.exibirTabela(true);
                    window.alert('Item de Venda salvo com sucesso!');
                } else {
                    window.alert(dados.mensagem);
                }
            } catch (erro) {
                window.alert('Erro ao executar a requisição: ' + erro.message);
            }
        }
    }

    function validarCampos() {
        const camposObrigatorios = ['produto_id', 'quantidade', 'venda_id'];
        for (const campo of camposObrigatorios) {
            if (!itensVenda[campo]) {
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
                        <Form.Label>Produto:</Form.Label>
                        <Form.Control as="select" value={itensVenda.produto_id} id='produto_id' onChange={manipulaMudanca} required>
                            <option value="">Selecione um produto</option>
                            {produtos.map((produto) => (
                                <option key={produto.id} value={produto.id}>
                                    {produto.nome}
                                </option>
                            ))}
                        </Form.Control>
                        <Form.Control.Feedback type='invalid'>
                            Por favor, selecione um produto.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label>Quantidade:</Form.Label>
                        <Form.Control type="text" placeholder="Informe a quantidade" value={itensVenda.quantidade} id='quantidade' onChange={manipulaMudanca} required />
                        <Form.Control.Feedback type='invalid'>
                            Por favor, informe a quantidade.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label>Venda:</Form.Label>
                        <Form.Control as="select" value={itensVenda.venda_id} id='venda_id' onChange={manipulaMudanca} required>
                            <option value="">Selecione uma venda</option>
                            {vendas.map((venda) => (
                                <option key={venda.id} value={venda.id}>
                                    {venda.id}
                                </option>
                            ))}
                        </Form.Control>
                        <Form.Control.Feedback type='invalid'>
                            Por favor, selecione uma venda.
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