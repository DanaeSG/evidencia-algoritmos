// src/app/components/Autocomplete.js
"use client";
import React, { useState, useEffect } from 'react';
import { NodoTrie, insertarClave, autocompletar } from '../utils/trie'; 

// Función para normalizar caracteres (elimina acentos y convierte a minúsculas)
function normalizarTexto(texto) {
    return texto
        .toLowerCase() // Convierte a minúsculas
        .normalize('NFD') // Normaliza para separar los acentos de los caracteres base
        .replace(/[\u0300-\u036f']/g, ''); // Elimina los acentos
}

const Autocomplete = ({ text }) => {
    const [inputText, setInputText] = useState('');
    const [sugerencias, setSugerencias] = useState([]);
    const [trieRaiz, setTrieRaiz] = useState(new NodoTrie()); // Inicializa el Trie en el estado
    const [palabras, setPalabras] = useState([]); // Estado para las palabras

    // Actualiza las palabras cuando el archivo cargado cambia (cuando cambia `text`)
    useEffect(() => {
        if (text.length > 0) {
            // Normalizamos todas las palabras cargadas antes de insertarlas en el Trie
            const palabrasNormalizadas = text.split(" ").map(palabra => normalizarTexto(palabra));
            setPalabras(palabrasNormalizadas);
        } else {
            setPalabras(["abcde"]); // Valor por defecto
        }
    }, [text]);

    // Efecto para insertar las palabras en el Trie cuando `palabras` cambia
    useEffect(() => {
        const nuevoTrie = new NodoTrie(); // Crea un nuevo Trie
        palabras.forEach(palabra => insertarClave(nuevoTrie, palabra)); // Inserta las palabras normalizadas en el Trie
        setTrieRaiz(nuevoTrie); // Actualiza el Trie en el estado
    }, [palabras]); // Solo se ejecuta cuando las `palabras` cambian

    // Maneja cambios en el input del usuario
    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputText(value);

        if (value) {
            // Normalizamos el texto de entrada del usuario antes de buscar en el Trie
            const textoNormalizado = normalizarTexto(value);
            const resultado = autocompletar(trieRaiz, textoNormalizado); // Busca en el Trie usando el texto normalizado
            setSugerencias(resultado);
        } else {
            setSugerencias([]); // Limpiar sugerencias si el campo está vacío
        }
    };

    // Maneja la selección de una sugerencia por el usuario
    const handleSuggestionClick = (sugerencia) => {
        setInputText(sugerencia); // Actualiza el input con la sugerencia seleccionada
        setSugerencias([]); // Limpia las sugerencias después de la selección
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
                        <li 
                            key={index} 
                            onClick={() => handleSuggestionClick(sugerencia)} // Maneja el click en la sugerencia
                            className="py-1 hover:bg-rosa-pastel cursor-pointer transition-colors duration-200"
                        >
                            {sugerencia}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Autocomplete;
