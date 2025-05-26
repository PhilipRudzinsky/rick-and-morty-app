import React, { useState } from 'react';
            import { View, Text, FlatList, Image, TouchableOpacity, TextInput } from 'react-native';
            import { styles } from '../CharacterList/CharacterList.styled';
            import Icon from 'react-native-vector-icons/FontAwesome';
            import { useFavorites } from '../../../../context/FavoritesContext';
            import { useNavigation } from '@react-navigation/native';
            import { MainStackNavigationProp } from '../../../Main/Main.routes';
            import { MainStackRoutes } from '../../../Main/Main.routes';
            import { CharacterDetailsStackRoutes } from '../../../CharacterDetails/CharacterDetails.routes';
            import { FilterPanel } from '../../../../components/FilterPanel';

            const STATUS_OPTIONS = [
                { label: 'Alive', value: 'Alive' },
                { label: 'Dead', value: 'Dead' },
                { label: 'Unknown', value: 'unknown' },
            ];
            const SPECIES_OPTIONS = [
                { label: 'Human', value: 'Human' },
                { label: 'Alien', value: 'Alien' },
            ];

            const FavoriteCharactersScreen = () => {
                const { favorites, removeFavorite, isFavorite, addFavorite } = useFavorites();
                const navigation = useNavigation<MainStackNavigationProp>();
                const [searchValue, setSearchValue] = useState('');
                const [search, setSearch] = useState('');
                const [filterVisible, setFilterVisible] = useState(false);
                const [selectedStatus, setSelectedStatus] = useState<string>('');
                const [selectedSpecies, setSelectedSpecies] = useState<string>('');
                const [status, setStatus] = useState<string>('');
                const [species, setSpecies] = useState<string>('');

                const onSearch = () => setSearch(searchValue.trim());

                // Filtrowanie ulubionych po search, status, species
                const filteredFavorites = favorites.filter(fav =>
                    fav.name.toLowerCase().includes(search.toLowerCase()) &&
                    (status ? fav.status === status : true) &&
                    (species ? fav.species === species : true)
                );

                const renderItem = ({ item }) => (
                    <TouchableOpacity
                        activeOpacity={0.85}
                        onPress={() =>
                            navigation.navigate(MainStackRoutes.CharacterDetailsStack, {
                                screen: CharacterDetailsStackRoutes.CharacterDetailsScreen,
                                params: { characterId: item.id },
                            })
                        }
                    >
                        <View style={styles.cardWrapper}>
                            <View style={styles.cardShadow} />
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
                                        <Image source={{ uri: item.image }} style={styles.image} />
                                    </View>
                                    <TouchableOpacity
                                        style={styles.likeButton}
                                        onPress={() => removeFavorite(item.id)}
                                        activeOpacity={0.8}
                                    >
                                        <Icon
                                            name="star"
                                            size={18}
                                            style={styles.likeIcon}
                                            color="#FFD700"
                                        />
                                        <Text style={styles.likeText}>LIKE</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                );

                if (favorites.length === 0) {
                    return (
                        <View>
                            <Text>Brak ulubionych postaci.</Text>
                        </View>
                    );
                }

                return (
                    <View style={{ flex: 1, backgroundColor: '#e8f0e8' }}>
                        <View style={styles.headerContainer}>
                            <Text style={styles.headerTitle}>Favorites</Text>
                            <View>
                                <View style={styles.searchBarInner}>
                                    <Icon name="search" size={20} color="#162C1B" style={styles.searchIcon} />
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
                            data={filteredFavorites}
                            renderItem={renderItem}
                            keyExtractor={item => item.id.toString()}
                            ListEmptyComponent={
                                <View style={{ alignItems: 'center', marginTop: 40 }}>
                                    <Text>Brak wyników.</Text>
                                </View>
                            }
                        />
                    </View>
                );
            };

            export default FavoriteCharactersScreen;