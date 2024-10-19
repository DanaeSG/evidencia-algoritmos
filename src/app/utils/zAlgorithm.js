// src/app/utils/search.js

function arregloZ(S) {
    const Z = new Array(S.length).fill(0); // Inicializar el arreglo Z con ceros
    const n = S.length;
    let l = 0, r = 0;

    for (let i = 1; i < n; i++) {
        if (i > r) {
            l = r = i;
            while (r < n && S[r - l] === S[r]) {
                r++;
            }
            Z[i] = r - l;
            r--;
        } else {
            const k = i - l;
            if (Z[k] < r - i + 1) {
                Z[i] = Z[k];
            } else {
                l = i;
                while (r < n && S[r - l] === S[r]) {
                    r++;
                }
                Z[i] = r - l;
                r--;
            }
        }
    }
    return Z;
}

function Z(T, P) {
    const S = P + "$" + T; // Concatenar el patrón, un delimitador y el texto
    const ZArray = arregloZ(S);
    const posiciones = []; // Para almacenar las posiciones encontradas

    for (let i = P.length + 1; i < S.length; i++) { // Empezar después del delimitador
        if (ZArray[i] === P.length) {
            posiciones.push(i - P.length - 1); // Guardar posición encontrada
        }
    }
    return posiciones; // Retornar todas las posiciones encontradas
}

export { arregloZ, Z };
