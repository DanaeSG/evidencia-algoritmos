// src/app/components/Palindrome.js
"use client";
import React, { useState } from 'react';
import Manacher from '../utils/manacher'; // Asegúrate de que la ruta sea correcta

const Palindrome = ({ texto, setPalindromeSubstring, handleNewOperation }) => {
  const [longestPalindrome, setLongestPalindrome] = useState('');

  const handleFindPalindrome = () => {
    handleNewOperation();
    const result = Manacher(texto);
    setLongestPalindrome(result.substring);
    setPalindromeSubstring(result.substring);
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
