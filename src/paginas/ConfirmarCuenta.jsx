import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import clienteAxios from '../config/axios';
import { Alerta } from "../components/Alerta";


export const ConfirmandoLaCuenta = () => {

  const [ cuentaConfirmada, setCuentaConfirmada ] = useState(false);
  const [ cargando, setCargando ] = useState(true);
  const [ alerta, setAlerta ] = useState({});

  const params = useParams();
  const { id } = params;

        useEffect(()=>{

          const confirmCuenta = async ( ) => {
            try {
              const URL = `/usuario/confirmar/${id}`;
              const { data } = await clienteAxios(URL);
              console.log(data)
              setCuentaConfirmada(true);
              setAlerta({
                msg: data.msg,
                error: false
              })
            } catch( error ) {
              setAlerta({
                msg: error.response.data.msg,
                error: true
              })
            }


            setCargando(false)
          }

          confirmCuenta( );
        }, [] );

    return (
          <>
                <div className="text-indigo-600 font-black text-4xl my-3 text-center">
                  <h1>Confirma tu cuenta en el sistema y administra tus {""} <span className="text-gray-900">Pacientes</span></h1>
                </div> 

              <div className="mt-10 md:mt-5 shadow-lg rounded-xl px-5 py-10 border bg-white">
                   { !cargando && <Alerta alerta={alerta} /> }  

                   { cuentaConfirmada && (
                      <Link
                        className="block text-center my-5 text-gray-500"
                        to="/"
                      >¿Ya tienes una cuenta? Iniciar Sesión</Link>
                   ) }       
              </div>
          </>
    )

    
}
