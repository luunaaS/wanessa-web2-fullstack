// src/pages/UsuariosPage.tsx
import { useEffect, useState } from "react";
import api, { mensagemErro } from "../services/api";
import type { Usuario } from "../types/Usuario";
import UsuarioForm from "../components/UsuarioForm";
import UsuarioList from "../components/UsuarioList";

function UsuariosPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [editando, setEditando] = useState<Usuario | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  function carregarUsuarios() {
    api
      .get<Usuario[]>("/usuarios")
      .then((resposta) => {
        setUsuarios(resposta.data);
        setErro(null);
      })
      .catch((e) => setErro(mensagemErro(e)))
      .finally(() => setCarregando(false));
  }

  useEffect(() => {
    carregarUsuarios();
  }, []);

  async function excluir(id: number) {
    try {
      await api.delete(`/usuarios/${id}`);
      if (editando?.id === id) setEditando(null);
      carregarUsuarios();
    } catch (e) {
      alert(mensagemErro(e));
    }
  }

  return (
    <section>
      <h2>Usuários</h2>
      <UsuarioForm
        key={editando?.id ?? "novo"}
        usuarioEditando={editando}
        onCancelar={() => setEditando(null)}
        onUsuarioSalvo={() => {
          carregarUsuarios();
          setEditando(null);
        }}
      />
      {carregando && <p>Carregando...</p>}
      {erro && <p style={{ color: "red" }}>{erro}</p>}
      {!carregando && !erro && (
        <UsuarioList usuarios={usuarios} onEditar={setEditando} onExcluir={excluir} />
      )}
    </section>
  );
}

export default UsuariosPage;