export function isAdmin(){
    return sessionStorage.getItem("isAdmin") === "true";
}

export function userId(){
    return sessionStorage.getItem("userId");
}