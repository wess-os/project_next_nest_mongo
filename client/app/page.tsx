"use client";
import { useState, useEffect, forwardRef } from 'react';
import axios from 'axios';
import {
  Box,
  Input,
  SimpleGrid,
  Text,
  Stack,
  Select,
  Button,
  Flex,
  Heading,
  Collapse,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Image,
  ImageProps,
} from '@chakra-ui/react';
import { FaEdit, FaSearch } from "react-icons/fa";
import { PiBroomFill } from "react-icons/pi";
import { IoIosAddCircle } from "react-icons/io";
import { AiFillDelete } from "react-icons/ai";
import { motion, MotionProps } from 'framer-motion';

interface Skin {
  id: number;
  name: string;
  price: number;
  float: number;
  category: string;
  image: string;
}

const MotionImage = motion(
  forwardRef<HTMLImageElement, ImageProps & MotionProps>((props, ref) => (
    <Image ref={ref} {...props} />
  ))
);

export default function Home() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [floatFilter, setFloatFilter] = useState<string>('');
  const [priceFilter, setPriceFilter] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('');
  const [filteredSkins, setFilteredSkins] = useState<Skin[]>([]);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [selectedSkin, setSelectedSkin] = useState<Skin | null>(null);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState<boolean>(false);
  const [skinToDelete, setSkinToDelete] = useState<Skin | null>(null);
  // Local state for modal inputs
  const [modalName, setModalName] = useState<string>('');
  const [modalImage, setModalImage] = useState<string>('');
  const [modalPrice, setModalPrice] = useState<number>(0);
  const [modalFloat, setModalFloat] = useState<number>(0);
  const [modalCategory, setModalCategory] = useState<string>('');

  // Função para buscar skins
  const fetchSkins = async () => {
    try {
      const response = await axios.get('http://localhost:4000/skin');
      setFilteredSkins(response.data);
    } catch (error) {
      console.error('Erro ao buscar skins:', error);
    }
  };

  // Função para criar skin
  const createSkin = async () => {
    const newSkin = {
      name: modalName,
      image: modalImage,
      price: modalPrice,
      float: modalFloat,
      category: modalCategory,
    };

    try {
      await axios.post('http://localhost:4000/skin', newSkin);
      fetchSkins();
      handleCloseCreateModal();
    } catch (error) {
      console.error('Erro ao criar skin:', error);
    }
  };

  // Função para atualizar skin
  const updateSkin = async (skin: Skin) => {
    try {
      const response = await axios.put(`http://localhost:4000/skin/${skin.id}`, skin);
      fetchSkins();
    } catch (error) {
      console.error('Erro ao atualizar skin:', error);
    }
  };

  // Função para deletar skin
  const deleteSkin = async (skin: Skin) => {
    try {
      await axios.delete(`http://localhost:4000/skin/${skin.id}`);
      fetchSkins();
    } catch (error) {
      console.error('Erro ao deletar skin:', error);
    }
  };

  // Buscar skins ao abrir a pagina
  useEffect(() => {
    fetchSkins();
  }, []);

  useEffect(() => {
    let filtered = filteredSkins.filter((skin) => {
      return (
        skin.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (floatFilter ? skin.float <= parseFloat(floatFilter) : true) &&
        (priceFilter ? skin.price <= parseFloat(priceFilter) : true) &&
        (categoryFilter ? skin.category === categoryFilter : true)
      );
    });

    // Ordenação
    if (sortOrder === 'price') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'float') {
      filtered.sort((a, b) => a.float - b.float);
    }

    setFilteredSkins(filtered);
  }, [searchTerm, floatFilter, priceFilter, categoryFilter, sortOrder]);

  // Botão de pesquisar
  const handleSearchClick = () => {
    fetchSkins();
  };

   // Modal para editar skin
   const handleEditClick = (skin: Skin) => {
    setSelectedSkin(skin);
    setModalName(skin.name);
    setModalImage(skin.image);
    setModalPrice(skin.price);
    setModalFloat(skin.float);
    setModalCategory(skin.category);
    setIsModalOpen(true);
  };

  // Fechar modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSkin(null);
  };

  // Salvar as alterações
  const handleSave = () => {
    if (selectedSkin) {
      const updatedSkin = {
        ...selectedSkin,
        name: modalName,
        image: modalImage,
        price: modalPrice,
        float: modalFloat,
        category: modalCategory,
      };
      updateSkin(updatedSkin);
      handleCloseModal();
    }
  };

  // Abrir modal de criação
  const handleOpenCreateModal = () => {
    setModalName('');
    setModalImage('');
    setModalPrice(0);
    setModalFloat(0);
    setModalCategory('');
    setIsCreateModalOpen(true);
  };

  // Fechar modal de criação
  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  // Botão de deletar skin
  const handleDeleteClick = (skin: Skin) => {
    setSkinToDelete(skin);
    setIsConfirmDeleteOpen(true);
  };

  // Confirmar a exclusão de skin
  const handleConfirmDelete = () => {
    if (skinToDelete) {
      deleteSkin(skinToDelete);
      setSkinToDelete(null);
    }
    setIsConfirmDeleteOpen(false);
  };

  return (
    <Box p={5} bg="#111111" minH="100vh">
      {/* Título */}
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Heading as="h2" size="lg" textAlign="center">
          CSkinStore
        </Heading>
      </Flex>

      {/* Filtros */}
      <Flex 
        mb={4} 
        justifyContent="center" 
        alignItems="center" 
        border="1px solid rgba(67, 67, 67, 0.5)" 
        borderRadius="md" 
        p={4} 
        flexDirection={["column", "row"]}
        mx={["0", "20"]}
      >
        <Select
          placeholder="Todos os Itens"
          onChange={(e) => setFloatFilter(e.target.value)}
          width={["100%", "auto"]}
          height="30px"
          mr={[2, 2]}
          mb={[2, 0]}
        >
          <option value="0.1">0.1</option>
          <option value="0.5">0.5</option>
          <option value="1.0">1.0</option>
        </Select>

        <Select
          placeholder="Todos os Desgastes"
          onChange={(e) => setFloatFilter(e.target.value)}
          width={["100%", "auto"]}
          height="30px"
          mr={[2, 2]}
          mb={[2, 0]}
        >
          <option value="0.1">0.1</option>
          <option value="0.5">0.5</option>
          <option value="1.0">1.0</option>
        </Select>

        <Input
          placeholder="de R$00,00"
          width={["100%", "auto"]}
          height="30px"
          mb={[2, 0]}
          mr={[2, 0]}
        />
        <Text>━</Text>
        <Input
          placeholder="ate R$00,00"
          width={["100%", "auto"]}
          height="30px"
          mr={[2, 2]}
          mb={[2, 0]}
        />

        <Input
          placeholder="Procurar"
          value={searchTerm}
          width={["100%", "auto"]}
          height="30px"
          onChange={(e) => setSearchTerm(e.target.value)}
          mr={[2, 2]}
          mb={[2, 0]}
        />

        <Button
          mr={[2, 2]}
          mb={[2, 0]}
          display="flex" 
          alignItems="center" 
          justifyContent="center" 
          title='Pesquisar'
          height="30px"
          width={["100%", "auto"]}
          onClick={handleSearchClick}
        >
          <FaSearch />
        </Button>

        <Select
          placeholder="Ordenar por"
          onChange={(e) => setFloatFilter(e.target.value)}
          width={["100%", "auto"]}
          height="30px"
          mr={[2, 2]}
          mb={[2, 0]}
        >
          <option value="0.1">0.1</option>
          <option value="0.5">0.5</option>
          <option value="1.0">1.0</option>
        </Select>

        <Button
          mr={[2, 2]}
          display="flex" 
          alignItems="center" 
          justifyContent="center" 
          title='Adicionar'
          height="30px"
          width={["100%", "auto"]}
          mb={[2, 0]}
          onClick={handleOpenCreateModal}
        >
          <IoIosAddCircle />
        </Button>

        <Button 
          onClick={() => setShowFilters(!showFilters)}
          display="flex" 
          alignItems="center" 
          justifyContent="center"
          title='Limpar Filtros'
          height="30px"
          width={["100%", "auto"]}
          mr={[2, 2]}
        >
          <PiBroomFill />
        </Button>
      </Flex>

      <Collapse in={showFilters}>
        <Select
          placeholder="Filtrar por float"
          onChange={(e) => setFloatFilter(e.target.value)}
          mb={4}
          width={["100%", "auto"]}
        >
          <option value="0.1">0.1</option>
          <option value="0.5">0.5</option>
          <option value="1.0">1.0</option>
        </Select>
        <Select
          placeholder="Filtrar por preço"
          onChange={(e) => setPriceFilter(e.target.value)}
          mb={4}
          width={["100%", "auto"]}
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </Select>
        <Select
          placeholder="Filtrar por categoria"
          onChange={(e) => setCategoryFilter(e.target.value)}
          mb={4}
          width={["100%", "auto"]}
        >
          <option value="Category 1">Category 1</option>
          <option value="Category 2">Category 2</option>
        </Select>
        <Select
          placeholder="Ordenar por"
          onChange={(e) => setSortOrder(e.target.value)}
          mb={4}
          width={["100%", "auto"]}
        >
          <option value="price">Preço</option>
          <option value="float">Float</option>
        </Select>
      </Collapse>

      {/* Grid de skins filtrados */}
      <SimpleGrid 
        spacing={3} 
        mx={["0", "40"]} 
        justifyItems="center"
        minChildWidth="216px" // Define a largura mínima de cada item
      >
        {filteredSkins.map((skin) => (
          <Box 
            key={skin.id} 
            width="216px" 
            height="357px" 
            bg='linear-gradient(to bottom, rgba(051, 051, 051, 0.3) 70%, rgba(255, 165, 0, 0.1) 100%)'
            border="1px solid rgba(67, 67, 67, 0.5)" 
            _hover={{ border: '1px solid orange' }} 
            cursor="pointer"
          >
            <Stack height="100%">
              <Box 
                p={4} 
                display="flex" 
                flexDirection="column" 
                justifyContent="center" 
                borderRadius="md"
              >
                <Flex justifyContent="space-between" alignItems="center">
                  <Text fontSize="12px" color="white" fontWeight={700}>{skin.name}</Text>
                  <AiFillDelete 
                    color='red'
                    onClick={() => handleDeleteClick(skin)}
                  />
                </Flex>
                <Flex alignItems="center" mt={1}>
                  <Text color="orange" fontSize="12px" fontWeight={700}>• </Text>
                  <Text fontSize="10px" color="white" ml={1}>{skin.category}</Text>
                </Flex>
              </Box>
              <MotionImage 
                src={skin.image} 
                alt={skin.name} 
                objectFit="cover" 
                height="150px"
                borderRadius="md"
                whileHover={{ scale: 1.1, rotate: 10 }} 
                transition={{ duration: 0.2 }} 
              />
              <Flex justifyContent="end" mt={2} mr={2}>
                <Text fontSize="10px" color="white">{skin.float}</Text>
              </Flex>
              <Flex justifyContent="center" mt={2}>
                <Text color="white" fontSize="20px" fontWeight={700}>R${skin.price}</Text>
              </Flex>
              <Flex justifyContent="center">
                <Button
                  display="flex" 
                  alignItems="center" 
                  justifyContent="center"
                  width="150px"
                  height="30px"
                  title='Editar'
                  bg="rgba(255, 165, 0, 0.5)"
                  _hover={{ bg: 'rgba(255, 165, 0, 0.7)' }}
                  onClick={() => handleEditClick(skin)}
                >
                  <FaEdit />
                </Button>
              </Flex>
            </Stack>
          </Box>
        ))}
      </SimpleGrid>

      {/* Modal de criação de skin */}
      <Modal isOpen={isCreateModalOpen} onClose={handleCloseCreateModal}>
        <ModalOverlay />
        <ModalContent bg="#111111">
          <ModalHeader textAlign="center">Criar Nova Skin</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <Text>Nome:</Text>
              <Input 
                value={modalName} 
                onChange={(e) => setModalName(e.target.value)} 
              />
              <Text>Imagem:</Text>
              <Input 
                value={modalImage} 
                onChange={(e) => setModalImage(e.target.value)} 
              />
              <Text>Preço:</Text>
              <Input 
                value={modalPrice} 
                type="number" 
                onChange={(e) => setModalPrice(Number(e.target.value))} 
              />
              <Text>Float:</Text>
              <Input 
                value={modalFloat} 
                type="number" 
                onChange={(e) => setModalFloat(Number(e.target.value))} 
              />
              <Text>Categoria:</Text>
              <Input 
                value={modalCategory} 
                onChange={(e) => setModalCategory(e.target.value)} 
              />
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button bg="orange" mr={3} onClick={createSkin} _hover={{ bg: '#CD7F32' }}>
              Criar
            </Button>
            <Button bg="#333" variant="ghost" onClick={handleCloseCreateModal}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal para editar skin */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent bg="#111111">
          <ModalHeader textAlign="center">Editar Skin</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedSkin && (
              <Box>
                <Text>Nome:</Text>
                <Input 
                  value={modalName} 
                  onChange={(e) => setModalName(e.target.value)} 
                />
                <Text>Imagem:</Text>
                <Input 
                  value={modalImage} 
                  onChange={(e) => setModalImage(e.target.value)} 
                />
                <Text>Preço:</Text>
                <Input 
                  value={modalPrice} 
                  type="number" 
                  onChange={(e) => setModalPrice(Number(e.target.value))} 
                />
                <Text>Float:</Text>
                <Input 
                  value={modalFloat} 
                  type="number" 
                  onChange={(e) => setModalFloat(Number(e.target.value))} 
                />
                <Text>Categoria:</Text>
                <Input 
                  value={modalCategory} 
                  onChange={(e) => setModalCategory(e.target.value)} 
                />
              </Box>
            )}
          </ModalBody>
          <ModalFooter>
            <Button bg="orange" mr={3} onClick={handleSave} _hover={{ bg: '#CD7F32' }}>
              Salvar
            </Button>
            <Button bg="#333" variant="ghost" onClick={handleCloseModal}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal de confirmação de deletar skin */}
      <Modal isOpen={isConfirmDeleteOpen} onClose={() => setIsConfirmDeleteOpen(false)}>
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
            <Button colorScheme="red" mr={3} onClick={handleConfirmDelete}>
              Deletar
            </Button>
            <Button variant="ghost" onClick={() => setIsConfirmDeleteOpen(false)}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}