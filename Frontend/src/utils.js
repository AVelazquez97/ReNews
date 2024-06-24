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

export function userName(){
    return sessionStorage.getItem("username");
}

export function now(){
    return new Date().toISOString().split('.')[0] + 'Z';
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
    return body.length >= 100;
}

export function validatePostTags(tags) {
    return tags.length > 0;
}

export function validatePostTagsLength(tags) {
    return tags.length <= 5;
}

export function validateSearch(search) {
    return search.length > 0;
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

export function validateFeedSearch(search, setValidations) {
    if (!validateSearch(search)) {
        setValidations(prevState => ({...prevState, search: {message: "La búsqueda debe tener al menos 1 caracter de largo."}}));
    } else {
        setValidations(prevState => ({...prevState, search: {message: ""}}));
    }
}

export function validateNewPostForm(postData, selectedTags, setValidations) {
    if (!validatePostTitle(postData.title)) {
        setValidations(prevState => ({...prevState, title: {message: "El título del post debe tener al menos 3 caracteres de largo."}}));
    } else {
        setValidations(prevState => ({...prevState, title: {message: ""}}));
    }

    if (!validatePostBody(postData.body)) {
        setValidations(prevState => ({...prevState, body: {message: "El cuerpo del post debe tener al menos 100 caracteres de largo."}}));
    } else {
        setValidations(prevState => ({...prevState, body: {message: ""}}));
    }

    if (!validatePostTags(selectedTags)) {
        setValidations(prevState => ({...prevState, minimumTagLimit: {message: "El post debe tener al menos 1 tag."}}));
    } else {
        setValidations(prevState => ({...prevState, minimumTagLimit: {message: ""}}));
    }

    if (!validatePostTagsLength(selectedTags)) {
        setValidations(prevState => ({...prevState, maximumTagLimit: {message: "El post no puede tener más de 5 tags."}}));
    } else {
        setValidations(prevState => ({...prevState, maximumTagLimit: {message: ""}}));
    }
}

export function validateNewCommentForm(commentData, setValidations) {
    if (!notNullNotEmptyString(commentData.body)) {
        setValidations(prevState => ({...prevState, body: {message: "El comentario no puede estar vacío."}}));
    } else {
        setValidations(prevState => ({...prevState, body: {message: ""}}));
    }
}

export function validateNewTagForm(tagData, setValidations) {
    if (!notNullNotEmptyString(tagData.name)) {
        setValidations(prevState => ({...prevState, name: {message: "El tag no puede estar vacío."}}));
    } else {
        setValidations(prevState => ({...prevState, name: {message: ""}}));
    }
}