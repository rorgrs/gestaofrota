"use client";

import { useParams } from "next/navigation";
import { useState } from "react";

export default function CadastroLicenciamento() {
  const { id } = useParams();
  const [idVeiculo, setIdVeiculo] = useState(0);
  const [DataEmissao, setDataEmissao] = useState("");
  const [DataValidade, setDataValidade] = useState("");
  const [DataVencimento, setDataVencimento] = useState("");

  const CreateLicenciamento = async () => {

    const DataEmissaoISO = new Date(DataEmissao).toISOString();
    const DataValidadeISO = new Date(DataValidade).toISOString();
    const DataVencimentoISO = new Date(DataVencimento).toISOString();

    const data = {
      dataEmissao: DataEmissaoISO,
      dataValidade: DataEmissaoISO,
      dataVencimento: DataEmissaoISO,
    };

    console.log(data);
    try {
      const response = await fetch(`https://localhost:5001/veiculo/${id}/licenciamento`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      });

      // const jsonResponse = await response.sa;
      // console.log(jsonResponse);
    } catch (error) {
      console.error("Erro ao cadastrar licenciamento:", error);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 p-8 flex items-center justify-center text-black">
      <div className="container max-w-lg mx-auto p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Cadastro de Licenciamento</h1>

        {/* Formulário de cadastro */}
        <form className="space-y-6">
          {/* <input
            type="number"
            className="border border-gray-300 rounded-lg p-3 w-full"
            placeholder="ID do Veículo"
            disabled={true}
            value={id}
            onChange={(e) => setIdVeiculo(e.target.value)}
          /> */}
          <input
            type="date"
            className="border border-gray-300 rounded-lg p-3 w-full"
            placeholder="Data de Emissão"
            value={DataEmissao}
            onChange={(e) => setDataEmissao(e.target.value)}
          />
          <input
            type="date"
            className="border border-gray-300 rounded-lg p-3 w-full"
            placeholder="Data de Validade"
            value={DataValidade}
            onChange={(e) => setDataValidade(e.target.value)}
          />
          <input
            type="date"
            className="border border-gray-300 rounded-lg p-3 w-full"
            placeholder="Data de Vencimento"
            value={DataVencimento}
            onChange={(e) => setDataVencimento(e.target.value)}
          />

          <button
            type="button"
            onClick={CreateLicenciamento}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300"
          >
            Cadastrar Licenciamento
          </button>
        </form>
      </div>
    </main>
  );
}
