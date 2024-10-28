'use client'

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [nome, setNome] = useState("");
  const [login, setLogin] = useState("");
  const [documento, setDocumento] = useState("");
  const [senha, setSenha] = useState("");
  const [email, setEmail] = useState("");

  const createUser = async () => {
    const data = {
      nome: nome,
      login: login,
      documento: documento,
      senha: senha,
      email: email
    };


    try {
      const response = await fetch('https://localhost:5001/usuario', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });

      const jsonResponse = await response.json();
      console.log(jsonResponse);
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 p-8 flex items-center justify-center text-black">
      <div className="container max-w-lg mx-auto p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Cadastro de Usuários</h1>

        {/* Formulário de cadastro de usuário */}
        <form className="space-y-6">

          {/* Campo Nome */}
          <input
            type="text"
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring focus:ring-blue-200 transition-all duration-300"
            placeholder="Nome do usuário"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          {/* Campo Login */}
          <input
            type="text"
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring focus:ring-blue-200 transition-all duration-300"
            placeholder="Login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />

          {/* Campo Documento */}
          <input
            type="text"
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring focus:ring-blue-200 transition-all duration-300"
            placeholder="Documento"
            value={documento}
            onChange={(e) => setDocumento(e.target.value)}
          />

          {/* Campo Senha */}
          <input
            type="password"
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring focus:ring-blue-200 transition-all duration-300"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          {/* Campo Email */}
          <input
            type="email"
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring focus:ring-blue-200 transition-all duration-300"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Botão de Cadastro */}
          <button
            type="button"
            onClick={createUser}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 text-white"
          >
            Cadastrar Usuário
          </button>

        </form>
      </div>
    </main>
  );
}
