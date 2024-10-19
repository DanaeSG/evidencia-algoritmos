"use client";
import React, { useState } from 'react';
import Manacher from '../utils/manacher'; 

const Palindrome = ({ texto, setPalindromeSubstring, handleNewOperation }) => {
  const [longestPalindrome, setLongestPalindrome] = useState('');

  const handleFindPalindrome = () => {
    handleNewOperation();
  
    // Limpia el texto: convierte a minúsculas, quita acentos, caracteres especiales y espacios
    const cleanedText = texto
      .toLowerCase() // Convierte a minúsculas
      .normalize('NFD') // Normaliza para separar los acentos de los caracteres base
      .replace(/[\u0300-\u036f]/g, '') // Elimina los acentos
      .replace(/[^a-zA-Z0-9]/g, '') // Elimina caracteres especiales
      .replace(/\s+/g, ''); // Elimina espacios
  
    console.log("Texto original:", texto);
    console.log("Texto limpio:", cleanedText);
  
    // Encuentra el palíndromo más largo usando el texto limpio
    const result = Manacher(cleanedText);
    console.log("Resultado de Manacher (objeto):", result);
    console.log(`Palíndromo más largo encontrado en texto limpio: "${result.substring}", inicio: ${result.start}, longitud: ${result.length}`);
  
    // Mapea los índices del texto limpio al texto original
    const mapCleanedToOriginal = [];
    let cleanedLength = 0;
  
    console.log("Generando mapeo de índices entre el texto limpio y el texto original...");
    for (let i = 0; i < texto.length; i++) {
      const currentChar = texto[i].normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
      if (/[a-zA-Z0-9]/.test(currentChar)) {
        mapCleanedToOriginal[cleanedLength] = i;
        cleanedLength++;
      }
    }
    
    console.log("Mapeo completo (índice limpio -> índice original):", mapCleanedToOriginal);
  
    // Encuentra el índice de inicio en el texto original
    const palindromeStartIndex = mapCleanedToOriginal[result.start];
    console.log(`Índice de inicio del palíndromo en el texto limpio: ${result.start}`);
    console.log(`Índice de inicio del palíndromo en el texto original: ${palindromeStartIndex}`);
  
    // Calcula el índice final correcto en el texto original
    let palindromeEndIndex = palindromeStartIndex;
    let count = 0;
  
    console.log("Calculando el índice final en el texto original...");
    for (let i = palindromeStartIndex; i < texto.length && count < result.length; i++) {
      const currentChar = texto[i].normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
      if (/[a-zA-Z0-9]/.test(currentChar)) {
        count++;
        console.log(`Contando carácter en índice original: ${i}, progreso de longitud: ${count}/${result.length}`);
      }
      // Solo actualizamos el índice final cuando hemos contado suficientes caracteres
      if (count === result.length) {
        palindromeEndIndex = i;
        break;
      }
    }
    console.log(`Índice final del palíndromo en el texto original: ${palindromeEndIndex}`);
  
    // Extraemos el palíndromo del texto original
    const originalPalindrome = texto.substring(palindromeStartIndex, palindromeEndIndex + 1);
    console.log(`Palíndromo encontrado en el texto original: "${originalPalindrome}"`);
  
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
