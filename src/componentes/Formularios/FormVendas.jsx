import React, { useState, useEffect } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { urlBase } from '../../utilitarios/definicoes';
import CaixaSelecao from '../../utilitarios/caixaSelecao';

export default function FormVendas(props) {
    const [venda, setVenda] = useState(props.venda);
    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        // Carregar a lista de clientes do banco de dados ou de onde quer que você obtenha os dados
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
                console.error("Erro ao buscar os dados dos clientes: " + erro);
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
        const camposObrigatorios = ['data', 'valor', 'cpf'];
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
                    <Form.Group className="mb-3 border">
                        <Form.Label>Selecione o Cliente:</Form.Label>
                        <Col md={10}>
                            <CaixaSelecao
                                enderecoDados="http://129.146.68.51/aluno17-pfsii/clientes"
                                campoChave="cpf"
                                campoExibicao="nome"
                                funcaoSelecao={(clienteSelecionado) => setVenda({ ...venda, cpf: clienteSelecionado })}
                            />
                            <Form.Control.Feedback type='invalid'>
                                Por favor, selecione um cliente.
                            </Form.Control.Feedback>
                        </Col>
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