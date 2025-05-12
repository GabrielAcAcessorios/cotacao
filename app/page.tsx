"use client";
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from './listagem/index';
import CriarCotacao from './criarCotacao/index';
import EditarCotacao from './editarCotacao/index';
import GerarCotacao from './gerarCotacao/index';

export default function Home() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/criarCotacao" element={<CriarCotacao />} />
        <Route path="/editarCotacao/:id" element={<EditarCotacao />} />
        <Route path="/gerarCotacao/:id" element={<GerarCotacao />} />
      </Routes>
    </Router>
  );
}
