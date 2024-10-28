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

            setPlaca(data.placa);
            setMarca(data.marca);
            setModelo(data.modelo);
            setCor(data.cor);
            setKmLitro(data.kmLitro);
            setAno(data.ano);
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
                        <Link href="/create/newForm" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300">
                            Novo Formulário
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
                </div>
            )}
        </main>
    );
}
