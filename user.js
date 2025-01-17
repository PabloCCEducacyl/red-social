// const urlsp = new URLSearchParams(window.location.search)

// let userId = urlsp.get('userId');

// if(userId == ""){
//     window.location.href = "index.html";
// }

function fetchUsers(dom, userId){
    console.log(userId)
    divUser = document.createElement('div')
    divUser.setAttribute("id", "user")
    divUser.classList.add("user")
    dom.appendChild(divUser)

    divAlbum = document.createElement('div')
    divAlbum.setAttribute("id", "album")
    divAlbumTitulo = document.createElement('h2')
    divAlbumTitulo.innerText="Albums"
    divAlbum.appendChild(divAlbumTitulo)
    dom.appendChild(divAlbum)

    divToDo = document.createElement('div')
    divToDo.setAttribute("id", "todo")
    divToDoTitulo = document.createElement('h2')
    divToDoTitulo.innerText="To-Do"
    divToDo.appendChild(divToDoTitulo)
    dom.appendChild(divToDo)
    
    fetchApi("/users", userId[0]).then((result) => {
        const userDOM = divUser;
        
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
        
    fetchApi("/users", userId[0], "albums").then((result) => {
        const albumsDOM = divAlbum;
    
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
        const todoDOM = divToDo
    
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
}