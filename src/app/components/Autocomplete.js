// src/app/components/Autocomplete.js
"use client";
import React, { useState, useEffect } from 'react';
import { NodoTrie, insertarClave, autocompletar } from '../utils/trie'; // Asegúrate de que la ruta sea correcta

const Autocomplete = () => {
    const [inputText, setInputText] = useState('');
    const [sugerencias, setSugerencias] = useState([]);
    const [trieRaiz] = useState(new NodoTrie());

    // Palabras a insertar en el Trie
    const palabras = ["and", "ant", "do", "geek", "dad", "ball", "niño", "año", "acción"];

    useEffect(() => {
        // Insertar palabras en el Trie al cargar el componente
        palabras.forEach(palabra => insertarClave(trieRaiz, palabra));
    }, [trieRaiz]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputText(value);
        
        if (value) {
            const resultado = autocompletar(trieRaiz, value);
            setSugerencias(resultado);
        } else {
            setSugerencias([]); // Limpiar sugerencias si el campo está vacío
        }
    };

    return (
        <div className="border-2 border-rosa-fuerte p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 w-full bg-white">
            <h2 className="text-xl font-semibold text-rosa-fuerte">Auto-completar</h2>
            <input
                type="text"
                placeholder="Escribe para autocompletar"
                value={inputText}
                onChange={handleInputChange}
                className="border border-rosa-fuerte p-2 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-rosa-fuerte transition duration-300"
            />
            {sugerencias.length > 0 && (
                <ul className="bg-white border border-rosa-fuerte rounded p-2">
                    {sugerencias.map((sugerencia, index) => (
                        <li key={index} className="py-1 hover:bg-rosa-pastel cursor-pointer transition-colors duration-200">
                            {sugerencia}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Autocomplete;
