'use client';

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [dados, setDados] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch('https://localhost:5001/usuario', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = await response.json();
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
    const filtered = dados.filter(user =>
      user.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchTerm, dados]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 flex">
      <aside className="w-0/4 bg-white p-8 shadow-l">
        <nav className="space-y-4">
          <Link href="/" className="block text-lg font-bold text-gray-800 hover:text-blue-500">Página Inicial</Link>
          <Link href="/create/user" className="block text-lg font-bold text-gray-800 hover:text-blue-500">Novo Usuário</Link>
        </nav>
      </aside>

      <div className="w-4/4 p-8 ml-0">
        <div className="container mx-auto p-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Lista de Usuarios</h1>

          <div className="flex justify-end mb-4">
            <Link href="/create/user" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg">Novo</Link>
          </div>

          <input 
            type="text" 
            placeholder="Pesquisar por nome..." 
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <table className="w-full text-left border-collapse text-black">
            <thead>
              <tr>
                <th className="border-b-2 p-4 text-sm font-semibold text-gray-600">ID</th>
                <th className="border-b-2 p-4 text-sm font-semibold text-gray-600">Nome</th>
                <th className="border-b-2 p-4 text-sm font-semibold text-gray-600">Documento</th>
                <th className="border-b-2 p-4 text-sm font-semibold text-gray-600">Email</th>
                <th className="border-b-2 p-4 text-sm font-semibold text-gray-600">Data de Cadastro</th>
                <th className="border-b-2 p-4 text-sm font-semibold text-gray-600">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map(user => (
                <tr key={user.id} className="hover:bg-blue-50">
                  <td className="border-b p-4">{user.id}</td>
                  <td className="border-b p-4">{user.nome}</td>
                  <td className="border-b p-4">{user.documento}</td>
                  <td className="border-b p-4">{user.email}</td>
                  <td className="border-b p-4">{new Date(user.dataCadastro).toLocaleDateString('pt-BR')}</td>
                  <td className="border-b p-4">
                    <Link href={`/usuarios/readId/${user.id}`} className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg mr-2">Editar</Link>
                    {/* <button 
                      onClick={() => deleteData(user.id)} 
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
            <p className="text-center text-gray-500 mt-4">Nenhum usuário encontrado.</p>
          )}
        </div>
      </div>
    </main>
  );
}
