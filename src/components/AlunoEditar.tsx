import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AlunoService from "../services/AlunoService";
import { Aluno } from "../types/Aluno";

const AlunoEditar: React.FC = () => {
  const [aluno, setAluno] = useState<Aluno>({
    _id: "",
    nome: "",
    curso: "",
    ira: 0,
  });

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      AlunoService.recuperar(id)
        .then((response) => {
          setAluno(response.data);
        })
        .catch((error) => {
          console.error("Erro ao carregar aluno: ", error);
        });
    }
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAluno({ ...aluno, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    AlunoService.editar(aluno._id, aluno)
      .then(() => {
        alert("Aluno atualizado com sucesso!");
        navigate("/aluno/listar");
      })
      .catch((error) => {
        console.error("Erro ao atualizar aluno: ", error);
      });
  };

  return (
    <div className="container">
      <h1 className="my-4">Editar Aluno</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label" htmlFor="nome">
            Nome
          </label>
          <input
            type="text"
            className="form-control"
            id="nome"
            name="nome"
            value={aluno.nome}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="curso">
            Curso
          </label>
          <input
            type="text"
            className="form-control"
            id="curso"
            name="curso"
            value={aluno.curso}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="ira">
            IRA
          </label>
          <input
            type="number"
            className="form-control"
            id="ira"
            name="ira"
            value={aluno.ira}
            onChange={handleInputChange}
            required
            step="0.01"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Salvar
        </button>
      </form>
    </div>
  );
};

export default AlunoEditar;
