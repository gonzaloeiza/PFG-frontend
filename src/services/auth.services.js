import { message } from 'antd';
import { backendURL } from '../config';

export const signUp = (props, userData) => {
    
    var formBody = [];
    for (var property in userData) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(userData[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }

    formBody = formBody.join("&");

    fetch(`${backendURL}/api/auth/signup`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody
    }).then((response) => {
        if (response.status === 200) {
            response.json().then((data) => {
                message.success("Su formulario de registro se está tramitando. Se le avisará a su correo electronico.");
                props.history.push("/");
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