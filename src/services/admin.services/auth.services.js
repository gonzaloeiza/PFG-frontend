import { adminLogout } from "../../middleware/adminAuth";
import { message } from "antd";
import { backendURL } from '../../config';

export async function updateAdminPassword(props, newPassword) {
    var details = {
        'newPassword': newPassword,
    };

    var formBody = [];
    for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }

    formBody = formBody.join("&");

    const response = await fetch(`${backendURL}/api/admin/auth/updatePassword`, {
        method: "PUT",
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