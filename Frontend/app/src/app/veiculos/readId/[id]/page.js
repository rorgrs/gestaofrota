'use client';

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Vehicle() {
    const { id } = useParams();
    const [placa, setPlaca] = useState("");
    const [marca, setMarca] = useState("");
    const [modelo, setModelo] = useState("");
    const [cor, setCor] = useState("");
    const [kmLitro, setKmLitro] = useState(0);
    const [ano, setAno] = useState(0);
    const [loading, setLoading] = useState(true);
    const [manutencoes, setManutencoes] = useState([]);
    const [licenciamentos, setLicenciamentos] = useState([]);

    const fetchData = async () => {
        setLoading(true);

        try {
            const response = await fetch(`https://localhost:5001/veiculo/${id}`, { // Atualize a URL para o endpoint correto
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });
            const data = await response.json();

            console.log(data)
            setPlaca(data.placa);
            setMarca(data.marca);
            setModelo(data.modelo);
            setCor(data.cor);
            setKmLitro(data.kmLitro);
            setAno(data.ano);
            setManutencoes(data.manutencoes);
            setLicenciamentos(data.licenciamentos);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const putData = async () => {
        const dataPut = {
            id, // Incluindo o ID no objeto de atualização
            placa,
            marca,
            modelo,
            cor,
            kmLitro,
            ano
        };

        try {
            const response = await fetch(`https://localhost:5001/veiculo/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataPut),
                credentials: 'include'
            });
            console.log(response);
        } catch (error) {
            console.log(error);
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
                    <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Atualização Veículo</h1>
                    <div className="flex justify-end mb-6">
                        <Link href={'/veiculos/licenciamento/create/' + id} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mr-8 rounded-lg transition-all duration-300">
                            Novo Licenciamento
                        </Link>

                        <Link href={'/veiculos/manutencao/create/' + id} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300">
                            Nova Manutenção
                        </Link>
                    </div>
                    <form className="space-y-6">
                        <input
                            type="text"
                            className="border border-gray-300 rounded-lg p-3 w-full"
                            placeholder="Placa"
                            value={placa}
                            onChange={(e) => setPlaca(e.target.value)}
                        />
                        <input
                            type="text"
                            className="border border-gray-300 rounded-lg p-3 w-full"
                            placeholder="Marca"
                            value={marca}
                            onChange={(e) => setMarca(e.target.value)}
                        />
                        <input
                            type="text"
                            className="border border-gray-300 rounded-lg p-3 w-full"
                            placeholder="Modelo"
                            value={modelo}
                            onChange={(e) => setModelo(e.target.value)}
                        />
                        <input
                            type="text"
                            className="border border-gray-300 rounded-lg p-3 w-full"
                            placeholder="Cor"
                            value={cor}
                            onChange={(e) => setCor(e.target.value)}
                        />
                        <input
                            type="number"
                            className="border border-gray-300 rounded-lg p-3 w-full"
                            placeholder="KM/L"
                            value={kmLitro}
                            onChange={(e) => setKmLitro(Number(e.target.value))}
                        />
                        <input
                            type="number"
                            className="border border-gray-300 rounded-lg p-3 w-full"
                            placeholder="Ano"
                            value={ano}
                            onChange={(e) => setAno(Number(e.target.value))}
                        />
                        <button
                            type="button"
                            onClick={putData}
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300"
                        >
                            Atualizar
                        </button>
                    </form>

                    <h2 className="text-2xl font-semibold mt-8 mb-4">Manutenções</h2>
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
