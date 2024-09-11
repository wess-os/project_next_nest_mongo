import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Flex, Text } from '@chakra-ui/react';

interface Skin {
    id: number;
    name: string;
    price: number;
    float: number;
    category: string;
    image: string;
}

interface DeleteConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    skinToDelete: Skin | null;
    onConfirmDelete: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ isOpen, onClose, skinToDelete, onConfirmDelete }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent bg="#111111">
                <ModalHeader textAlign="center">Deletar Skin</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                <Flex alignItems="center">
                    <Text color="white">Tem certeza que deseja deletar a skin </Text>
                    <Text color="orange" fontWeight={700} ml={1}>{skinToDelete?.name}?</Text>
                </Flex>
                </ModalBody>
                <ModalFooter>
                <Button colorScheme="red" mr={3} onClick={onConfirmDelete}>
                    Deletar
                </Button>
                <Button variant="ghost" onClick={onClose}>Cancelar</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default DeleteConfirmationModal;