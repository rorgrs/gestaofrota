'use client'

import { useRouter } from 'next/navigation';
import { useState } from "react";
import AlertSucess from "@/app/components/sucess";
import AlertError from "@/app/components/error";

export default function Home() {

    const [username, SetUsername] = useState([]);
    const [password, SetPassword] = useState([]);
    const [error, setError] = useState(0);
    const [sucess, setSucess] = useState(0);
    const router = useRouter();


    const Enter = async() => {

        try {
            /*Corpo da Requisição*/
            const bodyRequest = {
                "login": username,
                "senha": password
            } 

            console.log(bodyRequest)

            const response = await fetch('https://localhost:5001/Usuario/login', {
                method: 'POST',
                body: JSON.stringify(bodyRequest),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
                credentials: 'include'
            });
            const data = await response.json();
            const status = response.status;
            
            if(status === 200){
                localStorage.setItem('id', data.id);
                localStorage.setItem('token', data.token);
                router.push('/home');
            }
            else{
                setError(1);
            }

        } catch (error) {
            
            setError(1); // Atualiza o estado de erro
        }

    }

      const handleClose = () => {
        SetError("");
      };

    return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 p-8 flex items-center justify-center text-black">

        {error === 1 && <AlertError message={"Ocorreu um erro"} onClose={handleClose} />}
        {sucess === 1 && <AlertSucess message={"Operação Concluída com sucesso"} onClose={handleClose}  />}
        
        <div className='w-full max-w-xs'>
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Login</h1>
        <input 
          type="text" 
          className="border border-gray-300 rounded-lg p-3 mb-4 w-full"
          placeholder="User" 
          value={username}
          onChange={(e) => SetUsername(e.target.value)}
        />

        <input 
          type="password" 
          placeholder="password"
          className="border border-gray-300 rounded-lg p-3 mb-4 w-full"
          value={password}
          onChange={(e) => SetPassword(e.target.value)}
        />

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded justify-center" onClick={Enter}>
            Login
        </button>
        </div>
        
    </main>
    );
}