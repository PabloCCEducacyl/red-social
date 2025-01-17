const main = document.getElementById('main')

renderDOM(main, "posts")

function renderDOM(DOM, state, ...arguments){
    DOM.innerHTML = '<header><a href="index.html"><img src="icon.jpg" title="hola" class="icono"><h1 title="adios">sts</h1></a></header>'
    switch (state) {
        case "posts":
            fetchPosts(DOM)
            break;
        case "user":
            fetchUsers(DOM, arguments)
            break;
        default:
            break;
    }
}
