// CON EL useContext PODEMOS EXTRAER LOS DATOS DEL ESTADO GLOBAL DEL createContext DEL ARCHIVO AuthProvider.jsx
import { useContext } from 'react';
// CON ESTA IMPORTACIÓN ACCEDEMOS AL ARCHIVO QUE CONTIENE EL CONTEXT, ES DECIR EL ESTADO GLOBLAL
import AuthContext from '../context/AuthProvider.jsx';



const useAuth = ( ) => {


        return useContext(AuthContext)

}



export default useAuth;




