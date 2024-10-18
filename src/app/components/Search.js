"use client";
import React, { useState } from 'react';
import { Z } from '../utils/zAlgorithm'; // Asegúrate de que la ruta sea correcta

const Search = ({ texto }) => {
    const [patron, setPatron] = useState('');
    const [resultados, setResultados] = useState([]);

    const handleSearch = () => {
        const posiciones = Z(texto, patron);
        setResultados(posiciones);
    };

    return (
        <div className="border-2 border-rosa-fuerte p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 w-full bg-white">
            <h2 className="text-xl font-semibold text-rosa-fuerte">Buscar</h2>
            <input
                type="text"
                placeholder="Ingresa patrón a buscar"
                value={patron}
                onChange={(e) => setPatron(e.target.value)}
                className="border border-rosa-fuerte p-2 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-rosa-fuerte transition duration-300"
            />
            <button
                onClick={handleSearch}
                style={{
                    backgroundColor: '#d85e98', // Cambia el color de fondo aquí
                    color: 'white', // Asegúrate de que el texto sea blanco
                    border: '2px solid #d85e98',
                }}
                className="px-4 py-2 rounded-lg hover:bg-rosa-pastel transition duration-300 w-full shadow-md hover:shadow-lg"
            >
                Buscar
            </button>

            {resultados.length > 0 && (
                <ul className="bg-white border border-rosa-fuerte rounded-lg p-2 mt-2">
                    {resultados.map((pos, index) => (
                        <li key={index} className="py-1">
                            Patrón encontrado en la posición: <strong>{pos}</strong>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Search;
