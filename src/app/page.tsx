"use client";
import React, { useState } from 'react';
import Autocomplete from './components/Autocomplete'; 
import FileUpload from './components/FileUpload';
import Palindrome from './components/Palindrome';
import Search from './components/Search';
import Similarity from './components/Similarity';
import TextDisplay from './components/TextDisplay';

const HomePage = () => {
  const [texto1, setTexto1] = useState('');
  const [texto2, setTexto2] = useState('');

  return (
    <div className="min-h-screen p-8 pb-20 bg-pink-50">
      <h1 className="text-center text-3xl font-bold text-pink-600 mb-8">
        Aplicación de Algoritmos Avanzados
      </h1>
      <div className="flex flex-col gap-8 items-center">
        <div className="flex gap-4 justify-center">
          <FileUpload setTexto={setTexto1} />
          <FileUpload setTexto={setTexto2} />
        </div>
        <div className="flex gap-4 justify-center">
          <TextDisplay texto={texto1} />
          <TextDisplay texto={texto2} />
        </div>
        <Search texto={texto1} /> {/* Pasa el texto cargado al componente Search */}
        <Palindrome texto={texto1} /> {/* Pasa el texto cargado al componente Palindrome */}
        <Similarity texto1={texto1} texto2={texto2} /> {/* Pasa ambos textos al componente Similarity */}
        <Autocomplete />
      </div>
      <footer className="mt-20 text-center">
        <p className="text-gray-600">
          &copy; {new Date().getFullYear()} - Aplicación de Algoritmos
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
