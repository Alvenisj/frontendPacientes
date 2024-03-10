import usePacientes from "../hooks/usePacientes";
import { Paciente } from "./Paciente";


export const ListadoPacientes = () => {


    const { pacientes } = usePacientes( );

    

    return (

       <>
             { pacientes.length ? (
                <>
                     <h2 className="font-semibold text-3xl text-center">Listado de Pacientes</h2>
                     <p className="text-xl mt-5 mb-10 text-center">Administra tus pacientes y citas 
                     </p>

                     { pacientes.map( paciente => ( 
                        <Paciente
                            key={ paciente._id }
                            paciente={paciente}
                        /> 
                        ) )}
                </>
             ) : (

                <>
                     <h2 className="font-black text-3xl text-center">No Hay Pacientes</h2>
                     <p className="text-xl mt-5 mb-10 text-center">Comienza agregando pacientes 
                     </p>
                </>

             )}
            

       
       </>
        
    )
}
