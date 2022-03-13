import { message } from "antd";
import { logout } from "../middleware/auth";

export function getCourts(props) {

    fetch("http://localhost:5000/api/booking/courts", {
        method: "GET",
        headers: {
            "x-access-token": localStorage.getItem("auth")
        },
    }).then((response) => {
        if (response.status === 200) {
            response.json().then((data) => {
                console.log(data.message);
            });
            return null;
        } else if (response.status === 401 || response.status === 403) {
            message.error("Tu sesión ha caducado. Inicia sesión de nuevo");
            logout(false);
            props.history.push("/login");
        } else {
            message.error("Ha ocurrido un error, intentalo de nuevo más tarde");
        }
    }).catch((err) => {

    });

    return ["pista1", "pista2"]
}