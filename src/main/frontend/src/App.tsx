// src/App.tsx
import UsuarioList from "./components/UsuarioList";
import PermissaoList from "./components/PermissaoList";
import DisciplinaList from "./components/DisciplinaList";

function App() {
  return (
    <div>
      <h1>Programação Web II — CRUD Full Stack</h1>
      <h2>Usuários</h2>
      <UsuarioList />
      <h2>Permissões</h2>
      <PermissaoList />
      <h2>Disciplinas</h2>
      <DisciplinaList />
    </div>
  );
}

export default App;