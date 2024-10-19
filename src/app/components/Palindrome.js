"use client";
import React, { useState } from 'react';
import Manacher from '../utils/manacher'; // Asegúrate de que la ruta sea correcta

const Palindrome = ({ texto, setPalindromeSubstring, handleNewOperation }) => {
  const [longestPalindrome, setLongestPalindrome] = useState('');

  const handleFindPalindrome = () => {
    handleNewOperation();

    // Limpia el texto eliminando caracteres especiales y espacios
    const cleanedText = texto.replace(/[^a-zA-Z0-9]/g, '').replace(/\s+/g, '');
    console.log("Texto original:", texto);
    console.log("Texto limpio:", cleanedText);

    // Encuentra el palíndromo más largo usando el texto limpio
    const result = Manacher(cleanedText);
    console.log("Resultado de Manacher:", result);

    // Encuentra la subcadena en el texto original usando la posición del palíndromo
    let palindromeStartIndex = 0;
    let cleanedLength = 0;

    // Recorre el texto original para encontrar el índice de inicio del palíndromo
    for (let i = 0; i < texto.length; i++) {
      const currentChar = texto[i];

      // Ignora caracteres especiales y espacios
      if (/[a-zA-Z0-9]/.test(currentChar)) {
        if (cleanedLength === result.start) {
          palindromeStartIndex = i; // Guarda el índice del primer carácter del palíndromo en el texto original
          break;
        }
        cleanedLength++;
      }
    }

    // Ajustamos el palíndromo a su longitud correcta
    const originalPalindrome = texto.substring(palindromeStartIndex, palindromeStartIndex + result.length);
    
    // Verificar que el palíndromo original se obtenga correctamente
    console.log("Palíndromo encontrado (original):", originalPalindrome);
    
    setLongestPalindrome(originalPalindrome);
    setPalindromeSubstring(originalPalindrome);
  };

  return (
    <div className="border-2 border-rosa-fuerte p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 w-full bg-white">
      <h2 className="text-xl font-semibold text-rosa-fuerte">Encontrar Palíndromo Más Largo</h2>
      <button
        onClick={handleFindPalindrome}
        style={{
          backgroundColor: '#d85e98',
          color: 'white',
          border: '2px solid #d85e98',
        }}
        className="px-4 py-2 rounded-lg hover:bg-rosa-pastel transition duration-300 w-full shadow-md hover:shadow-lg"
      >
        Encontrar Palíndromo
      </button>
      {longestPalindrome && (
        <p className="mt-4">
          El palíndromo más largo es: <strong>{longestPalindrome}</strong>
        </p>
      )}
    </div>
  );
};

export default Palindrome;
