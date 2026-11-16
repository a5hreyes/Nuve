

/* ELEMENTOS DE LA PÁGINA */

const contenedorPublicaciones = document.querySelector(".publicaciones-contenedor");
const formulario = document.querySelector("#Crear form");
const campoUsuario = document.querySelector("#Usuario");
const campoContenido = document.querySelector("#Contenido");
const campoCategoria = document.querySelector("#categoria");
const campoBusqueda = document.querySelector(".busqueda input");

/* ARREGLO DE PUBLICACIONES */

let publicaciones = [
    {
        id: 1,
        usuario: "a5hh.10",
        contenido: "Hoy encontré nuevas ideas de outfits para combinar prendas básicas y crear diferentes estilos.",
        categoria: "Moda",
        imagen: "img/Oufit 1.jpg",
        likes: 12,
        comentarios: [
            { usuario: "Sofi", texto: "¡Me encanta esta idea! 💗" },
            { usuario: "Valeria", texto: "Qué lindo estilo, gracias por compartir." }
        ],
        guardada: false,
        meGusta: false
    },
    {
        id: 2,
        usuario: "nxzth124",
        contenido: "Estos peinados sencillos son perfectos para cambiar de look sin complicarse tanto.",
        categoria: "Peinados",
        imagen: "img/peinado 3.jpg",
        likes: 120,
        comentarios: [
            { usuario: "Dani", texto: "Ese peinado está precioso ✨" },
            { usuario: "Meli", texto: "Lo voy a intentar." }
        ],
        guardada: false,
        meGusta: false
    },
    {
        id: 3,
        usuario: "Dari_2008",
        contenido: "Les comparto algunas canciones que me gusta escuchar mientras me arreglo o estudio.",
        categoria: "Musica",
        imagen: "img/música.jpg",
        likes: 300,
        comentarios: [
            { usuario: "Andrea", texto: "Me encanta esta playlist 🎧" },
            { usuario: "Sofi", texto: "Perfecta para estudiar." }
        ],
        guardada: false,
        meGusta: false
    }
];

let siguienteId = 4;
let categoriaActual = "Todas";
let busquedaActual = "";

/* FUNCIONES PARA CREAR ELEMENTOS */

function crearElemento(etiqueta, clase, texto) {
    const elemento = document.createElement(etiqueta);

    if (clase !== "") {
        elemento.className = clase;
    }

    if (texto !== undefined) {
        elemento.textContent = texto;
    }

    return elemento;
}

/* MOSTRAR LOS COMENTARIOS */

function mostrarComentarios(publicacion, tarjeta) {
    const seccion = crearElemento("div", "comentarios-publicacion");
    const titulo = crearElemento("h4", "", "Comentarios");

    seccion.appendChild(titulo);

    for (let i = 0; i < publicacion.comentarios.length; i++) {
        const comentario = crearElemento("div", "comentario");
        const usuario = crearElemento("strong", "", publicacion.comentarios[i].usuario);
        const texto = crearElemento("p", "", publicacion.comentarios[i].texto);

        comentario.appendChild(usuario);
        comentario.appendChild(texto);
        seccion.appendChild(comentario);
    }

    const escribir = crearElemento("div", "escribir-comentario");
    const campo = crearElemento("input");
    const boton = crearElemento("button", "", "Enviar");

    campo.type = "text";
    campo.placeholder = "Escribe un comentario...";
    campo.setAttribute("aria-label", "Escribe un comentario");
    boton.type = "button";

    escribir.appendChild(campo);
    escribir.appendChild(boton);
    seccion.appendChild(escribir);
    tarjeta.appendChild(seccion);
}

/* MOSTRAR LAS PUBLICACIONES */

