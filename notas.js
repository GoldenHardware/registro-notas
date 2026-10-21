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

/* ---------------------------------------------------------
   Fase 3 · Estadísticas de la clase (ninguna cambia la lista)
   --------------------------------------------------------- */

/**
 * Calcula la nota media, sin redondear.
 * NO cambia la lista.
 * @param {Array<{nombre: string, nota: number}>} lista - Lista de alumnos.
 * @returns {number} La media, o 0 si no hay alumnos.
 */
function notaMedia(lista) {
  const suma = lista.reduce((total, alumno) => total + alumno.nota, 0);
  return lista.length === 0 ? 0 : suma / lista.length;
}

/**
 * Busca la nota más alta.
 * NO cambia la lista.
 * @param {Array<{nombre: string, nota: number}>} lista - Lista de alumnos.
 * @returns {number | null} La nota máxima, o null si no hay alumnos.
 */
function notaMaxima(lista) {
  if (lista.length === 0) {
    return null;
  }
  return Math.max(...lista.map(alumno => alumno.nota));
}

/**
 * Selecciona los alumnos aprobados (nota 5 o más).
 * NO cambia la lista.
 * @param {Array<{nombre: string, nota: number}>} lista - Lista de alumnos.
 * @returns {Array<{nombre: string, nota: number}>} Un array nuevo con los aprobados.
 */
function aprobados(lista) {
  return lista.filter(alumno => alumno.nota >= NOTA_APROBADO);
}

/**
 * Saca solo los nombres de los aprobados (usa aprobados).
 * NO cambia la lista.
 * @param {Array<{nombre: string, nota: number}>} lista - Lista de alumnos.
 * @returns {string[]} Un array nuevo con los nombres.
 */
function nombresAprobados(lista) {
  return aprobados(lista).map(alumno => alumno.nombre);
}

/**
 * Comprueba si algún alumno tiene un 10.
 * NO cambia la lista.
 * @param {Array<{nombre: string, nota: number}>} lista - Lista de alumnos.
 * @returns {boolean} true si hay al menos un 10.
 */
function hayAlgunDiez(lista) {
  return lista.some(alumno => alumno.nota === 10);
}

/**
 * Comprueba si todos los alumnos han aprobado.
 * NO cambia la lista.
 * @param {Array<{nombre: string, nota: number}>} lista - Lista de alumnos.
 * @returns {boolean} true si todos tienen 5 o más (también true con la lista vacía).
 */
function todosAprobados(lista) {
  return lista.every(alumno => alumno.nota >= NOTA_APROBADO);
}

/**
 * Devuelve los n mejores alumnos, de la nota más alta a la más baja.
 * NO cambia la lista.
 * @param {Array<{nombre: string, nota: number}>} lista - Lista de alumnos.
 * @param {number} n - Cuántos alumnos se quieren.
 * @returns {Array<{nombre: string, nota: number}>} Un array nuevo con los n mejores.
 */
function ranking(lista, n) {
  return ordenarPorNota(lista).slice(0, n);
}

/* ---------------------------------------------------------
   Fase 4 · Filtro, orden y validación para la página
   --------------------------------------------------------- */

/**
 * Filtra los alumnos según el filtro elegido.
 * NO cambia la lista: siempre devuelve una copia.
 * @param {Array<{nombre: string, nota: number}>} lista - Lista de alumnos.
 * @param {"todos" | "aprobados" | "suspensos"} filtro - Qué alumnos mostrar.
 * @returns {Array<{nombre: string, nota: number}>} Copia con los alumnos que cumplen el filtro.
 */
function filtrarAlumnos(lista, filtro) {
  switch (filtro) {
    case "aprobados":
      return aprobados(lista);
    case "suspensos":
      return lista.filter(alumno => alumno.nota < NOTA_APROBADO);
    default:
      return [...lista];
  }
}

/**
 * Ordena los alumnos según el criterio elegido (usa las funciones de la Fase 2).
 * NO cambia la lista: siempre devuelve una copia.
 * @param {Array<{nombre: string, nota: number}>} lista - Lista de alumnos.
 * @param {"nombre" | "nota-desc" | "nota-asc"} criterio - Cómo ordenar.
 * @returns {Array<{nombre: string, nota: number}>} Copia ordenada.
 */
function ordenarAlumnos(lista, criterio) {
  switch (criterio) {
    case "nombre":
      return ordenarPorNombre(lista);
    case "nota-desc":
      return ordenarPorNota(lista);
    case "nota-asc":
      // ordenarPorNota ya devuelve una copia, así que reverse no toca la original.
      return ordenarPorNota(lista).reverse();
    default:
      return [...lista];
  }
}

/**
 * Comprueba si un texto es una nota válida: un número de 0 a 10.
 * Acepta punto o coma decimal ("7.5" o "7,5").
 * NO recibe la lista.
 * @param {string} texto - Lo que ha escrito el usuario.
 * @returns {boolean} true si es un número de 0 a 10; false si está vacío o no es un número.
 */
function esNotaValida(texto) {
  const limpio = String(texto).trim().replace(",", ".");
  if (limpio === "") {
    return false;
  }
  const nota = Number(limpio);
  return Number.isFinite(nota) && nota >= 0 && nota <= 10;
}
