import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { CharacterModel } from '../../../../domain/models/character.model';
import { getCharacters } from '../../../../api/characters.api';

const CharacterListScreen = () => {
    const [characters, setCharacters] = useState<CharacterModel[]>([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasNextPage, setHasNextPage] = useState(true);

    const loadCharacters = async () => {
        if (isLoading || !hasNextPage) return;
        setIsLoading(true);
        try {
            const { characters: newChars, hasNextPage: more } = await getCharacters(page);
            setCharacters((prev) => [...prev, ...newChars]);
            setPage((prev) => prev + 1);
            setHasNextPage(more);
        } catch (e) {
            console.error('Error fetching characters:', e);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadCharacters();
    }, []);

    const renderItem = ({ item }: { item: CharacterModel }) => (
        <TouchableOpacity style={{ padding: 16, flexDirection: 'row', alignItems: 'center' }}>
            <Image source={{ uri: item.image }} style={{ width: 50, height: 50, borderRadius: 25, marginRight: 16 }} />
            <View>
                <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
                <Text>{item.species} - {item.status}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <FlatList
            data={characters}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            onEndReached={loadCharacters}
            onEndReachedThreshold={0.5}
            ListFooterComponent={isLoading ? <ActivityIndicator style={{ margin: 20 }} /> : null}
        />
    );
};

export default CharacterListScreen;