import { adminLogout } from "../../middlewares/adminAuth";
import { message } from "antd";
import { backendURL } from '../../config';

export async function getCourtsData(props) {
    const response = await fetch(`${backendURL}/api/admin/courts/`, {
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


export async function updateCourtData(props, courtData) {
    var formBody = [];
    for (var property in courtData) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(courtData[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }

    formBody = formBody.join("&");

    const response = await fetch(`${backendURL}/api/admin/courts/`, {
        method: "PUT",
        headers: {
            "x-access-token": localStorage.getItem("adminAuth"),
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
        } else if (response.status === 401 || response.status === 403) {
            message.error("Tu sesión ha caducado. Inicia sesión de nuevo");
            adminLogout(false);
            return props.history.push("/admin/login");
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

export async function deleteCourt(props, courtId) {
    const response = await fetch(`${backendURL}/api/admin/courts/${courtId}`, {
        method: "DELETE",
        headers: {
            "x-access-token": localStorage.getItem("adminAuth"),
        },
    }).catch(() => {
        return null;
    });

    if (response !== null) {
        if (response.status === 200) {
            const data = await response.json();
            message.success(data.message);
            return;
        } else if (response.status === 401 || response.status === 403) {
            message.error("Tu sesión ha caducado. Inicia sesión de nuevo");
            adminLogout(false);
            return props.history.push("/admin/login");
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


export async function createNewCourt(props, courtData) {
    var formBody = [];
    for (var property in courtData) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(courtData[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }

    formBody = formBody.join("&");

    const response = await fetch(`${backendURL}/api/admin/courts/`, {
        method: "POST",
        headers: {
            "x-access-token": localStorage.getItem("adminAuth"),
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
        } else if (response.status === 401 || response.status === 403) {
            message.error("Tu sesión ha caducado. Inicia sesión de nuevo");
            adminLogout(false);
            return props.history.push("/admin/login");
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



export async function uploadPicture(props, courtId, picture) {
    var formData = new FormData();
    formData.append('file', picture);

    const response = await fetch(`${backendURL}/api/admin/courts/uploadPicture/${courtId}`, {
        method: "POST",
        headers: {
            "x-access-token": localStorage.getItem("adminAuth")
        },
        body: formData
    }).catch(() => {
        return null;
    });

    if (response !== null) {
        if (response.status === 200) {
            return;
        } else if (response.status === 401 || response.status === 403) {
            message.error("Tu sesión ha caducado. Inicia sesión de nuevo");
            adminLogout(false);
            return props.history.push("/admin/login");
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