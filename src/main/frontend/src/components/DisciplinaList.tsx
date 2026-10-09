// src/components/DisciplinaList.tsx
import { useEffect, useState } from "react";
import api, { mensagemErro } from "../services/api";
import type { Disciplina } from "../types/Disciplina";
import DisciplinaItem from "./DisciplinaItem";
import DisciplinaForm from "./DisciplinaForm";

function DisciplinaList() {
  const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);
  const [editando, setEditando] = useState<Disciplina | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  function carregarDisciplinas() {
    api
      .get<Disciplina[]>("/disciplinas")
      .then((resposta) => {
        setDisciplinas(resposta.data);
        setErro(null);
      })
      .catch((e) => setErro(mensagemErro(e)))
      .finally(() => setCarregando(false));
  }

  useEffect(() => {
    carregarDisciplinas();
  }, []);

  async function excluir(id: number) {
    try {
      await api.delete(`/disciplinas/${id}`);
      if (editando?.id === id) setEditando(null);
      carregarDisciplinas();
    } catch (e) {
      alert(mensagemErro(e));
    }
  }

  return (
    <div>
      {/* key força o React a recriar o form quando muda o registro em edição */}
      <DisciplinaForm
        key={editando?.id ?? "novo"}
        disciplinaEditando={editando}
        onCancelar={() => setEditando(null)}
        onDisciplinaSalva={() => {
          carregarDisciplinas();
          setEditando(null);
        }}
      />
      {carregando && <p>Carregando...</p>}
      {erro && <p style={{ color: "red" }}>{erro}</p>}
      <ul>
        {disciplinas.map((disciplina) => (
          <li key={disciplina.id}>
            <DisciplinaItem disciplina={disciplina} />{" "}
            <button onClick={() => setEditando(disciplina)}>Editar</button>{" "}
            <button onClick={() => excluir(disciplina.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DisciplinaList;