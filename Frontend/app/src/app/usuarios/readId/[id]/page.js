'use client';

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import AlertSucess from "@/app/components/sucess";
import AlertError from "@/app/components/error";

export default function Users() {
    const { id } = useParams();
    const [nome, setNome] = useState("");
    const [login, setLogin] = useState("");
    const [documento, setDocumento] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [dataCadastro, setDataCadastro] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(0);
    const [sucess, setSucess] = useState(0);

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
            
            console.log(data)
            setNome(data.nome);
            setLogin(data.login);
            setDocumento(data.documento);
            setEmail(data.email);
            setSenha(data.senha);
            console.log(data.senha)
            const dataCadastro = new Date(data.dataCadastro).toISOString().split('T')[0];
            setDataCadastro(dataCadastro);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const handleClose = () => {
        setError(0);
        setSucess(0);
    };


    const PutData = async () => {
        const dataPut = {
            id,
            nome,
            login,
            documento,
            senha,
            email,
            dataCadastro
        };

        console.log(dataPut);

        try {
            const response = await fetch(`https://localhost:5001/usuario/${id}`, {
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
                    <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Atualização Usuário</h1>
                    <div className="flex justify-end mb-6">
                        <Link href="/create/newForm" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300">
                            Novo Formulário
                        </Link>
                    </div>
                    <form className="space-y-6">
                        <label className="block">
                            <span className="text-gray-700">Nome</span>
                            <input
                                type="text"
                                className="border border-gray-300 rounded-lg p-3 w-full mt-1"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                            />
                        </label>
                        <label className="block">
                            <span className="text-gray-700">Login</span>
                            <input
                                type="text"
                                className="border border-gray-300 rounded-lg p-3 w-full mt-1"
                                value={login}
                                onChange={(e) => setLogin(e.target.value)}
                            />
                        </label>
                        <label className="block">
                            <span className="text-gray-700">Documento</span>
                            <input
                                type="text"
                                className="border border-gray-300 rounded-lg p-3 w-full mt-1"
                                value={documento}
                                onChange={(e) => setDocumento(e.target.value)}
                            />
                        </label>

                        <label className="block">
                            <span className="text-gray-700">Senha</span>
                            <input
                                type="text"
                                className="border border-gray-300 rounded-lg p-3 w-full mt-1"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                            />
                        </label>

                        <label className="block">
                            <span className="text-gray-700">Email</span>
                            <input
                                type="email"
                                className="border border-gray-300 rounded-lg p-3 w-full mt-1"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </label>
                        <label className="block">
                            <span className="text-gray-700">Data de Cadastro</span>
                            <input
                                type="date"
                                className="border border-gray-300 rounded-lg p-3 w-full mt-1"
                                disabled={true}
                                value={dataCadastro}
                                onChange={(e) => setDataCadastro(e.target.value)}
                            />
                        </label>
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
