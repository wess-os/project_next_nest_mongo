import React from 'react';
import { Spinner, Center } from '@chakra-ui/react';

const Loader: React.FC = () => {
    return (
        <Center 
            position="fixed"
            top={0} 
            left={0} 
            right={0} 
            bottom={0} 
            bg="#111111"
            zIndex={9999}
        >
            <Spinner size="xl" color="orange.500" />
        </Center>
    );
  };

export default Loader;