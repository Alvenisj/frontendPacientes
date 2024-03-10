import usePacientes from "../hooks/usePacientes";
import { Alerta } from "./Alerta";

export const Paciente = ( { paciente }) => {

    const { setEdicion, eliminarPaciente } = usePacientes();

    const { _id, nombres, apellidos, email, direccion, telefono, fecha, descripcionSintomas  } = paciente;

    const formatearFecha = ( fecha ) => {
        const nuevaFecha = new Date(fecha);
        // Obtener los componentes de la fecha
        const dia =  nuevaFecha.getDate();
        const mes =  nuevaFecha.getMonth() + 1; // Nota: en JavaScript, los meses comienzan desde 0
        const anio = nuevaFecha.getFullYear();
        // Formatear la fecha en el formato deseado para Colombia
        const fechaFormateada = `${anio}-${mes < 10 ? '0' : ''}${mes}-${dia < 10 ? '0' : ''}${dia}`;
        return fechaFormateada;
        //  new Intl.DateTimeFormat('es-MX', { dateStyle: 'long' }).format(nuevaFecha)
    }


  return (

   <div className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl">
            <p className="font-bold uppercase text-gray-800 my-2">Nombres: {''}
                <span className="font-normal normal-case">{nombres}</span>
            </p>
            <p className="font-bold uppercase text-gray-800 my-2">Apellidos: {''}
                <span className="font-normal normal-case">{apellidos}</span>
            </p>
            <p className="font-bold uppercase text-gray-800 my-2">Email: {''}
                <span className="font-normal normal-case">{email}</span>
            </p>
            <p className="font-bold uppercase text-gray-800 my-2">Dirección: {''}
                <span className="font-normal normal-case">{direccion}</span>
            </p>
            <p className="font-bold uppercase text-gray-800 my-2">Teléfono: {''}
                <span className="font-normal normal-case">{telefono}</span>
            </p>
            <p className="font-bold uppercase text-gray-800 my-2">Fecha: {''}
                <span className="font-normal normal-case">{formatearFecha(fecha)}</span>
            </p>
            <p className="font-bold uppercase text-gray-800 my-2">Descripción de los Sintomas: {''}
                <span className="font-normal normal-case">{descripcionSintomas}</span>
            </p>

            <div className="flex justify-between my-5">
                <button
                    type="button"
                    className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white uppercase font-bold rounded-lg"
                    onClick={ ( ) => setEdicion( paciente ) }
                >
                        Editar
                </button>

                <button
                    type="button"
                    className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white uppercase font-bold rounded-lg"
                    onClick={ ( ) => eliminarPaciente( _id ) }
               >
                        Eliminar
                </button>
            </div>

   </div>

  )


}
