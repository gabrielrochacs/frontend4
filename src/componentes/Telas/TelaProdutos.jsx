import React, { useState, useEffect } from 'react';
import Paginas from '../../Paginas/PaginaComponente';
import FormProdutos from '../Formularios/FormProdutos.jsx';
import TabelaProdutos from '../../tabelas/TabelaProdutos';
import { Container, Alert } from 'react-bootstrap';
import { urlBase } from '../../utilitarios/definicoes';

export default function TelaProdutos(props) {

    const [produtos, setProdutos] = useState([]);
    const [exibirTabela, setExibirTabela] = useState(true);
    const [atualizando, setAtualizando] = useState(false);
    const [atualizarTabela, setAtualizarTabela] = useState(false);
    const [produtoEdicao, setProdutoEdicao] = useState({
        id: "",
        nome: "",
        preco: "",
        descricao: "",
    });

    function preparaProduto(produto) {
        setAtualizando(true);
        setProdutoEdicao(produto);
        setExibirTabela(false);
    }

    function excluirProduto(produto) {
        fetch(urlBase + '/produtos', {
            method: "DELETE",
            headers: { "Content-Type": 'application/json' },
            body: JSON.stringify(produto)
        }).then((resposta) => {
            return resposta.json()
        }).then((retorno) => {
            setAtualizarTabela(true);
            window.alert('Dados apagados com sucesso !!! ');
            window.location.reload();
            if (retorno.resultado) {
                console.log('  ');
            } else if (retorno.resultado === false) {
                window.alert('Não foi possível apagar os dados do produto !!!');
            }
        });
    }

    useEffect(() => {
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
                console.error("Erro ao buscar os dados do banco: " + erro);
            });
        setExibirTabela(true);
    }, []);

    return (
        <Paginas>
            <Container className="border m-3">
                <Alert variant={"secondary"} className='text-center'>Produtos</Alert>
                {
                    exibirTabela ?
                        <TabelaProdutos listaProdutos={produtos} exibirTabela={setExibirTabela} setProdutos={setProdutos} editarProduto={preparaProduto} atualizarTabela={atualizarTabela} setAtualizarTabela={setAtualizarTabela} excluirProduto={excluirProduto} />
                        :
                        <FormProdutos listaProdutos={produtos} exibirTabela={setExibirTabela} setProdutos={setProdutos} modoEdicao={atualizando} produto={produtoEdicao} />
                }
            </Container>
        </Paginas>
    );
}