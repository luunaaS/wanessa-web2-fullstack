// src/components/DisciplinaList.tsx
import { useEffect, useState } from "react";
import api, { mensagemErro } from "../services/api";
import type { Disciplina } from "../types/Disciplina";
import DisciplinaItem from "./DisciplinaItem";

function DisciplinaList() {
  const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    api
      .get<Disciplina[]>("/disciplinas")
      .then((resposta) => setDisciplinas(resposta.data))
      .catch((e) => setErro(mensagemErro(e)))
      .finally(() => setCarregando(false));
  }, []);

  if (carregando) return <p>Carregando...</p>;
  if (erro) return <p style={{ color: "red" }}>{erro}</p>;

  return (
    <ul>
      {disciplinas.map((disciplina) => (
        <li key={disciplina.id}>
          <DisciplinaItem disciplina={disciplina} />
        </li>
      ))}
    </ul>
  );
}

export default DisciplinaList;