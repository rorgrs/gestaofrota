"use client";

import Aside from "@/app/components/aside";
import AlertError from "@/app/components/error";
import AlertSucess from "@/app/components/sucess";
import verify from "@/app/functions/verify";
import { useEffect, useState } from "react";


export default function CadastroVeiculo() {
  const [idMotorista, setIdMotorista] = useState(0);
  const [placa, setPlaca] = useState("");
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [cor, setCor] = useState("");
  const [kmLitro, setKmLitro] = useState(0);
  const [ano, setAno] = useState(0);
  const [error, setError] = useState(0);
  const [sucess, setSucess] = useState(0);

  const [motorista, setMotorista] = useState([]);

  const buscarMotorista = async () => {
    try {
      const response = await fetch("https://localhost:5001/motorista", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      console.log(data);
      setMotorista(data);
    } catch (error) {
      console.error("Erro ao buscar motoristas:", error);
    }
  };

  useEffect(() => {
    verify();
    buscarMotorista();
  }, []);

  const CreateVeiculo = async () => {
    const data = {
      idMotorista: idMotorista,
      placa: placa,
      marca: marca,
      modelo: modelo,
      cor: cor,
      kmLitro: kmLitro,
      ano: ano,
    };

    console.log(data);
    try {
      const response = await fetch("https://localhost:5001/veiculo", {
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
      console.error("Erro ao cadastrar veículo:", error);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 flex text-black">
      <Aside></Aside>
      {error === 1 && <AlertError message={"Ocorreu um erro"} onClose={handleClose} />}
      {sucess === 1 && <AlertSucess message={"Operação Concluída com sucesso"} onClose={handleClose}  />}
      <div className="container max-w-lg mx-auto p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Cadastro de Veículos</h1>

        {/* Formulário de cadastro */}
        <form className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Motorista</label>
            <select
              onChange={(e) => setIdMotorista(e.target.value)}
              value={idMotorista}
              className="border border-gray-300 rounded-lg p-3 w-full focus:ring focus:ring-blue-200 transition-all duration-300"
            >
              <option value="">Selecione o Motorista</option>
              {motorista.length > 0 ? (
                motorista.map((motorista) => (
                  <option key={motorista.id} value={motorista.id}>
                    {motorista.nome}
                  </option>
                ))
              ) : (
                <option>Carregando Motorista...</option>
              )}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Placa</label>
            <input
              type="text"
              className="border border-gray-300 rounded-lg p-3 w-full"
              value={placa}
              onChange={(e) => setPlaca(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Marca</label>
            <input
              type="text"
              className="border border-gray-300 rounded-lg p-3 w-full"
              value={marca}
              onChange={(e) => setMarca(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Modelo</label>
            <input
              type="text"
              className="border border-gray-300 rounded-lg p-3 w-full"
              value={modelo}
              onChange={(e) => setModelo(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Cor</label>
            <input
              type="text"
              className="border border-gray-300 rounded-lg p-3 w-full"
              value={cor}
              onChange={(e) => setCor(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">KM por Litro</label>
            <input
              type="number"
              className="border border-gray-300 rounded-lg p-3 w-full"
              value={kmLitro}
              onChange={(e) => setKmLitro(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Ano</label>
            <input
              type="number"
              className="border border-gray-300 rounded-lg p-3 w-full"
              value={ano}
              onChange={(e) => setAno(e.target.value)}
            />
          </div>

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
