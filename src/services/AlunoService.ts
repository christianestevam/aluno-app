import axios from "axios";
import { Aluno } from "../types/Aluno";

const API_URL = "http://localhost:3000/api/alunos"; // URL da sua API

class AlunoService {
  listar(): Promise<{ data: Aluno[] }> {
    return axios.get(API_URL);
  }

  criar(aluno: Omit<Aluno, "id">): Promise<Aluno> {
    return axios.post(API_URL, aluno);
  }

  editar(id: string, aluno: Omit<Aluno, "id">): Promise<Aluno> {
    return axios.put(`${API_URL}/${id}`, aluno);
  }

  deletar(id: string): Promise<void> {
    return axios.delete(`${API_URL}/${id}`);
  }
  recuperar(id: string): Promise<{ data: Aluno }> {
    return axios.get(`${API_URL}/${id}`);
  }
  
}

export default new AlunoService();
