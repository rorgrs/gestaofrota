'use client';

import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import AlertSucess from "@/app/components/sucess";
import AlertError from "@/app/components/error";
import verify from "@/app/functions/verify";
import Aside from "@/app/components/aside";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// const customIcon = new L.Icon({
//     iconUrl: '/icons/pinmap.png',
//     iconSize: [25, 41],
//     iconAnchor: [12, 41],
//   });

export default function Viagem() {
    const { id } = useParams();
    const [viagemData, setViagemData] = useState({
        idVeiculo: 0,
        veiculo: null,
        latOrigem: 0,
        lngOrigem: 0,
        ibgeCidadeOrigem: 0,
        logradouroOrigem: "",
        latDestino: 0,
        lngDestino: 0,
        ibgeCidadeDestino: 0,
        logradouroDestino: ""
    });
    const [error, setError] = useState(0);
    const [sucess, setSucess] = useState(0);
    const [cidades, setCidades] = useState([]); // Estado para armazenar todas as cidades
    const [veiculo, setVeiculo] = useState([]);
    const [loading, setLoading] = useState(true);
    const [origem, setOrigem] = useState(null);
    const [destino, setDestino] = useState(null);
    const [selecionandoDestino, setSelecionandoDestino] = useState(false);

    const SelecionarPonto = () => {
        useMapEvents({
          click(e) {
            const { lat, lng } = e.latlng;
    
            if (!selecionandoDestino) {
              setOrigem(e.latlng);
              setViagemData({ ...viagemData, latOrigem: lat });
              setViagemData({ ...viagemData, latOrigem: lng });
              setSelecionandoDestino(true);
            } else {
              setDestino(e.latlng);
              setViagemData({ ...viagemData, latOrigem: lat });
              setViagemData({ ...viagemData, latOrigem: lng });
              setSelecionandoDestino(false);
            }
          }
        });
        return null;
      };

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

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch(`https://localhost:5001/viagem/${id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') },
                credentials: 'include'
            });
            const data = await response.json();

            setViagemData({
                idVeiculo: data.veiculo.id,
                veiculo: data.veiculo,
                paradas: data.paradas,
                latOrigem: data.latOrigem,
                lngOrigem: data.lngOrigem,
                ibgeCidadeOrigem: data.ibgeCidadeOrigem,
                logradouroOrigem: data.logradouroOrigem,
                latDestino: data.latDestino,
                lngDestino: data.lngDestino,
                ibgeCidadeDestino: data.ibgeCidadeDestino,
                logradouroDestino: data.logradouroDestino
            });
            setLoading(false);

            console.log(data)
        } catch (error) {
            console.error(error);
        }
    };

    
    const handleClose = () => {
        setError(0);
        setSucess(0);
    };

    const putData = async () => {
        console.log(viagemData)
        const viagemPut = {
            idVeiculo: viagemData.idVeiculo,
            latOrigem: viagemData.latOrigem,
            lngOrigem: viagemData.lngOrigem,
            ibgeCidadeOrigem: viagemData.ibgeCidadeOrigem,
            logradouroOrigem: viagemData.logradouroOrigem,
            latDestino: viagemData.latDestino,
            lngDestino: viagemData.lngDestino,
            ibgeCidadeDestino: viagemData.ibgeCidadeDestino,
            logradouroDestino: viagemData.logradouroDestino
        }
        console.log(viagemPut)
        try {
            const response = await fetch(`https://localhost:5001/viagem/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 
                            'Authorization': localStorage.getItem('token') },
                body: JSON.stringify(viagemPut)
            });
            const jsonResponse = await response.status;

            if (jsonResponse === 200) {
                setSucess(1);
            }
            else {
                setError(1);
            }
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (id) {
            verify();
            fetchData();
            buscarCidades();
            buscarVeiculo();
    //         var container = L.DomUtil.get('map');
    //   if(container != null){
    //     container._leaflet_id = null;
    //   }
            // const container = document.getElementById('map');
            // if (container && container._leaflet_id) {
            // container._leaflet_id = null; // Remove ID do mapa inicializado
            // }
        }
    }, [id]);

    // const [mapInitialized, setMapInitialized] = useState(false);
    // const mapRef = useRef(null); // Referência para o mapa

    // useEffect(() => {
    //     if (!mapInitialized && mapRef.current) {
    //         setMapInitialized(true); // Garante que o mapa é inicializado uma vez
    //         const map = mapRef.current;
    //         map.setView([-15.7797, -47.9297], 4);  // Definir o centro do mapa
    //         map.remove();
    //     }
    // }, [mapInitialized]);


    return (
        <main className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 flex text-black">
            <Aside></Aside> 
            {error === 1 && <AlertError message={"Ocorreu um erro"} onClose={handleClose} />}
            {sucess === 1 && <AlertSucess message={"Operação Concluída com sucesso"} onClose={handleClose}  />}

            {loading ? (
                <p>Carregando...</p>
            ) : (
                <div className="container max-w-lg mx-auto p-8 bg-white rounded-lg shadow-lg text-black">
                    <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Atualização de Viagem</h1>
                    <div className="flex justify-end mb-6">
                        <Link href={'/viagem/parada/create/' + id} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mr-8 rounded-lg transition-all duration-300">
                            Nova Parada
                        </Link>
                    </div>
                    <form className="space-y-6">

                        {/* <div>
                        <label className="block mb-2 font-medium text-gray-700">Veiculo</label>
                        <input
                            type="number"
                            placeholder="ID do Veículo"
                            disabled={false}
                            value={viagemData.idVeiculo}
                            onChange={(e) => setViagemData({ ...viagemData, idVeiculo: Number(e.target.value) })}
                            className="border border-gray-300 rounded-lg p-3 w-full focus:ring focus:ring-blue-200 transition-all duration-300"
                        />
                        </div> */}

                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Veiculo</label>
                            <select
                            onChange={(e) => setViagemData({ ...viagemData, idVeiculo: Number(e.target.value) })}
                            value={viagemData.idVeiculo}
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
                        <div>
                            <label className="block mb-2 font-medium text-gray-700">Latitude de Origem</label>
                            <input
                                type="number"
                                className="border border-gray-300 rounded-lg p-3 w-full"
                                value={viagemData.latOrigem}
                                onChange={(e) => setViagemData({ ...viagemData, latOrigem: Number(e.target.value) })}
                            />
                        </div>



                        <div>
                            <label className="block mb-2 font-medium text-gray-700">Longitude de Origem</label>
                            <input
                                type="number"
                                className="border border-gray-300 rounded-lg p-3 w-full"
                                value={viagemData.lngOrigem}
                                onChange={(e) => setViagemData({ ...viagemData, lngOrigem: Number(e.target.value) })}
                            />
                        </div>

                        <div>
                            <label className="block mb-2 font-medium text-gray-700">IBGE Cidade Origem </label>
                            <input
                                type="number"
                                className="border border-gray-300 rounded-lg p-3 w-full"
                                disabled={true}
                                value={viagemData.ibgeCidadeOrigem}
                                onChange={(e) => setViagemData({ ...viagemData, ibgeCidadeOrigem: Number(e.target.value) })}
                            />
                        </div>

                        <div>
                            <label className="block mb-2 font-medium text-gray-700">Logradouro de Origem</label>
                            <input
                                type="text"
                                className="border border-gray-300 rounded-lg p-3 w-full"
                                value={viagemData.logradouroOrigem}
                                onChange={(e) => setViagemData({ ...viagemData, logradouroOrigem: e.target.value })}
                            />
                        </div>


                        <div>
                            <label className="block mb-2 font-medium text-gray-700">Latitude de Destino</label>
                            <input
                                type="number"
                                className="border border-gray-300 rounded-lg p-3 w-full"
                                value={viagemData.latDestino}
                                onChange={(e) => setViagemData({ ...viagemData, latDestino: Number(e.target.value) })}
                            />
                        </div>

                        <div>
                            <label className="block mb-2 font-medium text-gray-700">Longitude de Destino</label>
                            <input
                                type="number"
                                className="border border-gray-300 rounded-lg p-3 w-full"
                                value={viagemData.lngDestino}
                                onChange={(e) => setViagemData({ ...viagemData, lngDestino: Number(e.target.value) })}
                            />
                        </div>

                        <div>
                            <label className="block mb-2 font-medium text-gray-700">IBGE Cidade Destino</label>
                            <input
                                type="number"
                                className="border border-gray-300 rounded-lg p-3 w-full"
                                disabled={true}
                                value={viagemData.ibgeCidadeDestino}
                                onChange={(e) => setViagemData({ ...viagemData, ibgeCidadeDestino: Number(e.target.value) })}
                            />
                        </div>

                        <div>
                            <label className="block mb-2 font-medium text-gray-700">Logradouro de Destino</label>
                            <input
                                type="text"
                                className="border border-gray-300 rounded-lg p-3 w-full"
                                value={viagemData.logradouroDestino}
                                onChange={(e) => setViagemData({ ...viagemData, logradouroDestino: e.target.value })}
                            />
                        </div>

                        {/* <div>
                            <h2>Selecione a Origem e Destino:</h2>
                            <MapContainer id="map" center={[-15.7797, -47.9297]} zoom={4} ref={mapRef} whenCreated={map => { mapRef.current = map }} style={{ height: "400px", width: "100%" }}>
                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                            {origem && <Marker position={origem} icon={customIcon}/>}
                            {destino && <Marker position={destino} icon={customIcon}/>}
                            <SelecionarPonto />
                            </MapContainer>
                        </div> */}

                        <button
                            type="button"
                            onClick={putData}
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300"
                        >
                            Atualizar
                        </button>
                    </form>
                </div>
            )}
        </main>
    );
}
