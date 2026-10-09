// src/components/UsuarioList.tsx
import type { Usuario } from "../types/Usuario";
import UsuarioItem from "./UsuarioItem";

interface UsuarioListProps {
  usuarios: Usuario[];
  onEditar: (usuario: Usuario) => void;
  onExcluir: (id: number) => void;
}

function UsuarioList({ usuarios, onEditar, onExcluir }: UsuarioListProps) {
  if (usuarios.length === 0) {
    return <p>Nenhum usuário cadastrado.</p>;
  }

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {usuarios.map((usuario) => (
        <li key={usuario.id}>
          <UsuarioItem usuario={usuario} />{" "}
          <button onClick={() => onEditar(usuario)}>Editar</button>{" "}
          <button onClick={() => onExcluir(usuario.id)}>Excluir</button>
        </li>
      ))}
    </ul>
  );
}

export default UsuarioList;