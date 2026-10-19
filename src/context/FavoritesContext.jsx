// FavoritosContext.jsx
import { createContext, useEffect, useContext, useState } from 'react';
import { getFavoritos, adicionarFavorito, removerFavorito } from '../services/favoritosService';

const FavoritosContext = createContext();

export function FavoritosProvider({ children }) {
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setFavoritos([]);
      return;
    }

    getFavoritos()
      .then(setFavoritos)
      .catch((error) => {
        console.error('Erro ao carregar favoritos:', error);
      });
  }, []);

  async function addFavorite(book) {
    const favoritoAdicionado = await adicionarFavorito(book);
    setFavoritos((prevFavoritos) => [...prevFavoritos, favoritoAdicionado]);
  }

 
  function isFavorite(bookId) {
    return favoritos.some((fav) => fav.googleBookId === bookId || fav.id === bookId);
  }
  /* o .some é o mesmo que um laço for */

  async function removeFavorites(id) {
  await removerFavorito(id);
  setFavoritos(prev => prev.filter(f => f._id !== id));
}

async function toggleFavorito(book) {
  const googleBookId = book.googleBookId || book.id;
  const favoritoExistente = favoritos.find(f => f.googleBookId === googleBookId || f.id === googleBookId);
  
  if (favoritoExistente) {
    await removeFavorites(favoritoExistente._id); // ← passa o _id
  } else {
    await addFavorite(book);
  }
}
  function updateFavorite (atualizado){
    setFavoritos(prev =>
      prev.map(f =>
        f.googleBookId === atualizado.googleBookId ? atualizado : f
      )
    );
  }
  /* o prev pega o valor mais atual */

  return (
    <FavoritosContext.Provider value={{
      favoritos,
      favorites: favoritos,
      addFavorite,
      removeFavorites,
      toggleFavorito,
      isFavorite,
      updateFavorite,
    }}>
      {children}
    </FavoritosContext.Provider>
  );
}

/*  */

export const useFavoritos = () => {
  const context = useContext(FavoritosContext);
  if (!context) {
    throw new Error('useFavoritos deve ser usado dentro de um FavoritosProvider');
  }
  return context;
}