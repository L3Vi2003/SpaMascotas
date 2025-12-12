/* ================== LOGIN ================== */

document.getElementById("form-login").addEventListener("submit", e => {
    e.preventDefault();

    if (user.value === "admin" && pass.value === "123") {
        document.getElementById("login").classList.add("hidden");
        document.getElementById("nav").classList.remove("hidden");
        mostrar("inicio");
    } else {
        alert("Usuario o contraseña incorrectos.");
    }
});

function cerrarSesion() {
    location.reload();
}

/* ================== CAMBIAR SECCIÓN ================== */
function mostrar(id) {
    document.querySelectorAll(".section").forEach(sec =>
        sec.classList.add("hidden")
    );
    document.getElementById(id).classList.remove("hidden");
}

/* ================== DUEÑOS ================== */

document.getElementById("form-dueno").addEventListener("submit", e => {
    e.preventDefault();

    document.getElementById("tabla-duenos").innerHTML += `
        <tr>
            <td>${d_nombre.value}</td>
            <td>${d_tel.value}</td>
            <td>${d_correo.value}</td>
        </tr>
    `;

    e.target.reset();
});

/* ================== MASCOTAS CON FOTO ================== */

document.getElementById("form-mascota").addEventListener("submit", e => {
    e.preventDefault();

    let fotoURL = "";

    if (m_foto.files[0]) {
        fotoURL = URL.createObjectURL(m_foto.files[0]);
        // <-- La imagen cargada aparece aquí
    }

    document.getElementById("tabla-mascotas").innerHTML += `
        <tr>
            <td><img src="${fotoURL}" class="mini"></td>
            <td>${m_nombre.value}</td>
            <td>${m_especie.value}</td>
            <td>${m_raza.value}</td>
        </tr>
    `;

    e.target.reset();
});

/* ================== AGENDA CON IMÁGENES ================== */

const imagenesServicios = {
    "Baño": "imagenes/baño2.png",
    "Peluquería": "imagenes/peluqueria.png",
    "Corte de Uñas": "imagenes/uñas.png",
    "Vacunación": "imagenes/vacunacion.png"
    // <-- Cambia por tus imágenes
};

document.getElementById("form-agenda").addEventListener("submit", e => {
    e.preventDefault();

    const img = imagenesServicios[a_servicio.value];

    document.getElementById("tabla-agenda").innerHTML += `
        <tr>
            <td><img src="${img}" class="mini"> ${a_servicio.value}</td>
            <td>${a_fecha.value}</td>
            <td>${a_hora.value}</td>
            <td>${a_mascota.value}</td>
        </tr>
    `;

    e.target.reset();
});

/* ================== CATÁLOGO + CARRITO ================== */

const catalogo = [
    { nombre: "Baño", precio: 30, img: "imagenes/baño2.png" },
    { nombre: "Peluquería", precio: 50, img: "imagenes/peluqueria.png" },
    { nombre: "Corte de Uñas", precio: 15, img: "imagenes/uñas.png" },
    { nombre: "Shampoo", precio: 20, img: "imagenes/shampoo.png" }
    // <-- Cambia por tus imágenes
];

const contCatalogo = document.getElementById("catalogo");

catalogo.forEach((p, i) => {
    contCatalogo.innerHTML += `
        <div class="producto">
            <img src="${p.img}" alt="${p.nombre}">
            <h3>${p.nombre} – ${p.precio} Bs</h3>
            <button onclick="agregar(${i})">Comprar</button>
        </div>
    `;
});

let carrito = [];

function agregar(i) {
    carrito.push(catalogo[i]);
    actualizarCarrito();
}

function actualizarCarrito() {
    const lista = document.getElementById("lista-carrito");
    lista.innerHTML = "";

    let total = 0;

    carrito.forEach((p, i) => {
        lista.innerHTML += `
            <tr>
                <td><img src="${p.img}" class="mini"> ${p.nombre}</td>
                <td>${p.precio} Bs</td>
                <td><button onclick="eliminar(${i})">X</button></td>
            </tr>
        `;
        total += p.precio;
    });

    document.getElementById("total").textContent = total;
}

function eliminar(i) {
    carrito.splice(i, 1);
    actualizarCarrito();
}

function confirmarCompra() {
    if (carrito.length === 0) return alert("El carrito está vacío.");

    alert("Compra realizada con éxito.");
    carrito = [];
    actualizarCarrito();
}
