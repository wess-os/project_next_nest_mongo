"use client";
import { useState, useEffect, forwardRef } from 'react';
import axios from 'axios';
import {
  Box,
  Input,
  SimpleGrid,
  Card,
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
import { FaSun, FaMoon, FaFilter, FaEdit, FaSearch } from "react-icons/fa";
import { PiBroomFill } from "react-icons/pi";
import { IoIosAddCircle } from "react-icons/io";
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
  const [selectedSkin, setSelectedSkin] = useState<Skin | null>(null);

  const fetchSkins = async () => {
    try {
      const response = await axios.get('http://localhost:4000/skin');
      setFilteredSkins(response.data);
    } catch (error) {
      console.error('Erro ao buscar skins:', error);
    }
  };

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

  const handleEditClick = (skin: Skin) => {
    setSelectedSkin(skin);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSkin(null);
  };

  return (
    <Box p={5} bg="#111111">
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Heading as="h2" size="lg" textAlign="center">
          CSkinStore
        </Heading>
      </Flex>
      <Flex 
        mb={4} 
        justifyContent="center" 
        alignItems="center" 
        border="1px solid rgba(67, 67, 67, 0.5)" 
        borderRadius="md" 
        p={4} 
        flexDirection={["column", "row"]} // Muda para coluna em telas pequenas
        mx={["0", "20"]} // Margem horizontal responsiva
      >
        <Select
          placeholder="Todos os Itens"
          onChange={(e) => setFloatFilter(e.target.value)}
          width={["100%", "auto"]} // Largura 100% em telas pequenas
          height="30px"
          mr={2}
          mb={[2, 0]} // Margem inferior em telas pequenas
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
          mr={2}
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
        />
        <Text>━</Text>
        <Input
          placeholder="ate R$00,00"
          width={["100%", "auto"]}
          height="30px"
          mr={2}
          mb={[2, 0]}
        />

        <Input
          placeholder="Procurar"
          value={searchTerm}
          width={["100%", "auto"]}
          height="30px"
          onChange={(e) => setSearchTerm(e.target.value)}
          mr={2}
          mb={[2, 0]}
        />

        <Button
          mr={2}
          display="flex" 
          alignItems="center" 
          justifyContent="center" 
          title='Pesquisar'
          height="30px"
          width={["100%", "auto"]} // Largura 100% em telas pequenas
        >
          <FaSearch />
        </Button>

        <Select
          placeholder="Ordenar por"
          onChange={(e) => setFloatFilter(e.target.value)}
          width={["100%", "auto"]}
          height="30px"
          mr={2}
          mb={[2, 0]}
        >
          <option value="0.1">0.1</option>
          <option value="0.5">0.5</option>
          <option value="1.0">1.0</option>
        </Select>

        <Button
          mr={2}
          display="flex" 
          alignItems="center" 
          justifyContent="center" 
          title='Adicionar'
          height="30px"
          width={["100%", "auto"]}
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

      <SimpleGrid  spacing={3} mx={["0", "40"]} justifyContent="center" columns={[1, 2, 3, 4, 5, 6, 7]}>
        {filteredSkins.map((skin) => (
          <Card 
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
                <Text fontSize="12px" color="white" fontWeight={700}>{skin.name}</Text>
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
          </Card>
        ))}
      </SimpleGrid>

      {/* Modal para editar skin */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar Skin</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedSkin && (
              <Box>
                <Text>Nome:</Text>
                <Input value={selectedSkin.name} />
                <Text>Imagem:</Text>
                <Input value={selectedSkin.image} />
                <Text>Preço:</Text>
                <Input value={selectedSkin.price} type="number" />
                <Text>Float:</Text>
                <Input value={selectedSkin.float} type="number" />
                <Text>Categoria:</Text>
                <Input value={selectedSkin.category} />
              </Box>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleCloseModal}>
              Salvar
            </Button>
            <Button variant="ghost" onClick={handleCloseModal}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}