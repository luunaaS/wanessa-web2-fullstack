// src/components/UsuarioForm.tsx
import { useState } from "react";
import type { SubmitEvent } from "react";
import api, { mensagemErro } from "../services/api";
import type { Usuario } from "../types/Usuario";

interface UsuarioFormProps {
  onUsuarioSalvo: () => void;
  usuarioEditando?: Usuario | null;
  onCancelar?: () => void;
}

function UsuarioForm({ onUsuarioSalvo, usuarioEditando, onCancelar }: UsuarioFormProps) {
  const [nome, setNome] = useState(usuarioEditando?.nome ?? "");
  const [username, setUsername] = useState(usuarioEditando?.username ?? "");
  const [email, setEmail] = useState(usuarioEditando?.email ?? "");

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const dados = { nome, username, email };
    try {
      if (usuarioEditando) {
        await api.put(`/usuarios/${usuarioEditando.id}`, dados);
      } else {
        await api.post("/usuarios", dados);
        setNome("");
        setUsername("");
        setEmail("");
      }
      onUsuarioSalvo();
    } catch (erro) {
      alert(mensagemErro(erro));
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome" required />
      <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail" required />
      <button type="submit">{usuarioEditando ? "Salvar alterações" : "Cadastrar"}</button>
      {usuarioEditando && (
        <button type="button" onClick={onCancelar}>Cancelar</button>
      )}
    </form>
  );
}

export default UsuarioForm;