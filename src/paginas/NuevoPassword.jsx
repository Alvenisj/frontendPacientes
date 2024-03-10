import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Alerta } from "../components/Alerta";
import clienteAxios from "../config/axios";





export const NuevoPassword = () => {

const [ password, setPassword ] = useState('');
const [ repetirPassword, setRepetirPassword ] = useState('');
const [ alerta, setAlerta ] = useState({});
// CON ESTE ESTADO NOS ENCARGAMOS DE MOSTRAR EN LA INTERFAZ EL FORMULARIO SI EL TOKEN ES VÁLIDO
const [ tokenValido, setTokenValido ] = useState(false);
// CON ESTE ESTADO NOS ENCARGAMOS DE MOSTRAR EN LA INTERFAZ 
const [ passwordModificado, setPasswordModificado ] = useState(false);
 
const params = useParams();
const { token } = params;

    useEffect(()=>{

        const comprobarTokenRecuperacion = async ( ) => {
            try {
                await clienteAxios.get(`/usuario/olvide-password/${token}`);
                setAlerta({
                    msg: "Coloca tu nuevo password"
                })
                setTokenValido(true);
            } catch( error ) {
                setAlerta({
                    msg: 'Hubo un error con el enlace...',
                    error: true
                });
            }
        }

        comprobarTokenRecuperacion();
    }, []);

    const handleSubmit = async ( e ) => {
                e.preventDefault();
                // VALIDAMOS QUE LOS PASSWORD NO SEAN IGUALES
                if( password !== repetirPassword ) {
                    setAlerta({
                        msg: "Los password no son iguales",
                        error: true
                    })
                    return
                }
                // VALIDAMOS EL MÍNIMO DE CARACTERES QUE DEBE TENER EL PASSWORD
                if( password.length < 6 ) {
                    setAlerta({
                        msg: "El password debe ser mínimo de 6 caracteres",
                        error: true
                    })
                    return   
                }

                    try {
                        const URL = `/usuario/olvide-password/${token}`;
                        const { data } = await clienteAxios.post(URL, { password } );
                        // console.log(data);
                        setAlerta({
                            msg: data.msg,
                            error: false    
                        })
                        setPasswordModificado(true);
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
                <div className="text-indigo-600 font-black text-4xl my-3 text-center">
                    <h1>Restablece tu password y administra tus {""} <span className="text-gray-900">Pacientes</span></h1>
                </div> 

                <div className="mt-10 md:mt-5 shadow-lg rounded-xl px-5 py-10 border bg-white">
                    { msg && <Alerta alerta={ alerta }/> }

                    { tokenValido && (
                        <>
                                <form 
                                    onSubmit={ handleSubmit }
                                    >
                                    <div className="my-5">
                                            <label className="uppercase text-gray-600 block text-xl font-bold" 
                                            > Nuevo Password</label>
                                            <input
                                                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                                                type="password"
                                                placeholder="Tu nuevo password"
                                                value={password}
                                                onChange={ e => setPassword( e.target.value ) }
                                            />
                                    </div>
            
                                      <div className="my-5">
                                          <label className="uppercase text-gray-600 block text-xl font-bold" 
                                          >Repite Password</label>
                                          <input
                                                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                                                type="password"
                                                placeholder="Repite tu nuevo password"
                                                value={repetirPassword}
                                                onChange={ e => setRepetirPassword( e.target.value )}
                                      />
                                      </div>
            
                                    <input
                                        className="bg-indigo-600 w-full py-3 px-10 rounded-lg text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
                                        type="submit"
                                        value="Guardar nuevo Password"
                                    />
                              </form>
                        </>
                             
                    ) }

                    { passwordModificado && <Link
                                               className="block text-center my-5 text-gray-500"
                                               to="/">¿Ya tienes una cuenta? Iniciar Sesión
                                           </Link>  }


                </div>
      </>
  )



}
