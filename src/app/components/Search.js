"use client";
import React, { useState } from 'react';
import { Z } from '../utils/zAlgorithm';

const Search = ({ texto, setSearchHighlight }) => {
    const [patron, setPatron] = useState('');
    const [resultados, setResultados] = useState([]);
    const [indiceActual, setIndiceActual] = useState(0);

    const handleSearch = () => {
        const posiciones = Z(texto, patron);
        setResultados(posiciones);
        if (posiciones.length > 0) {
            setIndiceActual(0);
            setSearchHighlight({ substring: patron, index: posiciones[0] });
        } else {
            setSearchHighlight({ substring: '', index: -1 });
        }
    };

    const handleNext = () => {
        if (resultados.length === 0) return;
        const nuevoIndice = (indiceActual + 1) % resultados.length;
        setIndiceActual(nuevoIndice);
        setSearchHighlight({ substring: patron, index: resultados[nuevoIndice] });
    };

    const handlePrevious = () => {
        if (resultados.length === 0) return;
        const nuevoIndice = (indiceActual - 1 + resultados.length) % resultados.length;
        setIndiceActual(nuevoIndice);
        setSearchHighlight({ substring: patron, index: resultados[nuevoIndice] });
    };

    return (
        <div className="border-2 border-rosa-fuerte p-4 rounded-lg shadow-md w-full bg-white">
            <h2 className="text-xl font-semibold text-rosa-fuerte">Buscar</h2>
            <input
                type="text"
                placeholder="Ingresa patrón a buscar"
                value={patron}
                onChange={(e) => setPatron(e.target.value)}
                className="border border-rosa-fuerte p-2 rounded-lg w-full mb-4 focus:outline-none"
            />
            <button
                onClick={handleSearch}
                style={{
                    backgroundColor: '#d85e98',
                    color: 'white',
                    border: '2px solid #d85e98',
                }}
                className="px-4 py-2 rounded-lg hover:bg-rosa-pastel transition duration-300 w-full shadow-md hover:shadow-lg"
            >
                Buscar
            </button>
            {resultados.length > 0 && (
                <div className="mt-4">
                    <button onClick={handlePrevious} className="mr-2 px-4 py-2 bg-gray-300 rounded-lg">Anterior</button>
                    <button onClick={handleNext} className="ml-2 px-4 py-2 bg-gray-300 rounded-lg">Siguiente</button>
                    <p>
                        Patrón encontrado en {resultados[indiceActual] + 1} de {resultados.length}
                    </p>
                </div>
            )}
        </div>
    );
};

export default Search;
