// src/components/DisciplinaList.tsx
import type { Disciplina } from "../types/Disciplina";
import DisciplinaItem from "./DisciplinaItem";

interface DisciplinaListProps {
  disciplinas: Disciplina[];
  onEditar: (disciplina: Disciplina) => void;
  onExcluir: (id: number) => void;
}

function DisciplinaList({ disciplinas, onEditar, onExcluir }: DisciplinaListProps) {
  if (disciplinas.length === 0) {
    return <p>Nenhuma disciplina cadastrada.</p>;
  }

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {disciplinas.map((disciplina) => (
        <li key={disciplina.id}>
          <DisciplinaItem disciplina={disciplina} />{" "}
          <button onClick={() => onEditar(disciplina)}>Editar</button>{" "}
          <button onClick={() => onExcluir(disciplina.id)}>Excluir</button>
        </li>
      ))}
    </ul>
  );
}

export default DisciplinaList;