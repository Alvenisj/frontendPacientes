import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/axios";
import useAuth from "../hooks/useAuth";


// CREAMOS UNA INSTANCIA DEL CONTEXT
const PacientesContext = createContext();



 const PacientesProvider = ( { children } ) => {


        const { auth } = useAuth();
        // console.log(auth)

        // ESTADO QUE SE ENCARGA DE TODOS LOS PACIENTES
        const [ pacientes, setPacientes ] = useState([]);

        // ESTADO QUE ACTUALIZA LOS PACIENTES DE LA FUNCIÓN: setEdicion
        const [ paciente, setPaciente ] = useState({});



        useEffect(() => {

            const obtenerPacientes = async ( ) => {
                try {
                    const token = localStorage.getItem('token');
                    if( !token ) return;

                    const config = {
                        headers: {
                            "Content-Type": "application/json",
                             authorization: `Bearer ${token}`
                        }
                    }

                    const { data } = await clienteAxios.get('/pacientes', config);
                    setPacientes(data);

                } catch (  error) {
                    console.log(error)
                }
            }

            obtenerPacientes( );
        }, [ auth ]);

        const guardarPaciente = async ( paciente ) => {

            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${token}`
                }
            }

            if( paciente.id ) {
                // AQUÍ SE EDITA
               try {
                    const URL = `pacientes/${paciente.id}`
                    const { data } = await clienteAxios.put(URL, paciente, config );
                    
                    const pacientesActualizados = pacientes.map( pacienteState => pacienteState._id === data.id ? data : pacienteState )
                    setPacientes( pacientesActualizados )
               } catch ( error ) {
                    console.log(error)
               }
            } else {     
                // AQUÍ SE AGREGA NUEVO PACIENTE
                try {
                    const token = localStorage.getItem('token');
                    const config = {
                        headers: {
                            "Content-Type": "application/json",
                            authorization: `Bearer ${token}`
                        }
                    }
                    const { data } = await clienteAxios.post('/pacientes', paciente, config  );
                    const { createdAt, updatedAt, __v, ...pacienteAlmacenado } = data;
                    setPacientes([pacienteAlmacenado], ...pacientes )
                } catch ( error ) {
                    console.log(error.response.data.msg)
                }
            }



        }

        // FUNCIÓN QUE EDITA EL PACIENTE
        const setEdicion = ( paciente ) => {
            setPaciente(paciente);
        }

        // FUNCIÓN QUE ELIMINA EL PACIENTE
        const eliminarPaciente = async( id )=> {
            const confirmar = confirm('¿Deseas eliminar el paciente?');
            if( confirmar ) {
                try {
                    const token = localStorage.getItem('token');
                    const config = {
                        headers: {
                            "Content-Type": "application/json",
                            authorization: `Bearer ${token}`
                        }
                    }
                    const URL = `/pacientes/${id}`;
                    const { data } = await clienteAxios.delete(URL, config );
                    const mostrarPacientesRestantes = pacientes.filter( pacienteState => pacienteState._id !== id )
                    // console.log(data);
                    setPacientes( mostrarPacientesRestantes );
                } catch ( error ) {
                    console.log(error)
                }
            }
        }


return (

            <PacientesContext.Provider
                value={
                   {
                     pacientes,
                     guardarPaciente,
                     setEdicion,
                     paciente,
                     eliminarPaciente
                  }
                  }
            >
                { children }
            </PacientesContext.Provider>
    )



}

export {
    PacientesProvider
}




export default PacientesContext;