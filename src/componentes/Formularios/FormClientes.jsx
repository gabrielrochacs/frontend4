import React, { useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { urlBase } from '../../utilitarios/definicoes';

export default function FormClientes(props) {
    const [cliente, setCliente] = useState(props.cliente);

    function manipulaMudanca(e) {
        const { id, value } = e.target;
        setCliente({ ...cliente, [id]: value });
    }

    async function manipulaSubmissao(e) {
        e.preventDefault();

        if (validarCampos()) {
            const metodo = props.modoEdicao ? 'PUT' : 'POST';
            const endpoint = props.modoEdicao ? `/cliente` : '/cliente';

            try {
                const resposta = await fetch(urlBase + endpoint, {
                    method: metodo,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(cliente),
                });

                const dados = await resposta.json();

                if (dados.status) {
                    if (!props.modoEdicao) {
                        const novoCliente = { ...cliente, codigo: dados.codigo };
                        props.setClientes([...props.listaClientes, novoCliente]);
                    } else {
                        const listaAtualizada = props.listaClientes.map((item) =>
                            item.codigo === cliente.codigo ? cliente : item
                        );
                        props.setClientes(listaAtualizada);
                    }

                    props.exibirTabela(true);
                    window.alert('Cliente salvo com sucesso!');
                } else {
                    window.alert(dados.mensagem);
                }
            } catch (erro) {
                window.alert('Erro ao executar a requisição: ' + erro.message);
            }
        }
    }

    function validarCampos() {
        const camposObrigatorios = ['cpf', 'nome', 'dataNasc', 'telefone', 'email', 'cep', 'logradouro', 'numero', 'bairro', 'cidade', 'uf'];
        for (const campo of camposObrigatorios) {
            if (!cliente[campo]) {
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
                        <Form.Label>CPF:</Form.Label>
                        <Form.Control type="text" placeholder="Informe o CPF" value={cliente.cpf} id='cpf' onChange={manipulaMudanca} required />
                        <Form.Control.Feedback type='invalid'>
                            Por favor, informe o CPF.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label>Nome:</Form.Label>
                        <Form.Control type="text" placeholder="Informe o nome" value={cliente.nome} id='nome' onChange={manipulaMudanca} required />
                        <Form.Control.Feedback type='invalid'>
                            Por favor, informe o nome.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label>Data de Nascimento:</Form.Label>
                        <Form.Control type="date" value={cliente.dataNasc} id='dataNasc' onChange={manipulaMudanca} required />
                        <Form.Control.Feedback type='invalid'>
                            Por favor, informe a data de nascimento.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label>Telefone:</Form.Label>
                        <Form.Control type="text" placeholder="Informe o telefone" value={cliente.telefone} id='telefone' onChange={manipulaMudanca} required />
                        <Form.Control.Feedback type='invalid'>
                            Por favor, informe o telefone.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type="email" placeholder="Informe o email" value={cliente.email} id='email' onChange={manipulaMudanca} required />
                        <Form.Control.Feedback type='invalid'>
                            Por favor, informe o email.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label>CEP:</Form.Label>
                        <Form.Control type="text" placeholder="Informe o CEP" value={cliente.cep} id='cep' onChange={manipulaMudanca} required />
                        <Form.Control.Feedback type='invalid'>
                            Por favor, informe o CEP.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label>Logradouro:</Form.Label>
                        <Form.Control type="text" placeholder="Informe o logradouro" value={cliente.logradouro} id='logradouro' onChange={manipulaMudanca} required />
                        <Form.Control.Feedback type='invalid'>
                            Por favor, informe o logradouro.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label>Número:</Form.Label>
                        <Form.Control type="text" placeholder="Informe o número" value={cliente.numero} id='numero' onChange={manipulaMudanca} required />
                        <Form.Control.Feedback type='invalid'>
                            Por favor, informe o número.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label>Complemento:</Form.Label>
                        <Form.Control type="text" placeholder="Informe o complemento" value={cliente.complemento} id='complemento' onChange={manipulaMudanca} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label>Bairro:</Form.Label>
                        <Form.Control type="text" placeholder="Informe o bairro" value={cliente.bairro} id='bairro' onChange={manipulaMudanca} required />
                        <Form.Control.Feedback type='invalid'>
                            Por favor, informe o bairro.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label>Cidade:</Form.Label>
                        <Form.Control type="text" placeholder="Informe a cidade" value={cliente.cidade} id='cidade' onChange={manipulaMudanca} required />
                        <Form.Control.Feedback type='invalid'>
                            Por favor, informe a cidade.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label>UF:</Form.Label>
                        <Form.Control type="text" placeholder="Informe o UF" value={cliente.uf} id='uf' onChange={manipulaMudanca} required />
                        <Form.Control.Feedback type='invalid'>
                            Por favor, informe o UF.
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