'use strict';

/*
 * Dalama, Melany
 */

const productos = [
    { id: "001", nombre: "Monitor 27\" curvo QHD", descripcion: "Monitor curvo de 27 pulgadas con resolución QHD y alta tasa de refresco.", 
        precio: 275000.00, imagen: "monitor27curvoqhd.webp", categoria: "Monitores", stock: 25 },
    { id: "002", nombre: "Monitor 24\" Full HD negro", descripcion: "Monitor de 24 pulgadas con resolución Full HD negro.", 
        precio: 180000.00, imagen: "monitor24hd.webp", categoria: "Monitores", stock: 20 },
    { id: "003", nombre: "Monitor 27\" Full HD blanco", descripcion: "Monitor de 27 pulgadas con resolución Full HD blanco.",
        precio: 220000.00, imagen: "monitor27hdblanco.jpg", categoria: "Monitores", stock: 24 },
    { id: "004", nombre: "RAM 16GB Axus RGB", descripcion: "Memoria RAM 16GB 2.4GHz RGB SYNC", 
        precio: 55000.00, imagen: "ramaxus16.png", categoria: "Memorias", stock: 34 },
    { id: "005", nombre: "RAM 8GB Axus RGB", descripcion: "Memoria RAM 8GB 2.4GHz RGB SYNC", 
        precio: 35000.00, imagen: "ramaxus8.png", categoria: "Memorias", stock: 27 },
    { id: "006", nombre: "RAM 16GB HyperY RGB", descripcion: "Memoria RAM 16GB HyperY 2.4GHz RGB SYNC", 
        precio: 65000.00, imagen: "ramhypery16.webp", categoria: "Memorias", stock: 30 },
    { id: "007", nombre: "Disco SSD 1TB", descripcion: "Disco sólido de 1TB Kingtan", 
        precio: 100000.00, imagen: "discokingtan.png", categoria: "Discos", stock: 14 },
    { id: "008", nombre: "Disco SSD 500GB", descripcion: "Disco sólido de 500GB Kingtan", 
        precio: 60000.00, imagen: "discokingtan500.jpg", categoria: "Discos", stock: 19 },
    { id: "009", nombre: "Disco HDD 2TB", descripcion: "Disco duro de 2TB Western Digital", 
        precio: 80000.00, imagen: "discowd2tb.jpg", categoria: "Discos", stock: 33 }
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

    obtenerCantidadProductos() {
    return this.#items.reduce(
        (total, item) => total + item.cantidad,
        0
    )}

    obtenerCantidadPorProducto(producto){
        const item = this.#items.find(i => i.producto.getId() === producto.getId());
        return item ? item.cantidad : 0;
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

    for (let producto of productos)
    {
        const $producto = crearEtiqueta("li", {"data-id": producto.getId()});
        $listaProductos.append($producto);

        const $imagen = crearEtiqueta("img", { 
            src: `img/${producto.getImagen()}`, 
            alt: producto.getNombre() 
        });
        $producto.append($imagen);

        const $div = crearEtiqueta("div");
        $producto.append($div);

        const $titulo = crearEtiqueta("h2", {}, producto.getNombre());
        $div.append($titulo);

        const $descripcion = crearEtiqueta("p", {}, producto.getDescripcion());
        $div.append($descripcion);

        const $precio = crearEtiqueta("p");
        const $spanPrecio = crearEtiqueta(
            "span", 
            {}, 
            `$${formatearPrecio(producto.getPrecio())}`
        );
        $precio.append($spanPrecio);
        $div.append($precio);

        const $footer = crearEtiqueta("footer");
        $producto.append($footer);

        const $categoria = crearEtiqueta("div", {class: "categoria"}, producto.getCategoria());
        $footer.append($categoria);

        const $btnDetalle = crearEtiqueta("button", {"aria-label": "Ver detalle del producto", class: "buttonVerDetalle" });
        const $iconoDetalle = crearEtiqueta("i", { class: "bi bi-eye" });
        $btnDetalle.append($iconoDetalle);
        $btnDetalle.append(document.createTextNode(" Ver detalle"));

        $btnDetalle.addEventListener("click", () => {
            verDetalleItem(producto);
        });

        $footer.append($btnDetalle);

        const $btnAgregar = crearEtiqueta("button", {"aria-label": "Agregar producto al carrito", class: "agregarProducto" });
        const $iconoAgregar = crearEtiqueta("i", { class: "bi bi-cart-plus" });
        $btnAgregar.append($iconoAgregar);
        $btnAgregar.append(document.createTextNode(" Agregar"));

        $btnAgregar.addEventListener("click", () => {
            agregarProducto(producto);
        });

        $footer.append($btnAgregar);
    }
}

