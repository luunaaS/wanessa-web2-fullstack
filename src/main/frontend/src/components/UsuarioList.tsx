// src/components/UsuarioList.tsx
import { useEffect, useState } from "react";
import api, { mensagemErro } from "../services/api";
import type { Usuario } from "../types/Usuario";
import UsuarioItem from "./UsuarioItem";

function UsuarioList() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    api
      .get<Usuario[]>("/usuarios")
      .then((resposta) => setUsuarios(resposta.data))
      .catch((e) => setErro(mensagemErro(e)))
      .finally(() => setCarregando(false));
  }, []);

  if (carregando) return <p>Carregando...</p>;
  if (erro) return <p style={{ color: "red" }}>{erro}</p>;

  return (
    <ul>
      {usuarios.map((usuario) => (
        <li key={usuario.id}>
          <UsuarioItem usuario={usuario} />
        </li>
      ))}
    </ul>
  );
}

export default UsuarioList;