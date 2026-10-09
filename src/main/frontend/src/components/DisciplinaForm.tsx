// src/components/DisciplinaForm.tsx
import { useState } from "react";
import type { SubmitEvent } from "react";
import api, { mensagemErro } from "../services/api";
import type { Disciplina } from "../types/Disciplina";

interface DisciplinaFormProps {
  onDisciplinaSalva: () => void;
  disciplinaEditando?: Disciplina | null;
  onCancelar?: () => void;
}

function DisciplinaForm({ onDisciplinaSalva, disciplinaEditando, onCancelar }: DisciplinaFormProps) {
  const [nome, setNome] = useState(disciplinaEditando?.nome ?? "");
  const [professor, setProfessor] = useState(disciplinaEditando?.professor ?? "");
  // Inputs numéricos guardam string no state e são convertidos no envio
  const [cargaHoraria, setCargaHoraria] = useState(String(disciplinaEditando?.cargaHoraria ?? ""));
  const [semestre, setSemestre] = useState(String(disciplinaEditando?.semestre ?? ""));

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const dados = {
      nome,
      professor,
      cargaHoraria: Number(cargaHoraria),
      semestre: Number(semestre),
    };
    try {
      if (disciplinaEditando) {
        await api.put(`/disciplinas/${disciplinaEditando.id}`, dados);
      } else {
        await api.post("/disciplinas", dados);
        setNome("");
        setProfessor("");
        setCargaHoraria("");
        setSemestre("");
      }
      onDisciplinaSalva();
    } catch (erro) {
      alert(mensagemErro(erro));
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome da disciplina" required />
      <input value={professor} onChange={(e) => setProfessor(e.target.value)} placeholder="Professor(a)" required />
      <input type="number" value={cargaHoraria} onChange={(e) => setCargaHoraria(e.target.value)} placeholder="Carga horária" required />
      <input type="number" value={semestre} onChange={(e) => setSemestre(e.target.value)} placeholder="Semestre" required />
      <button type="submit">{disciplinaEditando ? "Salvar alterações" : "Cadastrar"}</button>
      {disciplinaEditando && (
        <button type="button" onClick={onCancelar}>Cancelar</button>
      )}
    </form>
  );
}

export default DisciplinaForm;