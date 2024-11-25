import { useEffect } from "react";

export default function veiculos(){
    useEffect
    return (
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
    );
}