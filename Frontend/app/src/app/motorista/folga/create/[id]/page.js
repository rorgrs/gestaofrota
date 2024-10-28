"use client";

import { useState } from "react";

export default function CadastroLicenciamento() {

  const [IdMotorista, setIdMotorista] = useState(0);
  const [DataInicio, setDataInicio] = useState("");
  const [DataFim, setDataFim] = useState("");

  const CreateFolga = async () => {

    const { id } = useParams();

    const data = {
      DataValidade: DataValidade,
      DataVencimento: DataVencimento,
    };

    console.log(data);
    try {
      const response = await fetch(`https://localhost:5001/motorista/${id}/folga`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      });

      const jsonResponse = await response.json();
      console.log(jsonResponse);
    } catch (error) {
      console.error("Erro ao cadastrar licenciamento:", error);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 p-8 flex items-center justify-center text-black">
      <div className="container max-w-lg mx-auto p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Cadastro de Folgas</h1>

        {/* Formulário de cadastro */}
        <form className="space-y-6">
          <input
            type="number"
            className="border border-gray-300 rounded-lg p-3 w-full"
            placeholder="ID Motorista"
            value={IdMotorista}
            onChange={(e) => setIdMotorista(e.target.value)}
          />
          <input
            type="date"
            className="border border-gray-300 rounded-lg p-3 w-full"
            placeholder="Data Inicio"
            value={DataInicio}
            onChange={(e) => setDataInicio(e.target.value)}
          />
          <input
            type="date"
            className="border border-gray-300 rounded-lg p-3 w-full"
            placeholder="Data Fim"
            value={DataFim}
            onChange={(e) => setDataFim(e.target.value)}
          />

          <button
            type="button"
            onClick={CreateFolga}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300"
          >
            Cadastrar Folga
          </button>
        </form>
      </div>
    </main>
  );
}
