"use client";

import Aside from "@/app/components/aside";
import AlertError from "@/app/components/error";
import AlertSucess from "@/app/components/sucess";
import verify from "@/app/functions/verify";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";


export default function CadastroManutencao() {
  const { id } = useParams();
  const [tipo, setTipo] = useState(""); // Armazena o id do tipo de manutenção
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [observacao, setObservacao] = useState("");
  const [diagnostico, setDiagnostico] = useState("");
  const [error, setError] = useState(0);
  const [sucess, setSucess] = useState(0);

  useEffect(() => {
    verify();
  });

  const CreateManutencao = async () => {
    const DataInicioISO = new Date(dataInicio).toISOString();
    const DataFimISO = dataFim ? new Date(dataFim).toISOString() : null;

    const data = {
      tipo: Number(tipo),
      dataInicio: DataInicioISO,
      dataFim: DataFimISO,
      observacao: observacao || null,
      diagnostico: diagnostico || null,
    };

    console.log(data);

    try {
      const response = await fetch(`https://localhost:5001/veiculo/${id}/manutencao`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Authorization: localStorage.getItem("token"),
        },
      });

      const jsonResponse = await response.status;
      if (jsonResponse === 200) {
        setSucess(1);
      }
      else {
        setError(1);
      }
    } catch (error) {
      console.error("Erro ao cadastrar manutenção:", error);
    }
  };

  const handleClose = () => {
    setError(0);
    setSucess(0);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 flex text-black">
      {error === 1 && <AlertError message={"Ocorreu um erro"} onClose={handleClose} />}
      {sucess === 1 && <AlertSucess message={"Operação Concluída com sucesso"} onClose={handleClose}  />}
      <Aside></Aside>
      <div className="container max-w-lg mx-auto p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Cadastro de Manutenção</h1>

        {/* Formulário de cadastro */}
        <form className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Tipo de Manutenção</label>
            <select
              className="border border-gray-300 rounded-lg p-3 w-full"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
            >
              <option value="">Selecione o Tipo</option>
              <option value="1">Preventiva</option>
              <option value="2">Corretiva</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Data de Início</label>
            <input
              type="date"
              className="border border-gray-300 rounded-lg p-3 w-full"
              value={dataInicio}
              onChange={(e) => setDataInicio(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Data de Fim (opcional)</label>
            <input
              type="date"
              className="border border-gray-300 rounded-lg p-3 w-full"
              value={dataFim}
              onChange={(e) => setDataFim(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Observação (opcional)</label>
            <input
              type="text"
              className="border border-gray-300 rounded-lg p-3 w-full"
              value={observacao}
              onChange={(e) => setObservacao(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Diagnóstico (opcional)</label>
            <input
              type="text"
              className="border border-gray-300 rounded-lg p-3 w-full"
              value={diagnostico}
              onChange={(e) => setDiagnostico(e.target.value)}
            />
          </div>

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
