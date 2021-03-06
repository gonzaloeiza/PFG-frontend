import { message } from 'antd';
import { logout } from "../middlewares/auth";
import { backendURL } from '../config';

export function getUsername () {
    if (localStorage.getItem("auth")) {
        return localStorage.getItem("name");
    }
    return null;
}

export async function sendForm(name , surname, email, formMessage) {
    const details = {
        "name": name,
        "surname": surname,
        "email": email,
        "message": formMessage
    }

    var formBody = [];
    for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }

    formBody = formBody.join("&");
    
    const response = await fetch(`${backendURL}/api/user/landingContactForm`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: formBody
    }).catch(() => {
        return null;
    });


    if (response !== null) {
        if (response.status === 200) {
            const data = await response.json();
            message.success(data.message);
            return; 
        } else if (response.status === 400) {
            const data = await response.json();
            message.error(data.message);
            return;
        } else {
            message.error("Ha ocurrido un error, intentalo de nuevo más tarde");
            return;
        }
    } else {
        message.error("Ha ocurrido un error, intentalo de nuevo más tarde");
        return;
    }
}


export async function getUserData(props) {

    const response = await fetch(`${backendURL}/api/user/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            "x-access-token": localStorage.getItem("auth")
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

export async function updateUserProfile(props, userData) {
    var formBody = [];
    for (var property in userData) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(userData[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }

    formBody = formBody.join("&");
    const response = await fetch(`${backendURL}/api/user/`, {
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
            return true;
        } else if (response.status === 401 || response.status === 403) {
            message.error("Tu sesión ha caducado. Inicia sesión de nuevo");
            logout(false);
            return props.history.push("/login");
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
        return;
    }
}

export async function deleteAccount(props) {
    const response = await fetch(`${backendURL}/api/user/`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            "x-access-token": localStorage.getItem("auth")
        },
    }).catch(() => {
        return null;
    });

    if (response !== null) {
        if (response.status === 200) {
            const data = await response.json();
            message.success(data.message);
            localStorage.removeItem("auth");
            localStorage.removeItem("name");
            return props.history.push("/"); 
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

export async function requestRestorePassword(props, email) {
    var details = {
        'email': email,
    }
    var formBody = [];
    for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }

    formBody = formBody.join("&");
    const response = await fetch(`${backendURL}/api/user/restorePassword`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: formBody
    }).catch(() => {
        return null;
    });

    if (response !== null) {
        if (response.status === 200) {
            const data = await response.json();
            message.success(data.message);
            return props.history.push("/");
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
        return;
    }
}

export async function restorePassword(props, tokenId, password) {
    var details = {
        'password': password,
    }
    var formBody = [];
    for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }

    formBody = formBody.join("&");
    const response = await fetch(`${backendURL}/api/user/restorePassword/${tokenId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: formBody
    }).catch(() => {
        return null;
    });

    if (response !== null) {
        if (response.status === 200) {
            const data = await response.json();
            message.success(data.message);
            return props.history.push("/");
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
        return;
    }
}