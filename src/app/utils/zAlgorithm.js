// src/app/utils/search.js

function arregloZ(S) {
    const Z = [];
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
    const S = P + "$" + T;
    const ZArray = arregloZ(S);
    const posiciones = []; // Para almacenar posiciones encontradas
    for (let i = 0; i < S.length; i++) {
        if (ZArray[i] === P.length) {
            posiciones.push(i - P.length - 1); // Guardar posición encontrada
        }
    }
    return posiciones; // Retornar posiciones encontradas
}

// Ejemplo de uso
const texto = "abracadabra";
const patron = "abra";
console.log(Z(texto, patron)); // Debería imprimir [0, 7]

export { arregloZ, Z };
