'use client';

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
      statusTreinamento: statusTreinamento,
      idEscalaTrabalho: idEscalaTrabalho,
      cnh: cnh,
      cnhDataVencimento: cnhDataVencimento,
    };

    const response = await fetch('https://localhost:5001/motorista', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    const jsonResponse = await response.status;
    console.log(jsonResponse);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 p-8 flex items-center justify-center text-black">
      <div className="container max-w-lg mx-auto p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Cadastro de Motorista</h1>

        {/* Formulário de cadastro */}
        <form className="space-y-6">
          {/* Campo Nome */}
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
              required={true}
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

          {/* Select Status Treinamento */}
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
          <div>
            <label className="block text-gray-700 font-medium mb-2">ID Escala de Trabalho</label>
            <select className="border border-gray-300 rounded-lg p-3 w-full focus:ring focus:ring-blue-200 transition-all duration-300"
             value={idEscalaTrabalho}
             onChange={(e) => setIdEscalaTrabalho(Number(e.target.value))}>
                <option value={1}>12x36</option>
                <option value={2}>12x40</option>
            </select>
          </div>

          {/* Campo CNH */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">CNH</label>
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
