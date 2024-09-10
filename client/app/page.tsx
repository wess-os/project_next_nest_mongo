"use client";
import { useState, useEffect } from 'react';
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
  useColorMode,
  Flex,
  Heading,
  Collapse,
} from '@chakra-ui/react';
import { FaSun, FaMoon, FaFilter } from "react-icons/fa";

interface Skin {
  id: number;
  name: string;
  price: number;
  float: number;
  category: string;
  imageUrl: string;
}

export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [floatFilter, setFloatFilter] = useState<string>('');
  const [priceFilter, setPriceFilter] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('');
  const [filteredSkins, setFilteredSkins] = useState<Skin[]>([]);
  const [showFilters, setShowFilters] = useState<boolean>(false);

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

  return (
    <Box p={5}>
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Heading as="h2" size="lg" textAlign="center">
          CSkinStore
        </Heading>
        <Button 
          onClick={toggleColorMode} 
          display="flex" 
          alignItems="center" 
          justifyContent="center" 
          width="50px" 
          height="50px"
          variant="outline" 
        >
          {colorMode === 'light' ? <FaMoon /> : <FaSun />}
        </Button>
      </Flex>
      <Flex mb={4}>
        <Input
          placeholder="Buscar skins pelo nome"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          mr={2}
        />
        <Button onClick={() => setShowFilters(!showFilters)} leftIcon={<FaFilter />}>
          Filtros
        </Button>
      </Flex>
      <Collapse in={showFilters}>
        <Select
          placeholder="Filtrar por float"
          onChange={(e) => setFloatFilter(e.target.value)}
          mb={4}
        >
          <option value="0.1">0.1</option>
          <option value="0.5">0.5</option>
          <option value="1.0">1.0</option>
        </Select>
        <Select
          placeholder="Filtrar por preço"
          onChange={(e) => setPriceFilter(e.target.value)}
          mb={4}
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </Select>
        <Select
          placeholder="Filtrar por categoria"
          onChange={(e) => setCategoryFilter(e.target.value)}
          mb={4}
        >
          <option value="Category 1">Category 1</option>
          <option value="Category 2">Category 2</option>
        </Select>
        <Select
          placeholder="Ordenar por"
          onChange={(e) => setSortOrder(e.target.value)}
          mb={4}
        >
          <option value="price">Preço</option>
          <option value="float">Float</option>
        </Select>
      </Collapse>

      <SimpleGrid columns={[1, 2, 3, 4]} spacing={5}>
        {filteredSkins.map((skin) => (
          <Card key={skin.id} height="300px">
            <Stack height="100%">
              <Box 
                p={4} 
                display="flex" 
                flexDirection="column" 
                justifyContent="center" 
                bg="rgba(0, 0, 0, 0.6)"
                borderRadius="md"
              >
                <Text fontSize="xl" color="white">{skin.name}</Text>
                <Text color="white">Preço: ${skin.price}</Text>
                <Text color="white">Float: {skin.float}</Text>
                <Text color="white">Categoria: {skin.category}</Text>
              </Box>
              <Box 
                bgImage={`url('${skin.imageUrl}')`} 
                bgSize="cover" 
                bgPosition="center" 
                height="200px"
                borderRadius="md"
              />
            </Stack>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
}