function verDetalleItem(producto)
{
    const $modalDetalle = crearEtiqueta("dialog", { class: "modal" });
    const $cantidadAgregadaAlCarrito = crearEtiqueta("p", { class: "mensaje-carrito", hidden: true });
    $modalDetalle.addEventListener("close", () => {
        $modalDetalle.remove();
    });
    const $detalle = crearEtiqueta("div", { class: "detalle" });
    const $imagen = crearEtiqueta("img", { src: `img/${producto.getImagen()}`, alt: producto.getNombre() });
    $detalle.append($imagen);
    const $titulo = crearEtiqueta("h1", {}, producto.getNombre());
    $detalle.append($titulo);
    const $descripcion = crearEtiqueta("p", {}, producto.getDescripcion());
    $detalle.append($descripcion);
    const $precio = crearEtiqueta("p");
    const $spanPrecio = crearEtiqueta("span", {}, `$${formatearPrecio(producto.getPrecio())}`);
    $precio.append($spanPrecio);
    $detalle.append($precio);
    const $categoria = crearEtiqueta("div", {class: "categoria"}, `Categoría: ${producto.getCategoria()}`);
    $detalle.append($categoria);
    
    $modalDetalle.append($detalle);
    $detalle.append($cantidadAgregadaAlCarrito);
    actualizarCantidadProductoEnDetalle(producto, $cantidadAgregadaAlCarrito);

    const $mediosPago = mostrarMediosPago();
    $detalle.append($mediosPago);
    
    const $footer = crearEtiqueta("footer");
    const $btnCerrar = crearEtiqueta("button", {"aria-label": "Cerrar modal Ver Detalle Item", class: "btn-cerrar"});
    const $iconoCerrar = crearEtiqueta("i", {class: "bi bi-x-lg"});
    $btnCerrar.append($iconoCerrar);
    $btnCerrar.append(document.createTextNode(" Cerrar"));
    const $btnAgregarModal = crearEtiqueta("button", {"aria-label": "Agregar producto al carrito desde modal"});
    const $iconoAgregarModal = crearEtiqueta("i", {class: "bi bi-cart-plus"});
    $btnAgregarModal.append($iconoAgregarModal);
    $btnAgregarModal.append(document.createTextNode(" Agregar"));
    append($btnCerrar);
    append($btnAgregarModal);
    $detalle.append($footer);
    
    document.body.append($modalDetalle);
    $modalDetalle.showModal();
    
    $btnCerrar.addEventListener("click", () => {
        $modalDetalle.close();
    });

    $btnAgregarModal.addEventListener("click", () => {
        agregarProducto(producto);
        actualizarCantidadProductoEnDetalle(producto, $cantidadAgregadaAlCarrito);
    });
}

function actualizarCantidadProductoEnDetalle(producto, $cantidadAgregadaAlCarrito)
{
    const cantidad = carrito.obtenerCantidadPorProducto(producto);
    if(cantidad > 0)
    {
        $cantidadAgregadaAlCarrito.textContent = `Has agregado ${cantidad} unidad${cantidad > 1 ? "es" : ""} de este producto al carrito`;
        $cantidadAgregadaAlCarrito.hidden = false;
    } else {
        $cantidadAgregadaAlCarrito.hidden = true;
    }
}

function agregarEventosGlobales()
{
    const $btnVerCarrito = document.querySelector("#mini-carrito button");
    $btnVerCarrito.addEventListener("click", mostrarModalCarrito);
}