function mostrarPublicaciones() {
    if (contenedorPublicaciones === null) {
        return;
    }

    contenedorPublicaciones.innerHTML = "";

    let cantidadMostrada = 0;

    for (let i = 0; i < publicaciones.length; i++) {
        const publicacion = publicaciones[i];

        let coincideCategoria = false;

        if (categoriaActual === "Todas") {
            coincideCategoria = true;
        } else if (categoriaActual === "Guardadas" && publicacion.guardada) {
            coincideCategoria = true;
        } else if (publicacion.categoria === categoriaActual) {
            coincideCategoria = true;
        }

        const textoPublicacion = (
            publicacion.usuario + " " +
            publicacion.contenido + " " +
            publicacion.categoria
        ).toLowerCase();

        const coincideBusqueda = textoPublicacion.includes(busquedaActual);

        if (coincideCategoria && coincideBusqueda) {
            const tarjeta = crearElemento("article", "publicacion");
            tarjeta.dataset.id = publicacion.id;

            tarjeta.appendChild(
                crearElemento("h3", "", "Usuario: " + publicacion.usuario)
            );

            tarjeta.appendChild(
                crearElemento("p", "", publicacion.contenido)
            );

            let nombreCategoria = publicacion.categoria;

            if (nombreCategoria === "Musica") {
                nombreCategoria = "Música";
            }

            tarjeta.appendChild(
                crearElemento("p", "categoria", "Categoría: " + nombreCategoria)
            );

            if (publicacion.imagen !== "") {
                const imagen = crearElemento("img");
                imagen.src = publicacion.imagen;
                imagen.alt = "Imagen de la publicación";
                tarjeta.appendChild(imagen);
            }

            const acciones = crearElemento("div", "acciones-publicacion");

            const botonLike = crearElemento(
                "button",
                "boton-like" + (publicacion.meGusta ? " like-activo" : ""),
                publicacion.meGusta ? "♥ Me gusta" : "♡ Me gusta"
            );

            const cantidadLikes = crearElemento("span", "", publicacion.likes + " Me gusta");

            botonLike.type = "button";
            acciones.appendChild(botonLike);
            acciones.appendChild(cantidadLikes);
            tarjeta.appendChild(acciones);

            const botones = crearElemento("div", "acciones-extra");

            const botonGuardar = crearElemento(
                "button",
                "boton-guardar",
                publicacion.guardada ? "★ Guardada" : "☆ Guardar"
            );

            const botonEliminar = crearElemento("button", "boton-eliminar", "Eliminar");

            botonGuardar.type = "button";
            botonEliminar.type = "button";

            botones.appendChild(botonGuardar);
            botones.appendChild(botonEliminar);
            tarjeta.appendChild(botones);

            mostrarComentarios(publicacion, tarjeta);
            contenedorPublicaciones.appendChild(tarjeta);

            cantidadMostrada++;
        }
    }

    if (cantidadMostrada === 0) {
        const mensaje = crearElemento(
            "p",
            "sin-resultados",
            "No encontramos publicaciones. Intenta con otra búsqueda 💗"
        );

        contenedorPublicaciones.appendChild(mensaje);
    }
}

/* FILTRO POR CATEGORÍA */

function crearFiltros() {
    if (contenedorPublicaciones === null) {
        return;
    }

    const filtros = crearElemento("div", "filtro-publicaciones");
    const etiqueta = crearElemento("label", "", "Filtrar publicaciones");
    const selector = crearElemento("select");

    const categorias = [
        "Todas",
        "Moda",
        "Belleza",
        "Peinados",
        "Musica",
        "Videos",
        "Comunidad",
        "Guardadas"
    ];

    selector.id = "filtroCategoria";
    etiqueta.setAttribute("for", "filtroCategoria");

    for (let i = 0; i < categorias.length; i++) {
        const opcion = crearElemento("option", "", categorias[i]);
        opcion.value = categorias[i];
        selector.appendChild(opcion);
    }

    selector.addEventListener("change", function () {
        categoriaActual = selector.value;
        mostrarPublicaciones();
    });

    filtros.appendChild(etiqueta);
    filtros.appendChild(selector);

    contenedorPublicaciones.parentElement.insertBefore(
        filtros,
        contenedorPublicaciones
    );
}

/* FORMULARIO PARA CREAR PUBLICACIONES */

if (formulario !== null) {
    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();

        const usuario = campoUsuario.value.trim();
        const contenido = campoContenido.value.trim();
        const categoria = campoCategoria.value;

        if (usuario.length < 2) {
            alert("Escribe un nombre de usuario válido.");
            campoUsuario.focus();
            return;
        }

        if (contenido.length < 5) {
            alert("La publicación debe tener al menos 5 caracteres.");
            campoContenido.focus();
            return;
        }

        if (categoria === "") {
            alert("Selecciona una categoría.");
            campoCategoria.focus();
            return;
        }

        const nuevaPublicacion = {
            id: siguienteId,
            usuario: usuario,
            contenido: contenido,
            categoria: categoria,
            imagen: "",
            likes: 0,
            comentarios: [],
            guardada: false,
            meGusta: false
        };

        siguienteId++;
        publicaciones.unshift(nuevaPublicacion);

        formulario.reset();
        categoriaActual = "Todas";
        busquedaActual = "";

        if (campoBusqueda !== null) {
            campoBusqueda.value = "";
        }

        const filtro = document.querySelector("#filtroCategoria");

        if (filtro !== null) {
            filtro.value = "Todas";
        }

        mostrarPublicaciones();
        alert("¡Tu publicación se agregó correctamente! 💗");
    });
}

