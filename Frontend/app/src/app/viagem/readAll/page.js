'use client';

import Aside from "@/app/components/aside";
import verify from "@/app/functions/verify";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [dados, setDados] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [enderecos, setEnderecos] = useState({}); // Armazena endereços por ID da viagem

  // Busca os dados das viagens e endereços
  const fetchData = async () => {
    try {
      const response = await fetch("https://localhost:5001/viagem", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          'Authorization': localStorage.getItem('token')
        },
      });

      const data = await response.json();
      setDados(data);
      setFilteredData(data);

      // Após carregar os dados, busca os endereços (origem e destino)
      const enderecosMap = await fetchAllAddresses(data);
      setEnderecos(enderecosMap);
    } catch (error) {
      console.error(error);
    }
  };

  // Função para buscar origem/destino de todas as viagens
  const fetchAllAddresses = async (viagens) => {
    const enderecosMap = {};

    // Cria promessas para buscar todos os endereços
    const promessas = viagens.map(async (viagem) => {
      const origem = await fetchAddress(viagem.latOrigem, viagem.lngOrigem);
      const destino = await fetchAddress(viagem.latDestino, viagem.lngDestino);

      enderecosMap[viagem.id] = {
        origem: origem || "Não encontrado",
        destino: destino || "Não encontrado",
      };
    });

    // Aguarda todas as requisições terminarem
    await Promise.all(promessas);

    return enderecosMap;
  };

  // Função para buscar um endereço baseado em lat/lng
  const fetchAddress = async (lat, lon) => {
    try {
      const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Falha ao buscar endereço");

      const data = await response.json();
      const endereco = {
            municipality: data.address.municipality,
            state: data.address.state,
            postcode: data.address.postcode,
            country: data.address.country
      }
      return `${endereco.municipality || ''}, ${endereco.postcode || ''},  ${endereco.state || ''} - ${endereco.country || ''}`;
    } catch (error) {
      console.error(`Erro ao buscar endereço para (${lat}, ${lon}):`, error);
      return null;
    }
  };

  useEffect(() => {
    verify();
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = dados.filter((item) =>
      item.veiculo.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.veiculo.modelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.veiculo.placa.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchTerm, dados]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 flex text-black">
      <Aside></Aside>

      <div className="w-4/4 p-8 ml-0">
        <div className="container mx-auto p-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Lista de Viagens</h1>

          <div className="flex justify-end mb-4">
            <Link
              href="/viagem/create"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
            >
              Novo
            </Link>
          </div>

          <input
            type="text"
            placeholder="Pesquisar por marca, modelo ou placa..."
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <table className="w-full text-left border-collapse text-black">
            <thead>
              <tr>
                <th className="border-b-2 p-4 text-sm font-semibold text-gray-600">ID</th>
                <th className="border-b-2 p-4 text-sm font-semibold text-gray-600">Veiculo - Modelo</th>
                <th className="border-b-2 p-4 text-sm font-semibold text-gray-600">Veiculo - Placa</th>
                <th className="border-b-2 p-4 text-sm font-semibold text-gray-600">Origem</th>
                <th className="border-b-2 p-4 text-sm font-semibold text-gray-600">Destino</th>
                <th className="border-b-2 p-4 text-sm font-semibold text-gray-600">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-blue-50">
                  <td className="border-b p-4">{item.id}</td>
                  <td className="border-b p-4">{item.veiculo.modelo}</td>
                  <td className="border-b p-4">{item.veiculo.placa}</td>
                  <td className="border-b p-4">
                    {enderecos[item.id]?.origem || "Carregando..."} 
                  </td>
                  <td className="border-b p-4">
                    {enderecos[item.id]?.destino || "Carregando..."}
                  </td>
                  <td className="border-b p-4">
                    <Link href={`/viagem/readId/${item.id}`} className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg mr-2">Editar</Link>
                    {/* <button 
                      onClick={() => deleteData(vehicle.id)} 
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg"
                    >
                      Deletar
                    </button> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredData.length === 0 && (
            <p className="text-center text-gray-500 mt-4">Nenhuma viagem encontrada.</p>
          )}
        </div>
      </div>
    </main>
  );
}
