import { Container,Navbar,Nav } from "react-bootstrap";
import Dropdown from 'react-bootstrap/Dropdown';
import { LinkContainer } from "react-router-bootstrap";

export default function Menu(propriedades){
    return(
        <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>{propriedades.texto}</Navbar.Brand>
          <Nav className="me-auto">
          <Dropdown>
            <Dropdown.Toggle variant="dark" id="dropdown-basic">
              Cadastros
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <LinkContainer to='/'><Dropdown.Item>Menu Principal</Dropdown.Item></LinkContainer>
              <LinkContainer to='/clientes'><Dropdown.Item >Cadastro de Clientes</Dropdown.Item></LinkContainer>
              <LinkContainer to='/produtos'><Dropdown.Item >Cadastro de Produtos</Dropdown.Item></LinkContainer>
              <LinkContainer to='/vendas'><Dropdown.Item >Cadastro de Vendas</Dropdown.Item></LinkContainer>
              <LinkContainer to='/ItensVenda'><Dropdown.Item >Cadastro de Itens para Vendas</Dropdown.Item></LinkContainer>
            </Dropdown.Menu>
          </Dropdown>

            <Nav.Link href="#">Ajuda</Nav.Link>
            <Nav.Link href="#">Sair</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
        </>

    );
}