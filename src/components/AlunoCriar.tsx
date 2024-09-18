import React, { useState } from "react";
import AlunoService from "../services/AlunoService";
import { useNavigate } from "react-router-dom";

const AlunoCriar: React.FC = () => {
  const [nome, setNome] = useState<string>("");
  const [curso, setCurso] = useState<string>("");
  const [ira, setIra] = useState<number>(0);
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Criar um objeto com os dados do aluno
    const novoAluno = { nome, curso, ira };

    // Chamar o serviço para criar o aluno
    AlunoService.criar(novoAluno)
      .then(() => {
        alert("Aluno criado com sucesso!");
        navigate("/aluno/listar"); // Redireciona para a página de listagem após criar
      })
      .catch((error) => {
        console.error("Erro ao criar aluno:", error);
        alert("Erro ao criar aluno. Tente novamente.");
      });
  };

  return (
    <div className="container">
      <h1>Criar Aluno</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nome" className="form-label">
            Nome
          </label>
          <input
            type="text"
            className="form-control"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="curso" className="form-label">
            Curso
          </label>
          <input
            type="text"
            className="form-control"
            id="curso"
            value={curso}
            onChange={(e) => setCurso(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="ira" className="form-label">
            IRA
          </label>
          <input
            type="number"
            className="form-control"
            id="ira"
            value={ira}
            onChange={(e) => setIra(Number(e.target.value))}
            required
            step="0.01"
            min="0"
            max="10"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Criar Aluno
        </button>
      </form>
    </div>
  );
};

export default AlunoCriar;
