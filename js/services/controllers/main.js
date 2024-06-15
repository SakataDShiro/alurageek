import { listaServidor } from "../product-services.js";

const lista = document.querySelector(".lista");
const formulario = document.querySelector("[data-formulario]")



function crearProducto (nombre, precio, imagen, id, url) {
    const producto = document.createElement("div");
    producto.classList.add("producto")

    producto.innerHTML = `
    <a href="${url}">
    <img src="${imagen}" class="img_producto"  alt="${nombre} <a href="${url} ""></a>
    <div class="informacion">
        <div class="descripcion">
            <p class="nombre">${nombre} </p>
            <p class="precio">$${precio} </p>
        </div>
        <div class="boton">
            <button class="borrar"></button>
        </div>
        <p class="idNumber">${id} </p>
    </div>   
    `
    lista.appendChild(producto);
    console.log(producto);
    return producto
}

const render = async () => {
    try {
        const productList = await listaServidor.productList();
        productList.forEach(productos => {
            lista.appendChild(
                crearProducto(
                    productos.nombre,
                    productos.precio,
                    productos.imagen,
                    productos.id,
                    productos.url
                )
            )
        });
    } catch (error) {
        console.log(error)
    }
    definirBorrar()
}

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const nombre = document.querySelector("#nombre").value;
    const precio = document.querySelector("#precio").value;
    const imagen = document.querySelector("#imagen").value;
    const url = document.querySelector("#url").value;

    console.log(nombre, precio, imagen,url)

    listaServidor.subirProducto(nombre, precio, imagen, url).then((res) => console.log(res)).catch((err) => console.log(err))
})

function definirBorrar () {
    const botonBorrar = document.querySelectorAll(".borrar")
    botonBorrar.forEach(function (boton) {
        boton.addEventListener("click", async (evento) => {
            evento.preventDefault();
            const informacion = evento.target.parentNode.parentNode
            const idNumber = informacion.children[2].innerHTML
            console.log(idNumber)
            listaServidor.borrarProducto(idNumber)
            })})
        
        
    }
    
    

    

render();
