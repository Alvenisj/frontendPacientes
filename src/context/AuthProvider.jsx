import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/axios";


// CREAMOS UNA INSTANCIA DEL CONTEXT
const AuthContext = createContext();


const AuthProvider = ( { children } ) => {


    const [ cargando, setCargando ] = useState(true);
    const [ auth, setAuth ] = useState(null);

    // console.log(auth)

    useEffect(() => {
        // FUNCIÓN AUTENTICAR USUARIO
        const autenticarUsuario = async ( ) => {
            const token = localStorage.getItem('token');
            // SI NO HAY TOKEN 
            if(!token) {
                setCargando(false);
                return
            }
            // SI HAY TOKEN 
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            // REALIZAMOS LA PETICIÓN HACIA EL URL DE AUTENTICAR USUARIO
            try {

                const { data } = await clienteAxios.get('/usuario/perfil', config );
                const { perfil } = data;
                // LE PASAMOS EL OBJETO DEL USUARIO AL STATE
                setAuth( perfil );
                // console.log(perfil);
            } catch ( error ) {
                console.log(error.response.data.smg);
                setAuth({});
            }

            setCargando( false );
            
        }

        autenticarUsuario();
    }, [] );


    const cerrarSesion = ( ) => {
        localStorage.removeItem('token');
        setAuth({});
    }

    const actualizarPerfil = async ( datos ) => {

        const token = localStorage.getItem('token');
        const config = {
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`
            }
        }
        try {
            const URL = `/usuario/perfil/${datos.id}`;
            const { data } = await clienteAxios.put(URL, datos, config );
            // console.log(data);
            return {
                msg: data.msg,
                error: false
            }

        } catch ( error ) {
            return {
                msg: error.response.data.msg,
                error: true
            }
        }
    }


    const guardarPassword = async ( datos ) => {

       const token = localStorage.getItem('token');
       if( !token ) {
        setCargando(false);
        return;
       }
       const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
       }

       try {
        const URL = `/usuario/cambiarPassword`;
        const { data } = await clienteAxios.put(URL, datos, config );
        return {
            msg: data.msg,
            error: false
        }

       } catch( error ) {
            return {
                msg: error.response.data.msg,
                error: true
            }
       }



    }



    return (
        <AuthContext.Provider
            value={{
                auth, 
                setAuth,
                cargando,
                cerrarSesion,
                actualizarPerfil,
                guardarPassword
            }}
        >
            { children }
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}




export default AuthContext;



