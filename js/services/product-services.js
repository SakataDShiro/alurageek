const productList = () => {
    return fetch("https://jsonalurageek.vercel.app/db.json")
        .then((res) => res.json())
        .then((data) => data.productos)
        .catch((err) => console.log(err))
};

const subirProducto = (nombre, precio, imagen, url) => {
    return fetch("https://jsonalurageek.vercel.app/db.json", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nombre,
            precio,
            imagen,
            url
        })
    })
    .then( (res) => res.json())
    .catch((err) => console.log(err))
};

const borrarProducto = (id) => {
    return fetch(`https://jsonalurageek.vercel.app/db.json/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then( (res) => res.json())
    .catch((err) => console.log(err))
};

export const listaServidor = {
    productList, subirProducto, borrarProducto
}