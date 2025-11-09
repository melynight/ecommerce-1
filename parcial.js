'use strict';

/*
 * Dalama, Melany
 */

const productos = [
    [
        { id: "001", nombre: "Monitor 27\" curvo QHD", descripcion: "Monitor curvo de 27 pulgadas con resolución QHD y alta tasa de refresco.", 
            precio: 275000.00, imagen: "monitor27curvoqhd.webp", categoria: "Monitores", stock: 25 },
        { id: "002", nombre: "Monitor 24\" Full HD negro", descripcion: "Monitor de 24 pulgadas con resolución Full HD negro.", 
            precio: 180000.00, imagen: "monitor24hd.webp", categoria: "Monitores", stock: 20 },
        { id: "003", nombre: "Monitor 27\" Full HD blanco", descripcion: "Monitor de 27 pulgadas con resolución Full HD blanco.",
            precio: 220000.00, imagen: "monitor27hdblanco.jpg", categoria: "Monitores", stock: 24 }
    ],
    [
        { id: "004", nombre: "RAM 16GB Axus RGB", descripcion: "Memoria RAM 16GB 2.4HZ RGB SYNC", precio: 55000.00, imagen: "ramaxus16.png", categoria: "Memorias", stock: 34 },
        { id: "005", nombre: "RAM 8GB Axus RGB", descripcion: "Memoria RAM 8GB 2.4HZ RGB SYNC", precio: 35000.00, imagen: "ramaxus8.png", categoria: "Memorias", stock: 27 },
        { id: "006", nombre: "RAM 16GB HyperY RGB", descripcion: "Memoria RAM 16GB HyperY 2.4HZ RGB SYNC", precio: 65000.00, imagen: "ramhypery16.webp", categoria: "Memorias", stock: 30 }
    ],
    [
        { id: "007", nombre: "Disco SSD 1TB", descripcion: "Disco sólido de 1TB Kingtan", precio: 100000.00, imagen: "discokingtan.png", categoria: "Discos", stock: 14 },
        { id: "008", nombre: "Disco SSD 500GB", descripcion: "Disco sólido de 500GB Kingtan", precio: 60000.00, imagen: "discokingtan500.jpg", categoria: "Discos", stock: 19 },
        { id: "009", nombre: "Disco HDD 2TB", descripcion: "Disco duro de 2TB Western Digital", precio: 80000.00, imagen: "discowd2tb.jpg", categoria: "Discos", stock: 33 }
    ]
];


function crearEtiqueta(nombre, atributos = {}, contenido = "")
{
    const $etiqueta = document.createElement(nombre);

    for (const atributo in atributos)
    {
        $etiqueta.setAttribute(atributo, atributos[atributo]);
    }

    if(contenido)
    {
        $etiqueta.textContent = contenido;
    }

    return $etiqueta;
}
function eliminarProducto(producto)
{
}
function mostrarProductos(productos)
{
    const $listaProductos = document.getElementById("productos");

    for(let producto of productos)
    {
        for(let item of producto)
        {
            const $producto = crearEtiqueta("li", {"data-id": item.id});
            $listaProductos.appendChild($producto);
            const $imagen = crearEtiqueta("img", { src: `img/${item.imagen}`, alt: item.nombre });
            $producto.appendChild($imagen);
            const $div = crearEtiqueta("div");
            $producto.appendChild($div);
            const $titulo = crearEtiqueta("h2", {}, item.nombre);
            $div.appendChild($titulo);
            const $descripcion = crearEtiqueta("p", {}, item.descripcion);
            $div.appendChild($descripcion);
            const $precio = crearEtiqueta("p");
            $div.appendChild($precio);
            const $spanPrecio = crearEtiqueta("span", {}, item.precio.toFixed(2));
            $precio.appendChild($spanPrecio);
            const $categoria = crearEtiqueta("p", {}, item.categoria);
            $div.appendChild($categoria);
            const $footer = crearEtiqueta("footer");
            $producto.appendChild($footer);
            const $btnDetalle = crearEtiqueta("button", {class: "buttonVerDetalle"}, "Ver detalle");
            $footer.appendChild($btnDetalle);
            const $btnAgregar = crearEtiqueta("button", {class: "agregarProducto"}, "Agregar");
            $footer.appendChild($btnAgregar);
        }
    }
}
function verDetalleItem(producto)
{
    const $modalDetalle = crearEtiqueta("dialog", { class: "modal" });
    const $detalle = crearEtiqueta("div", { class: "detalle" });
    $modalDetalle.appendChild($detalle);
    const $imagen = crearEtiqueta("img", { src: `img/${producto.imagen}`, alt: producto.nombre });
    $detalle.appendChild($imagen);
    const $titulo = crearEtiqueta("h1", {}, producto.nombre);
    $detalle.appendChild($titulo);
    const $descripcion = crearEtiqueta("p", {}, producto.descripcion);
    $detalle.appendChild($descripcion);
    const $precio = crearEtiqueta("p");
    const $spanPrecio = crearEtiqueta("span", {}, `$${producto.precio.toFixed(2)}`);
    $precio.appendChild($spanPrecio);
    $detalle.appendChild($precio);
    const $categoria = crearEtiqueta("p", {}, producto.categoria);
    $detalle.appendChild($categoria);
    const $footer = crearEtiqueta("footer");
    const $btnCerrar = crearEtiqueta("button", {}, "Cerrar");
    const $btnAgregar = crearEtiqueta("button", {}, "Agregar");
    $footer.appendChild($btnCerrar);
    $footer.appendChild($btnAgregar);
    $detalle.appendChild($footer);
    
    document.body.appendChild($modalDetalle);
    $modalDetalle.showModal();
    
    $btnCerrar.addEventListener("click", () => {
        $modalDetalle.close();
        document.body.removeChild($modalDetalle);
    });
}
function agregarEventos()
{
    const $botonesVerDetalle = document.querySelectorAll(".buttonVerDetalle");
    $botonesVerDetalle.forEach($btn => {
        const productId = $btn.closest("li").getAttribute("data-id");
        const producto = productos.flat().find(p => p.id === productId);
        $btn.addEventListener("click", () => verDetalleItem(producto));
    });
}

function main()
{
    mostrarProductos(productos);
    agregarEventos();
}

main();
