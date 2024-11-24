import { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Componente para selecionar a origem e destino no mapa
function SelecionarPonto({ isSelectingOrigem, setOrigem, setDestino, toggleSelection }) {
  useMapEvents({
    click(e) {
      if (isSelectingOrigem) {
        setOrigem(e.latlng); // Define a origem com as coordenadas clicadas
      } else {
        setDestino(e.latlng); // Define o destino com as coordenadas clicadas
      }
      toggleSelection(); // Alterna entre origem e destino após cada clique
    },
  });
  return null; // Não renderiza nada visualmente
}

export default function MapaViagem() {
  const [origem, setOrigem] = useState(null);
  const [destino, setDestino] = useState(null);
  const [isSelectingOrigem, setIsSelectingOrigem] = useState(true);

  // Alterna entre selecionar origem e destino
  const toggleSelection = () => {
    setIsSelectingOrigem(!isSelectingOrigem);
  };

  return (
    <MapContainer  center={[-15.7801, -47.9292]} zoom={4} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <SelecionarPonto
        isSelectingOrigem={isSelectingOrigem}
        setOrigem={setOrigem}
        setDestino={setDestino}
        toggleSelection={toggleSelection}
      />
      {origem && <Marker position={origem} />}
      {destino && <Marker position={destino} />}
      <div className="flex space-x-4 mt-4">
        <button onClick={() => setIsSelectingOrigem(true)}>Selecionar Origem</button>
        <button onClick={() => setIsSelectingOrigem(false)}>Selecionar Destino</button>
      </div>
    </MapContainer>
  );
}
