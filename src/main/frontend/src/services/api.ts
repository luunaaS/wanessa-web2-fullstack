// src/services/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

// Extrai a mensagem de erro devolvida pelo back-end (regra de negócio, 404 etc.)
export function mensagemErro(erro: unknown): string {
  if (axios.isAxiosError(erro)) {
    return erro.response?.data?.message ?? "Não foi possível conectar ao servidor.";
  }
  return "Erro inesperado.";
}

export default api;