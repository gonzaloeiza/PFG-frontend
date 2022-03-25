/* Authetifacation actions */
import { message } from 'antd';
import { backendURL } from '../config';

// LOGIN
export const adminLogin = (props, email, password) => {
    var details = {
        'email': email,
        'password': password
    };

    var formBody = [];
    for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }

    formBody = formBody.join("&");

    fetch(`${backendURL}/api/admin/auth/signin`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody
    }).then((response) => {
        if (response.status === 200) {
            response.json().then((data) => {
                localStorage.setItem("adminAuth", data.message.accessToken);
                // localStorage.setItem("name", data.message.name);
                props.history.push("/admin");
            });
        } else if (response.status === 400) {
            response.json().then((data) => {
                message.error(data.message);
            });
        } else {
            message.error('Ha ocurrido un error, intentar de nuevo mas tarde.')
        }
    }).catch((err) => {
        message.error('Ha ocurrido un error, intentar de nuevo mas tarde.')
    });
}

// LOGOUT
export const adminLogout = (showMessage = true) => {
    localStorage.removeItem('adminAuth')
    localStorage.removeItem("name");
    if (showMessage) {
        message.success("Sesion cerrada correctamente.")
    }
}

// LOGIN STATUS
export const isAdminLogin = () => {
    if (localStorage.getItem('adminAuth')) return true;
    return false;
}
