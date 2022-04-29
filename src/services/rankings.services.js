import { logout } from "../middlewares/auth";
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

export async function setResultOfMatch(props, matchId, partnerOneId, partnerOneWins) {
    var details = {
        'matchId': matchId,
        'partnerOneId': partnerOneId,
        'partnerOneWins': partnerOneWins
    };

    var formBody = [];
    for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }

    formBody = formBody.join("&");
    const response = await fetch(`${backendURL}/api/rankings/addResult`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            "x-access-token": localStorage.getItem("auth")
        },
        body: formBody
    }).catch(() => {
        return null;
    });

    if (response !== null) {
        if (response.status === 200) {
            const data = await response.json();
            message.success(data.message);
            return ;
        } else if (response.status === 401 || response.status === 403) {
            message.error("Tu sesión ha caducado. Inicia sesión de nuevo");
            logout(false);
            return props.history.push("/login");
        } else if (response.status === 400) {
            const data = await response.json();
            message.error(data.message);
            return ;
        } else {
            message.error("Ha ocurrido un error, intentalo de nuevo más tarde");
            return ;
        }
    } else {
        message.error("Ha ocurrido un error, intentalo de nuevo más tarde");
        return ;
    }
}