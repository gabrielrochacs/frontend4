import React, { useState, useEffect } from 'react';

export default function CaixaSelecao(props) {
    const [clientes, setClientes] = useState([]);
    const [clienteSelecionado, setClienteSelecionado] = useState('');

    useEffect(() => {
        // Carregar a lista de clientes do endpoint fornecido
        fetch(props.enderecoDados, {
            method: 'GET',
        })
            .then((resposta) => resposta.json())
            .then((dados) => {
                if (Array.isArray(dados)) {
                    setClientes([...dados]);
                }
            })
            .catch((erro) => {
                console.error('Erro ao buscar os dados dos clientes: ' + erro);
            });
    }, [props.enderecoDados]);

    function selecionarCliente(e) {
        setClienteSelecionado(e.target.value);
        props.funcaoSelecao(e.target.value);
    }

    return (
        <select
            value={clienteSelecionado}
            onChange={selecionarCliente}
            className="form-control"
        >
            <option value="">Selecione um cliente</option>
            {clientes.map((cliente) => (
                <option key={cliente[props.campoChave]} value={cliente[props.campoChave]}>
                    {cliente[props.campoExibicao]}
                </option>
            ))}
        </select>
    );
}