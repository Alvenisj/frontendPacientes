import { useState } from "react";
import { AdminNav } from "../components/AdminNav";
import { Alerta } from "../components/Alerta";
import useAuth from "../hooks/useAuth";


export const CambiarPassword = () => {

    const { guardarPassword } = useAuth();

    const [ alerta, setAlerta ] = useState({});
    const [ password, setPassword ] = useState({
      password_actual: '',
      password_nuevo: ''
    });



    const handleSubmitEditarPerfil = async ( e ) => {
        e.preventDefault();

      if( Object.values(password).some( campo => campo === '' ) ) {
          setAlerta({
            msg: 'Todos los campos son obligatorios',
            error: true
          })

          return;
      }

      if( password.password_nuevo.length < 6 ) {
          setAlerta({
            msg: 'El password debe ser mínimo de 6 caracteres',
            error: true
          })

          return;
      }


     const respuesta = await guardarPassword( password );
    //  console.log(respuesta);
     setAlerta( respuesta );



    }


    const { msg } = alerta;

    return (

          <>
              <AdminNav />

              <h2 className="font-semibold text-3xl text-center mt-10">Cambiar Password </h2>
              <p className="text-xl mt-5 mb-10j text-center">Modifica tu {''} <span className="text-indigo-600 font-bold">Password aquí</span></p>

              <div className="flex justify-center">
                          <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
                              { msg && <Alerta alerta={alerta}/>}
                              <form onSubmit={ handleSubmitEditarPerfil }> 
                                      <div className="my-3">
                                          <label className="uppercase font-bold text-gray-600">Password Actual:</label>
                                          <input
                                              className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                              type="password"
                                              placeholder="Ingrese su password actual"
                                              name="password_actual"
                                              onChange={ e => setPassword({
                                                ...password,
                                                [e.target.name] : e.target.value
                                              })}
                                              

                                          />
                                      </div>
                                      <div className="my-3">
                                          <label className="uppercase font-bold text-gray-600">Password Nuevo:</label>
                                          <input
                                              className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                              type="password"
                                              placeholder="Ingrese tu password nuevo"
                                              name="password_nuevo"
                                              onChange={ e => setPassword({
                                                ...password,
                                                [e.target.name] : e.target.value
                                              })}
                                              

                                          />
                                      </div>
                                      

                                      <input
                                          className="bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg uppsercase w-full mt-5 hover:cursor-pointer hover:bg-indigo-900"
                                          type="submit"
                                          value="Actualizar Password"
                                      />
                              </form>
                          </div>
                  </div>

          </>

    )


}
