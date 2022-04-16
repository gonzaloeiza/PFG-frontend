import { logout } from "../middleware/auth";
import { message } from "antd";
import { backendURL } from '../config';

export async function getCourts(props) {
    const response = await fetch(`${backendURL}/api/booking/courts`, {
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


export async function getDisponibility(props, bookingDay, courtName) {
    var details = {
        'bookingDay': bookingDay,
        'courtName': courtName
    };

    var formBody = [];
    for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }

    formBody = formBody.join("&");
    const response = await fetch(`${backendURL}/api/booking/disponibility`, {
        method: "POST",
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

export async function book(props, courtName, date, withLight) {
    var details = {
        'courtName': courtName,
        'bookingDate': date,
        'withLight': withLight
    };

    var formBody = [];
    for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }

    formBody = formBody.join("&");

    const response = await fetch(`${backendURL}/api/booking/bookCourt`, {
        method: "POST",
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
            // const data = await response.json();
            message.success("Reserva realizada con éxito");
            return;
        } else if (response.status === 401 || response.status === 403) {
            message.error("Tu sesión ha caducado. Inicia sesión de nuevo");
            logout(false);
            return props.history.push("/login");
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

export async function getBookings(props, fromDay, toDay, onlyActiveBookings) {
    var details = {
        'fromDay': fromDay,
        'toDay': toDay,
        'onlyActiveBookings': onlyActiveBookings
    };

    var formBody = [];
    for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }

    formBody = formBody.join("&");

    const response = await fetch(`${backendURL}/api/booking/`, {
        method: "POST",
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


export async function cancelBooking(props, bookingId) {
    var details = {
        'bookingId': bookingId,
    };

    var formBody = [];
    for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }

    formBody = formBody.join("&");

    const response = await fetch(`${backendURL}/api/booking/`, {
        method: "DELETE",
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
            return;
        } else if (response.status === 401 || response.status === 403) {
            message.error("Tu sesión ha caducado. Inicia sesión de nuevo");
            logout(false);
            return props.history.push("/login");
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
