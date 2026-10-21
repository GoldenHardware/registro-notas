# Registro de notas

Práctica 2 · Arrays — Desarrollo Web en Entorno Cliente · 2º DAW · IES Juan García Valdemora

Una tabla con las notas de una clase en la que se puede filtrar (todos, aprobados y suspensos), ordenar (por nombre o por nota), añadir y borrar alumnos. Todo funciona con arrays de objetos `{ nombre, nota }`.

**Página publicada:** _(enlace de GitHub Pages)_

## Archivos

| Archivo | Contenido |
|---------|-----------|
| `index.html` | Estructura de la página: resumen, selectores, tabla y formulario |
| `estilos.css` | Estilos (nota aprobada en verde y suspensa en rojo; modo oscuro) |
| `notas.js` | Datos iniciales y todas las funciones que trabajan con arrays (documentadas con JSDoc) |
| `app.js` | La lista verdadera `alumnos`, `pintarTabla()` y los eventos de la página |
| `notas.md` | Apuntes, predicciones y respuestas de cada fase |

## Cómo usarla

Abre `index.html` en el navegador. No necesita servidor ni instalar nada.

## Funciones que **cambian** la lista

- `anadirAlumno(lista, nombre, nota)`: `push`
- `quitarUltimo(lista)`: `pop`
- `insertarEn(lista, posicion, nombre, nota)`: `splice`
- `borrarPorNombre(lista, nombre)`: `splice` (solo si encuentra al alumno)

## Funciones que **no cambian** la lista

Devuelven una copia:

- `ordenarPorNota(lista)`
- `ordenarPorNombre(lista)`
- `aprobados(lista)`
- `nombresAprobados(lista)`
- `ranking(lista, n)`
- `filtrarAlumnos(lista, filtro)`
- `ordenarAlumnos(lista, criterio)`

Devuelven un dato:

- `buscarPorNombre(lista, nombre)`: un alumno o `undefined`
- `notaMedia(lista)`: un número
- `notaMaxima(lista)`: un número o `null`
- `hayAlgunDiez(lista)`: `true` o `false`
- `todosAprobados(lista)`: `true` o `false`
- `esNotaValida(texto)`: `true` o `false` (no recibe la lista)
