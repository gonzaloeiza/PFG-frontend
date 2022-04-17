import { adminLogout } from "../../middleware/adminAuth";
import { message } from "antd";
import { backendURL } from '../../config';


export async function getRankings(props) {
    const response = await fetch(`${backendURL}/api/admin/rankings/`, {
        method: "GET",
        headers: {
            "x-access-token": localStorage.getItem("adminAuth")
        },
    }).catch(() => {
        return null;
    });

    if (response !== null) {
        if (response.status === 200) {
            const data = await response.json();
            return data.message;
        } else if (response.status === 401 || response.status === 403) {
            message.error("Tu sesión ha caducado. Inicia sesión de nuevo");
            adminLogout(false);
            return props.history.push("/admin/login");
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

export async function createNewRanking(props, name, description) {
    var details = {
        'name': name,
        'description': description
    };


    var formBody = [];
    for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }

    formBody = formBody.join("&");

    const response = await fetch(`${backendURL}/api/admin/rankings/createNewRanking`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            "x-access-token": localStorage.getItem("adminAuth")
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
            adminLogout(false);
            return props.history.push("/admin/login");
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


export async function getRankingData(props, rankingId) {
    const response = await fetch(`${backendURL}/api/admin/rankings/${rankingId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            "x-access-token": localStorage.getItem("adminAuth")
        },
    }).catch(() => {
        return null;
    });

    if (response !== null) {
        if (response.status === 200) {
            const data = await response.json();
            return data.message;
        } else if (response.status === 401 || response.status === 403) {
            message.error("Tu sesión ha caducado. Inicia sesión de nuevo");
            adminLogout(false);
            return props.history.push("/admin/login");
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


export async function addPartnerToRanking(props, rankingId, playerOneId, playerTwoId) {
    var details = {
        'rankingId': rankingId,
        'playerOneId': playerOneId,
        'playerTwoId': playerTwoId
    };

    var formBody = [];
    for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }

    formBody = formBody.join("&");

    const response = await fetch(`${backendURL}/api/admin/rankings/addPartnerToRanking`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            "x-access-token": localStorage.getItem("adminAuth")
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
            adminLogout(false);
            return props.history.push("/admin/login");
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

export async function startRanking(props, rankingId) {
    var details = {
        'rankingId': rankingId,
    };

    var formBody = [];
    for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }

    formBody = formBody.join("&");

    const response = await fetch(`${backendURL}/api/admin/rankings/startRanking`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            "x-access-token": localStorage.getItem("adminAuth")
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
            adminLogout(false);
            return props.history.push("/admin/login");
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

export async function deleteRanking(props, rankingId) {
    var details = {
        'rankingId': rankingId,
    };

    var formBody = [];
    for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }

    formBody = formBody.join("&");

    const response = await fetch(`${backendURL}/api/admin/rankings/deleteRanking`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            "x-access-token": localStorage.getItem("adminAuth")
        },
        body: formBody
    }).catch(() => {
        return null;
    });

    if (response !== null) {
        if (response.status === 200) {
            const data = await response.json();
            message.success(data.message);
            return true;
        } else if (response.status === 401 || response.status === 403) {
            message.error("Tu sesión ha caducado. Inicia sesión de nuevo");
            adminLogout(false);
            return props.history.push("/admin/login");
        } else if (response.status === 400) {
            const data = await response.json();
            message.error(data.message);
            return false;
        } else {
            message.error("Ha ocurrido un error, intentalo de nuevo más tarde");
            return false;
        }
    } else {
        message.error("Ha ocurrido un error, intentalo de nuevo más tarde");
        return false;
    }
}