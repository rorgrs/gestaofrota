"use client"

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const removeItem = () => {
    localStorage.removeItem('token')
  }
  
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 flex text-black">
      <aside className="w-1/4 bg-white p-8 shadow-lg">
        <nav className="space-y-4">
          <Link href="/home" className="block text-lg font-bold text-gray-800 hover:text-blue-500">Página Inicial</Link>
          <Link href="/motorista/readAll" className="block text-lg font-bold text-gray-800 hover:text-blue-500">Motoristas</Link>
          <Link href="/usuarios/readAll" className="block text-lg font-bold text-gray-800 hover:text-blue-500">Usuarios</Link>
          <Link href="/viagem/readAll" className="block text-lg font-bold text-gray-800 hover:text-blue-500">Viagens</Link>
          <Link href="/veiculos/readAll" className="block text-lg font-bold text-gray-800 hover:text-blue-500">Veiculos</Link>
          <Link onClick={removeItem} href="/" className="block text-lg font-bold text-gray-800 hover:text-blue-500">Logout</Link>
        </nav>
      </aside>
    </main>
  );
}
