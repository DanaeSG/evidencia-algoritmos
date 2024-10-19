"use client";
import React, { useState } from 'react';
import LCS from '../utils/lcs'; 
const Similarity = ({ texto1, texto2, setCommonSubstring }) => {
  const [lcsResult, setLcsResult] = useState({ length: 0, substring: '' });

  const handleFindSimilarity = () => {
    const result = LCS(texto1, texto2);
    setLcsResult(result);
    setCommonSubstring(result.substring);
  };

  return (
    <div className="border-2 border-rosa-fuerte p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 w-full bg-white">
      <h2 className="text-xl font-semibold text-rosa-fuerte">Similitud entre Textos</h2>
      <button
        onClick={handleFindSimilarity}
        disabled={!texto1 || !texto2} // Desactiva el botón si texto1 o texto2 están vacíos
        style={{
          backgroundColor: '#d85e98',
          color: 'white',
          border: '2px solid #d85e98',
          opacity: !texto1 || !texto2 ? 0.5 : 1, // Cambia la opacidad cuando está deshabilitado
          cursor: !texto1 || !texto2 ? 'not-allowed' : 'pointer' // Cambia el cursor cuando está deshabilitado
        }}
        className="px-4 py-2 rounded-lg hover:bg-rosa-pastel transition duration-300 w-full shadow-md hover:shadow-lg"
      >
        Encontrar Similitud
      </button>
      {lcsResult.substring && (
        <p className="mt-4">
          La subcadena común más larga es: <strong>{lcsResult.substring}</strong>
        </p>
      )}
    </div>
  );
};

export default Similarity;
