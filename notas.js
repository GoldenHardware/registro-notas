/* =========================================================
   notas.js · Funciones que trabajan con la lista de alumnos
   Cada alumno es un objeto: { nombre: "Ana", nota: 7.5 }
   ========================================================= */

/** Nota mínima para aprobar. */
const NOTA_APROBADO = 5;

/** Los 10 alumnos con los que empieza la clase. */
const ALUMNOS_INICIALES = [
  { nombre: "Ana", nota: 7.5 },
  { nombre: "Luis", nota: 4 },
  { nombre: "Marta", nota: 9.25 },
  { nombre: "Pablo", nota: 5 },
  { nombre: "Lucía", nota: 10 },
  { nombre: "Diego", nota: 3.5 },
  { nombre: "Elena", nota: 6.75 },
  { nombre: "Hugo", nota: 9 },
  { nombre: "Sara", nota: 1 },
  { nombre: "Iván", nota: 5.5 }
];

/* ---------------------------------------------------------
   Fase 2 · Añadir, quitar, buscar y ordenar
   --------------------------------------------------------- */

/**
 * Añade un alumno al final de la lista.
 * CAMBIA la lista.
 * @param {Array<{nombre: string, nota: number}>} lista - Lista de alumnos.
 * @param {string} nombre - Nombre del alumno nuevo.
 * @param {number} nota - Nota del alumno nuevo.
 * @returns {number} La nueva cantidad de alumnos.
 */
function anadirAlumno(lista, nombre, nota) {
  return lista.push({ nombre, nota });
}

/**
 * Quita el último alumno de la lista.
 * CAMBIA la lista.
 * @param {Array<{nombre: string, nota: number}>} lista - Lista de alumnos.
 * @returns {{nombre: string, nota: number} | undefined} El alumno quitado
 *   (undefined si la lista estaba vacía).
 */
function quitarUltimo(lista) {
  return lista.pop();
}

/**
 * Busca un alumno por su nombre exacto.
 * NO cambia la lista.
 * @param {Array<{nombre: string, nota: number}>} lista - Lista de alumnos.
 * @param {string} nombre - Nombre que se busca.
 * @returns {{nombre: string, nota: number} | undefined} El alumno, o undefined si no existe.
 */
function buscarPorNombre(lista, nombre) {
  return lista.find(alumno => alumno.nombre === nombre);
}

/**
 * Mete un alumno en una posición sin borrar a nadie.
 * CAMBIA la lista.
 * @param {Array<{nombre: string, nota: number}>} lista - Lista de alumnos.
 * @param {number} posicion - Índice donde se inserta (0 = al principio).
 * @param {string} nombre - Nombre del alumno nuevo.
 * @param {number} nota - Nota del alumno nuevo.
 * @returns {void} No devuelve nada.
 */
function insertarEn(lista, posicion, nombre, nota) {
  lista.splice(posicion, 0, { nombre, nota });
}

/**
 * Borra al alumno que tenga ese nombre.
 * CAMBIA la lista (solo si encuentra al alumno).
 * @param {Array<{nombre: string, nota: number}>} lista - Lista de alumnos.
 * @param {string} nombre - Nombre del alumno que se borra.
 * @returns {boolean} true si ha borrado a alguien; false si no existía.
 */
function borrarPorNombre(lista, nombre) {
  const indice = lista.findIndex(alumno => alumno.nombre === nombre);
  if (indice === -1) {
    return false;
  }
  lista.splice(indice, 1);
  return true;
}

/**
 * Ordena de la nota más alta a la más baja.
 * NO cambia la lista: ordena una copia.
 * @param {Array<{nombre: string, nota: number}>} lista - Lista de alumnos.
 * @returns {Array<{nombre: string, nota: number}>} Copia ordenada por nota descendente.
 */
function ordenarPorNota(lista) {
  return [...lista].sort((a, b) => b.nota - a.nota);
}

/**
 * Ordena por nombre de la A a la Z (respetando tildes del español).
 * NO cambia la lista: ordena una copia.
 * @param {Array<{nombre: string, nota: number}>} lista - Lista de alumnos.
 * @returns {Array<{nombre: string, nota: number}>} Copia ordenada por nombre.
 */
function ordenarPorNombre(lista) {
  return [...lista].sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));
}
