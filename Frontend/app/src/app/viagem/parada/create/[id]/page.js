"use client";

import { useParams } from "next/navigation";
import { useState } from "react";


export default function CadastroParada() {
  
  const { id } = useParams();
  const [Lat, setLat] = useState();
  const [Lng, setLng] = useState();
  const [IbgeCidade, setIbgeCidade] = useState(0);
  const [Logradouro, setLogradouro] = useState("");

  const CreateParada = async () => {

    const data = {
      lat: Lat,
      lng: Lng,
      ibgeCidade: IbgeCidade,
      logradouro: Logradouro
    };

    console.log(data);
    try {
      const response = await fetch(`https://localhost:5001/viagem/${id}/parada`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      });

      const jsonResponse = await response.status;
      console.log(jsonResponse);
    } catch (error) {
      console.error("Erro ao cadastrar licenciamento:", error);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 p-8 flex items-center justify-center text-black">
      <div className="container max-w-lg mx-auto p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Cadastro de Paradas</h1>

        {/* Formulário de cadastro */}
        <form className="space-y-6">
          <input
            type="number"
            className="border border-gray-300 rounded-lg p-3 w-full"
            placeholder="Longitude"
            value={Lng}
            onChange={(e) => setLng(e.target.value)}
          />
          <input
            type="number"
            className="border border-gray-300 rounded-lg p-3 w-full"
            placeholder="Latitude"
            value={Lat}
            onChange={(e) => setLat(e.target.value)}
          />
          <input
            type="number"
            className="border border-gray-300 rounded-lg p-3 w-full"
            placeholder="IBGE Cidade"
            value={IbgeCidade}
            onChange={(e) => setIbgeCidade(e.target.value)}
          />

          <input
            type="text"
            className="border border-gray-300 rounded-lg p-3 w-full"
            placeholder="Logradouro"
            value={Logradouro}
            onChange={(e) => setLogradouro(e.target.value)}
          />

          <button
            type="button"
            onClick={CreateParada}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300"
          >
            Cadastrar Parada
          </button>
        </form>
      </div>
    </main>
  );
}
