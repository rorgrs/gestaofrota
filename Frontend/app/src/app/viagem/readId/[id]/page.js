'use client';

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import AlertSucess from "@/app/components/sucess";
import AlertError from "@/app/components/error";

export default function Viagem() {
    const { id } = useParams();
    const [viagemData, setViagemData] = useState({
        idVeiculo: 0,
        veiculo: null,
        latOrigem: 0,
        lngOrigem: 0,
        ibgeCidadeOrigem: 0,
        logradouroOrigem: "",
        latDestino: 0,
        lngDestino: 0,
        ibgeCidadeDestino: 0,
        logradouroDestino: ""
    });
    const [error, setError] = useState(0);
    const [sucess, setSucess] = useState(0);
    // const [viagemPut, setViagemPut] = useState({
    //     id: 0,
    //     latOrigem: 0,
    //     lngOrigem: 0,
    //     ibgeCidadeOrigem: 0,
    //     logradouroOrigem: "",
    //     latDestino: 0,
    //     lngDestino: 0,
    //     ibgeCidadeDestino: 0,
    //     logradouroDestino: ""
    // });

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
                idVeiculo: data.veiculo.id,
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

            console.log(data)
        } catch (error) {
            console.error(error);
        }
    };

    
    const handleClose = () => {
        setError(0);
        setSucess(0);
    };

    const putData = async () => {
        console.log(viagemData)
        const viagemPut = {
            idVeiculo: viagemData.idVeiculo,
            latOrigem: viagemData.latOrigem,
            lngOrigem: viagemData.lngOrigem,
            ibgeCidadeOrigem: viagemData.ibgeCidadeOrigem,
            logradouroOrigem: viagemData.logradouroOrigem,
            latDestino: viagemData.latDestino,
            lngDestino: viagemData.lngDestino,
            ibgeCidadeDestino: viagemData.ibgeCidadeDestino,
            logradouroDestino: viagemData.logradouroDestino
        }
        console.log(viagemPut)
        try {
            const response = await fetch(`https://localhost:5001/viagem/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(viagemPut)
            });
            const jsonResponse = await response.status;

            if (jsonResponse === 200) {
                setSucess(1);
            }
            else {
                setError(1);
            }
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
            {error === 1 && <AlertError message={"Ocorreu um erro"} onClose={handleClose} />}
            {sucess === 1 && <AlertSucess message={"Operação Concluída com sucesso"} onClose={handleClose}  />}

            {loading ? (
                <p>Carregando...</p>
            ) : (
                <div className="container max-w-lg mx-auto p-8 bg-white rounded-lg shadow-lg text-black">
                    <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Atualização de Viagem</h1>
                    
                    <form className="space-y-6">

                        <div>
                        <label className="block mb-2 font-medium text-gray-700">Veiculo</label>
                        <input
                            type="number"
                            placeholder="ID do Veículo"
                            disabled={false}
                            value={viagemData.idVeiculo}
                            onChange={(e) => setViagemData({ ...viagemData, idVeiculo: Number(e.target.value) })}
                            className="border border-gray-300 rounded-lg p-3 w-full focus:ring focus:ring-blue-200 transition-all duration-300"
                        />
                        </div>
                        <div>
                            <label className="block mb-2 font-medium text-gray-700">Latitude de Origem</label>
                            <input
                                type="number"
                                className="border border-gray-300 rounded-lg p-3 w-full"
                                value={viagemData.latOrigem}
                                onChange={(e) => setViagemData({ ...viagemData, latOrigem: Number(e.target.value) })}
                            />
                        </div>

                        <div>
                            <label className="block mb-2 font-medium text-gray-700">Longitude de Origem</label>
                            <input
                                type="number"
                                className="border border-gray-300 rounded-lg p-3 w-full"
                                value={viagemData.lngOrigem}
                                onChange={(e) => setViagemData({ ...viagemData, lngOrigem: Number(e.target.value) })}
                            />
                        </div>

                        <div>
                            <label className="block mb-2 font-medium text-gray-700">IBGE Cidade Origem</label>
                            <input
                                type="number"
                                className="border border-gray-300 rounded-lg p-3 w-full"
                                value={viagemData.ibgeCidadeOrigem}
                                onChange={(e) => setViagemData({ ...viagemData, ibgeCidadeOrigem: Number(e.target.value) })}
                            />
                        </div>

                        <div>
                            <label className="block mb-2 font-medium text-gray-700">Logradouro de Origem</label>
                            <input
                                type="text"
                                className="border border-gray-300 rounded-lg p-3 w-full"
                                value={viagemData.logradouroOrigem}
                                onChange={(e) => setViagemData({ ...viagemData, logradouroOrigem: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block mb-2 font-medium text-gray-700">Latitude de Destino</label>
                            <input
                                type="number"
                                className="border border-gray-300 rounded-lg p-3 w-full"
                                value={viagemData.latDestino}
                                onChange={(e) => setViagemData({ ...viagemData, latDestino: Number(e.target.value) })}
                            />
                        </div>

                        <div>
                            <label className="block mb-2 font-medium text-gray-700">Longitude de Destino</label>
                            <input
                                type="number"
                                className="border border-gray-300 rounded-lg p-3 w-full"
                                value={viagemData.lngDestino}
                                onChange={(e) => setViagemData({ ...viagemData, lngDestino: Number(e.target.value) })}
                            />
                        </div>

                        <div>
                            <label className="block mb-2 font-medium text-gray-700">IBGE Cidade Destino</label>
                            <input
                                type="number"
                                className="border border-gray-300 rounded-lg p-3 w-full"
                                value={viagemData.ibgeCidadeDestino}
                                onChange={(e) => setViagemData({ ...viagemData, ibgeCidadeDestino: Number(e.target.value) })}
                            />
                        </div>

                        <div>
                            <label className="block mb-2 font-medium text-gray-700">Logradouro de Destino</label>
                            <input
                                type="text"
                                className="border border-gray-300 rounded-lg p-3 w-full"
                                value={viagemData.logradouroDestino}
                                onChange={(e) => setViagemData({ ...viagemData, logradouroDestino: e.target.value })}
                            />
                        </div>

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
