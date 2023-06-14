import React, { FC, useState } from 'react';
import styles from './Memoria.module.css';
import Bit from '../Bit/Bit';

import { Row, Col, Container, Button, Modal } from 'react-bootstrap';


interface MemoriaProps {
  size: number
}

const Memoria: FC<MemoriaProps> = ({ size }) => {
  const [memoriaModalIsOpen, setMemoriaModalIsOpen] = useState(false);
  const [processosModalIsOpen, setProcessosModalIsOpen] = useState(false);
  const [memoriaValue, setMemoriaValue] = useState(size);

  const bits = Array.from({ length: memoriaValue }, (_, i) => (
    <Col key={i} className={styles.BitColumn}>
      <Bit color={[0, 0, 0, 1]} name={`${i}`} />
    </Col>
  ));

  const openMemoriaModal = () => {
    setMemoriaModalIsOpen(true);
  };

  const closeMemoriaModal = () => {
    setMemoriaModalIsOpen(false);
  };

  const openProcessosModal = () => {
    setProcessosModalIsOpen(true);
  };

  const closeProcessosModal = () => {
    setProcessosModalIsOpen(false);
  };

  const handleMemoriaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMemoriaValue(parseInt(event.target.value));
  };

  

  return (
    <>
      <Modal show={memoriaModalIsOpen} onHide={closeMemoriaModal}>
        <Modal.Header closeButton>
          <Modal.Title>Gerenciar Memória</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Conteúdo do modal de gerenciamento de memória */}
          <input type='number' min={288} onChange={handleMemoriaChange} value={memoriaValue}></input>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeMemoriaModal}>Fechar</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={processosModalIsOpen} onHide={closeProcessosModal}>
        <Modal.Header closeButton>
          <Modal.Title>Adicionar Novo Processo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Conteúdo do modal de adicionar processos */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeProcessosModal}>Fechar</Button>
        </Modal.Footer>
      </Modal>

      <Container>
        <div className={styles.Memoria}>
          <Row>
            {bits}
          </Row>
        </div>
        <Button onClick={openProcessosModal} className={styles.ModalBtnProcesso}>Adicionar Processos</Button>
        <Button onClick={openMemoriaModal} className={styles.ModalBtnMemoria}>Configurar Memória</Button>
      </Container>
    </>
  );
};

export default Memoria;
