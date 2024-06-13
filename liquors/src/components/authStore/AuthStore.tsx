"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";

interface AuthProps {
  children: React.ReactNode;
}
interface UserToken {
  email: string;
  firebaseUid: string;
  id: string;
  name: string;
  provider: any;
  role: number;
  token: string;
}

const AuthStore: React.FC<AuthProps> = ({ children }) => {
  const [token, setToken]: any = useState(); // Inicializa el estado con el tipo adecuado

  useEffect(() => {
    const fetchUserData = async () => {
      const userDataLogin = localStorage.getItem("userDataLogin");

      if (userDataLogin) {
        const userData: UserToken = JSON.parse(userDataLogin);
        const userId = userData.id;
        const userToken = userData.token;
        setToken(userToken!);
        console.log("este es el token que tiene en el storages", token);
        try {
          const response = await axios.get(
            `https://liquors-project.onrender.com/users/${userId}`
          );
          var newUserData: UserToken = response.data;

          if (newUserData.role !== userData.role) {
            console.log("Token cambiado");

            newUserData.token = token; // Corregir si hay lógica específica aquí
            localStorage.setItem("userDataLogin", JSON.stringify(newUserData));
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [Provider]);

  return <div>{children}</div>;
};

export default AuthStore;
