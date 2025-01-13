const postsArray = [];

const url = "https://jsonplaceholder.typicode.com"

const requestOptions = {
    method: "GET",
    redirect: "follow"
};

function fetchPosts() {
    return new Promise((resolve, reject) => {
        fetch(url+"/posts", requestOptions)
            .then((response) => response.json())
            .then((result) => resolve(result))
            .catch((error) => reject(error))
    });
}

function fetchUser(id) {
    return new Promise((resolve, reject) => {
        fetch(url+`/users?id=${id}`)
            .then((response) => response.json())
            .then((result) => resolve(result))
            .catch((error) => reject(error))
    })
}

function fetchUserByEmail(email) {
    return new Promise((resolve, reject) => {
        fetch(url+`/users?email=${email}`)
            .then((response) => response.json())
            .then((result) => resolve(result))
            .catch((error) => reject(error))
    })
}

function fetchComentarios(id) {
    return new Promise((resolve, reject) => {
        fetch(url+`/comments?postId=${id}`)
            .then((response) => response.json())
            .then((result) => resolve(result))
    })
}

fetchPosts().then((result) => {
        const posts = document.getElementById('posts');
        result.forEach(post => {
            const div = document.createElement('div');
            const title = document.createElement('h2');
            const userh3 = document.createElement('h3');
            const body = document.createElement('p');
            const comentarios = document.createElement('div');
            fetchUser(post['userId'])
                .then((result) => {
                    userh3.innerHTML = "by " + result[0]['username']
                }) 
            comentarios.addEventListener("click" , (e) => fetchComentarios()
                .then((result) => {
                    const divComentarios = e.target;
                    result.forEach(((post) => {
                        const div = document.createElement('div')
                        const userh4 = document.createElement('h4')
                        const body = document.createElement('p')

                        fetchUserByEmail(post[email])
                            .then((result) => {
                                userh4.innerHTML = "by " + result[0]['username']
                            })
                        body = post['body']
                    }
                }))
            title.innerText = post['title']
            body.innerHTML = post['body']
            comentarios.innerHTML = "Comentarios ▼"

            div.classList.add('post')
            comentarios.classList.add('comentarios')

            div.appendChild(title)
            div.appendChild(userh3)
            div.appendChild(body)
            div.appendChild(comentarios)

            

            postsArray.push(div);
        });
        postsArray.forEach((post) => {
            posts.appendChild(post);
            
        });
    })