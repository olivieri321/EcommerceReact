
import {Navigate} from "react-router-dom";

const RutaProtegida = ({isAuthenticated, children}) =>{ // children es el elemento que estara contenido cuando se usa RutaProtegida
    if(!isAuthenticated){
        return <Navigate to="/login" replace></Navigate>;
    }else{
        return children;
    }

}

export default RutaProtegida;
