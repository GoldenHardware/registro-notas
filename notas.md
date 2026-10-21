# Registro de notas · Apuntes

> Práctica 2 · Arrays — Desarrollo Web en Entorno Cliente · 2º DAW

---

## Fase 1 · Explora los arrays

> ✏️ La columna **Mi predicción** la tengo que rellenar yo **antes** de ejecutar cada línea.
> La columna **Lo que salió** es el resultado real en la consola.

| Nº | Línea | Mi predicción | Lo que salió |
|----|-------|---------------|--------------|
| 1 | `a[0]` | | `"x"` |
| 2 | `a[3]` | | `undefined` |
| 3 | `a.length` | | `3` |
| 4 | `[1, "dos", true].length` | | `3` |
| 5 | `const c = [1]; c.push(2); c` | | `[1, 2]` |
| 6 | `q.push(4)` y mirar `p` | | devuelve `4`; `p` → `[1, 2, 3, 4]` |
| 7 | `let r = [...p]; r.push(5)` y mirar `p` | | devuelve `5`; `p` → `[1, 2, 3, 4]` (no cambia) |
| 8 | `[10, 9, 1].sort()` | | `[1, 10, 9]` |
| 9 | `[10, 9, 1].sort((x, y) => x - y)` | | `[1, 9, 10]` |
| 10 | `n.push(4)` | | devuelve `4`; `n` → `[3, 1, 2, 4]` (**cambia**) |
| 11 | `n.pop()` | | devuelve `2`; `n` → `[3, 1]` (**cambia**) |
| 12 | `n.slice(0, 2)` | | devuelve `[3, 1]`; `n` → `[3, 1, 2]` (no cambia) |
| 13 | `n.map(x => x * 2)` | | devuelve `[6, 2, 4]`; `n` → `[3, 1, 2]` (no cambia) |

### Preguntas

**1. ¿Qué da `a[3]` si el array solo tiene 3 elementos? ¿Por qué?**
Da `undefined`. Los índices empiezan en 0, así que un array de 3 elementos tiene las posiciones 0, 1 y 2. La posición 3 no existe, y JavaScript no da error al leer una posición que no existe: simplemente devuelve `undefined`.

**2. ¿Por qué `q.push(4)` cambió `p` y `r.push(5)` no? Explica qué es copiar y qué es referenciar.**
`let q = p` no copia el array: hace que `q` apunte **al mismo array** que `p` (una *referencia*). Hay un solo array con dos nombres, así que lo que se hace con `q` se ve en `p`.
`let r = [...p]` sí **copia**: el operador *spread* crea un array nuevo con los mismos elementos. `r` y `p` son arrays distintos, así que cambiar uno no afecta al otro.
(Es una copia *superficial*: si los elementos fueran objetos, los objetos seguirían siendo compartidos.)

**3. ¿Por qué `[10, 9, 1].sort()` no dio `[1, 9, 10]`?**
Sin función de comparación, `sort` convierte los elementos a texto y los ordena alfabéticamente, carácter a carácter. Como texto, `"10"` va antes que `"9"` porque `"1"` < `"9"`. Por eso sale `[1, 10, 9]`. Para ordenar números hay que pasarle `(x, y) => x - y`.

**4. De los cuatro métodos del bloque D, ¿cuáles cambian el array y cuáles devuelven uno nuevo?**
- **Cambian el array:** `push` (devuelve la nueva longitud) y `pop` (devuelve el elemento quitado).
- **Devuelven uno nuevo sin tocar el original:** `slice` y `map`.

📷 `tabla-predicciones.png` — *(pegar captura)*

---

## Fase 2 · Añadir, quitar, buscar y ordenar

| Función | ¿Cambia la lista? | Método que usa |
|---------|-------------------|----------------|
| `anadirAlumno` | **cambia** | `push` |
| `quitarUltimo` | **cambia** | `pop` |
| `buscarPorNombre` | no cambia | `find` |
| `insertarEn` | **cambia** | `splice(pos, 0, alumno)` |
| `borrarPorNombre` | **cambia** (si encuentra al alumno) | `findIndex` + `splice(i, 1)` |
| `ordenarPorNota` | no cambia | `[...lista].sort(...)` |
| `ordenarPorNombre` | no cambia | `[...lista].sort(...)` con `localeCompare` |

**Comprobación con los 10 alumnos:** `ordenarPorNota(ALUMNOS_INICIALES)` da
Lucía (10), **Marta (9,25)**, Hugo (9), Ana (7,5), Elena (6,75), Iván (5,5), Pablo (5), Luis (4), Diego (3,5), Sara (1).

