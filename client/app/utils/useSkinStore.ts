import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Spinner, Center } from '@chakra-ui/react';

export interface Skin {
  id: number;
  name: string;
  price: number;
  float: number;
  category: string;
  image: string;
}

export const useSkinStore = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [floatFilter, setFloatFilter] = useState<string>('');
    const [priceMin, setPriceMin] = useState<number | ''>('');
    const [priceMax, setPriceMax] = useState<number | ''>('');
    const [originalSkins, setOriginalSkins] = useState<Skin[]>([]);
    const [categoryFilter, setCategoryFilter] = useState<string>('');
    const [categories, setCategories] = useState<string[]>([]);
    const [sortOrder, setSortOrder] = useState<string>('');
    const [filteredSkins, setFilteredSkins] = useState<Skin[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
    const [selectedSkin, setSelectedSkin] = useState<Skin | null>(null);
    const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState<boolean>(false);
    const [skinToDelete, setSkinToDelete] = useState<Skin | null>(null);
    const [modalName, setModalName] = useState<string>('');
    const [modalImage, setModalImage] = useState<string>('');
    const [modalPrice, setModalPrice] = useState<number>(0);
    const [modalFloat, setModalFloat] = useState<number>(0);
    const [modalCategory, setModalCategory] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string>('');

    // Function to search skins
    const fetchSkins = async () => {
        try {
            const response = await axios.get<Skin[]>('http://localhost:4000/skin');

            setFilteredSkins(response.data);
            setOriginalSkins(response.data);

            const uniqueCategories = Array.from(new Set(response.data.map((skin) => skin.category)));
            setCategories(uniqueCategories);
            setLoading(false);
        } catch (error) {
            console.error('Erro ao buscar skins:', error);
            setErrorMessage('Erro ao buscar skins. Tente novamente mais tarde.');
        }
    };

    // Function to create skin
    const createSkin = async () => {
        const newSkin = { name: modalName, image: modalImage, price: modalPrice, float: modalFloat, category: modalCategory };

        try {
            await axios.post('http://localhost:4000/skin', newSkin);

            fetchSkins();
            handleCloseCreateModal();
            setLoading(false);
        } catch (error) {
            console.error('Erro ao criar skin:', error);
            setErrorMessage('Erro ao criar skin. Verifique os dados e tente novamente.');
        }
    };

    // Function to update skin
    const updateSkin = async (skin: Skin) => {
        try {
            await axios.put(`http://localhost:4000/skin/${skin.id}`, skin);

            fetchSkins();
            setLoading(false);
        } catch (error) {
            console.error('Erro ao atualizar skin:', error);
            setErrorMessage('Erro ao atualizar skin. Tente novamente.');
        }
    };

    // Function to delete skin
    const deleteSkin = async (skin: Skin) => {
        try {

            await axios.delete(`http://localhost:4000/skin/${skin.id}`);
            fetchSkins();
            setLoading(false);
        } catch (error) {
            console.error('Erro ao deletar skin:', error);
            setErrorMessage('Erro ao deletar skin. Tente novamente.');
        }
    };

    // Close creation modal
    const handleCloseCreateModal = () => {
        setIsCreateModalOpen(false);
    };

    // Search for skins when opening the page
    useEffect(() => {
        fetchSkins();
        setLoading(false);
    }, []);

    // Function to classify the float
    const classifyFloat = (float: number): string => {
        if (float >= 0 && float <= 0.1) return 'nova';
        if (float > 0.1 && float <= 0.15) return 'pouco_usada';
        if (float > 0.15 && float <= 0.4) return 'testada_em_campo';
        if (float > 0.4 && float <= 0.45) return 'bem_desgastada';
        if (float > 0.45 && float <= 1) return 'veterana_de_guerra';

        return 'desconhecida';
    };

    // Form the filters
    useEffect(() => {
        let filtered = originalSkins.filter((skin) => {
            const floatCategory = classifyFloat(skin.float);

            return (
                skin.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
                (categoryFilter ? skin.category === categoryFilter : true) &&
                (floatFilter ? classifyFloat(skin.float) === floatFilter : true) &&
                (priceMin !== '' ? skin.price >= priceMin : true) &&
                (priceMax !== '' ? skin.price <= priceMax : true)
            );
        });

        if (sortOrder === 'price') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (sortOrder === 'float') {
            filtered.sort((a, b) => a.float - b.float);
        }

        setFilteredSkins(filtered);
    }, [searchTerm, floatFilter, priceMin, priceMax, categoryFilter, sortOrder, originalSkins]);

    // Reset the filters
    const resetFilters = () => {
        setPriceMin('');
        setPriceMax('');
        setCategoryFilter('');
        setFloatFilter('');
        setSortOrder('');
        setSearchTerm('');
        fetchSkins();
    };

    // Clear error message after a timeout
    useEffect(() => {
        if (errorMessage) {
            const timer = setTimeout(() => {
                setErrorMessage('');
            }, 5000); // Clear message after 5 seconds

            return () => clearTimeout(timer);
        }
    }, [errorMessage]);

    return {
        searchTerm,
        setSearchTerm,
        floatFilter,
        setFloatFilter,
        priceMin,
        setPriceMin,
        priceMax,
        setPriceMax,
        originalSkins,
        categoryFilter,
        setCategoryFilter,
        categories,
        sortOrder,
        setSortOrder,
        filteredSkins,
        isModalOpen,
        setIsModalOpen,
        isCreateModalOpen,
        setIsCreateModalOpen,
        selectedSkin,
        setSelectedSkin,
        isConfirmDeleteOpen,
        setIsConfirmDeleteOpen,
        skinToDelete,
        setSkinToDelete,
        modalName,
        setModalName,
        modalImage,
        setModalImage,
        modalPrice,
        setModalPrice,
        modalFloat,
        setModalFloat,
        modalCategory,
        setModalCategory,
        fetchSkins,
        createSkin,
        updateSkin,
        deleteSkin,
        classifyFloat,
        resetFilters,
        loading,
        setLoading,
        errorMessage,
    };
};