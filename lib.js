function fetchApi(endpoint, ...argumentos){    
    const url = "https://jsonplaceholder.typicode.com"
    
    const requestOptions = {
        method: "GET",
        redirect: "error"
    }

    let fetchUri = url + endpoint
    argumentos.forEach(argumento => {
        fetchUri += "/"+argumento
    });

    return new Promise((resolve, reject) => {
        fetch(fetchUri, requestOptions)
            .then((response) => response.json())
            .then((result) => resolve(result))
            .catch((error) => reject(error))
    })
}