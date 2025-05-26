// src/context/FavoritesContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CharacterModel } from '../domain/models/character.model';

type FavoritesContextType = {
    favorites: CharacterModel[];
    addFavorite: (character: CharacterModel) => void;
    removeFavorite: (id: number) => void;
    isFavorite: (id: number) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [favorites, setFavorites] = useState<CharacterModel[]>([]);

    useEffect(() => {
        AsyncStorage.getItem('favorites').then(data => {
            if (data) setFavorites(JSON.parse(data));
        });
    }, []);

    useEffect(() => {
        AsyncStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const addFavorite = (character: CharacterModel) => {
        if (!favorites.find(c => c.id === character.id)) {
            setFavorites([...favorites, character]);
        }
    };

    const removeFavorite = (id: number) => {
        setFavorites(favorites.filter(c => c.id !== id));
    };

    const isFavorite = (id: number) => favorites.some(c => c.id === id);

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => {
    const ctx = useContext(FavoritesContext);
    if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider');
    return ctx;
};