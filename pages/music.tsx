import React from "react";
import { useRouter } from "next/router";


const Landing: React.FC = () => {
    const router = useRouter();

    const signUp = (event: React.FormEvent) => {
        event.preventDefault();
        router.push("/register");
      };
    
    const signIn = (event: React.FormEvent) => {
        event.preventDefault();
        router.push("/login");
      };

    return(
        <html lang="en">
        <head>
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Document</title>
        </head>
        <body>
            <h1>hola</h1>
        </body>
        </html>
    );
};

export default Landing;