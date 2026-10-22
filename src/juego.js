export const FILAS = 6
export const COLUMNAS = 5

export const PALABRAS = [
  'PERRO', 'GATOS', 'PLATO', 'RELOJ', 'MONTE',
  'LIBRO', 'CAMPO', 'NUBES', 'FRESA', 'PIANO',
  'TIGRE', 'VERDE', 'PLAYA', 'CARTA', 'MUNDO',
]

export function tableroVacio() {
  const tablero = []
  for (let f = 0; f < FILAS; f++) {
    tablero.push(Array(COLUMNAS).fill(''))
  }
  return tablero
}

export function palabraAlAzar(anterior = '') {
  let palabra
  do {
    const i = Math.floor(Math.random() * PALABRAS.length)
    palabra = PALABRAS[i]
  } while (palabra === anterior)
  return palabra
}

export function estadoDe(letra, columna, solucion) {
  if (solucion[columna] === letra) return 'correcta'
  if (solucion.includes(letra)) return 'presente'
  return 'ausente'
}

export function estadosDeFila(fila, solucion) {
  const estados = Array(fila.length).fill('ausente')
  const quedan = {}
  fila.forEach((letra, c) => {
    if (letra === solucion[c]) {
      estados[c] = 'correcta'
    } else {
      quedan[solucion[c]] = (quedan[solucion[c]] ?? 0) + 1
    }
  })
  fila.forEach((letra, c) => {
    if (estados[c] !== 'correcta' && quedan[letra] > 0) {
      estados[c] = 'presente'
      quedan[letra]--
    }
  })
  return estados
}

export function estadosDelTeclado(intentos, filasComprobadas, solucion) {
  const PRIORIDAD = { ausente: 1, presente: 2, correcta: 3 }
  const resultado = {}
  for (let f = 0; f < filasComprobadas; f++) {
    const estados = estadosDeFila(intentos[f], solucion)
    intentos[f].forEach((letra, c) => {
      const anterior = resultado[letra]
      if (!anterior || PRIORIDAD[estados[c]] > PRIORIDAD[anterior]) {
        resultado[letra] = estados[c]
      }
    })
  }
  return resultado
}