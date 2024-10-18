// src/app/components/TextDisplay.js
import React from 'react';

const TextDisplay = ({ texto }) => {
    return (
        <div className="border-2 border-rosa-fuerte p-4 rounded-lg shadow-md w-full bg-white">
            <h2 className="text-xl font-semibold text-rosa-fuerte">Contenido del Archivo</h2>
            <pre className="whitespace-pre-wrap text-foreground">{texto}</pre>
        </div>
    );
};

export default TextDisplay;
