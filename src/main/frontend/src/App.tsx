// src/App.tsx
import UsuariosPage from "./pages/UsuariosPage";
import PermissoesPage from "./pages/PermissoesPage";
import DisciplinasPage from "./pages/DisciplinasPage";

function App() {
  return (
    <div>
      <h1>Programação Web II — CRUD Full Stack</h1>
      <UsuariosPage />
      <PermissoesPage />
      <DisciplinasPage />
    </div>
  );
}

export default App;