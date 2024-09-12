import { SimpleGrid, Text } from '@chakra-ui/react';
import SkinCard from './SkinCard';

interface Skin {
    id: number;
    name: string;
    price: number;
    float: number;
    category: string;
    image: string;
}

interface SkinListProps {
    filteredSkins: Skin[];
    handleEditClick: (skin: Skin) => void;
    handleDeleteClick: (skin: Skin) => void;
}

const SkinList: React.FC<SkinListProps> = ({ filteredSkins, handleEditClick, handleDeleteClick }) => {
    return (
        <SimpleGrid 
            spacing={3} 
            mx={["0", "40"]} 
            justifyItems="center" 
            minChildWidth="216px"
        >
            {filteredSkins.length > 0 ? (
                filteredSkins.map((skin) => (
                    <SkinCard 
                        key={skin.id} 
                        skin={skin} 
                        handleEditClick={handleEditClick} 
                        handleDeleteClick={handleDeleteClick} 
                    />
                ))
            ) : (
                <Text>Nenhuma skin cadastrada.</Text>
            )}
        </SimpleGrid>
    );
};

export default SkinList;