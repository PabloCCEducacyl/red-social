const postsArray = []

fetchApi("/posts").then((result) => {
    const posts = document.getElementById('posts')

    let users = []

    result.forEach(post => {
        const div = document.createElement('div')
        const title = document.createElement('h2')
        const userh3 = document.createElement('h3')
        const userLink = document.createElement('a')
        const body = document.createElement('p')
        const botonComentarios = document.createElement('div')
        const divComentarios = document.createElement('div')

        if(users.some(user => user.userId === post['userId'])){
            usuarioArray = users.some(user => user.userId === post['userId'])
            userLink.innerHTML = "by " + usuarioArray['username'] + " (" + usuarioArray['email'] + ")"
        } else{
            fetchApi("/users", post['userId'])
                .then((result) => {
                    userLink.innerHTML = "by " + result['username'] + " (" + result['email'] + ")"
                    users.push(result)
                })                
        }
        botonComentarios.addEventListener("click", (e) => {
            if(botonComentarios.getAttribute('botonComentarios') == 0) {
                e.target.innerHTML = "Comentarios ▼"
                fetchApi("/posts",post['id'],"comments")
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
        userLink.href = "user.html?userId="+post['userId'];

        div.classList.add('post')
        botonComentarios.classList.add('botonComentarios')
        divComentarios.classList.add('comentarios')

        div.appendChild(title)
        userh3.appendChild(userLink)
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


    