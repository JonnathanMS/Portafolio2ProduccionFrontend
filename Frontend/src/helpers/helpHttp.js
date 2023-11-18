//!: jonnathan.monroy741@gmail.com

// en este archivo se hace una estructura para los llamados fetch de post, get, put, y delete,, se pueden seguir agragando de querer  hacerlo.

export const helpHttp = () => { //funcion Expresada
    // Este customFetch es el que usa los 4 métodos de fetch segun sea configurado
    const customFetch = (endpoint, options) => {//el endpoint es la ruta, y las options son los metodos , cabezera etc.
        const defaultHeader = {//esta constante sirve para tener como header del fetch por defecto cuando no se vaya a poner headers
            accept: "application/json",
        };

        const controller = new AbortController(); // cuando no hay respuesta del servidor esta aborta la peticion fetch es una funcion por defecto que permite tener el control de las peticiones asincronas.
        options.signal = controller.signal; //en el parametro options (objeto de la peticion fetch) de la funcion padre customFetch estamos colocando al objeto controler estancia de AbortControler con su propiedad signal.  Si el endpoint no responde cancela la peticion.

        options.method = options.method || "GET"; // si el usuario en las pciones no pone método entonces se va a poner get por defecto.
        options.headers = options.headers
            ? { ...defaultHeader, ...options.headers } //este objeto usa spread operator para combinar los objetos
            : defaultHeader;// si el usuario en las pciones no pone cabezeras entonces se va a poner get por defecto.

        options.body = JSON.stringify(options.body) || false; //si existe el body lo convierte en string para poder usarlo. si no como es get no necesita poner nada.
        if (!options.body) delete options.body; // con esta linea estamos eliminando la opcion body del objeto para que no provoque errores en la peticion.

        //console.log(options);
        setTimeout(() => controller.abort(), 3000); ////si el servidor esta caido espera 3 segundos y si no responde aborta la peticion fetch

        //¿como este customFetch retorna una promesa podemos usar then
        return fetch(endpoint, options)
            .then((res) =>
                res.ok
                    ? res.json()
                    : Promise.reject({
                        err: true,
                        status: res.status || "00",
                        statusText: res.statusText || "Ocurrió un error",
                    })
            )
            .catch((err) => err);
    };

    // Aqui usamos el parámetro por defecto, si el usuario no pone obpciones el parametro seria un objeto vacío.
    const get = (url, options = {}) => customFetch(url, options);

    const post = (url, options = {}) => {
        options.method = "POST";
        return customFetch(url, options);
    };

    const put = (url, options = {}) => {
        options.method = "PUT";
        return customFetch(url, options);
    };

    // esta funcion del en realidad es delete abreviada.
    const del = (url, options = {}) => {
        options.method = "DELETE";
        return customFetch(url, options);
    };

    return { // aqui retornamos el tipo de respuesta segun el método
        get,
        post,
        put,
        del,
    };
};
