import React, { useEffect, useState, useCallback,  } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator, TouchableOpacity, TextInput} from 'react-native';
import { CharacterModel } from '../../../../domain/models/character.model';
import { getCharacters } from '../../../../api/characters.api';
import { useNavigation } from '@react-navigation/native';
import { MainStackNavigationProp } from '../../../Main/Main.routes';
import { MainStackRoutes } from '../../../Main/Main.routes';
import { CharacterDetailsStackRoutes } from '../../../CharacterDetails/CharacterDetails.routes';
import { useFavorites } from '../../../../context/FavoritesContext';
import { styles } from './CharacterList.styled';
import Icon from 'react-native-vector-icons/FontAwesome';
import {FilterPanel} from "../../../../components/FilterPanel";

const STATUS_OPTIONS = [
    { label: 'Alive', value: 'alive' },
    { label: 'Dead', value: 'dead' },
    { label: 'Unknown', value: 'unknown' },
];
const SPECIES_OPTIONS = [
    { label: 'Human', value: 'Human' },
    { label: 'Alien', value: 'Alien' },
];

const CharacterListScreen = () => {
    const [characters, setCharacters] = useState<CharacterModel[]>([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasNextPage, setHasNextPage] = useState(true);
    const [search, setSearch] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const {addFavorite, removeFavorite, isFavorite} = useFavorites();
    const navigation = useNavigation<MainStackNavigationProp>();
    const [status, setStatus] = useState<string>('');
    const [species, setSpecies] = useState<string>('');

    const [filterVisible, setFilterVisible] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState<string>('');
    const [selectedSpecies, setSelectedSpecies] = useState<string>('');

    useEffect(() => {
        if (filterVisible) {
            setSelectedStatus(status);
            setSelectedSpecies(species);
        }
    }, [filterVisible]);

    const loadCharacters = useCallback(async (reset = false) => {
        if (isLoading || (!hasNextPage && !reset)) return;
        setIsLoading(true);
        try {
            const {characters: newChars, hasNextPage: more} = await getCharacters(
                reset ? 1 : page,
                search,
                status,
                species
            );
            setCharacters(reset ? newChars : prev => [...prev, ...newChars]);
            setPage(reset ? 2 : prev => prev + 1);
            setHasNextPage(more);
        } catch (e) {
            setCharacters([]);
            setHasNextPage(false);
        } finally {
            setIsLoading(false);
        }
    }, [isLoading, hasNextPage, page, search, status, species]);

    useEffect(() => {
        loadCharacters(true);
    }, [search, status, species]);

    useEffect(() => {
        loadCharacters();
    }, []);

    const onSearch = () => {
        setPage(1);
        setHasNextPage(true);
        setSearch(searchValue.trim());
    };

    const renderItem = ({item}: { item: CharacterModel }) => (
        <TouchableOpacity
            activeOpacity={0.85}
            onPress={() =>
                navigation.navigate(MainStackRoutes.CharacterDetailsStack, {
                    screen: CharacterDetailsStackRoutes.CharacterDetailsScreen,
                    params: {characterId: item.id},
                })
            }
        >
            <View style={styles.cardWrapper}>
                <View style={styles.cardShadow}/>
                <View style={styles.card}>
                    <View style={styles.leftCol}>
                        <View>
                            <Text style={styles.label}>Name</Text>
                            <Text style={styles.value}>{item.name}</Text>
                        </View>
                        <View>
                            <Text style={styles.label}>Status</Text>
                            <Text style={styles.value}>{item.status}</Text>
                        </View>
                        <View>
                            <Text style={styles.label}>Species</Text>
                            <Text style={styles.value}>{item.species}</Text>
                        </View>
                    </View>
                    <View style={styles.rightCol}>
                        <View style={styles.imageFrame}>
                            <Image source={{uri: item.image}} style={styles.image}/>
                        </View>
                        <TouchableOpacity
                            style={styles.likeButton}
                            onPress={() => isFavorite(item.id) ? removeFavorite(item.id) : addFavorite(item)}
                            activeOpacity={0.8}
                        >
                            <Icon
                                name={isFavorite(item.id) ? 'star' : 'star-o'}
                                size={18}
                                style={styles.likeIcon}
                                color={isFavorite(item.id) ? '#FFD700' : '#224229'}
                            />
                            <Text style={styles.likeText}>Like</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={{flex: 1, backgroundColor: '#e8f0e8'}}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>Characters</Text>
                <View>
                    <View style={styles.searchBarInner}>
                        <Icon name="search" size={20} color="#162C1B" style={styles.searchIcon}/>
                        <TextInput
                            value={searchValue}
                            onChangeText={setSearchValue}
                            placeholder="Search the characters"
                            placeholderTextColor="#59695C"
                            style={styles.searchInput}
                            onSubmitEditing={onSearch}
                            returnKeyType="search"
                        />
                    </View>
                </View>
                <View>
                    <TouchableOpacity
                        onPress={() => setFilterVisible(v => !v)}
                        activeOpacity={0.85}>
                        <View style={styles.filterButtonInner}>
                            <Text style={styles.filterButtonText}>Filter</Text>
                            <View style={styles.filterIconContainer}>
                                <Icon
                                    name="chevron-down"
                                    size={10}
                                    style={{
                                        color: '#FFFFFF',
                                        transform: [{ rotate: filterVisible ? '180deg' : '0deg' }],
                                    }}
                                />
                            </View>
                        </View>
                    </TouchableOpacity>
                    {filterVisible && (
                        <FilterPanel
                            STATUS_OPTIONS={STATUS_OPTIONS}
                            SPECIES_OPTIONS={SPECIES_OPTIONS}
                            selectedStatus={selectedStatus}
                            setSelectedStatus={setSelectedStatus}
                            selectedSpecies={selectedSpecies}
                            setSelectedSpecies={setSelectedSpecies}
                            setStatus={setStatus}
                            setSpecies={setSpecies}
                            setFilterVisible={setFilterVisible}
                        />
                    )}
                </View>
            </View>
            <FlatList
                data={characters}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                onEndReached={() => loadCharacters()}
                onEndReachedThreshold={0.5}
                ListFooterComponent={isLoading ? <ActivityIndicator style={{margin: 20}}/> : null}
            />
        </View>
    );
}

export default CharacterListScreen;