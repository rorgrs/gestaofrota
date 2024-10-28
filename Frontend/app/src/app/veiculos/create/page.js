"use client";

import { useState } from "react";

export default function CadastroVeiculo() {

  const [idMotorista, setIdMotorista] = useState(0);
  const [placa, setPlaca] = useState("");
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [cor, setCor] = useState("");
  const [kmLitro, setKmLitro] = useState(0);
  const [ano, setAno] = useState(0);

  const CreateVeiculo = async () => {
    const data = {
      idMotorista: idMotorista,
      placa: placa,
      marca: marca,
      modelo: modelo,
      cor: cor,
      kmLitro: kmLitro,
      ano: ano
    };


    console.log(data)
    try {
      const response = await fetch('https://localhost:5001/veiculo', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      });
      
      const jsonResponse = await response.json();
      console.log(jsonResponse);
    } catch (error) {
      console.error("Erro ao cadastrar veículo:", error);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 p-8 flex items-center justify-center text-black">
      <div className="container max-w-lg mx-auto p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Cadastro de Veículos</h1>

        {/* Formulário de cadastro */}
        <form className="space-y-6">
          <input
            type="number"
            className="border border-gray-300 rounded-lg p-3 w-full"
            placeholder="ID do Motorista"
            value={idMotorista}
            onChange={(e) => setIdMotorista(e.target.value)}
          />
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
            placeholder="KM por Litro"
            value={kmLitro}
            onChange={(e) => setKmLitro(e.target.value)}
          />
          <input
            type="number"
            className="border border-gray-300 rounded-lg p-3 w-full"
            placeholder="Ano"
            value={ano}
            onChange={(e) => setAno(e.target.value)}
          />

          <button
            type="button"
            onClick={CreateVeiculo}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300"
          >
            Cadastrar Veículo
          </button>
        </form>
      </div>
    </main>
  );
}
