'use client';

import Link from "next/link";
import { useState } from "react";


export default function Home() {
  const [nome, setNome] = useState("");
  const [documento, setDocumento] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [celular, setCelular] = useState("");
  const [email, setEmail] = useState("");
  const [statusTreinamento, setStatusTreinamento] = useState(1);
  const [idEscalaTrabalho, setIdEscalaTrabalho] = useState(0);
  const [cnh, setCnh] = useState("");
  const [cnhDataVencimento, setCnhDataVencimento] = useState("");

  const Create = async () => {
    const data = {
      nome: nome,
      documento: documento,
      dataNascimento: dataNascimento,
      celular: celular,
      email: email,
      // statusTreinamento: statusTreinamento,
      // idEscalaTrabalho: idEscalaTrabalho,
      cnh: cnh,
      cnhDataVencimento: cnhDataVencimento,
      // datger: new Date().toISOString().split('T')[0]
    };


    const response = await fetch('https://localhost:5001/motorista', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    const jsonResponse = await response.json();
    console.log(jsonResponse);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 p-8 flex items-center justify-center text-black">
      <div className="container max-w-lg mx-auto p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Cadastro de Usuário</h1>

        {/* Formulário de cadastro */}
        <form className="space-y-6">
          {/* Campo Nome */}
          <input
            type="text"
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring focus:ring-blue-200 transition-all duration-300"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          {/* Campo Documento */}
          <input
            type="text"
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring focus:ring-blue-200 transition-all duration-300"
            placeholder="Documento"
            value={documento}
            onChange={(e) => setDocumento(e.target.value)}
          />

          {/* Campo Data de Nascimento */}
          <input
            type="date"
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring focus:ring-blue-200 transition-all duration-300"
            value={dataNascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
          />

          {/* Campo Celular */}
          <input
            type="text"
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring focus:ring-blue-200 transition-all duration-300"
            placeholder="Celular"
            value={celular}
            onChange={(e) => setCelular(e.target.value)}
          />

          {/* Campo Email */}
          <input
            type="email"
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring focus:ring-blue-200 transition-all duration-300"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Select Status Treinamento */}
          <select
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring focus:ring-blue-200 transition-all duration-300"
            value={statusTreinamento}
            onChange={(e) => setStatusTreinamento(Number(e.target.value))}
          >
            <option value={1}>Ativo</option>
            <option value={0}>Inativo</option>
          </select>

          {/* Campo ID Escala Trabalho */}
          <input
            type="number"
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring focus:ring-blue-200 transition-all duration-300"
            placeholder="ID Escala de Trabalho"
            value={idEscalaTrabalho}
            onChange={(e) => setIdEscalaTrabalho(Number(e.target.value))}
          />

          {/* Campo CNH */}
          <input
            type="text"
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring focus:ring-blue-200 transition-all duration-300"
            placeholder="CNH"
            value={cnh}
            onChange={(e) => setCnh(e.target.value)}
          />

          {/* Campo CNH Data de Vencimento */}
          <input
            type="date"
            className="border border-gray-300 rounded-lg p-3 ws-full focus:ring focus:ring-blue-200 transition-all duration-300"
            value={cnhDataVencimento}
            onChange={(e) => setCnhDataVencimento(e.target.value)}
          />

          {/* Botão de Cadastro */}
          <button
            type="button"
            onClick={Create}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300"
          >
            Cadastrar Motorista
          </button>
        </form>
      </div>
    </main>
  );
}
