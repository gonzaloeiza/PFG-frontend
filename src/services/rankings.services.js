import { logout } from "../middleware/auth";
import { message } from "antd";
import { backendURL } from '../config';

export async function getMyRankings(props) {
    const response = await fetch(`${backendURL}/api/rankings/`, {
        method: "GET",
        headers: {
            "x-access-token": localStorage.getItem("auth")
        }
    }).catch(() => {
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
        } else if (response.status === 400) {
            const data = await response.json();
            message.error(data.message);
            return [];
        } else {
            message.error("Ha ocurrido un error, intentalo de nuevo más tarde");
            return [];
        }
    } else {
        message.error("Ha ocurrido un error, intentalo de nuevo más tarde");
        return [];
    }   
}


export async function getSpecificRanking(props, rankingId) {
    const response = await fetch(`${backendURL}/api/rankings/${rankingId}`, {
        method: "GET",
        headers: {
            "x-access-token": localStorage.getItem("auth")
        }
    }).catch(() => {
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
        } else if (response.status === 400) {
            const data = await response.json();
            message.error(data.message);
            return [];
        } else {
            message.error("Ha ocurrido un error, intentalo de nuevo más tarde");
            return [];
        }
    } else {
        message.error("Ha ocurrido un error, intentalo de nuevo más tarde");
        return [];
    }   
}