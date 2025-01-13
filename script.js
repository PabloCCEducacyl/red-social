const postsArray = [];

const requestOptions = {
    method: "GET",
    redirect: "follow"
};

function fetchPosts() {
    return new Promise((resolve, reject) => {
        fetch("https://jsonplaceholder.typicode.com/posts", requestOptions)
            .then((response) => response.json())
            .then((result) => resolve(result))
            .catch((error) => reject(error))
    });
}

function fetchUser(id) {
    return new Promise(())
}

function fetchComentarios(id) {
    return new Promise((resolve, reject) => {
        fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`)
            .then((response) => response.json())
            .then((result) => resolve(result))
    })
}

fetchPosts()
    .then((postsArray) => {
        const posts = document.getElementById('posts');
        postsArray.forEach((post) => {
            posts.appendChild(post);
        });
    })