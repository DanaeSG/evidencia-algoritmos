function LCS(s1, s2) {
    const m = s1.length;
    const n = s2.length;

    // Array para almacenar el resultado anterior
    let anterior = new Array(n + 1).fill(0);
    
    let resultado = 0;
    for (let i = 1; i <= m; i++) {
        // Array para almacenar el resultado actual
        let actual = new Array(n + 1).fill(0);
        for (let j = 1; j <= n; j++) {
            if (s1[i - 1] === s2[j - 1]) {
                actual[j] = anterior[j - 1] + 1;
                resultado = Math.max(resultado, actual[j]);
            } else {
                actual[j] = 0;
            }
        }
        // Actualizar el resultado anterior para la siguiente iteración
        anterior = actual;
    }
    return resultado;
}

export default LCS;
