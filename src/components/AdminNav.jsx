import { Link } from "react-router-dom";





export const AdminNav = () => {


    return (

        <nav className="flex gap-3 mx-2">
            <Link 
                to="/admin/perfil"
                className="font-bold uppercase text-gray-500 mx-2"
                >Perfil
            </Link>

            <Link
                to="/admin/cambiar-password"
                className="font-bold uppercase text-gray-500"
            >Cambiar Password
            </Link>
        </nav>

    )


}
