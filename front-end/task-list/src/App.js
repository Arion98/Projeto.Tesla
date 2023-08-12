import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import TaskList from "./components/Task/TaskList.jsx";
import Carros from "./components/Carros/Carros.jsx";
import Clientes from "./components/Clientes/Clientes.jsx"
import Inventarios from "./components/Inventarios/Inventarios.jsx"
import Pedidos from "./components/Pedidos/Pedidos.jsx"
import Navbar from "./components/pages/NavBar.jsx";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/TaskList" element={<TaskList />} />
        <Route path="/Carros" element={<Carros />} />
        <Route path="/Clientes" element={<Clientes />} />
        <Route path="/Inventario" element={<Inventarios />} />
        <Route path="/Pedidos" element={<Pedidos />} />
      </Routes>
    </Router>
  );
}

export default App;
