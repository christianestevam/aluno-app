import React, { useEffect, useState } from "react";
import AlunoService from "../services/AlunoService";
import { Aluno } from "../types/Aluno";
import { Link } from "react-router-dom";

const AlunoList: React.FC = () => {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [mediaIRA, setMediaIRA] = useState<number>(0);
  const [colorToggle, setColorToggle] = useState<boolean>(false);

  useEffect(() => {
    AlunoService.listar().then((response) => {
      const data = response.data;
      setAlunos(data);

      const totalIRA = data.reduce((total, aluno) => total + aluno.ira, 0);
      setMediaIRA(totalIRA / data.length);
    });
  }, []);


  const handleColorToggle = () => {
    setColorToggle(!colorToggle);
  };


  const getRowStyle = (aluno: Aluno) => {
    if (colorToggle) {
      if (aluno.ira < mediaIRA) {
        return {
          backgroundColor: "#ffcccc !important",
          color: "#ff0000 !important", 
        };
      } else {
        return {
          backgroundColor: "#cce5ff !important",
          color: "#004085 !important", 
        };
      }
    }
    return {};
  };


  const handleDelete = (id: string) => {
    if (window.confirm(`Deseja excluir o aluno de ID = ${id}?`)) {
      AlunoService.deletar(id)
        .then(() => {
          setAlunos(alunos.filter((aluno) => aluno._id !== id));
        })
        .catch((error) => {
          console.error("Erro ao apagar aluno: ", error);
        });
    }
  };

  return (
    <div className="container">
      <h1 className="my-4">Listar Alunos</h1>

      <button className="btn btn-primary mb-3" onClick={handleColorToggle}>
        {colorToggle ? "Remover Cores" : "Destacar por IRA"}
      </button>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Curso</th>
            <th>IRA</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {alunos.map((aluno) => (
            <tr key={aluno._id} style={getRowStyle(aluno)}>
              <td>{aluno._id}</td>
              <td>{aluno.nome}</td>
              <td>{aluno.curso}</td>
              <td>{aluno.ira.toFixed(2)}</td>
              <td>
                <div className="d-flex justify-content-around">
                  <Link
                    to={`/aluno/editar/${aluno._id}`}
                    className="btn btn-primary me-2"
                  >
                    Editar
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(aluno._id)}
                  >
                    Apagar
                  </button>
                </div>
              </td>
            </tr>
          ))}

          <tr style={{ backgroundColor: "#f3f3f3", fontWeight: "bold" }}>
            <td colSpan={3}>Média do IRA</td>
            <td>{mediaIRA.toFixed(2)}</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AlunoList;
