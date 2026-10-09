// src/components/UsuarioList.tsx
import { useEffect, useState } from "react";
import api, { mensagemErro } from "../services/api";
import type { Usuario } from "../types/Usuario";
import UsuarioItem from "./UsuarioItem";
import UsuarioForm from "./UsuarioForm";

function UsuarioList() {
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
    <div>
      {/* key força o React a recriar o form quando muda o registro em edição */}
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
      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.id}>
            <UsuarioItem usuario={usuario} />{" "}
            <button onClick={() => setEditando(usuario)}>Editar</button>{" "}
            <button onClick={() => excluir(usuario.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UsuarioList;