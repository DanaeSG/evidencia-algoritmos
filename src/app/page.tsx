// src/app/HomePage.js
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
          <TextDisplay texto={texto1} commonSubstring={commonSubstring} palindromeSubstring={palindromeSubstring} highlight={searchHighlight} />
          <TextDisplay texto={texto2} commonSubstring={commonSubstring} />
        </div>
        <Search texto={texto1} setSearchHighlight={setSearchHighlight} />
        <Palindrome texto={texto1} setPalindromeSubstring={setPalindromeSubstring} /> 
        <Similarity texto1={texto1} texto2={texto2} setCommonSubstring={setCommonSubstring} />
        <Autocomplete text={texto1}/>
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