> ⚠️ El enunciado dice que Hugo (9) debe salir segundo, pero Marta tiene 9,25, que es más que 9.
> El orden correcto es Lucía → Marta → Hugo, y eso es lo que da la función.

### Preguntas

**1. ¿Qué funciones de esta fase cambian la lista y cuáles no? ¿Cómo lo sabes?**
Cambian: `anadirAlumno`, `quitarUltimo`, `insertarEn` y `borrarPorNombre`. No cambian: `buscarPorNombre`, `ordenarPorNota` y `ordenarPorNombre`.
Lo sé porque las primeras usan métodos que modifican el array (`push`, `pop`, `splice`), y las segundas o solo leen (`find`) o trabajan sobre una copia. Lo he comprobado en la consola: después de llamar a cada función miro la lista original (con `console.table(lista)`) y veo si ha cambiado.

**2. ¿Por qué `ordenarPorNota` hace una copia antes de ordenar?**
Porque `sort` ordena **el propio array** (lo cambia). Si ordenara la lista que recibe, perdería el orden original, y el enunciado pide que la lista no cambie. Con `[...lista]` se ordena una copia y la original queda igual.

**3. ¿Qué pasaría con las notas 10, 9 y 1 si no usaras una función de comparación?**
Se ordenarían como texto y saldrían `1, 10, 9` (de menor a mayor como texto), no `10, 9, 1`. Además, como en la lista hay objetos, sin comparación se compararían como `"[object Object]"` y el orden no tendría nada que ver con las notas.

📷 `funciones-consola.png` — *(pegar captura)*

---

## Fase 3 · Estadísticas de la clase

| Función | Método principal |
|---------|------------------|
| `notaMedia` | `reduce` (suma) |
| `notaMaxima` | `map` + `Math.max` |
| `aprobados` | `filter` |
| `nombresAprobados` | `aprobados` + `map` |
| `hayAlgunDiez` | `some` |
| `todosAprobados` | `every` |
| `ranking` | `ordenarPorNota` + `slice` |

### Experimento 1 · Todas las funciones con una lista vacía

| Llamada | Resultado |
|---------|-----------|
| `notaMedia([])` | `0` |
| `notaMaxima([])` | `null` |
| `aprobados([])` | `[]` |
| `nombresAprobados([])` | `[]` |
| `hayAlgunDiez([])` | `false` |
| `todosAprobados([])` | `true` |
| `ranking([], 2)` | `[]` |

### Experimento 2 · `notaMedia` sin valor inicial en `reduce`

Con `lista.reduce((total, alumno) => total + alumno.nota)` (sin el `0`) y la lista vacía sale:

```
Uncaught TypeError: Reduce of empty array with no initial value
```

Después he vuelto a poner el `0`.

### Preguntas

**1. ¿Por qué `reduce` necesita un valor inicial cuando la lista está vacía?**
Sin valor inicial, `reduce` usa el primer elemento como acumulador de partida. Si la lista está vacía no hay primer elemento, así que no tiene con qué empezar y lanza un `TypeError`. Con valor inicial (`0`), si la lista está vacía simplemente devuelve ese `0`.
Además, en `notaMedia` el valor inicial hace falta siempre: los elementos son objetos, y sin el `0` el acumulador empezaría siendo el objeto del primer alumno, no un número.

**2. ¿Qué devuelve `todosAprobados` con una lista vacía? ¿Te parece lógico? Explícalo.**
Devuelve `true`. Es lógico desde el punto de vista de la lógica matemática ("verdad vacía"): `every` devuelve `false` en cuanto encuentra un elemento que no cumple la condición. Con una lista vacía no hay ningún alumno suspenso, así que no puede encontrar un contraejemplo. Aunque suena raro decir "todos aprobados" cuando no hay nadie, la afirmación "no hay ningún suspenso" es cierta.

**3. ¿Qué diferencia hay entre `map` y `filter`? Pon un ejemplo de tu código.**
- `map` **transforma** cada elemento: devuelve un array con la misma cantidad de elementos, pero cambiados.
- `filter` **selecciona** elementos: devuelve un array con los mismos elementos sin cambiar, pero solo los que cumplen la condición (puede tener menos).

En `nombresAprobados` uso los dos:

```js
aprobados(lista)                 // filter: 4 alumnos → 3 alumnos (Ana, Marta, Pablo)
  .map(alumno => alumno.nombre); // map: 3 alumnos → 3 nombres ["Ana", "Marta", "Pablo"]
```

📷 `estadisticas-consola.png` — *(pegar captura)*
