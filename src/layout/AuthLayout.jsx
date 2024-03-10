import { Outlet } from "react-router-dom";

// ESTA AuthLayout FUNCINA COMO UN MASTER PAGE
export const AuthLayout = () => {


  return (
    <>
        <main className="container mx-auto md:grid md:grid-cols-2 mt-12 gap-6 p-5">
              {/* ESTE COMPONENTE CARGA LO QUE VIENE DE LOGIN EN LA PÁGINA PRINCIPAL */}
              <Outlet />    
        </main>
    </>
  )


}
