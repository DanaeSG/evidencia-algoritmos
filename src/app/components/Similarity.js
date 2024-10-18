"use client";
import React, { useState } from 'react';
import LCS from '../utils/lcs'; // Asegúrate de que la ruta sea correcta

const Similarity = ({ texto1, texto2 }) => {
  const [lcsResult, setLcsResult] = useState(0);

  const handleFindSimilarity = () => {
    const result = LCS(texto1, texto2); // Usa la función LCS
    setLcsResult(result);
  };

  return (
    <div className="border-2 border-rosa-fuerte p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 w-full bg-white">
      <h2 className="text-xl font-semibold text-rosa-fuerte">Similitud entre Textos</h2>
      <button
        onClick={handleFindSimilarity}
        style={{
            backgroundColor: '#d85e98', // Cambia el color de fondo aquí
            color: 'white', // Asegúrate de que el texto sea blanco
            border: '2px solid #d85e98',
        }}
        className="px-4 py-2 rounded-lg hover:bg-rosa-pastel transition duration-300 w-full shadow-md hover:shadow-lg"
    >
        Encontrar Similitud
    </button>
      {lcsResult > 0 && (
        <p className="mt-4">La longitud de la subcadena común más larga es: <strong>{lcsResult}</strong></p>
      )}
    </div>
  );
};

export default Similarity;
