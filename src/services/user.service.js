export const getUsername = () => {
    if (localStorage.getItem("auth")) {
        return localStorage.getItem("username");
    }
    return null;
}