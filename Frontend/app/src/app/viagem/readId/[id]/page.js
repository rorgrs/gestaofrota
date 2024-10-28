'use client';

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Viagem() {
    const { id } = useParams();
    const [viagemData, setViagemData] = useState({
        id: 0,
        veiculo: null,
        paradas: [],
        latOrigem: 0,
        lngOrigem: 0,
        ibgeCidadeOrigem: 0,
        logradouroOrigem: "",
        latDestino: 0,
        lngDestino: 0,
        ibgeCidadeDestino: 0,
        logradouroDestino: ""
    });
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch(`https://localhost:5001/viagem/${id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            });
            const data = await response.json();

            setViagemData({
                id: data.id,
                veiculo: data.veiculo,
                paradas: data.paradas,
                latOrigem: data.latOrigem,
                lngOrigem: data.lngOrigem,
                ibgeCidadeOrigem: data.ibgeCidadeOrigem,
                logradouroOrigem: data.logradouroOrigem,
                latDestino: data.latDestino,
                lngDestino: data.lngDestino,
                ibgeCidadeDestino: data.ibgeCidadeDestino,
                logradouroDestino: data.logradouroDestino
            });
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    const putData = async () => {
        try {
            const response = await fetch(`https://localhost:5001/viagem/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(viagemData),
                credentials: 'include'
            });
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (id) {
            fetchData();
        }
    }, [id]);

    return (
        <main className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 p-8 flex items-center justify-center">
            {loading ? (
                <p>Carregando...</p>
            ) : (
                <div className="container max-w-lg mx-auto p-8 bg-white rounded-lg shadow-lg text-black">
                    <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Atualização de Viagem</h1>
                    
                    <form className="space-y-6">
                        <input
                            type="number"
                            className="border border-gray-300 rounded-lg p-3 w-full"
                            placeholder="Latitude de Origem"
                            value={viagemData.latOrigem}
                            onChange={(e) => setViagemData({ ...viagemData, latOrigem: Number(e.target.value) })}
                        />
                        <input
                            type="number"
                            className="border border-gray-300 rounded-lg p-3 w-full"
                            placeholder="Longitude de Origem"
                            value={viagemData.lngOrigem}
                            onChange={(e) => setViagemData({ ...viagemData, lngOrigem: Number(e.target.value) })}
                        />
                        <input
                            type="number"
                            className="border border-gray-300 rounded-lg p-3 w-full"
                            placeholder="IBGE Cidade Origem"
                            value={viagemData.ibgeCidadeOrigem}
                            onChange={(e) => setViagemData({ ...viagemData, ibgeCidadeOrigem: Number(e.target.value) })}
                        />
                        <input
                            type="text"
                            className="border border-gray-300 rounded-lg p-3 w-full"
                            placeholder="Logradouro de Origem"
                            value={viagemData.logradouroOrigem}
                            onChange={(e) => setViagemData({ ...viagemData, logradouroOrigem: e.target.value })}
                        />
                        <input
                            type="number"
                            className="border border-gray-300 rounded-lg p-3 w-full"
                            placeholder="Latitude de Destino"
                            value={viagemData.latDestino}
                            onChange={(e) => setViagemData({ ...viagemData, latDestino: Number(e.target.value) })}
                        />
                        <input
                            type="number"
                            className="border border-gray-300 rounded-lg p-3 w-full"
                            placeholder="Longitude de Destino"
                            value={viagemData.lngDestino}
                            onChange={(e) => setViagemData({ ...viagemData, lngDestino: Number(e.target.value) })}
                        />
                        <input
                            type="number"
                            className="border border-gray-300 rounded-lg p-3 w-full"
                            placeholder="IBGE Cidade Destino"
                            value={viagemData.ibgeCidadeDestino}
                            onChange={(e) => setViagemData({ ...viagemData, ibgeCidadeDestino: Number(e.target.value) })}
                        />
                        <input
                            type="text"
                            className="border border-gray-300 rounded-lg p-3 w-full"
                            placeholder="Logradouro de Destino"
                            value={viagemData.logradouroDestino}
                            onChange={(e) => setViagemData({ ...viagemData, logradouroDestino: e.target.value })}
                        />

                        <h2 className="text-2xl font-semibold">Veículo</h2>
                        <input
                            type="text"
                            className="border border-gray-300 rounded-lg p-3 w-full"
                            placeholder="Placa"
                            value={viagemData.veiculo.placa}
                            // onChange={(e) => setViagemData({ ...viagemData, veiculo: { ...viagemData.veiculo, placa: e.target.value } })}
                        />
                        <input
                            type="text"
                            className="border border-gray-300 rounded-lg p-3 w-full"
                            placeholder="Marca"
                            value={viagemData.veiculo.marca}
                            // onChange={(e) => setViagemData({ ...viagemData, veiculo: { ...viagemData.veiculo, marca: e.target.value } })}
                        />
                        <input
                            type="text"
                            className="border border-gray-300 rounded-lg p-3 w-full"
                            placeholder="Modelo"
                            value={viagemData.veiculo.modelo}
                            // onChange={(e) => setViagemData({ ...viagemData, veiculo: { ...viagemData.veiculo, modelo: e.target.value } })}
                        />
                    
                        <button
                            type="button"
                            onClick={putData}
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300"
                        >
                            Atualizar
                        </button>
                    </form>
                    
                    {/*Listas*/ }
                    <h2 className="text-2xl font-semibold mt-8 mb-4">Paradas</h2>
                    {manutencoes.length > 0 ? (
                        <ul className="list-disc pl-5">
                            {manutencoes.map((manutencao, index) => (
                                <li key={index} className="mb-2">
                                    Tipo: {manutencao.tipo} <br />
                                    Data Início: {new Date(manutencao.dataInicio).toLocaleDateString()} <br />
                                    Data Fim: {manutencao.dataFim ? new Date(manutencao.dataFim).toLocaleDateString() : 'N/A'} <br />
                                    Observação: {manutencao.observacao || 'N/A'} <br />
                                    Diagnóstico: {manutencao.diagnostico || 'N/A'} <br />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">Nenhuma manutenção encontrada.</p>
                    )}


                    <h2 className="text-2xl font-semibold mt-8 mb-4">Licenciamentos</h2>
                    {licenciamentos.length > 0 ? (
                        <ul className="list-disc pl-5">
                            {licenciamentos.map((licenciamento, index) => (
                                <li key={index} className="mb-2">
                                    Tipo: {licenciamento.tipo} <br />
                                    Data Emissão: {licenciamento.dataEmissao ? new Date(licenciamento.dataEmissao).toLocaleDateString() : 'N/A'} <br />
                                    Data Validade: {licenciamento.dataValidade ? new Date(licenciamento.dataValidade).toLocaleDateString() : 'N/A'} <br />
                                    Data Vencimento: {licenciamento.dataVencimento ? new Date(licenciamento.dataVencimento).toLocaleDateString() : 'N/A'} <br />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">Nenhum licenciamento encontrado.</p>
                    )}


                </div>
            )}
        </main>
    );
}
