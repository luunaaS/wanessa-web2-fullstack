// src/components/PermissaoList.tsx
import { useEffect, useState } from "react";
import api, { mensagemErro } from "../services/api";
import type { Permissao } from "../types/Permissao";
import PermissaoItem from "./PermissaoItem";
import PermissaoForm from "./PermissaoForm";

function PermissaoList() {
  const [permissoes, setPermissoes] = useState<Permissao[]>([]);
  const [editando, setEditando] = useState<Permissao | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  function carregarPermissoes() {
    api
      .get<Permissao[]>("/permissoes")
      .then((resposta) => {
        setPermissoes(resposta.data);
        setErro(null);
      })
      .catch((e) => setErro(mensagemErro(e)))
      .finally(() => setCarregando(false));
  }

  useEffect(() => {
    carregarPermissoes();
  }, []);

  async function excluir(id: number) {
    try {
      await api.delete(`/permissoes/${id}`);
      if (editando?.id === id) setEditando(null);
      carregarPermissoes();
    } catch (e) {
      alert(mensagemErro(e));
    }
  }

  return (
    <div>
      {/* key força o React a recriar o form quando muda o registro em edição */}
      <PermissaoForm
        key={editando?.id ?? "novo"}
        permissaoEditando={editando}
        onCancelar={() => setEditando(null)}
        onPermissaoSalva={() => {
          carregarPermissoes();
          setEditando(null);
        }}
      />
      {carregando && <p>Carregando...</p>}
      {erro && <p style={{ color: "red" }}>{erro}</p>}
      <ul>
        {permissoes.map((permissao) => (
          <li key={permissao.id}>
            <PermissaoItem permissao={permissao} />{" "}
            <button onClick={() => setEditando(permissao)}>Editar</button>{" "}
            <button onClick={() => excluir(permissao.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PermissaoList;