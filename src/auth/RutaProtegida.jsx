
import {Navigate} from "react-router-dom";

const RutaProtegida = ({isAuthenticated, children, accion}) =>{ // children es el elemento que estara contenido cuando se usa RutaProtegida
    if(!isAuthenticated && accion == "no"){
        return null;
    }else if (!isAuthenticated && accion == null){
        return <Navigate to="/" replace></Navigate>;
    }
    else{
        return children;
    }

}

export default RutaProtegida;
