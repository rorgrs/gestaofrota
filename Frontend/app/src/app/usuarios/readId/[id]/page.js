'use client';

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Users() {
    const { id } = useParams();
    const [nome, setNome] = useState("");
    const [login, setLogin] = useState("");
    const [documento, setDocumento] = useState("");
    const [email, setEmail] = useState("");
    const [dataCadastro, setDataCadastro] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);

        try {
            const response = await fetch(`https://localhost:5001/usuario/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });
            const data = await response.json();

            setNome(data.nome);
            setLogin(data.login);
            setDocumento(data.documento);
            setEmail(data.email);
            const dataCadastro = new Date(data.dataCadastro).toISOString().split('T')[0];
            setDataCadastro(dataCadastro);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const PutData = async () => {
        const dataPut = {
            id, // Incluindo o ID no objeto de atualização
            nome,
            login,
            documento,
            email,
            dataCadastro // Se necessário, você pode modificar este valor conforme a lógica de seu aplicativo
        };

        console.log(dataPut)

        try {
            const response = await fetch(`https://localhost:5001/usuario/${id}`, {
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
                    <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Atualização Usuário</h1>
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
                            placeholder="Login"
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                        />
                        <input
                            type="text"
                            className="border border-gray-300 rounded-lg p-3 w-full"
                            placeholder="Documento"
                            value={documento}
                            onChange={(e) => setDocumento(e.target.value)}
                        />
                        <input
                            type="email"
                            className="border border-gray-300 rounded-lg p-3 w-full"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="date"
                            className="border border-gray-300 rounded-lg p-3 w-full"
                            disabled={true}
                            value={dataCadastro}
                            onChange={(e) => setDataCadastro(e.target.value)}
                        />
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
