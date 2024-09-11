import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Input, Text } from '@chakra-ui/react';

interface ModalFormProps {
    isOpen: boolean;
    onClose: () => void;
    modalName: string;
    setModalName: (value: string) => void;
    modalImage: string;
    setModalImage: (value: string) => void;
    modalPrice: number;
    setModalPrice: (value: number) => void;
    modalFloat: number;
    setModalFloat: (value: number) => void;
    modalCategory: string;
    setModalCategory: (value: string) => void;
    onSubmit: () => void;
    title: string;
}

const ModalForm: React.FC<ModalFormProps> = ({ isOpen, onClose, modalName, setModalName, modalImage, setModalImage, modalPrice, setModalPrice, modalFloat, setModalFloat, modalCategory, setModalCategory, onSubmit, title }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent bg="#111111">
                <ModalHeader textAlign="center">{title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text>Nome:</Text>
                    <Input value={modalName} onChange={(e) => setModalName(e.target.value)} />
                    <Text>Imagem:</Text>
                    <Input value={modalImage} onChange={(e) => setModalImage(e.target.value)} />
                    <Text>Preço:</Text>
                    <Input value={modalPrice} type="number" onChange={(e) => setModalPrice(Number(e.target.value))} />
                    <Text>Float:</Text>
                    <Input value={modalFloat} type="number" onChange={(e) => setModalFloat(Number(e.target.value))} />
                    <Text>Categoria:</Text>
                    <Input value={modalCategory} onChange={(e) => setModalCategory(e.target.value)} />
                </ModalBody>
                <ModalFooter>
                <Button bg="orange" mr={3} onClick={onSubmit} _hover={{ bg: '#CD7F32' }}>
                    {title === 'Criar Nova Skin' ? 'Criar' : 'Salvar'}
                </Button>
                <Button bg="#333" variant="ghost" onClick={onClose}>Cancelar</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ModalForm;