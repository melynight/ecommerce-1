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

class Producto
{
    #id;
    #nombre;
    #precio;
    #stock;
    #descripcion;
    #imagen;
    #categoria;

    constructor(id, nombre, precio, cantStock, descripcion, imagen, categoria)
    {
        this.#id = id;
        this.#nombre = nombre;
        this.#precio = precio;
        this.#stock = cantStock;
        this.#descripcion = descripcion;
        this.#imagen = imagen;
        this.#categoria = categoria;
    }

    getId(){ return this.#id; }
    getNombre(){ return this.#nombre; }
    getPrecio(){ return this.#precio; }
    getStock(){ return this.#stock; }
    getDescripcion(){ return this.#descripcion; }
    getImagen(){ return this.#imagen; }
    getCategoria(){ return this.#categoria; }
    setId(id) { this.#id = id; }
    setNombre(nombre) { this.#nombre = nombre; }
    setPrecio(precio) { this.#precio = precio; }
    setStock(stock) { this.#stock = stock; }
    setDescripcion(descripcion) { this.#descripcion = descripcion; }
    setImagen(imagen) { this.#imagen = imagen; }
    setCategoria(categoria) { this.#categoria = categoria; }

    mostrarInformacion()
    {
        console.log(`📦 PRODUCTO
            ID: ${this.#id}
            Nombre: ${this.#nombre}
            Precio: $ ${this.#precio}
            Stock: ${this.#stock} unidades disponibles.
        `);
    }
}

class CarritoDeCompras
{
    #items;

    constructor()
    {
        this.#items = [];
    }

    getItems() { return this.#items; }

    agregarProducto(producto, cantidad)
    {
        let existeItem = this.#items.find(i => i.producto.getId() === producto.getId());
        console.log("Buscando producto en carrito: ", producto.getNombre() + " - " + producto.getId());
        if(existeItem)
        {
            existeItem.cantidad += cantidad;
            console.log(`🛒 Se agregaron ${cantidad} más de ${producto.getNombre()}.`);
        }
        else{
            this.#items.push({ producto, cantidad });
            console.log(`🛒 Agregando ${producto.getNombre()} x ${cantidad} al carrito.`);
        }
    }

    removerProducto(producto) {
        const existe = this.#items.some(i => i.producto.getId() === producto.getId());
        if (!existe) {
            console.log(`⚠️ El producto "${producto.getNombre()}" no está en el carrito.`);
            return;
        }
        this.#items = this.#items.filter(i => i.producto.getId() !== producto.getId());
        console.log(`❌ Producto "${producto.getNombre()}" eliminado del carrito.`);
    }

    calcularTotal()
    {
        return this.#items.reduce((acumulador, i) => acumulador + i.producto.getPrecio() * i.cantidad, 0);
    }

    mostrarCarrito()
    {
        
        if(this.getItems().length === 0)
        {
            console.log("-- 🛒 Carrito vacio --");
            return;
        }

        console.log("-- 🛍️ Contenido del carrito --");
        this.getItems().forEach((item, indice) => {
            console.log("---------------------------------");
            console.log("| Producto " + (indice + 1) + " |");
            console.log("ID: " + item.producto.getId());
            console.log("Nombre: " + item.producto.getNombre());
            console.log("Precio: " + item.producto.getPrecio());
            console.log("Stock: " + item.producto.getStock());
            console.log("Cantidad: " + item.cantidad);
        });
        console.log("---------------------------------");
        console.log(`💰 Total a pagar: $ ${this.calcularTotal()}`);
    }

    vaciarCarrito() {
        this.#items = [];
        console.log("🧹 Carrito vaciado correctamente.");
    }
}

class Cliente
{
    #nombre;
    #direccionEnvio;
    #carrito;

    constructor(nombre, direccionEnvio, carrito = new CarritoDeCompras())
    {
        this.#nombre = nombre;
        this.#direccionEnvio = direccionEnvio;
        this.#carrito = carrito;
    }

    getNombre() { return this.#nombre; }
    getDireccionEnvio() { return this.#direccionEnvio; }
    getCarrito() { return this.#carrito; }

    realizarCompra()
    {
        let carrito = this.#carrito;

        const total = carrito.calcularTotal();

        console.log("\n-- 🧾 Confirmación de compra --");
        console.log("---------------------------------");
        console.log(`👤 Cliente ${this.getNombre()}`);
        console.log(`📦 Dirección de envío: ${this.getDireccionEnvio()}`);
        console.log("---------------------------------");
        
        carrito.mostrarCarrito();
        
        console.log("---------------------------------");
        console.log("✅ ¡Compra realizada con éxito!");
        carrito.vaciarCarrito();
    }
}

function formatearPrecio(precio) {
    return precio.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

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

function mostrarProductos(productos)
{
    const $listaProductos = document.getElementById("productos");

    for(let producto of productos)
    {
        const $producto = crearEtiqueta("li", {"data-id": producto.getId()});
        $listaProductos.appendChild($producto);
        const $imagen = crearEtiqueta("img", { src: `img/${producto.getImagen()}`, alt: producto.getNombre() });
        $producto.appendChild($imagen);
        const $div = crearEtiqueta("div");
        $producto.appendChild($div);
        const $titulo = crearEtiqueta("h2", {}, producto.getNombre());
        $div.appendChild($titulo);
        const $descripcion = crearEtiqueta("p", {}, producto.getDescripcion());
        $div.appendChild($descripcion);
        const $precio = crearEtiqueta("p");
        $div.appendChild($precio);
        const $spanPrecio = crearEtiqueta("span", {}, `$${formatearPrecio(producto.getPrecio())}`);
        $precio.appendChild($spanPrecio);
        const $footer = crearEtiqueta("footer");
        $producto.appendChild($footer);
        const $btnDetalle = crearEtiqueta("button", {class: "buttonVerDetalle"}, "Ver detalle");
        $footer.appendChild($btnDetalle);
        const $btnAgregar = crearEtiqueta("button", {class: "agregarProducto"}, "Agregar");
        $footer.appendChild($btnAgregar);
    }
}

function verDetalleItem(producto)
{
    const $modalDetalle = crearEtiqueta("dialog", { class: "modal" });
    const $detalle = crearEtiqueta("div", { class: "detalle" });
    $modalDetalle.appendChild($detalle);
    const $imagen = crearEtiqueta("img", { src: `img/${producto.getImagen()}`, alt: producto.getNombre() });
    $detalle.appendChild($imagen);
    const $titulo = crearEtiqueta("h1", {}, producto.getNombre());
    $detalle.appendChild($titulo);
    const $descripcion = crearEtiqueta("p", {}, producto.getDescripcion());
    $detalle.appendChild($descripcion);
    const $precio = crearEtiqueta("p");
    const $spanPrecio = crearEtiqueta("span", {}, `$${formatearPrecio(producto.getPrecio())}`);
    $precio.appendChild($spanPrecio);
    $detalle.appendChild($precio);
    const $categoria = crearEtiqueta("div", {class: "categoria"}, `Categoría: ${producto.getCategoria()}`);
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

    $btnAgregar.addEventListener("click", () => {
        agregarProducto(producto);
        $modalDetalle.close();
        document.body.removeChild($modalDetalle);
    });
}

function agregarEventos()
{
    const $botonesVerDetalle = document.querySelectorAll(".buttonVerDetalle");
    $botonesVerDetalle.forEach($btn => {
        const productId = $btn.closest("li").getAttribute("data-id");
        const producto = productosObj.find(p => p.getId() === productId);
        $btn.addEventListener("click", () => verDetalleItem(producto));
    });

    const $botonesAgregar = document.querySelectorAll(".agregarProducto");
    $botonesAgregar.forEach($btn => {
        const productId = $btn.closest("li").getAttribute("data-id");
        const producto = productosObj.find(p => p.getId() === productId);
        $btn.addEventListener("click", () => agregarProducto(producto));
    });

    const $btnVerCarrito = document.querySelector("#mini-carrito button");
    $btnVerCarrito.addEventListener("click", mostrarModalCarrito);
}

const productosObj = productos.flat().map(item =>
    new Producto(item.id, item.nombre, item.precio, item.stock, item.descripcion, item.imagen, item.categoria)
);

const carrito = new CarritoDeCompras();

function agregarProducto(producto) {
    carrito.agregarProducto(producto, 1);
    actualizarMiniCarrito();
}

function actualizarMiniCarrito() {
    const totalItems = carrito.getItems().reduce((total, item) => total + item.cantidad, 0);
    const totalPrecio = carrito.calcularTotal();
    
    document.querySelector('#mini-carrito p:first-child span').textContent = totalItems;
    document.querySelector('#mini-carrito p:nth-child(2) span').textContent = formatearPrecio(totalPrecio);
}

function mostrarModalCarrito() {
    const $modalCarrito = crearEtiqueta("dialog", { class: "modal" });
    const $carrito = crearEtiqueta("div", { class: "carrito" });
    $modalCarrito.appendChild($carrito);
    
    const totalItems = carrito.getItems().reduce((total, item) => total + item.cantidad, 0);
    const totalPrecio = carrito.calcularTotal();
    
    const $header = crearEtiqueta("header");
    const $spanProductos = crearEtiqueta("span", {}, `Productos: ${totalItems}`);
    const $spanTotal = crearEtiqueta("span", {}, `Total: $${formatearPrecio(totalPrecio)}`);
    $header.appendChild($spanProductos);
    $header.appendChild($spanTotal);
    $carrito.appendChild($header);
    
    const $lista = crearEtiqueta("ul");
    carrito.getItems().forEach(item => {
        const $item = crearEtiqueta("li");
        const $info = crearEtiqueta("span", {}, `${item.producto.getNombre()} - ${item.cantidad} x $${formatearPrecio(item.producto.getPrecio())}`);
        const $eliminar = crearEtiqueta("a", { href: "#" }, "Eliminar");
        $eliminar.addEventListener("click", (e) => {
            e.preventDefault();
            carrito.removerProducto(item.producto);
            actualizarMiniCarrito();
            $modalCarrito.close();
            document.body.removeChild($modalCarrito);
            mostrarModalCarrito();
        });
        $item.appendChild($info);
        $item.appendChild($eliminar);
        $lista.appendChild($item);
    });
    $carrito.appendChild($lista);
    
    const $footer = crearEtiqueta("footer");
    const $btnCerrar = crearEtiqueta("button", {}, "Cerrar");
    const $btnVaciar = crearEtiqueta("button", {}, "Vaciar");
    const $btnPagar = crearEtiqueta("button", {}, "Proceder al pago");
    $footer.appendChild($btnCerrar);
    $footer.appendChild($btnVaciar);
    $footer.appendChild($btnPagar);
    $carrito.appendChild($footer);
    
    document.body.appendChild($modalCarrito);
    $modalCarrito.showModal();
    
    $btnCerrar.addEventListener("click", () => {
        $modalCarrito.close();
        document.body.removeChild($modalCarrito);
    });
    
    $btnVaciar.addEventListener("click", () => {
        mostrarConfirmacionVaciar($modalCarrito);
    });
}

function mostrarConfirmacionVaciar(modalCarrito) {
    const $modalConfirm = crearEtiqueta("dialog", { class: "modal" });
    const $confirmacion = crearEtiqueta("div", { class: "confirmacion" });
    $modalConfirm.appendChild($confirmacion);
    
    const $titulo = crearEtiqueta("h2", {}, "¿Vaciar carrito?");
    $confirmacion.appendChild($titulo);
    
    const $mensaje = crearEtiqueta("p", {}, "¿Estás seguro de que deseas vaciar todo el carrito? Esta acción no se puede deshacer.");
    $confirmacion.appendChild($mensaje);
    
    const $footer = crearEtiqueta("footer");
    const $btnCancelar = crearEtiqueta("button", {}, "Cancelar");
    const $btnAceptar = crearEtiqueta("button", {}, "Aceptar");
    $footer.appendChild($btnCancelar);
    $footer.appendChild($btnAceptar);
    $confirmacion.appendChild($footer);
    
    document.body.appendChild($modalConfirm);
    $modalConfirm.showModal();
    
    $btnCancelar.addEventListener("click", () => {
        $modalConfirm.close();
        document.body.removeChild($modalConfirm);
    });
    
    $btnAceptar.addEventListener("click", () => {
        carrito.vaciarCarrito();
        actualizarMiniCarrito();
        $modalConfirm.close();
        document.body.removeChild($modalConfirm);
        modalCarrito.close();
        document.body.removeChild(modalCarrito);
    });
}

function main()
{
    mostrarProductos(productosObj);
    agregarEventos();
}

main();
