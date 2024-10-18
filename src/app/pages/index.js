import React, { useState } from 'react';
import FileUpload from '../components/FileUpload';
import Search from '../components/Search';
import Palindrome from '../components/Palindrome';
import Similarity from '../components/Similarity';
import AutoComplete from '../components/Autocomplete';
import TextDisplay from '../components/TextDisplay';
import { LCS } from '../utils/lcs'; // Importa tu función LCS
import { Manacher } from '../utils/manacher'; // Importa tu función Manacher
import { Z } from '../utils/zAlgorithm'; // Importa tu función Z
import { NodoTrie, insertarClave } from '../utils/trie'; // Importa el Trie

const Home = () => {
    const [text1, setText1] = useState('');
    const [text2, setText2] = useState('');
    const [trieRoot] = useState(new NodoTrie());

    const handleFileChange1 = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            setText1(e.target.result);
            // Aquí podrías insertar cada palabra del texto en el Trie
            const words = e.target.result.split(/\s+/);
            words.forEach(word => insertarClave(trieRoot, word));
        };

        reader.readAsText(file);
    };

    const handleFileChange2 = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            setText2(e.target.result);
        };

        reader.readAsText(file);
    };

    const handleSearch = (positions) => {
        console.log("Posiciones encontradas: ", positions);
    };

    const handleFindPalindrome = (palindrome, start, length) => {
        console.log("Palíndromo encontrado: ", palindrome, "Inicio: ", start, "Longitud: ", length);
    };

    const handleSimilarity = (length) => {
        console.log("Similitud encontrada: ", length);
    };

    return (
        <div style={{ padding: '20px', backgroundColor: '#f8e1e1' }}>
            <h1 style={{ color: '#d6006e' }}>Aplicación de Texto</h1>

            <FileUpload 
                onFileChange={handleFileChange1} 
                text={text1} 
                label="Cargar Archivo T1" 
            />
            <FileUpload 
                onFileChange={handleFileChange2} 
                text={text2} 
                label="Cargar Archivo T2" 
            />

            <TextDisplay text={text1} />

            <Search text={text1} onSearch={handleSearch} />
            <Palindrome text={text1} onFindPalindrome={handleFindPalindrome} />
            <Similarity text1={text1} text2={text2} onSimilarity={handleSimilarity} />
            <AutoComplete text={text1} />
        </div>
    );
};

export default Home;
