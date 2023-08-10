import React from "react";
import { useState } from 'react';
import { useRouter } from "next/router";

const key = process.env.SECRETKEY as string;

const LoginPage: React.FC = () => {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/authMiddleware', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email : 'gaspar@gmail.com', key }),
      });

      if (response.ok) {
        alert('Inicio de sesión exitoso');
      }
      else {
        const data = await response.json();
        throw new Error(data.error || 'Ocurrió un error al iniciar sesión');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Ocurrió un error al iniciar sesión');
    }
  };

    return (
      <h1>hola</h1>
    );
  };
  
  export default LoginPage;