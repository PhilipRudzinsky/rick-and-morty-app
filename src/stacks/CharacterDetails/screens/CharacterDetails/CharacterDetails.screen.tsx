import React from 'react';
import { Text, View, Image, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import { styles } from './CharacterDetails.styled';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { getCharacterById } from '../../../../api/characters.api';
import { CharacterDetailsStackParamList } from '../../CharacterDetails.routes';
import type { RouteProp } from '@react-navigation/native';
import { useFavorites } from '../../../../context/FavoritesContext';
import Icon from 'react-native-vector-icons/FontAwesome';

const CharacterDetailsScreen = () => {
    const route = useRoute<RouteProp<CharacterDetailsStackParamList, 'CharacterDetailsScreen'>>();
    const navigation = useNavigation();
    const { characterId } = route.params;
    const { data, isLoading, error } = useQuery({
        queryKey: ['character', characterId],
        queryFn: () => getCharacterById(characterId),
    });
    const { addFavorite, removeFavorite, isFavorite } = useFavorites();

    if (isLoading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (error || !data) {
        return (
            <View style={styles.loaderContainer}>
                <Text>Wystąpił błąd podczas ładowania danych postaci.</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.screenContainer}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                    activeOpacity={0.7}
                >
                    <Text style={styles.backButtonText}>{'<- Go back to Characters List'}</Text>
                </TouchableOpacity>
            </View>

            {/* Card */}
            <View style={styles.cardContainer}>
                {/* Image Frame */}
                <View style={styles.imageFrame}>
                    <Image source={{ uri: data.image }} style={styles.characterImage} />
                </View>

                {/* Card Text */}
                <View style={styles.cardText}>
                    {/* Main Feature */}
                    <View style={styles.mainFeature}>
                        <Text style={styles.label}>Name</Text>
                        <Text style={styles.name}>{data.name}</Text>
                    </View>

                    {/* Secondary Features */}
                    <View style={styles.secondaryFeatures}>
                        <View style={styles.featuresRow}>
                            <View style={styles.featureBox}>
                                <Text style={styles.label}>Status</Text>
                                <Text style={styles.featureValue}>{data.status}</Text>
                            </View>
                            <View style={styles.featureBox}>
                                <Text style={styles.label}>Species</Text>
                                <Text style={styles.featureValue}>{data.species}</Text>
                            </View>
                        </View>
                        <View style={styles.featuresRow}>
                            <View style={styles.featureBox}>
                                <Text style={styles.label}>Origin</Text>
                                <Text style={styles.featureValue}>{data.origin?.name}</Text>
                            </View>
                            <View style={styles.featureBox}>
                                <Text style={styles.label}>Gender</Text>
                                <Text style={styles.featureValue}>{data.gender}</Text>
                            </View>
                        </View>
                    </View>

                    {/* Like Button */}
                    <TouchableOpacity
                        style={styles.likeButton}
                        onPress={() =>
                            isFavorite(data.id)
                                ? removeFavorite(data.id)
                                : addFavorite({
                                    id: data.id,
                                    name: data.name,
                                    status: data.status,
                                    species: data.species,
                                    image: data.image,
                                })
                        }
                        activeOpacity={0.85}
                    >
                        <Icon
                            name={isFavorite(data.id) ? 'star' : 'star-o'}
                            size={16}
                            color="#fff"
                            style={styles.likeIcon}
                        />
                        <Text style={styles.likeButtonText}>
                            {isFavorite(data.id) ? 'Liked' : 'Add to liked'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

export default CharacterDetailsScreen;