/* =========================================================
   app.js · Conecta las funciones de notas.js con la página
   ========================================================= */

// La lista verdadera: la única que se guarda y se modifica.
// Se copian los objetos para no tocar ALUMNOS_INICIALES.
const alumnos = ALUMNOS_INICIALES.map(alumno => ({ ...alumno }));

const selectorFiltro = document.querySelector("#filtro");
const selectorOrden = document.querySelector("#orden");
const cuerpoTabla = document.querySelector("#cuerpo-tabla");
const resumen = document.querySelector("#resumen");
const formulario = document.querySelector("#formulario");
const campoNombre = document.querySelector("#campo-nombre");
const campoNota = document.querySelector("#campo-nota");
const mensaje = document.querySelector("#mensaje");

/** Escribe una nota con formato español: 7,5 · 9,25 · 10 */
function formatearNota(nota) {
  return nota.toLocaleString("es-ES", { maximumFractionDigits: 2 });
}

/** Escribe un mensaje en la página (sin alert). tipo: "error" u "ok". */
function mostrarMensaje(texto, tipo) {
  mensaje.textContent = texto;
  mensaje.className = `mensaje mensaje-${tipo}`;
}

/** Crea una fila <tr> para un alumno. */
function crearFila(alumno) {
  const fila = document.createElement("tr");

  const celdaNombre = document.createElement("td");
  celdaNombre.textContent = alumno.nombre;

  const celdaNota = document.createElement("td");
  celdaNota.className = "col-nota";
  const etiqueta = document.createElement("span");
  const aprobado = alumno.nota >= NOTA_APROBADO;
  etiqueta.className = aprobado ? "nota nota-aprobada" : "nota nota-suspensa";
  etiqueta.textContent = formatearNota(alumno.nota);
  etiqueta.title = aprobado ? "Aprobado" : "Suspenso";
  celdaNota.append(etiqueta);

  const celdaBorrar = document.createElement("td");
  celdaBorrar.className = "col-borrar";
  const boton = document.createElement("button");
  boton.type = "button";
  boton.className = "boton-borrar";
  boton.textContent = "✕";
  boton.dataset.nombre = alumno.nombre;
  boton.setAttribute("aria-label", `Borrar a ${alumno.nombre}`);
  celdaBorrar.append(boton);

  fila.append(celdaNombre, celdaNota, celdaBorrar);
  return fila;
}

/** Escribe el resumen de la clase con las funciones de la Fase 3. */
function pintarResumen() {
  const maxima = notaMaxima(alumnos);
  const datos = [
    ["Alumnos", alumnos.length],
    ["Nota media", notaMedia(alumnos).toLocaleString("es-ES", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })],
    ["Nota máxima", maxima === null ? "—" : formatearNota(maxima)],
    ["Aprobados", aprobados(alumnos).length]
  ];

  resumen.replaceChildren();
  for (const [titulo, valor] of datos) {
    const bloque = document.createElement("div");
    const dt = document.createElement("dt");
    const dd = document.createElement("dd");
    dt.textContent = titulo;
    dd.textContent = valor;
    bloque.append(dt, dd);
    resumen.append(bloque);
  }
}

/**
 * La única función que dibuja la tabla.
 * Coge la lista verdadera, aplica filtro y orden (copias) y escribe las filas.
 */
function pintarTabla() {
  const filtrados = filtrarAlumnos(alumnos, selectorFiltro.value);
  const visibles = ordenarAlumnos(filtrados, selectorOrden.value);

  cuerpoTabla.replaceChildren();

  if (visibles.length === 0) {
    const fila = document.createElement("tr");
    const celda = document.createElement("td");
    celda.colSpan = 3;
    celda.className = "tabla-vacia";
    celda.textContent = alumnos.length === 0
      ? "No hay alumnos en la clase."
      : "No hay alumnos que mostrar con este filtro.";
    fila.append(celda);
    cuerpoTabla.append(fila);
  } else {
    for (const alumno of visibles) {
      cuerpoTabla.append(crearFila(alumno));
    }
  }

  pintarResumen();
}

/* ---------- Paso 3 · Filtro y orden ---------- */
selectorFiltro.addEventListener("change", pintarTabla);
selectorOrden.addEventListener("change", pintarTabla);

/* ---------- Paso 4 · Añadir ---------- */
formulario.addEventListener("submit", evento => {
  evento.preventDefault();

  const nombre = campoNombre.value.trim();
  const textoNota = campoNota.value.trim();

  if (nombre === "") {
    mostrarMensaje("Escribe un nombre.", "error");
    campoNombre.focus();
    return;
  }
  if (buscarPorNombre(alumnos, nombre) !== undefined) {
    mostrarMensaje(`Ya hay un alumno llamado ${nombre}.`, "error");
    campoNombre.focus();
    return;
  }
  if (!esNotaValida(textoNota)) {
    mostrarMensaje("La nota tiene que ser un número de 0 a 10.", "error");
    campoNota.focus();
    return;
  }

  const nota = Number(textoNota.replace(",", "."));
  anadirAlumno(alumnos, nombre, nota);
  mostrarMensaje(`${nombre} añadido con un ${formatearNota(nota)}.`, "ok");
  formulario.reset();
  campoNombre.focus();
  pintarTabla();
});

/* ---------- Paso 5 · Borrar ---------- */
cuerpoTabla.addEventListener("click", evento => {
  const boton = evento.target.closest(".boton-borrar");
  if (!boton) {
    return;
  }
  const nombre = boton.dataset.nombre;
  if (borrarPorNombre(alumnos, nombre)) {
    mostrarMensaje(`${nombre} borrado.`, "ok");
    pintarTabla();
  }
});

pintarTabla();
