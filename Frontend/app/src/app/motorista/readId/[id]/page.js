'use client';

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Users() {
    const { id } = useParams();
    const [nome, setNome] = useState("");
    const [documento, setDocumento] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
    const [celular, setCelular] = useState("");
    const [email, setEmail] = useState("");
    const [statusTreinamento, setStatusTreinamento] = useState(1);
    const [carteiras, setCarteiras] = useState([]);
    const [escalaTrabalho, setEscalaTrabalho] = useState({ dataInicio: "", dataFim: "" });
    const [folgas, setFolgas] = useState([]);
    const [loading, setLoading] = useState(true);

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

            setNome(data.nome);
            setDocumento(data.documento);
            const dataNascimento = new Date(data.dataNascimento).toISOString().split('T')[0];
            setDataNascimento(dataNascimento);
            setCelular(data.celular);
            setEmail(data.email);
            setStatusTreinamento(data.statusTreinamento);
            setCarteiras(data.carteiras);
            setEscalaTrabalho(data.escalaTrabalho);
            setFolgas(data.folgas);
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
            // statusTreinamento,
            // carteiras,
            // escalaTrabalho,
            // folgas
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
                    <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Atualização Motorista</h1>
                    <div className="flex justify-end mb-6">
                        <Link href="/create/newForm" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300">
                            Novo Formulário
                        </Link>
                    </div>
                    <form className="space-y-6">
                        <input
                            type="text"
                            className="border border-gray-300 rounded-lg p-3 w-full"
                            placeholder="Nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                        <input
                            type="text"
                            className="border border-gray-300 rounded-lg p-3 w-full"
                            placeholder="Documento"
                            value={documento}
                            onChange={(e) => setDocumento(e.target.value)}
                        />
                        <input
                            type="date"
                            className="border border-gray-300 rounded-lg p-3 w-full"
                            value={dataNascimento}
                            onChange={(e) => setDataNascimento(e.target.value)}
                        />
                        <input
                            type="text"
                            className="border border-gray-300 rounded-lg p-3 w-full"
                            placeholder="Celular"
                            value={celular}
                            onChange={(e) => setCelular(e.target.value)}
                        />
                        <input
                            type="email"
                            className="border border-gray-300 rounded-lg p-3 w-full"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {/* <select
                            className="border border-gray-300 rounded-lg p-3 w-full"
                            value={statusTreinamento}
                            onChange={(e) => setStatusTreinamento(Number(e.target.value))}
                        >
                            <option value={1}>Ativo</option>
                            <option value={0}>Inativo</option>
                        </select> */}
                        {/* <input
                            type="text"
                            className="border border-gray-300 rounded-lg p-3 w-full"
                            placeholder="Data Início da Escala"
                            value={escalaTrabalho.dataInicio}
                            onChange={(e) => setEscalaTrabalho({ ...escalaTrabalho, dataInicio: e.target.value })}
                        />
                        <input
                            type="text"
                            className="border border-gray-300 rounded-lg p-3 w-full"
                            placeholder="Data Fim da Escala"
                            value={escalaTrabalho.dataFim}
                            onChange={(e) => setEscalaTrabalho({ ...escalaTrabalho, dataFim: e.target.value })}
                        /> */}
                        <button
                            type="button"
                            onClick={PutData}
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
