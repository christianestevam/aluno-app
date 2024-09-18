import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AlunoList from "./components/AlunoList";
import AlunoCriar from "./components/AlunoCriar";
import AlunoEditar from "./components/AlunoEditar";
import AlunoAgrupado from "./components/AlunoAgrupado";
import Home from "./components/Home";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="aluno/listar" element={<AlunoList />} />
          <Route path="aluno/criar" element={<AlunoCriar />} />
          <Route path="aluno/editar/:id" element={<AlunoEditar />} />
          <Route path="aluno/agrupado" element={<AlunoAgrupado />} />
        </Route>
        <Route path="*" element={<h1>Página não encontrada</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
