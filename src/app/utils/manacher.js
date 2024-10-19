function Manacher(s) {
    // Transformar el string para manejar palíndromos de longitud par
    const t = '#' + s.split('').join('#') + '#';
    const n = t.length;
    const palindromo = new Array(n).fill(0);
    
    let mitad = 0, der = 0;
    let max_longitud = 0, mitad_index = 0;

    for (let i = 1; i < n - 1; i++) {
        const espejo = 2 * mitad - i;
        if (i < der) {
            palindromo[i] = Math.min(der - i, palindromo[espejo]);
        }

        while (i + palindromo[i] + 1 < n && i - palindromo[i] - 1 >= 0 &&
               t[i + palindromo[i] + 1] === t[i - palindromo[i] - 1]) {
            palindromo[i]++;
        }

        if (i + palindromo[i] > der) {
            mitad = i;
            der = i + palindromo[i];
        }

        if (palindromo[i] > max_longitud) {
            max_longitud = palindromo[i];
            mitad_index = i;
        }
    }

    // Calcular el índice de inicio en el texto original
    const inicio = (mitad_index - max_longitud) / 2;
    return { substring: s.substr(inicio, max_longitud), start: Math.floor(inicio), length: max_longitud };
}

export default Manacher;