const productosObj = productos.map(item =>
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
    $mediosSection.append($titulo);
    
    const $lista = crearEtiqueta("ul");
    mediosDePago.forEach(medio => {
        const $item = crearEtiqueta("li");
        const $icono = crearEtiqueta("i", {class: `bi ${medio.icono}`});
        $item.append($icono);
        $item.append(document.createTextNode(` ${medio.texto}`));
        $lista.append($item);
    });
    $mediosSection.append($lista);
    
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
    $modalCarrito.addEventListener("close", () => {
        $modalCarrito.remove();
    });

    const $carrito = crearEtiqueta("div", { class: "carrito" });
    $modalCarrito.append($carrito);
    
    const totalItems = carrito.obtenerCantidadProductos();
    const totalPrecio = carrito.calcularTotal();
    
    const $header = crearEtiqueta("header");
    const $spanProductos = crearEtiqueta("span", {}, `Productos: ${totalItems}`);
    $header.append($spanProductos);
    $carrito.append($header);
    
    const $lista = crearEtiqueta("ul");
    
    if (carrito.getItems().length === 0) {
    const $mensajeVacio = crearEtiqueta(
        "p",
        { class: "carrito-vacio" },
        "No hay productos en el carrito"
    );
    $carrito.append($mensajeVacio);
    }
    if (carrito.getItems().length > 0) {
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
                    mostrarModalCarrito();
                }
            });
            $item.append($info);
            $item.append($eliminar);
            $lista.append($item);
        });
        $carrito.append($lista);
    }

    const $totalSection = crearEtiqueta("div", {class: "total-carrito"});
    const $totalTexto = crearEtiqueta("h3", {}, `Total: $${formatearPrecio(totalPrecio)}`);
    $totalSection.append($totalTexto);
    $carrito.append($totalSection);
    
    const $footer = crearEtiqueta("footer");
    const $btnCerrarCarrito = crearEtiqueta("button", {"aria-label": "Cerrar carrito", class: "btn-secundario btn-volver"});
    const $iconoCerrarCarrito = crearEtiqueta("i", {class: "bi bi-arrow-left"});
    $btnCerrarCarrito.append($iconoCerrarCarrito);
    $btnCerrarCarrito.append(document.createTextNode(" Volver atrás"));
    const $btnVaciar = crearEtiqueta("button", {class: "btn-secundario btn-cancelar"});
    $btnCerrarCarrito.addEventListener("click", () => {
    $modalCarrito.close();
    });
    const $iconoVaciar = crearEtiqueta("i", {class: "bi bi-trash"});
    $btnVaciar.append($iconoVaciar);
    $btnVaciar.append(document.createTextNode(" Vaciar"));
    
    const $btnPagar = crearEtiqueta("button", {class: "btn-pagar"});
    
    if (carrito.getItems().length === 0) {
        $btnVaciar.disabled = true;
        $btnPagar.disabled = true;
    }
    const $iconoPagar = crearEtiqueta("i", {class: "bi bi-credit-card"});
    $btnPagar.append($iconoPagar);
    $btnPagar.append(document.createTextNode(" Finalizar compra"));
    $footer.append($btnCerrarCarrito);
    $footer.append($btnVaciar);
    $footer.append($btnPagar);
    $carrito.append($footer);
    
    document.body.append($modalCarrito);
    $modalCarrito.showModal();
    
    $btnVaciar.addEventListener("click", () => {
        if (carrito.getItems().length === 0) {
            return;
        }
        mostrarConfirmacionVaciar($modalCarrito);
    });
    
    $btnPagar.addEventListener("click", () => {
        if (carrito.getItems().length === 0) {
            return;
        }
        mostrarConfirmacionCompra($modalCarrito);
    });
}

function mostrarModalCantidadEliminar(item, modalCarrito) {
    const $modalCantidad = crearEtiqueta("dialog", { class: "modal" });
    $modalCantidad.addEventListener("close", () => {
        $modalCantidad.remove();
    });

    const $contenido = crearEtiqueta("div", { class: "confirmacion" });
    $modalCantidad.append($contenido);

    const $titulo = crearEtiqueta("h2", {}, "¿Cuántos eliminar?");
    const $mensaje = crearEtiqueta(
        "p",
        {},
        `Tienes ${item.cantidad} unidades de "${item.producto.getNombre()}". ¿Cuántas deseas eliminar?`
    );

    $contenido.append($titulo, $mensaje);

    let cantidadEliminar = 1;

    const $contador = crearEtiqueta("div", { class: "contador-cantidad" });

    const $btnMenos = crearEtiqueta("button", {
        class: "btn-contador",
        "aria-label": "Reducir cantidad a eliminar"
    }, "−");

    const $cantidadTexto = crearEtiqueta(
        "span",
        { class: "cantidad-texto", "aria-live": "polite" },
        cantidadEliminar.toString()
    );

    const $btnMas = crearEtiqueta("button", {
        class: "btn-contador",
        "aria-label": "Aumentar cantidad a eliminar"
    }, "+");

    $contador.append($btnMenos, $cantidadTexto, $btnMas);
    $contenido.append($contador);

    const $footer = crearEtiqueta("footer");

    const $btnCancelarEliminar = crearEtiqueta(
        "button",
        { class: "btn-secundario btn-volver", "aria-label": "Cancelar eliminación" }
    );
    $btnCancelarEliminar.append(
        crearEtiqueta("i", { class: "bi bi-arrow-left" }),
        " Volver atrás"
    );

    const $btnEliminarConfirm = crearEtiqueta(
        "button",
        { class: "btn-cancelar", "aria-label": "Confirmar eliminación" }
    );
    $btnEliminarConfirm.append(
        crearEtiqueta("i", { class: "bi bi-trash" }),
        " Eliminar"
    );

    $footer.append($btnCancelarEliminar, $btnEliminarConfirm);
    $contenido.append($footer);

    document.body.append($modalCantidad);
    $modalCantidad.showModal();

    $btnMas.addEventListener("click", () => {
        if (cantidadEliminar < item.cantidad) {
            cantidadEliminar++;
            $cantidadTexto.textContent = cantidadEliminar;
        }
    });

    $btnMenos.addEventListener("click", () => {
        if (cantidadEliminar > 1) {
            cantidadEliminar--;
            $cantidadTexto.textContent = cantidadEliminar;
        }
    });

    $btnCancelarEliminar.addEventListener("click", () => {
        $modalCantidad.close();
    });

    $btnEliminarConfirm.addEventListener("click", () => {
        if (cantidadEliminar >= item.cantidad) {
            carrito.removerProducto(item.producto);
        } else {
            item.cantidad -= cantidadEliminar;
        }

        actualizarMiniCarrito();
        $modalCantidad.close();
        modalCarrito.close();
        mostrarModalCarrito();
    });
}

