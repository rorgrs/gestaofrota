'use client';

import Aside from "@/app/components/aside";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [dados, setDados] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch('https://localhost:5001/viagem', { // Atualizar a URL para a API de veículos
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = await response.json();
      console.log(data)
      setDados(data);
      setFilteredData(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
  
  useEffect(() => {
    const filtered = dados.filter(vehicle =>
      vehicle.marca.toLowerCase().includes(searchTerm.toLowerCase()) || // Filtrar por marca
      vehicle.modelo.toLowerCase().includes(searchTerm.toLowerCase()) || // ou modelo
      vehicle.placa.toLowerCase().includes(searchTerm.toLowerCase()) // ou placa
    );
    setFilteredData(filtered);
  }, [searchTerm, dados]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 flex text-black">
      <Aside></Aside>

      <div className="w-3/4 p-8 ml-0">
        <div className="container mx-auto p-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Lista de Viagens</h1>

          <div className="flex justify-end mb-4">
            <Link href="/viagem/create" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg">Novo</Link>
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
                <th className="border-b-2 p-4 text-sm font-semibold text-gray-600">Veiculo</th>
                <th className="border-b-2 p-4 text-sm font-semibold text-gray-600">Lat.Origem</th>
                <th className="border-b-2 p-4 text-sm font-semibold text-gray-600">Lng.Origem</th>
                <th className="border-b-2 p-4 text-sm font-semibold text-gray-600">Lat.Destino</th>
                <th className="border-b-2 p-4 text-sm font-semibold text-gray-600">Lng.Destino</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map(item => (
                <tr key={item.id} className="hover:bg-blue-50">
                  <td className="border-b p-4">{item.id}</td>
                  <td className="border-b p-4">{item.veiculo}</td>
                  <td className="border-b p-4">{item.latorigem}</td>
                  <td className="border-b p-4">{item.lngorigem}</td>
                  <td className="border-b p-4">{item.latdestino}</td>
                  <td className="border-b p-4">{item.lngdestino}</td>
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
