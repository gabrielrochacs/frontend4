import React, { useState, useEffect } from 'react';
import Paginas from '../../Paginas/PaginaComponente';
import FormItensVenda from '../Formularios/FormItensVenda.jsx';
import TabelaItensVenda from '../../tabelas/TabelaItensVenda';
import { Container, Alert } from 'react-bootstrap';
import { urlBase } from '../../utilitarios/definicoes';

export default function TelaItensVenda(props) {
    const [itensVenda, setItensVenda] = useState([]);
    const [exibirTabela, setExibirTabela] = useState(true);
    const [atualizando, setAtualizando] = useState(false);
    const [atualizarTabela, setAtualizarTabela] = useState(false);
    const [itemVendaEdicao, setItemVendaEdicao] = useState({
        id: "",
        produto_id: "",
        quantidade: "",
        venda_id: "",
    });

    function preparaItemVenda(itemVenda) {
        setAtualizando(true);
        setItemVendaEdicao(itemVenda);
        setExibirTabela(false);
    }

    function excluirItemVenda(itemVenda) {
        fetch(urlBase + '/itemvenda', {
            method: "DELETE",
            headers: { "Content-Type": 'application/json' },
            body: JSON.stringify(itemVenda)
        }).then((resposta) => {
            return resposta.json();
        }).then((retorno) => {
            setAtualizarTabela(true);
            window.alert('Dados do item de venda apagados com sucesso!');
            window.location.reload();
            if (retorno.resultado) {
                console.log('  ');
            } else if (retorno.resultado === false) {
                window.alert('Não foi possível apagar os dados do item de venda!');
            }
        });
    }

    useEffect(() => {
        fetch(urlBase + "/itemvenda", {
            method: "GET"
        })
            .then((resposta) => {
                return resposta.json();
            }).then((dados) => {
                if (Array.isArray(dados)) {
                    setItensVenda([...dados]);
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
                <Alert variant={"secondary"} className='text-center'>Itens de Venda</Alert>
                {
                    exibirTabela ?
                        <TabelaItensVenda listaItensVenda={itensVenda} exibirTabela={setExibirTabela} setItensVenda={setItensVenda} editarItemVenda={preparaItemVenda} atualizarTabela={atualizarTabela} setAtualizarTabela={setAtualizarTabela} excluirItemVenda={excluirItemVenda} />
                        :
                        <FormItensVenda listaItensVenda={itensVenda} exibirTabela={setExibirTabela} setItensVenda={setItensVenda} modoEdicao={atualizando} itemVenda={itemVendaEdicao} />
                }
            </Container>
        </Paginas>
    );
}
