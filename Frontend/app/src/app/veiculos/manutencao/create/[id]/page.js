"use client";

import verify from "@/app/functions/verify";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CadastroManutencao() {
  const {id} = useParams();
  // const [idVeiculo, setIdVeiculo] = useState(0);
  const [tipo, setTipo] = useState(""); // Supondo que ETipoManutencaoVeiculo seja uma string ou um valor enumerado
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [observacao, setObservacao] = useState("");
  const [diagnostico, setDiagnostico] = useState("");

  const CreateManutencao = async () => {

    const DataInicioISO = new Date(dataInicio).toISOString();
    const DataFimISO = new Date(dataFim).toISOString();

    const data = {
      tipo: Number(tipo),
      dataInicio: DataInicioISO,
      dataFim: DataFimISO || null,
      observacao: observacao || null,
      diagnostico: diagnostico || null,
    };

    console.log(data);

    useEffect(()=>{
      verify();
    })

    try {
      const response = await fetch(`https://localhost:5001/veiculo/${id}/manutencao`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          'Authorization': localStorage.getItem('token')
        },
      });

      // const jsonResponse = await response.json();
      // console.log(jsonResponse);
    } catch (error) {
      console.error("Erro ao cadastrar manutenção:", error);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 p-8 flex items-center justify-center text-black">
      <div className="container max-w-lg mx-auto p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Cadastro de Manutenção</h1>

        {/* Formulário de cadastro */}
        <form className="space-y-6">
          {/* <input
            type="number"
            className="border border-gray-300 rounded-lg p-3 w-full"
            placeholder="ID do Veículo"
            disabled = {true}
            value={id}
            onChange={(e) => setIdVeiculo(e.target.value)}
          /> */}

          <input
            type="text"
            className="border border-gray-300 rounded-lg p-3 w-full"
            placeholder="Tipo de Manutenção"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
          />
          <input
            type="date"
            className="border border-gray-300 rounded-lg p-3 w-full"
            placeholder="Data de Início"
            value={dataInicio}
            onChange={(e) => setDataInicio(e.target.value)}
          />
          <input
            type="date"
            className="border border-gray-300 rounded-lg p-3 w-full"
            placeholder="Data de Fim (opcional)"
            value={dataFim}
            onChange={(e) => setDataFim(e.target.value)}
          />
          <input
            type="text"
            className="border border-gray-300 rounded-lg p-3 w-full"
            placeholder="Observação (opcional)"
            value={observacao}
            onChange={(e) => setObservacao(e.target.value)}
          />
          <input
            type="text"
            className="border border-gray-300 rounded-lg p-3 w-full"
            placeholder="Diagnóstico (opcional)"
            value={diagnostico}
            onChange={(e) => setDiagnostico(e.target.value)}
          />

          <button
            type="button"
            onClick={CreateManutencao}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300"
          >
            Cadastrar Manutenção
          </button>
        </form>
      </div>
    </main>
  );
}
