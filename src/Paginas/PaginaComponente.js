import Header from "../componentes/Headers/cabecalho"
import Menu from "../componentes/Menus/menu";
import { Container } from "react-bootstrap";

export default function Paginas(propriedades){
    return(
        <div style={{width: '100%'}}>
          <Menu texto='TechStore'/>
          <Header texto='Formulário de Cadastro' />
        <br/>
          <Container>
        {propriedades.children} 
          </Container>
        </div>
    );
}

