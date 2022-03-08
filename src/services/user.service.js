export const getUsername = () => {
    if (localStorage.getItem("auth")) {
        return localStorage.getItem("name");
    }
    return null;
}