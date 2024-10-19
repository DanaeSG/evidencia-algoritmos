import React from 'react';

const TextDisplay = ({ texto = '', commonSubstring = '', palindromeSubstring = '', highlight = {} }) => {
    const highlightText = (text, substrings) => {
        if (!text || typeof text !== 'string') return text;

        const [commonSubstring, palindromeSubstring] = substrings;
        const { substring: searchSubstring, index: searchIndex } = highlight;

        // Crear una expresión regular para cada subcadena
        const regex = new RegExp(`(${[commonSubstring, palindromeSubstring, searchSubstring].filter(Boolean).join('|')})`, 'gi');
        let currentIndex = 0; // Índice actual en el texto para verificar la posición del resaltado

        return text.split(regex).map((part, index) => {
            const isPalindromeSubstring = palindromeSubstring && new RegExp(`^${palindromeSubstring}$`, 'i').test(part);
            const isCommonSubstring = commonSubstring && new RegExp(`^${commonSubstring}$`, 'i').test(part);
            const isSearchSubstring = searchSubstring && new RegExp(`^${searchSubstring}$`, 'i').test(part) && currentIndex === searchIndex;
            
            currentIndex += part.length; // Actualiza la posición actual en el texto
            let className = '';

            if (isSearchSubstring) {
                className = 'bg-yellow-300';
            } else if (isPalindromeSubstring) {
                className = 'bg-green-300';
            } else if (isCommonSubstring) {
                className = 'bg-blue-300';
            }

            return (
                <span key={index} className={className}>
                    {part}
                </span>
            );
        });
    };

    return (
        <div className="border-2 border-rosa-fuerte p-4 rounded-lg shadow-md w-full bg-white">
            <h2 className="text-xl font-semibold text-rosa-fuerte">Contenido del Archivo</h2>
            <pre className="whitespace-pre-wrap text-foreground">
                {highlightText(texto, [commonSubstring, palindromeSubstring])}
            </pre>
        </div>
    );
};

export default TextDisplay;
