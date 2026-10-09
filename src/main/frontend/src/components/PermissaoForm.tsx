// src/components/PermissaoForm.tsx
import { useState } from "react";
import type { SubmitEvent } from "react";
import api, { mensagemErro } from "../services/api";
import type { Permissao } from "../types/Permissao";

interface PermissaoFormProps {
  onPermissaoSalva: () => void;
  permissaoEditando?: Permissao | null;
  onCancelar?: () => void;
}

function PermissaoForm({ onPermissaoSalva, permissaoEditando, onCancelar }: PermissaoFormProps) {
  const [nome, setNome] = useState(permissaoEditando?.nome ?? "");
  const [descricao, setDescricao] = useState(permissaoEditando?.descricao ?? "");

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const dados = { nome, descricao };
    try {
      if (permissaoEditando) {
        await api.put(`/permissoes/${permissaoEditando.id}`, dados);
      } else {
        await api.post("/permissoes", dados);
        setNome("");
        setDescricao("");
      }
      onPermissaoSalva();
    } catch (erro) {
      alert(mensagemErro(erro));
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome (ex.: ADMIN)" required />
      <input value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder="Descrição" />
      <button type="submit">{permissaoEditando ? "Salvar alterações" : "Cadastrar"}</button>
      {permissaoEditando && (
        <button type="button" onClick={onCancelar}>Cancelar</button>
      )}
    </form>
  );
}

export default PermissaoForm;