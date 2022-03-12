/* Authetifacation actions */
import { message } from 'antd';


// LOGIN
export const login = (props, email, password) => {
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

    fetch("http://localhost:5000/api/auth/signin", {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody
    }).then((response) => {
        if (response.status === 200) {
            response.json().then((data) => {
                localStorage.setItem("auth", data.accessToken);
                localStorage.setItem("name", data.name);
                props.history.push("/");
            });
        } else if (response.status === 400) {
            response.json().then((data) => {
                message.error(data.error);
            });
        } else {
            message.error('Ha ocurrido un error, intentar de nuevo mas tarde.')
        }
    }).catch((err) => {
        message.error('Ha ocurrido un error, intentar de nuevo mas tarde.')
    });
}

// LOGOUT
export const logout = () => {
    localStorage.removeItem('auth')
    localStorage.removeItem("name");
    message.success("Sesion cerrada correctamente.")
}

// LOGIN STATUS
export const isLogin = () => {
    if (localStorage.getItem('auth')) return true;
    return false;
}
