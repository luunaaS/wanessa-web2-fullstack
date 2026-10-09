// src/components/PermissaoList.tsx
import { useEffect, useState } from "react";
import api, { mensagemErro } from "../services/api";
import type { Permissao } from "../types/Permissao";
import PermissaoItem from "./PermissaoItem";

function PermissaoList() {
  const [permissoes, setPermissoes] = useState<Permissao[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    api
      .get<Permissao[]>("/permissoes")
      .then((resposta) => setPermissoes(resposta.data))
      .catch((e) => setErro(mensagemErro(e)))
      .finally(() => setCarregando(false));
  }, []);

  if (carregando) return <p>Carregando...</p>;
  if (erro) return <p style={{ color: "red" }}>{erro}</p>;

  return (
    <ul>
      {permissoes.map((permissao) => (
        <li key={permissao.id}>
          <PermissaoItem permissao={permissao} />
        </li>
      ))}
    </ul>
  );
}

export default PermissaoList;