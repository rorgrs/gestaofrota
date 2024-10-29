import Link from "next/link"

export default function Aside(){
    return (
        <Link href="/" className="block text-lg font-bold text-gray-800 hover:text-blue-500">Página Inicial</Link>
        <Link href="/motorista/readAll" className="block text-lg font-bold text-gray-800 hover:text-blue-500">Motoristas</Link>
        <Link href="/usuarios/readAll" className="block text-lg font-bold text-gray-800 hover:text-blue-500">Usuarios</Link>
        <Link href="/viagem/readAll" className="block text-lg font-bold text-gray-800 hover:text-blue-500">Viagens</Link>
        <Link href="/veiculos/readAll" className="block text-lg font-bold text-gray-800 hover:text-blue-500">Veiculos</Link>
    );
}