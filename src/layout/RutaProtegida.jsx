import { Outlet, Navigate } from "react-router-dom";
// SACAMOS LA INFORMACIÓN DEL CONTEXT CREADOR QUE ES UN OBJETO CON TODA LA INFORMACIÓN DEL INICIO DE SESIÓN
import useAuth from "../hooks/useAuth";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";





export const RutaProtegida = () => {

    const { auth, cargando } = useAuth();

    if( cargando ) return 'Cargando.......'

    return (
       <>
              <Header />
                  { auth?.id ? (
                    <main className="container mx-auto mt-10">
                        <Outlet />
                    </main>
                  ) : <Navigate to="/" /> }
                  
              <Footer />
       </>
    )


}
