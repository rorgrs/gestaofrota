"use client";

import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import AlertSucess from "@/app/components/sucess";
import AlertError from "@/app/components/error";



const customIcon = new L.Icon({
  iconUrl: '/icons/pinmap.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});


export default function CadastroViagem() {
  const [idVeiculo, setIdVeiculo] = useState();
  const [latOrigem, setLatOrigem] = useState();
  const [lngOrigem, setLngOrigem] = useState();
  const [ibgeCidadeOrigem, setIbgeCidadeOrigem] = useState();
  const [logradouroOrigem, setLogradouroOrigem] = useState("");
  const [latDestino, setLatDestino] = useState();
  const [lngDestino, setLngDestino] = useState();
  const [ibgeCidadeDestino, setIbgeCidadeDestino] = useState();
  const [logradouroDestino, setLogradouroDestino] = useState("");
  const [origem, setOrigem] = useState(null);
  const [destino, setDestino] = useState(null);
  const [selecionandoDestino, setSelecionandoDestino] = useState(false);
  const [error, setError] = useState(0);
  const [sucess, setSucess] = useState(0);

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
        },
      });

      const jsonResponse = await response.status;
      if (jsonResponse === 200) {
        setSucess(1);
      }
      else {
        setError(1);
      }
    
      console.log(jsonResponse);
    } catch (error) {
      console.error("Erro ao cadastrar a viagem:", error);
    }
  };

  useEffect(() => {
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
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 p-8 flex items-center justify-center text-black">

      {error === 1 && <AlertError message={"Ocorreu um erro"} onClose={handleClose} />}
      {sucess === 1 && <AlertSucess message={"Operação Concluída com sucesso"} onClose={handleClose}  />}

      <div className="container max-w-lg mx-auto p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Cadastro de Viagem</h1>
        
        <form className="space-y-6">
          <input
            type="number"
            placeholder="ID do Veículo"
            value={idVeiculo}
            onChange={(e) => setIdVeiculo(Number(e.target.value))}
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring focus:ring-blue-200 transition-all duration-300"
          />
          <input
            type="number"
            placeholder="Latitude da Origem"
            value={latOrigem}
            onChange={(e) => setLatOrigem(Number(e.target.value))}
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring focus:ring-blue-200 transition-all duration-300"
          />
          <input
            type="number"
            placeholder="Longitude da Origem"
            value={lngOrigem}
            onChange={(e) => setLngOrigem(Number(e.target.value))}
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring focus:ring-blue-200 transition-all duration-300"
          />
          <input
            type="number"
            placeholder="IBGE da Cidade de Origem"
            value={ibgeCidadeOrigem}
            onChange={(e) => setIbgeCidadeOrigem(Number(e.target.value))}
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring focus:ring-blue-200 transition-all duration-300"
          />
          <input
            type="text"
            placeholder="Logradouro da Origem"
            value={logradouroOrigem}
            onChange={(e) => setLogradouroOrigem(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring focus:ring-blue-200 transition-all duration-300"
          />
          <input
            type="number"
            placeholder="Latitude do Destino"
            value={latDestino}
            onChange={(e) => setLatDestino(Number(e.target.value))}
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring focus:ring-blue-200 transition-all duration-300"
          />
          <input
            type="number"
            placeholder="Longitude do Destino"
            value={lngDestino}
            onChange={(e) => setLngDestino(Number(e.target.value))}
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring focus:ring-blue-200 transition-all duration-300"
          />
          <input
            type="number"
            placeholder="IBGE da Cidade de Destino"
            value={ibgeCidadeDestino}
            onChange={(e) => setIbgeCidadeDestino(Number(e.target.value))}
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring focus:ring-blue-200 transition-all duration-300"
          />
          <input
            type="text"
            placeholder="Logradouro do Destino"
            value={logradouroDestino}
            onChange={(e) => setLogradouroDestino(e.target.value)}
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring focus:ring-blue-200 transition-all duration-300"
          />

          <div>
            <h2>Selecione a Origem e Destino:</h2>
            <MapContainer id="map" center={[-15.7797, -47.9297]} zoom={4} style={{ height: "400px", width: "100%" }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {origem && <Marker position={origem} icon={customIcon}/>}
              {destino && <Marker position={destino} icon={customIcon}/>}
              <SelecionarPonto />
            </MapContainer>
          </div>

          <button
            type="button"
            onClick={CadastrarViagem}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300"
          >
            Cadastrar Viagem
          </button>
        </form>
      </div>
    </main>
  );
}
