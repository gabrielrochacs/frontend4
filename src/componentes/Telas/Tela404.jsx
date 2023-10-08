import { Container } from "react-bootstrap";
import TelaPrincipal from "./TelaMenu";
import Modal from 'react-bootstrap/Modal';

export default function Tela404(propriedades){
    return(
    <Container>     
        <TelaPrincipal />
            <div
            className="modal show"
            style={{ display: 'block', position: 'initial' }}
            >
            <Modal.Dialog>
                <Modal.Header closeButton>
                <Modal.Title>404</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                <p>Página não encontrada !!!</p>
                </Modal.Body>

            </Modal.Dialog>
            </div>
    </Container>
    );
}