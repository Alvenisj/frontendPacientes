import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Alerta } from "../components/Alerta.jsx";
import clienteAxios from "../config/axios.jsx";

import useAuth from "../hooks/useAuth.js";


export const Login = () => {


        const { setAuth } = useAuth();
        // 686 53 21 82
        const [ rolOption, setRolOption ] = useState('');
        const [ email, setEmail ] = useState('');
        const [ password, setPassword ] = useState('');
        const [ alerta, setAlerta ] = useState({});

        // HOOK QUE SE ENCARGA DE REDIRECCIONAR AL USUARIO
        const navigate = useNavigate();

        const handleSubmit = async ( e ) => {
            e.preventDefault();

                const datos = { rolOption, email, password };
                // VALIDAMOS QUE TODOS LOS CAMPOS ESTÉN LLENOS 
                if( Object.values(datos).some(value => value.trim() === '') ) {
                    setAlerta({
                        msg: 'Todos los campos son obligatorios',
                        error: true
                    });
                    return;
                }
                 try {
                    const { data } = await clienteAxios.post('/usuario/login', datos );
                    // console.log(data);
                        if (data.token) {
                            // ALMACENAR EL TOKEN DE MANERA SEGURA
                            localStorage.setItem('token', data.token);
                            setAuth(data);
                            navigate('/admin');
                        } else {
                            setAlerta({
                                msg: error.response.data.msg,
                                error: true
                            })
                        }
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
            <h1>Inicia Sesión y Administra tus {""} <span className="text-gray-900">Pacientes</span></h1>
        </div> 
        
        <div className="mt-10 md:mt-5 shadow-lg rounded-xl px-5 py-10 border bg-white">
                { msg && <Alerta alerta={alerta} /> }
                <form onSubmit={ handleSubmit } >
                        <div className="my-5">
                            <label className="uppercase text-gray-600 block text-xl font-bold"
                            >Rol</label>
                            <select 
                                    value={rolOption} 
                                    onChange={ e => setRolOption( e.target.value )}
                                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 mt-3"
                                    >
                                    <option value="" className="bg-gray-50">Seleccione...</option>
                                    <option value="Administrador">Administrador</option>
                                    <option value="Terapeuta Ocupacional">Terapeuta Ocupacional</option>
                                    <option value="Fisioterapeuta">Fisioterapeuta</option>
                                    <option value="Fisiatra">Fisiatra</option>
                                    <option value="Fonoaudiólogo">Fonoaudiólogo</option>
                                </select>
                        </div>
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
                        <div className="my-5">
                            <label className="uppercase text-gray-600 block text-xl font-bold" 
                            >Password</label>
                            <input
                                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                                type="password"
                                placeholder="Password de registro"
                                value={password}
                                onChange={ e => setPassword( e.target.value ) }
                            />
                        </div>

                        <input
                            className="bg-indigo-600 w-full py-3 px-10 rounded-lg text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
                            type="submit"
                            value="Iniciar Sesion"
                        />     
                </form>

                <nav className="mt-8 lg:flex lg:justify-between">
                        <Link
                        className="block text-center my-5 text-gray-500"
                        to="/registrar">¿No tienes una cuenta? Regístrate</Link>
                        <Link 
                        className="block text-center my-5 text-gray-500"
                        to="/olvide-password">¿Olvidaste tu contraseña?</Link>
                    </nav>

        </div>
        
        </>

        )
}
