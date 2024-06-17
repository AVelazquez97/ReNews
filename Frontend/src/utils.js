export function isNull(value){
    return value === null || value === undefined;
}

export function notNull(value){
    return value !== null && value !== undefined;
}

export function notNullNotEmptyString(value){
    return notNull(value) && value !== "";
}

export function isAdmin(){
    return sessionStorage.getItem("isAdmin") === "true";
}

export function userId(){
    return sessionStorage.getItem("userId");
}

export function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

export function passwordsMatch(password, passwordRepeat) {
    return password === passwordRepeat;
}

export function validatePassword(password) {
    return password.length >= 8;
}

export function validateUsername(username) {
    return username.length >= 3;
}

export function validatePostTitle(title) {
    return title.length >= 3;
}

export function validatePostBody(body) {
    return body.length >= 3;
}

export function validatePostTags(tags) {
    return tags.length > 0;
}

export function validatePostTagsLength(tags) {
    return tags.length <= 5;
}

export function validateRegisterForm(data, setValidations) {
    if (!validateEmail(data.email)) {
        setValidations(prevState => ({...prevState, email: {message: "Por favor ingrese una dirección de correo válida."}}));
    } else {
        setValidations(prevState => ({...prevState, email: {message: ""}}));
    }

    if (!validatePassword(data.password)) {
        setValidations(prevState => ({...prevState, password: {message: "La contraseña debe tener al menos 8 caracteres de largo."}}));
    } else {
        setValidations(prevState => ({...prevState, password: {message: ""}}));
    }

    if (!passwordsMatch(data.password, data.password_repeat)) {
        setValidations(prevState => ({...prevState, password_repeat: {message: "Las contraseñas no coinciden."}}));
    } else {
        setValidations(prevState => ({...prevState, password_repeat: {message: ""}}));
    }

    if (!validateUsername(data.username)) {
        setValidations(prevState => ({...prevState, username: {message: "El nombre de usuario debe tener al menos 3 caracteres de largo."}}));
    } else {
        setValidations(prevState => ({...prevState, username: {message: ""}}));
    }
}