// src/app/utils/trie.js

class NodoTrie {
    constructor() {
        // Array para los nodos hijos, 27 para incluir la "ñ"
        this.hijos = new Array(27).fill(null);
        this.esFinDePalabra = false;
    }
}

// Función para obtener el índice correspondiente al carácter
function obtenerIndice(c) {
    const aCharCode = 'a'.charCodeAt(0); // Código ASCII de 'a'

    if (c >= 'a' && c <= 'n') {
        return c.charCodeAt(0) - aCharCode; // Letras de 'a' a 'n'
    } else if (c === 'ñ') {
        return 14; // La "ñ" será el índice 14
    } else if (c >= 'o' && c <= 'z') {
        return c.charCodeAt(0) - 'o'.charCodeAt(0) + 15; // Ajuste correcto para letras después de la "ñ"
    }
    return -1; // Carácter no válido
}

// Función para normalizar caracteres con acento
function normalizarCaracter(c) {
    switch (c) {
        case 'á': return 'a';
        case 'é': return 'e';
        case 'í': return 'i';
        case 'ó': return 'o';
        case 'ú': return 'u';
        default: return c; // Mantener el carácter si no tiene acento
    }
}

// Método para insertar una clave en el Trie
function insertarClave(raiz, clave) {
    let actual = raiz;
    for (let c of clave) {
        c = normalizarCaracter(c); // Normalizar el carácter
        const indice = obtenerIndice(c);
        if (indice === -1) continue; // Ignorar caracteres no válidos

        // Crear un nuevo nodo si no existe para el carácter actual
        if (actual.hijos[indice] === null) {
            actual.hijos[indice] = new NodoTrie();
        }
        actual = actual.hijos[indice];
    }
    actual.esFinDePalabra = true;
}

// Método para buscar una clave en el Trie
function buscarClave(raiz, clave) {
    let actual = raiz;
    for (let c of clave) {
        c = normalizarCaracter(c); // Normalizar el carácter
        const indice = obtenerIndice(c);
        if (indice === -1 || actual.hijos[indice] === null) {
            return false;
        }
        actual = actual.hijos[indice];
    }
    return actual.esFinDePalabra;
}

// Método para autocompletar desde el Trie
function autocompletar(raiz, prefijo) {
    let actual = raiz;
    for (let c of prefijo) {
        c = normalizarCaracter(c); // Normalizar el carácter
        const indice = obtenerIndice(c);
        if (indice === -1 || actual.hijos[indice] === null) {
            return []; // No hay palabras que autocompletar
        }
        actual = actual.hijos[indice];
    }
    // Pasar el nodo actual (último nodo del prefijo) a encontrarPalabras
    return encontrarPalabras(actual, prefijo); 
}


// Método auxiliar para encontrar todas las palabras que comienzan con un prefijo
function encontrarPalabras(nodo, prefijo) {
    let palabras = [];
    if (nodo.esFinDePalabra) {
        palabras.push(prefijo);
    }
    for (let i = 0; i < nodo.hijos.length; i++) {
        if (nodo.hijos[i]) {
            // Si el índice es 14, representa la "ñ"
            let letra;
            if (i === 14) {
                letra = 'ñ';
            } else if (i < 14) {
                // Letras de 'a' a 'n'
                letra = String.fromCharCode(i + 'a'.charCodeAt(0));
            } else {
                // Letras de 'o' a 'z', después de la "ñ"
                letra = String.fromCharCode(i + 'a'.charCodeAt(0) - 1);
            }
            palabras = palabras.concat(encontrarPalabras(nodo.hijos[i], prefijo + letra));
        }
    }
    return palabras;
}


export { NodoTrie, insertarClave, buscarClave, autocompletar };
