'use client';

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import AlertSucess from "@/app/components/sucess";
import AlertError from "@/app/components/error";

export default function Users() {
    const { id } = useParams();
    const [nome, setNome] = useState("");
    const [documento, setDocumento] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
    const [celular, setCelular] = useState("");
    const [email, setEmail] = useState("");
    // const [statusTreinamento, setStatusTreinamento] = useState(1);
    // const [carteiras, setCarteiras] = useState([]);
    // const [escalaTrabalho, setEscalaTrabalho] = useState({ dataInicio: "", dataFim: "" });
    const [folgas, setFolgas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cnh, setCnh] = useState("");
    const [cnhDataVencimento, setCnhDataVencimento] = useState("");
    const [error, setError] = useState(0);
    const [sucess, setSucess] = useState(0);

    
    const handleClose = () => {
        setError(0);
        setSucess(0);
    };

    const fetchData = async () => {
        setLoading(true);

        try {
            const response = await fetch(`https://localhost:5001/motorista/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });
            const data = await response.json();

            console.log(data)
            setNome(data.nome);
            setDocumento(data.documento);
            setDataNascimento(new Date(data.dataNascimento).toISOString().split('T')[0]);
            setCelular(data.celular);
            setEmail(data.email);
            // setStatusTreinamento(data.statusTreinamento);
            // setEscalaTrabalho(data.escalaTrabalho);
            setFolgas(data.folgas);
            console.log(data.folgas)
            setCnh(data.carteiras[0].cnh);
            setCnhDataVencimento(new Date(data.carteiras[0].dataVencimento).toISOString().split('T')[0])
            setFolgas(data.folgas)
            setLoading(false);

        } catch (error) {
            console.log(error);
        }
    };

    const PutData = async () => {
        const dataPut = {
            nome,
            documento,
            dataNascimento,
            celular,
            email
        };

        try {
            const response = await fetch(`https://localhost:5001/motorista/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataPut),
                credentials: 'include'
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
            {error === 1 && <AlertError message={"Ocorreu um erro"} onClose={handleClose} />}
            {sucess === 1 && <AlertSucess message={"Operação Concluída com sucesso"} onClose={handleClose}  />}
            {loading ? (
                <p>Carregando...</p>
            ) : (
                <div className="container max-w-lg mx-auto p-8 bg-white rounded-lg shadow-lg text-black">
                    <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Atualização Motorista</h1>
                    <div className="flex justify-end mb-6 gap-4">
                        <Link href="/motorista/create" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300">
                            Novo Motorista
                        </Link>

                        <Link href={'/motorista/folga/create/' + id} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300">
                            Nova Folga
                        </Link>
                    </div>
                    <form className="space-y-6">
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Nome</label>
                            <input
                            type="text"
                            className="border border-gray-300 rounded-lg p-3 w-full focus:ring focus:ring-blue-200 transition-all duration-300"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            />
                        </div>

                        {/* Campo Documento */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Documento</label>
                            <input
                            type="text"
                            className="border border-gray-300 rounded-lg p-3 w-full focus:ring focus:ring-blue-200 transition-all duration-300"
                            value={documento}
                            onChange={(e) => setDocumento(e.target.value)}
                            />
                        </div>

                        {/* Campo Data de Nascimento */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Data de Nascimento</label>
                            <input
                            type="date"
                            className="border border-gray-300 rounded-lg p-3 w-full focus:ring focus:ring-blue-200 transition-all duration-300"
                            value={dataNascimento}
                            onChange={(e) => setDataNascimento(e.target.value)}
                            />
                        </div>

                        {/* Campo Celular */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Celular</label>
                            <input
                            type="text"
                            className="border border-gray-300 rounded-lg p-3 w-full focus:ring focus:ring-blue-200 transition-all duration-300"
                            value={celular}
                            onChange={(e) => setCelular(e.target.value)}
                            />
                        </div>

                        {/* Campo Email */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Email</label>
                            <input
                            type="email"
                            className="border border-gray-300 rounded-lg p-3 w-full focus:ring focus:ring-blue-200 transition-all duration-300"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {/* Select Status Treinamento
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Status de Treinamento</label>
                            <select
                            className="border border-gray-300 rounded-lg p-3 w-full focus:ring focus:ring-blue-200 transition-all duration-300"
                            value={statusTreinamento}
                            onChange={(e) => setStatusTreinamento(Number(e.target.value))}
                            >  
                            <option value={0}>Cancelado</option>
                            <option value={1}>Finalizado</option>
                            <option value={2}>Em andamento</option>
                            </select>
                        </div>

                        {/* Campo ID Escala Trabalho */}
                        {/* <div>
                            <label className="block text-gray-700 font-medium mb-2">ID Escala de Trabalho</label>
                            <select className="border border-gray-300 rounded-lg p-3 w-full focus:ring focus:ring-blue-200 transition-all duration-300"
                            value={escalaTrabalho}
                            onChange={(e) => setEscalaTrabalho(Number(e.target.value))}>
                                <option value={1}>12x36</option>
                                <option value={2}>12x40</option>
                            </select>
                        </div> } */}

                        {/* Campo CNH */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Habilitação</label>
                            <input
                            type="text"
                            className="border border-gray-300 rounded-lg p-3 w-full focus:ring focus:ring-blue-200 transition-all duration-300"
                            value={cnh}
                            onChange={(e) => setCnh(e.target.value)}
                            />
                        </div>

                        {/* Campo CNH Data de Vencimento */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Data de Vencimento da CNH</label>
                            <input
                            type="date"
                            className="border border-gray-300 rounded-lg p-3 w-full focus:ring focus:ring-blue-200 transition-all duration-300"
                            value={cnhDataVencimento}
                            onChange={(e) => setCnhDataVencimento(e.target.value)}
                            />
                        </div>

                        <button
                            type="button"
                            onClick={PutData}
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300"
                        >
                            Atualizar
                        </button>
                    </form>
                    
                    <h2 className="text-2xl font-semibold mt-8 mb-4">Folgas</h2>
                    <div className="w-full">
                        <table className="w-full text-left border-collapse text-black">
                            <thead>
                                <tr>
                                <th className="border-b-2 p-4 text-center font-semibold text-gray-600">Data Inicio</th>
                                <th className="border-b-2 p-4 text-center font-semibold text-gray-600">Hora Inicio</th>
                                <th className="border-b-2 p-4 text-center font-semibold text-gray-600">Data Fim</th>
                                <th className="border-b-2 p-4 text-center font-semibold text-gray-600">Hora Fim</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* {console.log(resaco, "test")} */}
                                {folgas.map((item, index) => (
                                <tr key={index} className="hover:bg-blue-50 transition-all duration-300 font:black">
                                    <td className="border-b p-4 text-center">{new Date(item.dataInicio).toLocaleDateString('pt-BR')}</td>
                                    <td className="border-b p-4 text-center">{new Date(item.dataInicio).toLocaleTimeString('pt-br')}</td>
                                    <td className="border-b p-4 text-center">{new Date(item.dataFim).toLocaleDateString('pt-br')}</td>
                                    <td className="border-b p-4 text-center">{new Date(item.dataFim).toLocaleTimeString('pt-br')}</td>
                                </tr>
                                ))}
                            </tbody>
                            </table>
                            </div>
                </div>
            )}
        </main>
    );
}
