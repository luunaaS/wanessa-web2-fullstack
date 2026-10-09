// src/components/DisciplinaItem.tsx
import type { Disciplina } from "../types/Disciplina";

interface DisciplinaItemProps {
  disciplina: Disciplina;
}

function DisciplinaItem({ disciplina }: DisciplinaItemProps) {
  return (
    <span>
      <strong>{disciplina.nome}</strong> — Prof. {disciplina.professor} · {disciplina.cargaHoraria}h ·{" "}
      {disciplina.semestre}º semestre
    </span>
  );
}

export default DisciplinaItem;