/* BOTONES DE LAS PUBLICACIONES */

if (contenedorPublicaciones !== null) {
    contenedorPublicaciones.addEventListener("click", function (evento) {
        const tarjeta = evento.target.closest(".publicacion");

        if (tarjeta === null) {
            return;
        }

        const id = Number(tarjeta.dataset.id);
        let publicacionEncontrada = null;

        for (let i = 0; i < publicaciones.length; i++) {
            if (publicaciones[i].id === id) {
                publicacionEncontrada = publicaciones[i];
            }
        }

        if (publicacionEncontrada === null) {
            return;
        }

        if (evento.target.classList.contains("boton-like")) {
            publicacionEncontrada.meGusta = !publicacionEncontrada.meGusta;

            if (publicacionEncontrada.meGusta) {
                publicacionEncontrada.likes++;
            } else {
                publicacionEncontrada.likes--;
            }

            mostrarPublicaciones();
        }

        if (evento.target.classList.contains("boton-guardar")) {
            publicacionEncontrada.guardada = !publicacionEncontrada.guardada;
            mostrarPublicaciones();
        }

        if (evento.target.classList.contains("boton-eliminar")) {
            const confirmar = confirm("¿Quieres eliminar esta publicación?");

            if (confirmar) {
                const nuevasPublicaciones = [];

                for (let i = 0; i < publicaciones.length; i++) {
                    if (publicaciones[i].id !== id) {
                        nuevasPublicaciones.push(publicaciones[i]);
                    }
                }

                publicaciones = nuevasPublicaciones;
                mostrarPublicaciones();
            }
        }

        if (evento.target.matches(".escribir-comentario button")) {
            const campo = tarjeta.querySelector(".escribir-comentario input");
            const texto = campo.value.trim();

            if (texto === "") {
                alert("Escribe un comentario antes de enviarlo.");
                return;
            }

            publicacionEncontrada.comentarios.push({
                usuario: "a5hh_10",
                texto: texto
            });

            mostrarPublicaciones();
        }
    });
}

/* BUSCADOR */

if (campoBusqueda !== null) {
    const parametros = new URLSearchParams(window.location.search);
    const busquedaInicial = parametros.get("buscar");

    if (busquedaInicial !== null) {
        campoBusqueda.value = busquedaInicial;
    }

    busquedaActual = campoBusqueda.value.trim().toLowerCase();

    campoBusqueda.addEventListener("input", function () {
        busquedaActual = campoBusqueda.value.trim().toLowerCase();

        if (contenedorPublicaciones !== null) {
            categoriaActual = "Todas";

            const filtro = document.querySelector("#filtroCategoria");

            if (filtro !== null) {
                filtro.value = "Todas";
            }

            mostrarPublicaciones();
        } else if (campoBusqueda.value.trim() !== "") {
            window.location.href =
                "index.html?buscar=" +
                encodeURIComponent(campoBusqueda.value.trim()) +
                "#Publicaciones";
        }
    });
}

/* ME GUSTA EN LAS DEMÁS GALERÍAS */

document.addEventListener("click", function (evento) {
    const boton = evento.target.closest(".boton-like");

    if (boton === null || boton.closest(".publicacion") !== null) {
        return;
    }

    const acciones = boton.closest(".acciones-publicacion");

    if (acciones === null) {
        return;
    }

    const cantidad = acciones.querySelector("span");

    if (cantidad === null) {
        return;
    }

    let numero = parseInt(cantidad.textContent, 10) || 0;
    const activo = boton.classList.toggle("like-activo");

    if (activo) {
        numero++;
    } else {
        numero--;
    }

    cantidad.textContent = numero + " Me gusta";
    boton.textContent = activo ? "♥ Me gusta" : "♡ Me gusta";
});

/* INICIAR LA PÁGINA */

crearFiltros();
mostrarPublicaciones();