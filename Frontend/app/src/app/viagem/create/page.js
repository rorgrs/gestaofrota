'use client';

import { useState } from "react";

export default function CadastroVeiculo() {
  const [idVeiculo, setIdVeiculo] = useState(0);
  const [latOrigem, setLatOrigem] = useState(0);
  const [lngOrigem, setLngOrigem] = useState(0);
  const [ibgeCidadeOrigem, setIbgeCidadeOrigem] = useState(0);
  const [logradouroOrigem, setLogradouroOrigem] = useState("");
  const [latDestino, setLatDestino] = useState(0);
  const [lngDestino, setLngDestino] = useState(0);
  const [ibgeCidadeDestino, setIbgeCidadeDestino] = useState(0);
  const [logradouroDestino, setLogradouroDestino] = useState("");

  const cadastrarViagem = async () => {
    const data = {
      idVeiculo,
      latOrigem,
      lngOrigem,
      ibgeCidadeOrigem,
      logradouroOrigem,
      latDestino,
      lngDestino,
      ibgeCidadeDestino,
      logradouroDestino,
    };

    try {
      const response = await fetch("https://localhost:5001/viagem", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const jsonResponse = await response.json();
      console.log(jsonResponse);
    } catch (error) {
      console.error("Erro ao cadastrar o veículo:", error);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 p-8 flex items-center justify-center">
      <div className="container max-w-lg mx-auto p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Cadastro de Viagem</h1>
        
        <form className="space-y-6">
          <input
            type="number"
            placeholder="ID do Veículo"
            value={idVeiculo}
            onChange={(e) => setIdVeiculo(Number(e.target.value))}
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring focus:ring-blue-200 transition-all duration-300"
          />
          <input
            type="number"
            placeholder="Latitude da Origem"
            value={latOrigem}
            onChange={(e) => setLatOrigem(Number(e.target.value))}
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring focus:ring-blue-200 transition-all duration-300"
          />
          <input
            type="number"
            placeholder="Longitude da Origem"
            value={lngOrigem}
            onChange={(e) => setLngOrigem(Number(e.target.value))}
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring focus:ring-blue-200 transition-all duration-300"
          />
          <input
            type="number"
            placeholder="IBGE da Cidade de Origem"
            value={ibgeCidadeOrigem}
            onChange={(e) => setIbgeCidadeOrigem(Number(e.target.value))}
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring focus:ring-blue-200 transition-all duration-300"
          />
          <input
            type="text"
            placeholder="Logradouro da Origem"
            value={logradouroOrigem}
            onChange={(e) => setLogradouroOrigem(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring focus:ring-blue-200 transition-all duration-300"
          />
          <input
            type="number"
            placeholder="Latitude do Destino"
            value={latDestino}
            onChange={(e) => setLatDestino(Number(e.target.value))}
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring focus:ring-blue-200 transition-all duration-300"
          />
          <input
            type="number"
            placeholder="Longitude do Destino"
            value={lngDestino}
            onChange={(e) => setLngDestino(Number(e.target.value))}
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring focus:ring-blue-200 transition-all duration-300"
          />
          <input
            type="number"
            placeholder="IBGE da Cidade de Destino"
            value={ibgeCidadeDestino}
            onChange={(e) => setIbgeCidadeDestino(Number(e.target.value))}
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring focus:ring-blue-200 transition-all duration-300"
          />
          <input
            type="text"
            placeholder="Logradouro do Destino"
            value={logradouroDestino}
            onChange={(e) => setLogradouroDestino(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring focus:ring-blue-200 transition-all duration-300"
          />
          <button
            type="button"
            onClick={cadastrarVeiculo}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300"
          >
            Cadastrar Viagem
          </button>
        </form>
      </div>
    </main>
  );
}
