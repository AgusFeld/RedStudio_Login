import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const MusicPage: React.FC = () => {
  const router = useRouter();

  const [authenticated, setAuthenticated] = useState(false);
  const [userData, setUserData] = useState<any>(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/music', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        });
  
        console.log('Respuesta del servidor:', response);
  
        if (response.ok) {
          const data = await response.json();
          console.log('Datos del usuario:', data);
          setUserData(data);
          setAuthenticated(true);
        } else {
          console.error('Error en la respuesta del servidor:', response);
          router.push('/login');
        }
      } catch (error) {
        console.error('Error al obtener datos de usuario:', error);
        router.push('/login');
      }
    };
  
    fetchData();
  }, []);

  if (!authenticated) {
    return <p>Redirigiendo...</p>;
  }

  return (
    <div>
      <h1>Página de Música</h1>
      {userData && (
        <div>
          <p>Nombre: {userData.name}</p>
          <p>Correo electrónico: {userData.email}</p>
          {/* Otros datos de usuario */}
        </div>
      )}
    </div>
  );
};

export default MusicPage;