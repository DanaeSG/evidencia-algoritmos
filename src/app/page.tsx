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
  const [commonSubstring, setCommonSubstring] = useState('');
  const [palindromeSubstring, setPalindromeSubstring] = useState('');
  const [searchHighlight, setSearchHighlight] = useState({ substring: '', index: -1 });

  // Función para limpiar el estado relacionado con el resaltado
  const clearHighlights = () => {
    setCommonSubstring('');
    setPalindromeSubstring('');
    setSearchHighlight({ substring: '', index: -1 });
  };

  // Función que se llamará antes de cada nueva operación
  const handleNewOperation = () => {
    clearHighlights(); // Limpia los resaltados
  };

  return (
    <div className="min-h-screen p-8 pb-20 bg-pink-50">
      <h1 className="text-center text-4xl font-bold text-pink-700 mt-4">
        Actividad Integradora 1 - Análisis y diseño de algoritmos avanzados
      </h1>
      <h3 className='mt-8 mb-8 text-pink-700 font-bold p-2 text-center'>
          Esteban Sierra Baccio - A00836286
          <br />
          Danaé Sánchez Gutiérrez - A00836760
          <br />
        </h3>
      <div className="flex flex-col gap-8 items-center">
        <div className="flex gap-4 justify-center">
          <FileUpload setTexto={setTexto1} />
          <FileUpload setTexto={setTexto2} />
        </div>
        <div className="flex gap-4 justify-center">
          <TextDisplay texto={texto1} commonSubstring={commonSubstring} palindromeSubstring={palindromeSubstring} highlight={searchHighlight} />
          <TextDisplay texto={texto2} commonSubstring={commonSubstring} />
        </div>
        <Search texto={texto1} setSearchHighlight={setSearchHighlight} handleNewOperation={handleNewOperation} />
        <Palindrome texto={texto1} setPalindromeSubstring={setPalindromeSubstring} handleNewOperation={handleNewOperation} /> 
        <Similarity texto1={texto1} texto2={texto2} setCommonSubstring={setCommonSubstring} handleNewOperation={handleNewOperation} />
        <Autocomplete text={texto1} />
      </div>
      <footer className="mt-16 text-center">
          <p className="text-gray-600">
          &copy; {new Date().getFullYear()} - Evidencia de Algoritmos
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
