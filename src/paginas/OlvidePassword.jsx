import { Link } from "react-router-dom";
import { useState} from "react";
import { Alerta } from "../components/Alerta";
import clienteAxios from "../config/axios";



export const OlvidePassword = () => {


  const [ email, setEmail ] = useState('');
  const [ alerta, setAlerta ] = useState({});
  

  const handleSubmit = async ( e ) => {
        e.preventDefault();

        if( email === '' ) {
          setAlerta({
            msg: "El email es OBLIGATORIO",
            error: true
          })
          return
        }

        try {
          const { data } = await clienteAxios.post('/usuario/olvide-password', { email } );
          // console.log(response);
          setAlerta({
            msg: data.msg,
            error: false
          })

        } catch ( error ) {
          setAlerta({
            msg: error.response.data.msg,
            error: true
          })
        }
  }


  const { msg } = alerta;

  return (
     <>
        <div>
            <div className="text-indigo-600 font-black text-4xl my-3 text-center">
                  <h1>Recupera el acceso a tu cuenta y administra tus {""} <span className="text-gray-900">Pacientes</span></h1>
           </div> 
        </div>
        <div className="mt-10 md:mt-5 shadow-lg rounded-xl px-5 py-10 border bg-white">
                { msg && <Alerta alerta={alerta} /> }
                <form 
                  onSubmit={ handleSubmit }
                 >
                     <div className="my-5">
                            <label className="uppercase text-gray-600 block text-xl font-bold"
                            >Email</label>
                            <input
                                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                                type="email"
                                placeholder="Email de registro"
                                value={email}
                                onChange={ e => setEmail( e.target.value ) }
                            />
                     </div>

                     <input
                          className="bg-indigo-600 w-full py-3 px-10 rounded-lg text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
                          type="submit"
                          value="Enviar correo"
                      />
               </form>

               <nav className="mt-8 lg:flex lg:justify-between">
                         <Link
                            className="block text-center my-5 text-gray-500"
                            to="/">¿Ya tienes una cuenta? Inicia Sesión</Link>
                          <Link 
                            className="block text-center my-5 text-gray-500"
                            to="/registrar">¿No tienes una cuenta? Regístrate
                            </Link>
                </nav>
        </div>
        
    </>
  )
  
}
