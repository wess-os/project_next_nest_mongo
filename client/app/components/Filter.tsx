import { Flex, Select, Input, Button } from '@chakra-ui/react';
import { IoIosAddCircle } from 'react-icons/io';
import { PiBroomFill } from 'react-icons/pi';

interface FilterProps {
    categories: string[];
    categoryFilter: string;
    setCategoryFilter: (value: string) => void;
    floatFilter: string;
    setFloatFilter: (value: string) => void;
    priceMin: number | '';
    setPriceMin: (value: number | '') => void;
    priceMax: number | '';
    setPriceMax: (value: number | '') => void;
    searchTerm: string;
    setSearchTerm: (value: string) => void;
    sortOrder: string;
    setSortOrder: (value: string) => void;
    handleOpenCreateModal: () => void;
    resetFilters: () => void;
}

const Filter: React.FC<FilterProps> = ({
    categories,
    categoryFilter,
    setCategoryFilter,
    floatFilter,
    setFloatFilter,
    priceMin,
    setPriceMin,
    priceMax,
    setPriceMax,
    searchTerm,
    setSearchTerm,
    sortOrder,
    setSortOrder,
    handleOpenCreateModal,
    resetFilters,
}) => {
    return (
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
                onChange={(e) => 
                    setCategoryFilter(e.target.value)
                } 
                value={categoryFilter} 
                width={["100%", "auto"]} 
                height="30px" 
                mr={[2, 2]} 
                mb={[2, 0]}
            >
                <option value="">Todos os Itens</option>
                {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                ))}
            </Select>

            <Select 
                onChange={(e) => 
                    setFloatFilter(e.target.value)
                } 
                value={floatFilter} 
                width={["100%", "auto"]} 
                height="30px" 
                mr={[2, 2]} 
                mb={[2, 0]}
            >
                <option value="">Todos os Desgastes</option>
                <option value="nova">Nova de Fábrica</option>
                <option value="pouco_usada">Pouco Usada</option>
                <option value="testada_em_campo">Testada em Campo</option>
                <option value="bem_desgastada">Bem Desgastada</option>
                <option value="veterana_de_guerra">Veterana de Guerra</option>
            </Select>

            <Input 
                placeholder="de R$00,00" 
                width={["100%", "auto"]} 
                height="30px" 
                mb={[2, 0]} 
                mr={[2, 0]} 
                type="number" 
                value={priceMin} 
                onChange={(e) => 
                    setPriceMin(e.target.value ? Number(e.target.value) : '')
                } 
            />
            <Input 
                placeholder="ate R$00,00" 
                width={["100%", "auto"]} 
                height="30px" 
                mr={[2, 2]} 
                mb={[2, 0]} 
                type="number" 
                value={priceMax} 
                onChange={(e) => 
                    setPriceMax(e.target.value ? Number(e.target.value) : '')
                } 
            />

            <Input 
                placeholder="Procurar" 
                value={searchTerm} 
                width={["100%", "auto"]} 
                height="30px" 
                onChange={(e) => 
                    setSearchTerm(e.target.value)
                } 
                mr={[2, 2]} 
                mb={[2, 0]} 
            />

            <Select 
                placeholder="Ordenar por" 
                onChange={(e) => 
                    setSortOrder(e.target.value)
                } 
                value={sortOrder} 
                width={["100%", "auto"]} 
                height="30px" 
                mr={[2, 2]} 
                mb={[2, 0]}
            >
                <option value="price">Preço</option>
                <option value="float">Float (Desgaste)</option>
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
                onClick={resetFilters} 
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
    );
};

export default Filter;