function LCS(s1, s2) {
    const m = s1.length;
    const n = s2.length;

    // Matriz para almacenar la longitud de las subcadenas
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
    let maxLength = 0;
    let endIndex = 0; // Para rastrear el final de la subcadena

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (s1[i - 1] === s2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
                if (dp[i][j] > maxLength) {
                    maxLength = dp[i][j];
                    endIndex = i; // Actualizar el índice final
                }
            }
        }
    }

    // Extraer la subcadena común más larga
    const longestCommonSubstring = s1.substring(endIndex - maxLength, endIndex);
    return { length: maxLength, substring: longestCommonSubstring };
}

export default LCS;
