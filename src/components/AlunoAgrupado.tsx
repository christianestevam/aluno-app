import React, { useEffect, useState } from "react";
import AlunoService from "../services/AlunoService";
import { Aluno } from "../types/Aluno";

const AlunoAgrupado: React.FC = () => {
  const [alunos, setAlunos] = useState<{ [key: string]: Aluno[] }>({});

  useEffect(() => {
    AlunoService.listar().then((response) => {
      const data = response.data;
      const grouped = data.reduce((acc: { [key: string]: Aluno[] }, aluno: Aluno) => {
        if (!acc[aluno.curso]) {
          acc[aluno.curso] = [];
        }
        acc[aluno.curso].push(aluno);
        return acc;
      }, {});
      setAlunos(grouped);
    });
  }, []);

  return (
    <div className="container">
      <h1>Alunos Agrupados por Curso</h1>
      {Object.keys(alunos).map((curso) => (
        <div key={curso}>
          <h3>{curso}</h3>
          <ul>
            {alunos[curso].map((aluno) => (
              <li
                key={aluno.id}
                style={{
                  fontWeight: aluno.ira >= 7 ? "bold" : "normal",
                  color: aluno.ira >= 7 ? "green" : "black",
                }}
              >
                {aluno.nome} - IRA: {aluno.ira.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default AlunoAgrupado;
