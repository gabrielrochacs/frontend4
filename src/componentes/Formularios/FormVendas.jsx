import React, { useState, useEffect } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { urlBase } from '../../utilitarios/definicoes';

export default function FormVendas(props) {
    const [venda, setVenda] = useState(props.venda);
    const [clientes, setClientes] = useState([]);
    const [clienteSelecionado, setClienteSelecionado] = useState("");

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

            // Defina cliente_id como o cpf do cliente selecionado
            const cliente = clientes.find((c) => c.cpf === clienteSelecionado);
            if (cliente) {
                setVenda({ ...venda, cliente_id: cliente.cpf });
            }

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
                    <Form.Group className="mb-3 border">
                        <Form.Label>Selecione o Cliente:</Form.Label>
                        <Col md={10}>
                            <Form.Control as="select" value={clienteSelecionado} onChange={(e) => setClienteSelecionado(e.target.value)} required>
                                <option value="">Selecione um cliente</option>
                                {clientes.map((cliente) => (
                                    <option key={cliente.cpf} value={cliente.cpf}>
                                        {cliente.nome}
                                    </option>
                                ))}
                            </Form.Control>
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
