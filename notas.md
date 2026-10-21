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
