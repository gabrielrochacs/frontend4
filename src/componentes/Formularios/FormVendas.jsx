import React, { useState, useEffect } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { urlBase } from '../../utilitarios/definicoes';

export default function FormVendas(props) {
    const [venda, setVenda] = useState(props.venda);
    const [clientesSelecionaveis, setClientesSelecionaveis] = useState([]);

    useEffect(() => {
        // Carregar a lista de clientes selecionáveis do novo link
        fetch("http://129.146.68.51/aluno17-pfsii/clientes", {
            method: "GET"
        })
            .then((resposta) => {
                return resposta.json();
            }).then((dados) => {
                if (Array.isArray(dados)) {
                    setClientesSelecionaveis([...dados]);
                }
            })
            .catch((erro) => {
                console.error("Erro ao buscar os dados dos clientes selecionáveis: " + erro);
            });
    }, []);

    function manipulaMudanca(e) {
        const { id, value } = e.target;
        setVenda({ ...venda, [id]: value });
    }

    async function manipulaSubmissao(e) {
        e.preventDefault();

        if (validarCampos()) {
            const metodo = props.modoEdicao ? 'PUT' : 'POST';
            const endpoint = props.modoEdicao ? `/venda` : '/venda';

            try {
                // Obtenha o cliente selecionado com base no ID selecionado na caixa de seleção
                const clienteSelecionado = clientesSelecionaveis.find(cliente => cliente.id === parseInt(venda.cliente_id));
                venda.cliente_id = clienteSelecionado ? clienteSelecionado.id : null;

                const resposta = await fetch(urlBase + endpoint, {
                    method: metodo,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(venda),
                });

                const dados = await resposta.json();

                if (dados.status) {
                    if (!props.modoEdicao) {
                        const novaVenda = { ...venda, id: dados.id };
                        props.setVendas([...props.listaVendas, novaVenda]);
                    } else {
                        const listaAtualizada = props.listaVendas.map((item) =>
                            item.id === venda.id ? venda : item
                        );
                        props.setVendas(listaAtualizada);
                    }

                    props.exibirTabela(true);
                    window.alert('Venda salva com sucesso!');
                } else {
                    window.alert(dados.mensagem);
                }
            } catch (erro) {
                window.alert('Erro ao executar a requisição: ' + erro.message);
            }
        }
    }

    function validarCampos() {
        const camposObrigatorios = ['data', 'valor', 'cliente_id'];
        for (const campo of camposObrigatorios) {
            if (!venda[campo]) {
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
                        <Form.Label>Data:</Form.Label>
                        <Form.Control type="date" value={venda.data} id='data' onChange={manipulaMudanca} required />
                        <Form.Control.Feedback type='invalid'>
                            Por favor, informe a data.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label>Valor:</Form.Label>
                        <Form.Control type="text" placeholder="Informe o valor" value={venda.valor} id='valor' onChange={manipulaMudanca} required />
                        <Form.Control.Feedback type='invalid'>
                            Por favor, informe o valor.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label>Cliente:</Form.Label>
                        <Form.Control as="select" value={venda.cliente_id} id='cliente_id' onChange={manipulaMudanca} required>
                            <option value="">Selecione um cliente</option>
                            {clientesSelecionaveis.map((cliente) => (
                                <option key={cliente.id} value={cliente.id}>
                                    {cliente.nome}
                                </option>
                            ))}
                        </Form.Control>
                        <Form.Control.Feedback type='invalid'>
                            Por favor, selecione um cliente.
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