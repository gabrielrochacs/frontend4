import React, { useState, useEffect } from 'react';
import Paginas from '../../Paginas/PaginaComponente';
import FormVendas from '../Formularios/FormVendas.jsx';
import TabelaVendas from '../../tabelas/TabelaVendas';
import { Container, Alert } from 'react-bootstrap';
import { urlBase } from '../../utilitarios/definicoes';

export default function TelaVendas(props) {
    const [vendas, setVendas] = useState([]);
    const [exibirTabela, setExibirTabela] = useState(true);
    const [atualizando, setAtualizando] = useState(false);
    const [atualizarTabela, setAtualizarTabela] = useState(false);
    const [vendaEdicao, setVendaEdicao] = useState({
        id: "",
        data: "",
        valor: "",
        cliente_id: "",
    });

    function preparaVenda(venda) {
        setAtualizando(true);
        setVendaEdicao(venda);
        setExibirTabela(false);
    }

    function excluirVenda(venda) {
        fetch(urlBase + "/vendas", {
            method: "DELETE",
            headers: { "Content-Type": 'application/json' },
            body: JSON.stringify(venda)
        })
            .then((resposta) => {
                return resposta.json();
            })
            .then((retorno) => {
                if (retorno.status === 'success') {
                    window.alert('Dados da venda apagados com sucesso!');
                    // Atualize a lista local de vendas após a exclusão
                } else {
                    window.alert('Venda excluída com sucesso!!');
                    window.location.reload();
                }
            })
            .catch((erro) => {
                console.error("Erro ao excluir a venda: " + erro);
            });
    }


    useEffect(() => {
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
                console.error("Erro ao buscar os dados do banco: " + erro);
            });
        setExibirTabela(true);
    }, []);

    return (
        <Paginas>
            <Container className="border m-3">
                <Alert variant={"secondary"} className='text-center'>Vendas</Alert>
                {
                    exibirTabela ?
                        <TabelaVendas listaVendas={vendas} exibirTabela={setExibirTabela} setVendas={setVendas} editarVenda={preparaVenda} atualizarTabela={atualizarTabela} setAtualizarTabela={setAtualizarTabela} excluirVenda={excluirVenda} />
                        :
                        <FormVendas listaVendas={vendas} exibirTabela={setExibirTabela} setVendas={setVendas} modoEdicao={atualizando} venda={vendaEdicao} />
                }
            </Container>
        </Paginas>
    );
}