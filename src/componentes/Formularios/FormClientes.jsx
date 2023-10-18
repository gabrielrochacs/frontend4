import React, { useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { urlBase } from '../../utilitarios/definicoes';

export default function FormClientes(props) {
    const [cliente, setCliente] = useState(props.cliente);
    const [clienteEditandoId, setClienteEditandoId] = useState(null); // Estado para rastrear o cliente em edição

    function manipulaMudanca(e) {
        const { id, value } = e.target;
        setCliente({ ...cliente, [id]: value });
    }

    function editarCliente(cpf) {
        // Quando clicar em editar, definir o id do cliente em edição
        setClienteEditandoId(cpf);
        // Encontrar o cliente pelo id
        const clienteEditando = props.listaClientes.find((c) => c.cpf === cpf);
        // Preencher o formulário com os dados do cliente a ser editado
        setCliente(clienteEditando);
    }

    async function manipulaSubmissao(e) {
        e.preventDefault();

        if (validarCampos()) {
            const metodo = props.modoEdicao ? 'PUT' : 'POST';
            const endpoint = props.modoEdicao ? `/clientes${clienteEditandoId}` : '/clientes';

            try {
                const resposta = await fetch(urlBase + endpoint, {
                    method: metodo,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(cliente),
                });
                console.log('Resposta da API:', resposta);
                const dados = await resposta.json();
                console.log('Dados da API:', dados);
                if (dados.status) {
                    if (!props.modoEdicao) {
                        const novoCliente = { ...cliente, id: dados.id };
                        props.setClientes([...props.listaClientes, novoCliente]);
                    } else {
                        const listaAtualizada = props.listaClientes.map((item) =>
                            item.id === clienteEditandoId ? cliente : item
                        );
                        props.setClientes(listaAtualizada);
                    }

                    // Limpar o estado do cliente em edição
                    setClienteEditandoId(null);
                    props.exibirTabela(true);
                    window.alert('Cliente salvo com sucesso!');
                } else {
                    window.alert(dados.mensagem);
                }
            } catch (erro) {
                console.error('Erro ao fazer a solicitação:', erro);
                window.alert('Erro ao fazer a solicitação: ' + erro.message);
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
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label>Nome:</Form.Label>
                        <Form.Control type="text" placeholder="Informe o nome" value={cliente.nome} id='nome' onChange={manipulaMudanca} required />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label>Data de Nascimento:</Form.Label>
                        <Form.Control type="date" value={cliente.dataNasc} id='dataNasc' onChange={manipulaMudanca} required />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label>Telefone:</Form.Label>
                        <Form.Control type="text" placeholder="Informe o telefone" value={cliente.telefone} id='telefone' onChange={manipulaMudanca} required />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type="email" placeholder="Informe o email" value={cliente.email} id='email' onChange={manipulaMudanca} required />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label>CEP:</Form.Label>
                        <Form.Control type="text" placeholder="Informe o CEP" value={cliente.cep} id='cep' onChange={manipulaMudanca} required />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label>Logradouro:</Form.Label>
                        <Form.Control type="text" placeholder="Informe o logradouro" value={cliente.logradouro} id='logradouro' onChange={manipulaMudanca} required />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label>Número:</Form.Label>
                        <Form.Control type="text" placeholder="Informe o número" value={cliente.numero} id='numero' onChange={manipulaMudanca} required />
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
                        <Form.Control type="text" placeholder="Informe o bairro" value={cliente.bairro} id='bairro' onChange={manipulaMudanca} />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label>Cidade:</Form.Label>
                        <Form.Control type="text" placeholder="Informe a cidade" value={cliente.cidade} id='cidade' onChange={manipulaMudanca} required />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label>UF:</Form.Label>
                        <Form.Control type="text" placeholder="Informe o UF" value={cliente.uf} id='uf' onChange={manipulaMudanca} required />
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
