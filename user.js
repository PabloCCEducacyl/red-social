const urlsp = new URLSearchParams(window.location.search)

let userId = urlsp.get('userId');

if(userId == ""){
    window.location.href = "index.html";
}


fetchApi("/users", userId).then((result) => {
    const userDOM = document.getElementById('user');
    
    const user = result;

    const userDiv = document.createElement('div')
    const nombre = document.createElement('h2')
    const correo = document.createElement('p')
    const pagina = document.createElement('a')

    nombre.innerText = user['username']
    correo.innerText = user['email']
    pagina.href = "https://" + user['website']
    pagina.innerHTML = user['website']

    userDiv.appendChild(nombre)
    userDiv.appendChild(correo)
    userDiv.appendChild(pagina)

    userDOM.appendChild(userDiv)
})
    
fetchApi("/users", userId, "albums").then((result) => {
    const albumsDOM = document.getElementById('albums')

    result.forEach(album => {
        const albumDiv = document.createElement('div')
        const titulo = document.createElement('h2')

        titulo.innerText = album['title']

        albumDiv.classList.add('post')
        albumDiv.appendChild(titulo)

        albumsDOM.appendChild(albumDiv)
    });

})

fetchApi("/users", userId, "todos").then((result) => {
    const todoDOM = document.getElementById('todo')

    result.forEach(todo => {
        const todoDiv = document.createElement('div')
        const titulo = document.createElement('h3')
        const hecho = document.createElement('img')
        
        titulo.innerText = todo['title']
        if(todo['completed']){
            hecho.src = "done.jpeg"
        } else {
            hecho.src = "notdone.jpg"
        }

        todoDiv.classList.add("post")

        todoDiv.appendChild(titulo)
        todoDiv.appendChild(hecho)

        todoDOM.appendChild(todoDiv)
    })
})