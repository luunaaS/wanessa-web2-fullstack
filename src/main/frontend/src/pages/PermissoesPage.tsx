// src/pages/PermissoesPage.tsx
import { useEffect, useState } from "react";
import api, { mensagemErro } from "../services/api";
import type { Permissao } from "../types/Permissao";
import PermissaoForm from "../components/PermissaoForm";
import PermissaoList from "../components/PermissaoList";

function PermissoesPage() {
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
    <section>
      <h2>Permissões</h2>
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
      {!carregando && !erro && (
        <PermissaoList permissoes={permissoes} onEditar={setEditando} onExcluir={excluir} />
      )}
    </section>
  );
}

export default PermissoesPage;