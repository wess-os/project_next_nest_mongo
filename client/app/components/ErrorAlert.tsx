import { Alert, AlertIcon, AlertTitle, AlertDescription, CloseButton, Box } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionAlert = motion(Alert);

export const ErrorAlert = ({ errorMessage, onClose }: { errorMessage: string; onClose: () => void }) => {
    if (!errorMessage) return null;

    return (
        <Box position="fixed" top="20px" right="20px" zIndex={9999} width="300px">
            <MotionAlert
                status="error"
                borderRadius="md"
                boxShadow="md"
                initial={{ opacity: 0, translateY: -20 }}
                animate={{ opacity: 1, translateY: 0 }}
                exit={{ opacity: 0, translateY: -20 }}
                transition={{ duration: 0.3 }}
            >
                <AlertIcon />
                <AlertTitle mr={2}>Erro!</AlertTitle>
                <AlertDescription>{errorMessage}</AlertDescription>
                <CloseButton position="absolute" right="8px" top="8px" onClick={onClose} />
            </MotionAlert>
        </Box>
    );
};