// src/app/components/FileUpload.js
"use client";
import React, { useState } from 'react';

const FileUpload = ({ setTexto }) => {
    const [archivo, setArchivo] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setTexto(event.target.result); // Actualiza el texto
            };
            reader.readAsText(file);
            setArchivo(file.name);
        }
    };

    return (
        <div className="border-2 border-rosa-fuerte p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 w-full bg-white">
            <h2 className="text-xl font-semibold text-rosa-fuerte">Cargar Archivo</h2>
            <input
                type="file"
                accept=".txt"
                onChange={handleFileChange}
                className="border border-rosa-fuerte p-2 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-rosa-fuerte transition duration-300"
                style={{
                    backgroundColor: '#d85e98', // Color de fondo
                    color: 'white', // Color del texto
                    cursor: 'pointer', // Cambia el cursor al pasar sobre el botón
                }}
            />
            {archivo && (
                <p className="text-gray-700">
                    Archivo cargado: <strong>{archivo}</strong>
                </p>
            )}
        </div>
    );
};

export default FileUpload;