function mostrarConfirmacionVaciar(modalCarrito) {
    const $modalConfirm = crearEtiqueta("dialog", { class: "modal" });
    $modalConfirm.addEventListener("close", () => {
        $modalConfirm.remove();
    });
    const $confirmacion = crearEtiqueta("div", { class: "confirmacion" });
    $modalConfirm.append($confirmacion);
    
    const $titulo = crearEtiqueta("h2", {}, "¿Vaciar carrito?");
    $confirmacion.append($titulo);
    
    const $mensaje = crearEtiqueta("p", {}, "¿Estás seguro de que deseas vaciar todo el carrito? Esta acción no se puede deshacer.");
    $confirmacion.append($mensaje);
    
    const $footer = crearEtiqueta("footer");
    const $btnCancelarVaciar = crearEtiqueta("button", {"aria-label": "Cancelar vaciado del carrito"});
    const $iconoCancelarVaciar = crearEtiqueta("i", {class: "bi bi-x-circle"});
    $btnCancelarVaciar.append($iconoCancelarVaciar);
    $btnCancelarVaciar.append(document.createTextNode(" Cancelar"));
    const $btnAceptarVaciar = crearEtiqueta("button", {"aria-label": "Confirmar vaciado del carrito"});
    const $iconoAceptarVaciar = crearEtiqueta("i", {class: "bi bi-check-circle"});
    $btnAceptarVaciar.append($iconoAceptarVaciar, document.createTextNode(" Aceptar"));
    $footer.append($btnCancelarVaciar, $btnAceptarVaciar);
    $confirmacion.append($footer);
    
    document.body.append($modalConfirm);
    $modalConfirm.showModal();
    
    $btnCancelarVaciar.addEventListener("click", () => {
        $modalConfirm.close();
    });
    
    $btnAceptarVaciar.addEventListener("click", () => {
        carrito.vaciarCarrito();
        actualizarMiniCarrito();
        $modalConfirm.close();
        modalCarrito.close();
    });
}

function mostrarConfirmacionCompra(modalCarrito) {
    const $modalCompra = crearEtiqueta("dialog", { class: "modal" });
    $modalCompra.addEventListener("close", () => {
        $modalCompra.remove();
    });
    const $compra = crearEtiqueta("div", { class: "confirmacion" });
    $modalCompra.append($compra);
    
    const $icono = crearEtiqueta("i", { class: "bi bi-check-circle-fill icono-exito"});   
    $compra.append($icono);
    
    const $titulo = crearEtiqueta("h2", { class: "titulo-exito" }, "¡Compra realizada con éxito!");
    $compra.append($titulo);
    
    const $mensaje = crearEtiqueta("p", {}, "Detalle de tu compra:");
    $compra.append($mensaje);
    
    const $lista = crearEtiqueta("ul", { class: "lista-resumen" });
    carrito.getItems().forEach(item => {
        const $item = crearEtiqueta("li", { class: "item-resumen" });
        $item.textContent = `${item.producto.getNombre()} - ${item.cantidad} x $${formatearPrecio(item.producto.getPrecio())}`;
        $lista.append($item);
    });
    $compra.append($lista);
    
    const totalPrecio = carrito.calcularTotal();
    const $total = crearEtiqueta("p", { class: "total-pagado" }, `Total pagado: $${formatearPrecio(totalPrecio)}`);
    $compra.append($total);
    
    const $footer = crearEtiqueta("footer");
    const $btnAceptar = crearEtiqueta("button", {"aria-label": "Aceptar compra"});
    const $iconoAceptar = crearEtiqueta("i", {class: "bi bi-check-lg"});
    $btnAceptar.append($iconoAceptar, document.createTextNode(" Aceptar"));
    append($btnAceptar);
    $footer.append($btnAceptar);
    $compra.append($footer);
    
    document.body.append($modalCompra);
    $modalCompra.showModal();
    
    $btnAceptar.addEventListener("click", () => {
        carrito.vaciarCarrito();
        actualizarMiniCarrito();
        $modalCompra.close();
        modalCarrito.close();
    });
}

function main()
{
    mostrarProductos(productosObj);
    agregarEventosGlobales();
}

main();
