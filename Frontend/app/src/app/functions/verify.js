import { useRouter } from "next/router";

export default async function verify (token){
    // const router = useRouter();
    try {
        const response = await fetch('https://localhost:5001/Usuario/login', {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': localStorage.getItem('token')
            }
          });

        const status = response.status;
        if (status != 200) {
            localStorage.removeItem('token');
            location.href = 'http://localhost:3000'
            // router.push('/login');
        }
    } catch (error) {
        console.log('Ocorreu um erro');
    }
}