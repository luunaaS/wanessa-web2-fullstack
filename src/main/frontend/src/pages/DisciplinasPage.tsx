// src/pages/DisciplinasPage.tsx
import { useEffect, useState } from "react";
import api, { mensagemErro } from "../services/api";
import type { Disciplina } from "../types/Disciplina";
import DisciplinaForm from "../components/DisciplinaForm";
import DisciplinaList from "../components/DisciplinaList";

function DisciplinasPage() {
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
    <section>
      <h2>Disciplinas</h2>
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
      {!carregando && !erro && (
        <DisciplinaList disciplinas={disciplinas} onEditar={setEditando} onExcluir={excluir} />
      )}
    </section>
  );
}

export default DisciplinasPage;