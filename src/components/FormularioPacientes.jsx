import { useState, useEffect } from "react";
import { Alerta } from "./Alerta";
import usePacientes from "../hooks/usePacientes";



export const FormularioPacientes = () => {

    const [ nombres, setNombres ] = useState('');
    const [ apellidos, setApellidos ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ direccion, setDireccion ] = useState('');
    const [ telefono, setTelefono ] = useState('');
    const [ fecha, setFecha ] = useState('');
    const [ descripcionSintomas, setDescripcionSintomas ] = useState('');
    const [ id, setId ] = useState(null);

    const [ alerta, setAlerta ] = useState({});

    const { guardarPaciente, paciente } = usePacientes( );



    useEffect(() => {
        if(paciente?.nombres ) {
            setNombres(paciente.nombres);
            setApellidos(paciente.apellidos);
            setEmail(paciente.email);
            setDireccion(paciente.direccion);
            setTelefono(paciente.telefono);
            setFecha(paciente.fecha );
            setDescripcionSintomas(paciente.descripcionSintomas );
            setId( paciente._id );

        }

    }, [paciente] );

    
    const handleFormularioPacientes = ( e ) => {
        e.preventDefault();
            // VALIDAMOS EL FORMULARIO
            if([ nombres, apellidos, email, direccion, telefono, fecha, descripcionSintomas ].includes('') ) {
                setAlerta({
                    msg: "Todos los campos son obligatorios",
                    error: true
                })

                return;
            }

            guardarPaciente({nombres, apellidos, email, direccion, telefono, fecha, descripcionSintomas, id});
            setAlerta({
                msg: "Guardado Correctamente el pacientes"
            });

            // DEJAMOS LOS CAMPOS DEL FORMULARIO VACIOS
            setNombres('');
            setApellidos('');
            setEmail('');
            setDireccion('');
            setTelefono('');
            setFecha('');
            setDescripcionSintomas('');
            setId('');

       
    }

    const { msg } = alerta;
    return (

        <>
            <h2 className="font-semibold text-3xl text-center">Administrador de Pacientes</h2>
            <p className="text-xl mt-5 mb-10 text-center">Añade tus pacientes y {''} 
                <span className="text-indigo-600 font-bold">Administralos</span>
            </p>

           <form 
                 className="bg-white ý-10 p-6 mb-10 lg:mb-0 shadow-md rounded-md"
                 onSubmit={handleFormularioPacientes}>
                <div className="mb-5">
                    <label 
                        htmlFor='nombres'
                        className="text-gray-700 uppercase font-bold"
                        > Nombres del Paciente:
                        </label>
                    <input
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        id="nombres"
                        value={nombres}
                        type="text"
                        placeholder="Nombres del paciente"
                        onChange={ e => setNombres( e.target.value )  }
                    />
                </div>

                <div className="mb-5">
                    <label
                         htmlFor='apellidos'
                         className="text-gray-700 uppercase font-bold"
                    > Apellidos del Paciente:</label>
                    <input
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        id="apellidos"
                        value={apellidos}
                        type="text"
                        placeholder="Apellidos del paciente"
                        onChange={ e => setApellidos( e.target.value ) }
                    />
                </div>

                <div className="mb-5">
                    <label
                         htmlFor='email'
                         className="text-gray-700 uppercase font-bold"
                    > Email del Paciente:</label>
                    <input
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        id="email"
                        type="email"
                        placeholder="Email del paciente"
                        value={email}
                        onChange={ e => setEmail( e.target.value ) }
                    />
                </div>

                <div className="mb-5">
                    <label
                         htmlFor='direccion'
                         className="text-gray-700 uppercase font-bold"
                    > Dirección del Paciente:</label>
                    <input 
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        id="direccion"
                        type="text"
                        placeholder="Dirección del paciente"
                        value={direccion}
                        onChange={ e => setDireccion( e.target.value ) }
                    />
                </div>

                <div className="mb-5">
                    <label
                         htmlFor='telefono'
                         className="text-gray-700 uppercase font-bold"
                    >Teléfono del Paciente:</label>
                    <input 
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        id="telefono"
                        type="text"
                        placeholder="Teléfono del paciente"
                        value={telefono}
                        onChange={ e => setTelefono( e.target.value ) }
                    />
                </div>

                <div className="mb-5">
                    <label
                         htmlFor='fecha'
                         className="text-gray-700 uppercase font-bold"
                    >Fecha de Ingreso del Paciente:</label>
                    <input 
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        id="fecha"
                        type="date"
                        value={fecha}
                        onChange={ e => setFecha( e.target.value ) }
                    />
                </div>

                <div className="mb-5">
                    <label
                         htmlFor='descripcionSintomas'
                         className="text-gray-700 uppercase font-bold"
                    >Descripción de Sintomas del Paciente:</label>
                    <textarea 
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        id="descripcionSintomas"
                        placeholder="Describe los sintomas del paciente"
                        value={descripcionSintomas}
                        onChange={ e => setDescripcionSintomas( e.target.value ) }
                    />
                </div>

                <input
                    className="bg-indigo-600 w-full p-3 text-white uppercase font-bold rounded-md hover:bg-indigo-800 cursor-pointer transition-colors"
                    type="submit"
                    value={ id ? 'Guardar Cambios' : 'Agregar Paciente'}
                />


           </form>

            { msg && <Alerta alerta={alerta} /> }
        </>
        
    )
}
