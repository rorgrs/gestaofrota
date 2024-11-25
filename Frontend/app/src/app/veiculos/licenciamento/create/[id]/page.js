"use client";

import Aside from "@/app/components/aside";
import verify from "@/app/functions/verify";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

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

    useEffect(()=>{
      verify();
    });

    try {
      const response = await fetch(`https://localhost:5001/veiculo/${id}/licenciamento`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          'Authorization': localStorage.getItem('token')
        },
      });

      // const jsonResponse = await response.sa;
      // console.log(jsonResponse);
    } catch (error) {
      console.error("Erro ao cadastrar licenciamento:", error);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 flex text-black">
      <Aside></Aside>
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

          <div>
              <label className="block text-gray-700 font-medium mb-2">Data de Emissao</label>
              <input
              type="date"
              className="border border-gray-300 rounded-lg p-3 w-full"
              placeholder="Data de Emissão"
              value={DataEmissao}
              onChange={(e) => setDataEmissao(e.target.value)}
          />
          </div>

          <div>
              <label className="block text-gray-700 font-medium mb-2">Data de Validade</label>
              <input
            type="date"
            className="border border-gray-300 rounded-lg p-3 w-full"
            placeholder="Data de Validade"
            value={DataValidade}
            onChange={(e) => setDataValidade(e.target.value)}
          />
          </div>

          <div>
              <label className="block text-gray-700 font-medium mb-2">Data de Vencimento</label>
              <input
            type="date"
            className="border border-gray-300 rounded-lg p-3 w-full"
            placeholder="Data de Vencimento"
            value={DataVencimento}
            onChange={(e) => setDataVencimento(e.target.value)}
          />
          </div>

          {/* <input
            type="date"
            className="border border-gray-300 rounded-lg p-3 w-full"
            placeholder="Data de Emissão"
            value={DataEmissao}
            onChange={(e) => setDataEmissao(e.target.value)}
          /> */}

          {/* <input
            type="date"
            className="border border-gray-300 rounded-lg p-3 w-full"
            placeholder="Data de Validade"
            value={DataValidade}
            onChange={(e) => setDataValidade(e.target.value)}
          /> */}


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
