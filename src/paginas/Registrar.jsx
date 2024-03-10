import { Link } from "react-router-dom";
import { useState } from "react";
import clienteAxios from "../config/axios";
import { Alerta } from "../components/Alerta";



export const Registrar = () => {

    const [ rolOption, setRolOption ] = useState('');
    const [ nombre, setNombre ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ repetirPassword, setRepetirPassword ] = useState('');
    const [ alerta, setAlerta ] = useState({});

    const handleSubmit = async ( e ) => {
                e.preventDefault( );
                // VALIDAMOS QUE TODOS LOS CAMPOS ESTÉN LLENOS 
                if( [rolOption, nombre, email, password, repetirPassword ].includes('') ) {
                    setAlerta({
                        msg: 'Hay campos vacios',
                        error: true
                    });
                    return;
                }
                // VALIDAMOS QUE LOS PASSWORD NO SEAN IGUALES
                if( password !== repetirPassword ) {
                    setAlerta({
                        msg: 'Los password no son iguales',
                        error: true
                    });
                    return;
                }
                // VALIDAMOS EL MÍNIMO DE CARACTERES QUE DEBE TENER EL PASSWORD
                if( password.length < 6 ) {
                    setAlerta({
                        msg: 'El password es muy corto, por favor ingresa mínimo 6 caracteres',
                        error: true
                    });
                    return;
                }

            // SI CUMPLE TODAS LAS VALIDACIONES ENTONCES GUARDAMOS CON ÉXITO LOS DATOS DEL FORMULARIO
            setAlerta({});

            // CREAMOS EL USUARIO EN LA API
            try {
              await clienteAxios.post('/usuario', { rolOption, nombre, email, password} )
                setAlerta({
                    msg: 'Creado Correctamente, revisa tu email',
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
          <div className="text-indigo-600 font-black text-4xl my-3 text-center">
              <h1>Crea tu cuenta y Administra tus {""} <span className="text-gray-900">Pacientes</span></h1>
           </div> 

          <div className="mt-10 md:mt-5 shadow-lg rounded-xl px-5 py-10 border bg-white">
                { msg && <Alerta alerta={alerta} />}
                <form onSubmit={ handleSubmit } >
                      <div className="my-5">
                            <label className="uppercase text-gray-600 block text-xl font-bold"
                            >Rol</label>
                            <select 
                                value={rolOption} 
                                onChange={ e => setRolOption( e.target.value )}
                                className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 mt-3"
                                >
                                <option value="" >Seleccione...</option>
                                <option value="Administrador">Administrador</option>
                                <option value="Terapeuta Ocupacional">Terapeuta Ocupacional</option>
                                <option value="Fisioterapeuta">Fisioterapeuta</option>
                            </select>
                      </div>
                      <div className="my-5">
                          <label className="uppercase text-gray-600 block text-xl font-bold"
                          >Nombre</label>
                          <input
                              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                              type="text"
                              placeholder="Tu nombre"
                              value={nombre}
                              onChange={ e => setNombre( e.target.value )}
                          />
                      </div>
                      <div className="my-5">
                          <label className="uppercase text-gray-600 block text-xl font-bold"
                          >Email</label>
                          <input
                              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                              type="email"
                              placeholder="Email de registro"
                              value={email}
                              onChange={ e => setEmail( e.target.value )}
                          />
                      </div>
                      <div className="my-5">
                          <label className="uppercase text-gray-600 block text-xl font-bold" 
                          >Password</label>
                          <input
                              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                              type="password"
                              placeholder="Tu password"
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
                              placeholder="Repite tu password"
                              value={repetirPassword}
                              onChange={ e => setRepetirPassword( e.target.value )}
                          />
                      </div>

                      <input
                          className="bg-indigo-600 w-full py-3 px-10 rounded-lg text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
                          type="submit"
                          value="Crear Cuenta"
                      />
                </form>

                <nav className="mt-8 lg:flex lg:justify-between">
                          <Link
                            className="block text-center my-5 text-gray-500"
                            to="/">¿Ya tienes una cuenta? Inicia Sesión</Link>
                          <Link 
                            className="block text-center my-5 text-gray-500"
                            to="/olvide-password">¿Olvidaste tu contraseña? Recupera Contraseña</Link>
                  </nav>
          </div>
      </>
  )
}
