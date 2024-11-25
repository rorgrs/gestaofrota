"use client";

import Aside from "@/app/components/aside";
import verify from "@/app/functions/verify";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";


export default function CadastroParada() {
  
  const { id } = useParams();
  const [Lat, setLat] = useState(0);
  const [Lng, setLng] = useState(0);
  const [IbgeCidade, setIbgeCidade] = useState(0);
  const [Logradouro, setLogradouro] = useState("");
  const [origem, setOrigem] = useState(null);
  const [destino, setDestino] = useState(null);

  const SelecionarPonto = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
          setLat(lat);
          setLng(lng);      
      }
    });
    return null;
  };

  const CreateParada = async () => {

    const data = {
      lat: Lat,
      lng: Lng,
      ibgeCidade: IbgeCidade,
      logradouro: Logradouro
    };

    console.log(data);
    try {
      const response = await fetch(`https://localhost:5001/viagem/${id}/parada`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          'Authorization': localStorage.getItem('token')
        },
      });

      const jsonResponse = await response.status;
      console.log(jsonResponse);
    } catch (error) {
      console.error("Erro ao cadastrar licenciamento:", error);
    }
  };

  useEffect(()=>{
    verify();
    const container = document.getElementById('map');
    if (container && container._leaflet_id) {
      container._leaflet_id = null; // Remove ID do mapa inicializado
    }
  },[])

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 flex text-black">
      <Aside></Aside>
      <div className="container max-w-lg mx-auto p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Cadastro de Paradas</h1>

        {/* Formulário de cadastro */}
        <form className="space-y-6">
          <input
            type="number"
            className="border border-gray-300 rounded-lg p-3 w-full"
            placeholder="Longitude"
            value={Lng}
            onChange={(e) => setLng(e.target.value)}
          />
          <input
            type="number"
            className="border border-gray-300 rounded-lg p-3 w-full"
            placeholder="Latitude"
            value={Lat}
            onChange={(e) => setLat(e.target.value)}
          />
          {/* <input
            type="number"
            className="border border-gray-300 rounded-lg p-3 w-full"
            placeholder="IBGE Cidade"
            value={IbgeCidade}
            onChange={(e) => setIbgeCidade(e.target.value)}
          /> */}

          <input
            type="text"
            className="border border-gray-300 rounded-lg p-3 w-full"
            placeholder="Logradouro"
            value={Logradouro}
            onChange={(e) => setLogradouro(e.target.value)}
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
            onClick={CreateParada}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300"
          >
            Cadastrar Parada
          </button>
        </form>
      </div>
    </main>
  );
}
