import { logout } from "../middleware/auth";
import { message } from "antd";

export async function getCourts(props) {
    const response = await fetch("http://localhost:5000/api/booking/courts", {
        method: "GET",
        headers: {
            "x-access-token": localStorage.getItem("auth")
        }
    }).catch((err) => {
        return null;
    });

    if (response !== null) {
        if (response.status === 200) {
            const data = await response.json();
            return data.message;
        } else if (response.status === 401 || response.status === 403) {
            message.error("Tu sesión ha caducado. Inicia sesión de nuevo");
            logout(false);
            return props.history.push("/login");
        }
            else {
            message.error("Ha ocurrido un error, intentalo de nuevo más tarde");
            return [];
        }
    } else {
        message.error("Ha ocurrido un error, intentalo de nuevo más tarde");
        return [];
    }   
}


export async function getDisponibility(props, day, court) {
    const response = await fetch("http://localhost:5000/api/booking/disponibility", {
        method: "POST",
        headers: {
            "x-access-token": localStorage.getItem("auth")
        }
    }).catch((err) => {
        return null;
    });

    if (response !== null) {
        
    } else {
        message.error("Ha ocurrido un error, intentalo de nuevo más tarde");
        return [];
    }

}