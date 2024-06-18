"use client";
import { DashboardSelector } from "@/components/dashboardSelector/dashboardSelector";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MenuDashboard } from "@/components/dashboardJuan/menuDashboard/menuDashboard";
import { AccountInfoCard } from "@/components/dashboardJuan/dashboardUser/dashboardUser";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";

const Profile: React.FC = (): React.ReactNode => {
  const [token, setToken] = useState<string | null>(null);
  // Estado del usuario
  const [dataUser, setDataUser] = useState({
    id: "",
    name: "",
    email: "",
    role: "",
    imageUrl: "",
  });

  const router = useRouter();

  useEffect(() => {
    const loginToken = localStorage.getItem("loginToken");
    setToken(loginToken);
  }, [token]);

  useEffect(() => {
    const userDataFromStorage: any = localStorage.getItem("userDataLogin");
    const dataParsed = JSON.parse(userDataFromStorage);
    if (dataParsed) {
      setDataUser(dataParsed);
    }
  }, []);

  return (
    <>
      {token && (
        <>
          <div className="bg-greyVivino flex flex-row pt-1 mb-1 h-full">
            <MenuDashboard />
            <div className="overflow-y-auto w-full">
              <h1 className="font-plus-jakarta-sans pt-4 text-3xl text-center text-wine font-semibold">
                ¡Bienvenido, {dataUser.name}!
              </h1>
              <br></br>
              <div className="flex flex-col items-center w-auto">
                <hr className="w-auto border-gray-300" />
              </div>
              <AccountInfoCard />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
