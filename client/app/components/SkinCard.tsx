import { Box, Flex, Text, Button, Stack } from '@chakra-ui/react';
import { AiFillDelete } from 'react-icons/ai';
import { FaEdit } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface Skin {
    id: number;
    name: string;
    price: number;
    float: number;
    category: string;
    image: string;
}

const MotionImage = motion.img;

interface SkinCardProps {
    skin: Skin;
    handleEditClick: (skin: Skin) => void;
    handleDeleteClick: (skin: Skin) => void;
}

const SkinCard: React.FC<SkinCardProps> = ({ skin, handleEditClick, handleDeleteClick }) => {
  return (
    <Box 
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
                <Flex 
                    justifyContent="space-between" 
                    alignItems="center"
                >
                    <Text 
                        fontSize="12px" 
                        color="white" 
                        fontWeight={700}
                    >
                        {skin.name}
                    </Text>

                    <AiFillDelete 
                        color='red' 
                        onClick={() => 
                            handleDeleteClick(skin)
                        } 
                    />
                </Flex>
                <Flex 
                    alignItems="center" 
                    mt={1}
                >
                    <Text 
                        color="orange" 
                        fontSize="12px" 
                        fontWeight={700}
                    >
                        • 
                    </Text>

                    <Text 
                        fontSize="10px" 
                        color="white" 
                        ml={1}
                    >
                        {skin.category}
                    </Text>
                </Flex>
            </Box>
            <MotionImage 
                src={skin.image} 
                alt={skin.name} 
                style={{ objectFit: 'cover', height: '150px', borderRadius: 'md' }} 
                whileHover={{ scale: 1.1, rotate: 10 }} 
                transition={{ duration: 0.2 }} 
            />
            <Flex 
                justifyContent="end" 
                mt={2} 
                mr={2}
            >
                <Text 
                    fontSize="10px" 
                    color="white"
                >
                    {skin.float}
                </Text>
            </Flex>
            <Flex 
                justifyContent="center" 
                mt={2}
            >
                <Text 
                    color="white" 
                    fontSize="20px" 
                    fontWeight={700}
                >
                    R${skin.price}
                </Text>
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
                    onClick={() => 
                        handleEditClick(skin)
                    }
                >
                    <FaEdit />
                </Button>
            </Flex>
        </Stack>
    </Box>
  );
};

export default SkinCard;