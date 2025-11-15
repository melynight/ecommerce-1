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
        if(existeItem)
        {
            existeItem.cantidad += cantidad;
        }
        else{
            this.#items.push({ producto, cantidad });
        }
    }

    removerProducto(producto) {
        const existe = this.#items.some(i => i.producto.getId() === producto.getId());
        if (!existe) {
            return;
        }
        this.#items = this.#items.filter(i => i.producto.getId() !== producto.getId());
    }

    calcularTotal()
    {
        return this.#items.reduce((acumulador, i) => acumulador + i.producto.getPrecio() * i.cantidad, 0);
    }

    vaciarCarrito() {
        this.#items = [];
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
        carrito.mostrarCarrito();
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
        const $btnDetalle = crearEtiqueta("button", {class: "buttonVerDetalle"});
        $btnDetalle.innerHTML = '<i class="bi bi-eye"></i> Ver detalle';
        $footer.appendChild($btnDetalle);
        const $btnAgregar = crearEtiqueta("button", {class: "agregarProducto"});
        $btnAgregar.innerHTML = '<i class="bi bi-cart-plus"></i> Agregar';
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
    
    const $mediosPago = mostrarMediosPago();
    $detalle.appendChild($mediosPago);
    
    const $footer = crearEtiqueta("footer");
    const $btnCerrar = crearEtiqueta("button", {class: "btn-cerrar"});
    const $iconoCerrar = crearEtiqueta("i", {class: "bi bi-x-lg"});
    $btnCerrar.appendChild($iconoCerrar);
    $btnCerrar.appendChild(document.createTextNode(" Cerrar"));
    const $btnAgregar = crearEtiqueta("button", {});
    const $iconoAgregar = crearEtiqueta("i", {class: "bi bi-cart-plus"});
    $btnAgregar.appendChild($iconoAgregar);
    $btnAgregar.appendChild(document.createTextNode(" Agregar"));
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

const mediosDePago = [
    { icono: "bi-credit-card", texto: "Tarjeta de crédito 3 cuotas" },
    { icono: "bi-credit-card", texto: "Tarjeta de crédito 6 cuotas" },
    { icono: "bi-credit-card", texto: "Tarjeta de crédito 12 cuotas" },
    { icono: "bi-credit-card-2-front", texto: "Tarjeta de débito" },
    { icono: "bi-bank", texto: "Transferencia bancaria" },
    { icono: "bi-cash", texto: "Efectivo" }
];

function mostrarMediosPago() {
    const $mediosSection = crearEtiqueta("div", {class: "medios-pago"});
    const $titulo = crearEtiqueta("h3", {}, "Medios de pago disponibles");
    $mediosSection.appendChild($titulo);
    
    const $lista = crearEtiqueta("ul");
    mediosDePago.forEach(medio => {
        const $item = crearEtiqueta("li");
        const $icono = crearEtiqueta("i", {class: `bi ${medio.icono}`});
        $item.appendChild($icono);
        $item.appendChild(document.createTextNode(` ${medio.texto}`));
        $lista.appendChild($item);
    });
    $mediosSection.appendChild($lista);
    
    return $mediosSection;
}

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
    $header.appendChild($spanProductos);
    $carrito.appendChild($header);
    
    const $lista = crearEtiqueta("ul");
    carrito.getItems().forEach(item => {
        const $item = crearEtiqueta("li");
        const $info = crearEtiqueta("span", {}, `${item.producto.getNombre()} - ${item.cantidad} x $${formatearPrecio(item.producto.getPrecio())}`);
        const $eliminar = crearEtiqueta("a", { href: "#" }, "Eliminar");
        $eliminar.addEventListener("click", (e) => {
            e.preventDefault();
            if (item.cantidad > 1) {
                mostrarModalCantidadEliminar(item, $modalCarrito);
            } else {
                carrito.removerProducto(item.producto);
                actualizarMiniCarrito();
                $modalCarrito.close();
                document.body.removeChild($modalCarrito);
                mostrarModalCarrito();
            }
        });
        $item.appendChild($info);
        $item.appendChild($eliminar);
        $lista.appendChild($item);
    });
    $carrito.appendChild($lista);
    
    const $totalSection = crearEtiqueta("div", {class: "total-carrito"});
    const $totalTexto = crearEtiqueta("h3", {}, `Total: $${formatearPrecio(totalPrecio)}`);
    $totalSection.appendChild($totalTexto);
    $carrito.appendChild($totalSection);
    
    const $footer = crearEtiqueta("footer");
    const $btnCerrar = crearEtiqueta("button", {class: "btn-cerrar"});
    const $iconoCerrar = crearEtiqueta("i", {class: "bi bi-arrow-left"});
    $btnCerrar.appendChild($iconoCerrar);
    $btnCerrar.appendChild(document.createTextNode(" Volver atrás"));
    const $btnVaciar = crearEtiqueta("button", {});
    const $iconoVaciar = crearEtiqueta("i", {class: "bi bi-trash"});
    $btnVaciar.appendChild($iconoVaciar);
    $btnVaciar.appendChild(document.createTextNode(" Vaciar"));
    
    const $btnPagar = crearEtiqueta("button", {});
    
    if (carrito.getItems().length === 0) {
        $btnVaciar.disabled = true;
        $btnPagar.disabled = true;
    }
    const $iconoPagar = crearEtiqueta("i", {class: "bi bi-credit-card"});
    $btnPagar.appendChild($iconoPagar);
    $btnPagar.appendChild(document.createTextNode(" Proceder al pago"));
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
        if (carrito.getItems().length === 0) {
            return;
        }
        mostrarConfirmacionVaciar($modalCarrito);
    });
}

