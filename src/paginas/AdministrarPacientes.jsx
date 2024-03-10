import { useState } from "react";
import { FormularioPacientes } from "../components/FormularioPacientes";
import { ListadoPacientes } from "../components/ListadoPacientes";


export const AdministrarPacientes = () => {


    const [ mostrarFormulario, setMostrarFormualario ] = useState(false);


    return (

      <div className="flex flex-col md:flex-row">
            <button
              type="button"
              className="bg-indigo-600 text-white font-bold uppercase mx-10 p-3 rounded-md mb-10 md:hidden"
              onClick={ ( ) => setMostrarFormualario(!mostrarFormulario) }
            >
             { mostrarFormulario ? 'Ocultar Formulario' : 'Mostrar Fomulario' }
            </button>
            <div className={ `${ mostrarFormulario ? 'block' : 'hidden' } md:block md:w-1/2 lg:w-2/5 `}>
                  <FormularioPacientes />
            </div >

            <div className="md:w-1/2 lg:w-3/5">
                  <ListadoPacientes />
            </div>
      </div>

    )
  
}
