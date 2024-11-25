"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AlertSucess from "@/app/components/sucess";
import AlertError from "@/app/components/error";
import verify from "@/app/functions/verify";

export default function CadastroLicenciamento() {
  const { id } = useParams();
  // const [IdMotorista, setIdMotorista] = useState(0);
  const [DataInicio, setDataInicio] = useState("");
  const [DataFim, setDataFim] = useState("");
  const [error, setError] = useState(0);
  const [sucess, setSucess] = useState(0);

  useEffect(()=>{
    verify();
  },[]);
  
  const handleClose = () => {
    setError(0);
    setSucess(0);
  };

  const CreateFolga = async () => {
    // Convertendo datas para o formato exigido com milissegundos
  const dataInicioISO = new Date(DataInicio).toISOString();
  const dataFimISO = new Date(DataFim).toISOString();

  const data = {
    dataInicio: dataInicioISO,
    dataFim: dataFimISO
  };
    console.log(id)
    console.log(data);
    console.log(JSON.stringify(data))
    try {
      const response = await fetch(`https://localhost:5001/motorista/${id}/folga`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          'Authorization': localStorage.getItem('token')
        },
      });

      if (!response.ok) {
        // Se o backend retornar um status de erro, lança uma exceção com o texto da resposta
        const errorText = await response.text();
        throw new Error(`Erro na requisição: ${errorText}`);
      }

      const jsonResponse = await response.status;
      if (jsonResponse === 200) {
        setSucess(1);
      }
      else {
        setError(1);
      }
      console.log(jsonResponse);
    } catch (error) {
      console.error("Erro ao cadastrar licenciamento:", error);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 p-8 flex items-center justify-center text-black">

      {error === 1 && <AlertError message={"Ocorreu um erro"} onClose={handleClose} />}
      {sucess === 1 && <AlertSucess message={"Operação Concluída com sucesso"} onClose={handleClose}  />}
      <div className="container max-w-lg mx-auto p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Cadastro de Folgas</h1>

        {/* Formulário de cadastro */}
        <form className="space-y-6">
          {/* <input
            type="number"
            className="border border-gray-300 rounded-lg p-3 w-full"
            placeholder="ID Motorista"
            value={IdMotorista}
            onChange={(e) => setIdMotorista(e.target.value)}
          /> */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">Inicio</label>
            <input
              type="datetime-local"
              className="border border-gray-300 rounded-lg p-3 w-full"
              value={DataInicio}
              onChange={(e) => setDataInicio(e.target.value)}
            />
          </div>

          <div>
          <label className="block mb-2 font-medium text-gray-700">Fim</label>
            <input
              type="datetime-local"
              className="border border-gray-300 rounded-lg p-3 w-full"
              value={DataFim}
              onChange={(e) => setDataFim(e.target.value)}
            />
          </div>

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