function mostrarModalCantidadEliminar(item, modalCarrito) {
    const $modalCantidad = crearEtiqueta("dialog", { class: "modal" });
    const $contenido = crearEtiqueta("div", { class: "confirmacion" });
    $modalCantidad.appendChild($contenido);
    
    const $titulo = crearEtiqueta("h2", {}, "¿Cuántos eliminar?");
    $contenido.appendChild($titulo);
    
    const $mensaje = crearEtiqueta("p", {}, `Tienes ${item.cantidad} unidades de "${item.producto.getNombre()}". ¿Cuántas deseas eliminar?`);
    $contenido.appendChild($mensaje);
    
    const $inputContainer = crearEtiqueta("div", {style: "margin: 1rem 0; text-align: center;"});
    const $input = crearEtiqueta("input", {type: "number", min: "1", max: item.cantidad.toString(), value: "1", style: "padding: 0.5rem; border-radius: 5px; border: 1px solid #ccc; width: 80px;"});
    $inputContainer.appendChild($input);
    $contenido.appendChild($inputContainer);
    
    const $footer = crearEtiqueta("footer");
    const $btnCancelar = crearEtiqueta("button", {});
    const $iconoCancelar = crearEtiqueta("i", {class: "bi bi-arrow-left"});
    $btnCancelar.appendChild($iconoCancelar);
    $btnCancelar.appendChild(document.createTextNode(" Volver atrás"));
    const $btnEliminar = crearEtiqueta("button", {});
    const $iconoEliminar = crearEtiqueta("i", {class: "bi bi-trash"});
    $btnEliminar.appendChild($iconoEliminar);
    $btnEliminar.appendChild(document.createTextNode(" Eliminar"));
    $footer.appendChild($btnCancelar);
    $footer.appendChild($btnEliminar);
    $contenido.appendChild($footer);
    
    document.body.appendChild($modalCantidad);
    $modalCantidad.showModal();
    
    $btnCancelar.addEventListener("click", () => {
        $modalCantidad.close();
        document.body.removeChild($modalCantidad);
    });
    
    $btnEliminar.addEventListener("click", () => {
        const cantidadEliminar = parseInt($input.value);
        if (cantidadEliminar >= item.cantidad) {
            carrito.removerProducto(item.producto);
        } else {
            item.cantidad -= cantidadEliminar;
        }
        actualizarMiniCarrito();
        $modalCantidad.close();
        document.body.removeChild($modalCantidad);
        modalCarrito.close();
        document.body.removeChild(modalCarrito);
        mostrarModalCarrito();
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
    const $btnCancelar = crearEtiqueta("button", {});
    const $iconoCancelar = crearEtiqueta("i", {class: "bi bi-x-circle"});
    $btnCancelar.appendChild($iconoCancelar);
    $btnCancelar.appendChild(document.createTextNode(" Cancelar"));
    const $btnAceptar = crearEtiqueta("button", {});
    const $iconoAceptar = crearEtiqueta("i", {class: "bi bi-check-circle"});
    $btnAceptar.appendChild($iconoAceptar);
    $btnAceptar.appendChild(document.createTextNode(" Aceptar"));
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
