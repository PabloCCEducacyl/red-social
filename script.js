const postsArray = []

const url = "https://jsonplaceholder.typicode.com"

const requestOptions = {
    method: "GET",
    redirect: "error"
}

function fetchApi(endpoint, args = []){
    
    let fetchUri = url + endpoint

    if(args.length > 0){
        fetchUri += "?"+args[0]+"="+args[1]
    }
    // console.log(fetchUri)

    return new Promise((resolve, reject) => {
        fetch(fetchUri, requestOptions)
            .then((response) => response.json())
            .then((result) => resolve(result))
            .catch((error) => reject(error))
    
    })
}

fetchApi("/posts").then((result) => {
        const posts = document.getElementById('posts')
        result.forEach(post => {
            const div = document.createElement('div')
            const title = document.createElement('h2')
            const userh3 = document.createElement('h3')
            const body = document.createElement('p')
            const botonComentarios = document.createElement('div')
            const divComentarios = document.createElement('div')
            fetchApi("/users",["id", post['userId']])
                .then((result) => {
                    userh3.innerHTML = "by " + result[0]['username'] + " (" + result[0]['email'] + ")"
                }) 
            botonComentarios.addEventListener("click", (e) => {
                if(botonComentarios.getAttribute('botonComentarios') == 0) {
                    e.target.innerHTML = "Comentarios ▼"
                    fetchApi("/comments", ["postId", post['id']])
                    .then((result) => {
                        const divbotonComentarios = e.target.parentNode.lastChild
                        result.forEach((comment) => {
                            const div = document.createElement('div')
                            const userh4 = document.createElement('h4')
                            const body = document.createElement('p')

                            div.classList.add('comentario')

                            userh4.innerHTML = "by " + comment['email']
                            body.innerHTML = comment['body']
                            div.appendChild(userh4)
                            div.appendChild(body)
                            divbotonComentarios.appendChild(div)
                        })
                    })
                    botonComentarios.setAttribute('botonComentarios', 1)
                } else {
                    const divComentarios = e.target.parentNode.childNodes[4]
                    const divbotonComentarios = e.target.parentNode.childNodes[3]
                    if(divComentarios.classList.contains('escondido') == true) {
                        divbotonComentarios.innerHTML = "Comentarios ▼"
                        divComentarios.classList.remove('escondido')
                    } else {
                        divbotonComentarios.innerHTML = "Comentarios ▲"
                        divComentarios.classList.add('escondido')
                    }
                }
            })
            title.innerText = post['title']
            body.innerHTML = post['body']
            botonComentarios.setAttribute('botonComentarios', 0)
            botonComentarios.innerHTML = "Comentarios ▲"

            div.classList.add('post')
            botonComentarios.classList.add('botonComentarios')
            divComentarios.classList.add('comentarios')

            div.appendChild(title)
            div.appendChild(userh3)
            div.appendChild(body)
            div.appendChild(botonComentarios)
            div.appendChild(divComentarios)

            

            postsArray.push(div)
        })
        postsArray.forEach((post) => {
            posts.appendChild(post)
            
        })
    })