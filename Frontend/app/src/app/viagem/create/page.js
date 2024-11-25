"use client";

import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import AlertSucess from "@/app/components/sucess";
import AlertError from "@/app/components/error";
import verify from "@/app/functions/verify";
import Aside from "@/app/components/aside";

const customIcon = new L.Icon({
  iconUrl: '/icons/pinmap.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function CadastroViagem() {
  const [idVeiculo, setIdVeiculo] = useState(0);
  const [latOrigem, setLatOrigem] = useState(0);
  const [lngOrigem, setLngOrigem] = useState(0);
  const [ibgeCidadeOrigem, setIbgeCidadeOrigem] = useState();
  const [logradouroOrigem, setLogradouroOrigem] = useState("");
  const [latDestino, setLatDestino] = useState(0);
  const [lngDestino, setLngDestino] = useState(0);
  const [ibgeCidadeDestino, setIbgeCidadeDestino] = useState();
  const [logradouroDestino, setLogradouroDestino] = useState("");
  const [origem, setOrigem] = useState(null);
  const [destino, setDestino] = useState(null);
  const [selecionandoDestino, setSelecionandoDestino] = useState(false);
  const [error, setError] = useState(0);
  const [sucess, setSucess] = useState(0);
  const [cidades, setCidades] = useState([]); // Estado para armazenar todas as cidades
  const [veiculo, setVeiculo] = useState([]);

  const buscarVeiculo = async () => {
    try {
        const response = await fetch('https://localhost:5001/veiculo', { // Atualizar a URL para a API de veículos
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        }
        });
      const data = await response.json();
      console.log(data)
      setVeiculo(data);
    } catch (error) {
        console.error("Erro ao buscar cidades:", error);
    } 
  }
  // Função para buscar todas as cidades
  const buscarCidades = async () => {
    try {
      const response = await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/municipios");
      const data = await response.json();
      setCidades(data); // Armazenar todas as cidades
    } catch (error) {
      console.error("Erro ao buscar cidades:", error);
    }
  };

  // Função para cadastrar a viagem
  const CadastrarViagem = async () => {
    const data = {
      idVeiculo,
      latOrigem,
      lngOrigem,
      ibgeCidadeOrigem,
      logradouroOrigem,
      latDestino,
      lngDestino,
      ibgeCidadeDestino,
      logradouroDestino,
    };

    try {
      const response = await fetch("https://localhost:5001/viagem", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          'Authorization': localStorage.getItem('token')
        },
      });

      const jsonResponse = await response.status;
      if (jsonResponse === 200) {
        setSucess(1);
      } else {
        setError(1);
      }

      console.log(jsonResponse);
    } catch (error) {
      console.error("Erro ao cadastrar a viagem:", error);
    }
  };

  useEffect(() => {
    verify();
    buscarCidades(); // Chama a função para buscar as cidades assim que o componente é montado
    buscarVeiculo();
    const container = document.getElementById('map');
    if (container && container._leaflet_id) {
      container._leaflet_id = null; // Remove ID do mapa inicializado
    }
  }, []);

  const SelecionarPonto = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;

        if (!selecionandoDestino) {
          setOrigem(e.latlng);
          setLatOrigem(lat);
          setLngOrigem(lng);
          setSelecionandoDestino(true);
        } else {
          setDestino(e.latlng);
          setLatDestino(lat);
          setLngDestino(lng);
          setSelecionandoDestino(false);
        }
      }
    });
    return null;
  };

  const handleClose = () => {
    setError(0);
    setSucess(0);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 flex text-black">
      <Aside></Aside>
      {error === 1 && <AlertError message={"Ocorreu um erro"} onClose={handleClose} />}
      {sucess === 1 && <AlertSucess message={"Operação Concluída com sucesso"} onClose={handleClose} />}

      <div className="container max-w-lg mx-auto p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Cadastro de Viagem</h1>

        <form className="space-y-6">
          {/* ID do Veículo */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Veiculo</label>
            <select
              onChange={(e) => setIdVeiculo(e.target.value)}
              value={idVeiculo}
              className="border border-gray-300 rounded-lg p-3 w-full focus:ring focus:ring-blue-200 transition-all duration-300"
            >
              <option value="">Selecione o Veiculo</option>
              {veiculo.length > 0 ? (
                veiculo.map((veiculo) => (
                  <option key={veiculo.id} value={veiculo.id}>
                    {veiculo.marca} - {veiculo.modelo} - {veiculo.placa} 
                  </option>
                ))
              ) : (
                <option>Carregando Veiculos...</option>
              )}
            </select>
          </div>
          

          {/* Latitude da Origem */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Latitude da Origem</label>
            <input
              type="number"
              placeholder="Latitude da Origem"
              value={latOrigem}
              onChange={(e) => setLatOrigem(Number(e.target.value))}
              className="border border-gray-300 rounded-lg p-3 w-full focus:ring focus:ring-blue-200 transition-all duration-300"
            />
          </div>

          {/* Longitude da Origem */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Longitude da Origem</label>
            <input
              type="number"
              placeholder="Longitude da Origem"
              value={lngOrigem}
              onChange={(e) => setLngOrigem(Number(e.target.value))}
              className="border border-gray-300 rounded-lg p-3 w-full focus:ring focus:ring-blue-200 transition-all duration-300"
            />
          </div>

          {/* Cidade de Origem */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Cidade de Origem</label>
            <select
              onChange={(e) => setIbgeCidadeOrigem(e.target.value)}
              value={ibgeCidadeOrigem}
              className="border border-gray-300 rounded-lg p-3 w-full focus:ring focus:ring-blue-200 transition-all duration-300"
            >
              <option value="">Selecione a Cidade de Origem</option>
              {cidades.length > 0 ? (
                cidades.map((cidade) => (
                  <option key={cidade.id} value={cidade.id}>
                    {cidade.nome} - {cidade.microrregiao.mesorregiao.UF.sigla}
                  </option>
                ))
              ) : (
                <option>Carregando cidades...</option>
              )}
            </select>
          </div>

          {/* Cidade de Destino */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Cidade de Destino</label>
            <select
              onChange={(e) => setIbgeCidadeDestino(e.target.value)}
              value={ibgeCidadeDestino}
              className="border border-gray-300 rounded-lg p-3 w-full focus:ring focus:ring-blue-200 transition-all duration-300"
            >
              <option value="">Selecione a Cidade de Destino</option>
              {cidades.length > 0 ? (
                cidades.map((cidade) => (
                  <option key={cidade.id} value={cidade.id}>
                    {cidade.nome} - {cidade.microrregiao.mesorregiao.UF.sigla}
                  </option>
                ))
              ) : (
                <option>Carregando cidades...</option>
              )}
            </select>
          </div>

          {/* Logradouro da Origem */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Logradouro da Origem</label>
            <input
              type="text"
              placeholder="Logradouro da Origem"
              value={logradouroOrigem}
              onChange={(e) => setLogradouroOrigem(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 w-full focus:ring focus:ring-blue-200 transition-all duration-300"
            />
          </div>

          {/* Latitude do Destino */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Latitude do Destino</label>
            <input
              type="number"
              placeholder="Latitude do Destino"
              value={latDestino}
              onChange={(e) => setLatDestino(Number(e.target.value))}
              className="border border-gray-300 rounded-lg p-3 w-full focus:ring focus:ring-blue-200 transition-all duration-300"
            />
          </div>

          {/* Longitude do Destino */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Longitude do Destino</label>
            <input
              type="number"
              placeholder="Longitude do Destino"
              value={lngDestino}
              onChange={(e) => setLngDestino(Number(e.target.value))}
              className="border border-gray-300 rounded-lg p-3 w-full focus:ring focus:ring-blue-200 transition-all duration-300"
            />
          </div>

          {/* Logradouro do Destino */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Logradouro do Destino</label>
            <input
              type="text"
              placeholder="Logradouro do Destino"
              value={logradouroDestino}
              onChange={(e) => setLogradouroDestino(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 w-full focus:ring focus:ring-blue-200 transition-all duration-300"
            />
          </div>

          <div>
            <h2>Selecione a Origem e Destino:</h2>
            <MapContainer id="map" center={[-15.7797, -47.9297]} zoom={4} style={{ height: "400px", width: "100%" }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {origem && <Marker position={origem} icon={customIcon}/>}
              {destino && <Marker position={destino} icon={customIcon}/>}
              <SelecionarPonto />
            </MapContainer>
          </div>

          <div className="flex justify-between">
          <button
            type="button"
            onClick={CadastrarViagem}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300"
          >
            Cadastrar Viagem
          </button>
          </div>
        </form>
      </div>
    </main>
  );
}
