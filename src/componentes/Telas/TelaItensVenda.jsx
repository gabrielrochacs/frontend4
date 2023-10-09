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
    const [itensVendaEdicao, setItensVendaEdicao] = useState({
        id: "",
        produto_id: "",
        quantidade: "",
        venda_id: "",
    });

    function preparaitensVenda(itensVenda) {
        setAtualizando(true);
        setItensVendaEdicao(itensVenda);
        setExibirTabela(false);
    }

    function excluiritensVenda(itensVenda) {
        fetch(urlBase + '/itensVendas', {
            method: "DELETE",
            headers: { "Content-Type": 'application/json' },
            body: JSON.stringify(itensVenda)
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
        fetch(urlBase + "/itensVendas", {
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
                        <TabelaItensVenda listaItensVenda={itensVenda} exibirTabela={setExibirTabela} setItensVenda={setItensVenda} editaritensVenda={preparaitensVenda} atualizarTabela={atualizarTabela} setAtualizarTabela={setAtualizarTabela} excluiritensVenda={excluiritensVenda} />
                        :
                        <FormItensVenda listaItensVenda={itensVenda} exibirTabela={setExibirTabela} setItensVenda={setItensVenda} modoEdicao={atualizando} itensVenda={itensVendaEdicao} />
                }
            </Container>
        </Paginas>
    );
}
