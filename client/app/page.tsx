"use client";
import { Box, Flex, Heading } from '@chakra-ui/react';
import { useSkinStore } from './utils/useSkinStore';
import Filter from './components/Filter';
import SkinList from './components/SkinList';
import ModalForm from './components/ModalForm';
import DeleteConfirmationModal from './components/DeleteConfirmationModal';
import Loader from './components/Loader';
import { ErrorAlert } from './components/ErrorAlert';
import { useEffect, useState } from 'react';

interface Skin {
  id: number;
  name: string;
  price: number;
  float: number;
  category: string;
  image: string;
}

export default function Home() {
  const {
    searchTerm,
    setSearchTerm,
    floatFilter,
    setFloatFilter,
    priceMin,
    setPriceMin,
    priceMax,
    setPriceMax,
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
    createSkin,
    updateSkin,
    deleteSkin,
    resetFilters,
    loading,
    setLoading,
    errorMessage,
  } = useSkinStore();

  // Show error message
  const [showError, setShowError] = useState<boolean>(!!errorMessage);

  // Modal to edit skin
  const handleEditClick = (skin: Skin) => {
    setSelectedSkin(skin);
    setModalName(skin.name);
    setModalImage(skin.image);
    setModalPrice(skin.price);
    setModalFloat(skin.float);
    setModalCategory(skin.category);
    setIsModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSkin(null);
  };

  // Save changes
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

  // Open creation modal
  const handleOpenCreateModal = () => {
    setModalName('');
    setModalImage('');
    setModalPrice(0);
    setModalFloat(0);
    setModalCategory('');
    setIsCreateModalOpen(true);
  };

  // Close creation modal
  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  // Delete skin button
  const handleDeleteClick = (skin: Skin) => {
    setSkinToDelete(skin);
    setIsConfirmDeleteOpen(true);
  };

  // Confirm skin deletion
  const handleConfirmDelete = () => {
    if (skinToDelete) {
      deleteSkin(skinToDelete);
      setSkinToDelete(null);
    }

    setIsConfirmDeleteOpen(false);
  };

  // Close error message
  const handleCloseError = () => {
    setShowError(false);
  };

  // Show error message
  useEffect(() => {
      if (errorMessage) {
          setShowError(true);
      }
  }, [errorMessage]);

  return (
    <>
      {showError && <ErrorAlert errorMessage={errorMessage} onClose={handleCloseError} />}
      {loading ? <Loader /> : (
        <Box 
          p={5} 
          bg="#111111" 
          minH="100vh"
        >
          <Flex 
            justifyContent="space-between" 
            alignItems="center" 
            mb={4}
          >
            <Heading 
              as="h2" 
              size="lg" 
              textAlign="center"
              cursor="pointer"
              onClick={() => window.location.reload()}
            >
              CSkinStore
            </Heading>
          </Flex>

          {/* Filters */}
          <Filter
            categories={categories}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            floatFilter={floatFilter}
            setFloatFilter={setFloatFilter}
            priceMin={priceMin}
            setPriceMin={setPriceMin}
            priceMax={priceMax}
            setPriceMax={setPriceMax}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            handleOpenCreateModal={handleOpenCreateModal}
            resetFilters={resetFilters}
          />

          {/* Grid of filtered skins */}
          <SkinList
            filteredSkins={filteredSkins}
            handleEditClick={handleEditClick}
            handleDeleteClick={handleDeleteClick}
          />

          {/* Skin creation mode */}
          <ModalForm
            isOpen={isCreateModalOpen}
            onClose={handleCloseCreateModal}
            modalName={modalName}
            setModalName={setModalName}
            modalImage={modalImage}
            setModalImage={setModalImage}
            modalPrice={modalPrice}
            setModalPrice={setModalPrice}
            modalFloat={modalFloat}
            setModalFloat={setModalFloat}
            modalCategory={modalCategory}
            setModalCategory={setModalCategory}
            onSubmit={createSkin}
            title="Criar Nova Skin"
          />

          {/* Modal to edit skin */}
          <ModalForm
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            modalName={modalName}
            setModalName={setModalName}
            modalImage={modalImage}
            setModalImage={setModalImage}
            modalPrice={modalPrice}
            setModalPrice={setModalPrice}
            modalFloat={modalFloat}
            setModalFloat={setModalFloat}
            modalCategory={modalCategory}
            setModalCategory={setModalCategory}
            onSubmit={handleSave}
            title="Editar Skin"
          />

          {/* Skin delete confirmation mode */}
          <DeleteConfirmationModal
            isOpen={isConfirmDeleteOpen}
            onClose={() => setIsConfirmDeleteOpen(false)}
            skinToDelete={skinToDelete}
            onConfirmDelete={handleConfirmDelete}
          />
        </Box>
      )}
    </>
  );
}