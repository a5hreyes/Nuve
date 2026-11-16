// MODO CLARO Y OSCURO

const encabezado = document.querySelector("header");
const botonTema = document.createElement("button");

botonTema.type = "button";
botonTema.className = "boton-tema";
botonTema.setAttribute("aria-label", "Cambiar tema");

// APLICAR EL TEMA GUARDADO

function aplicarTema() {
    const temaGuardado = localStorage.getItem("temaNuvé");

    if (temaGuardado === "oscuro") {
        document.body.classList.add("modo-oscuro");
        botonTema.textContent = "☀️ Modo claro";
    } else {
        document.body.classList.remove("modo-oscuro");
        botonTema.textContent = "🌙 Modo oscuro";
    }
}

// AGREGAR EL BOTÓN

if (encabezado !== null) {
    encabezado.appendChild(botonTema);
}

aplicarTema();

// CAMBIAR EL TEMA

botonTema.addEventListener("click", function () {
    if (document.body.classList.contains("modo-oscuro")) {
        document.body.classList.remove("modo-oscuro");
        localStorage.setItem("temaNuvé", "claro");
        botonTema.textContent = "🌙 Modo oscuro";
    } else {
        document.body.classList.add("modo-oscuro");
        localStorage.setItem("temaNuvé", "oscuro");
        botonTema.textContent = "☀️ Modo claro";
    }
});