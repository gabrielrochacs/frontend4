import TelaPrincipal from "./componentes/Telas/TelaMenu";
import Tela404 from "./componentes/Telas/Tela404";
import TelaClientes from "./componentes/Telas/TelaClientes";
import TelaProdutos from "./componentes/Telas/TelaProdutos";
import TelaVendas from "./componentes/Telas/TelaVendas";
import TelaItensVenda from "./componentes/Telas/TelaItensVenda";

import { BrowserRouter, Route, Routes } from "react-router-dom"; // rotas de acesso

// App de implementação dos componentes
function App() {
  return (
    <div>
    <BrowserRouter>
      <Routes>     
        <Route path="/clientes" element={<TelaClientes />} />
        <Route path="/produtos" element={<TelaProdutos />} />
        <Route path="/vendas" element={<TelaVendas />} />
        <Route path="/itensVenda" element={<TelaItensVenda />} />
        <Route path="/frontend4/" element={<TelaPrincipal/>} />
        <Route path="*" element={<Tela404/>} />
      </Routes>
    </BrowserRouter>
      </div>
  
  );
}

export default App;

