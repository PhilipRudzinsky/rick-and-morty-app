import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CharacterListScreen } from './screens/CharacterList';
import { FavoriteCharactersScreen } from './screens/FavoriteCharacters';
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles } from './TabNavigtation.styled';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

export const TabNavigationStack = () => {
    const insets = useSafeAreaInsets();

    return (
        <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarStyle: [
                    styles.tabBarContainer,
                    { paddingBottom: insets.bottom }
                ],
                tabBarItemStyle: { height: 70 },
                tabBarLabelStyle: styles.tabLabel,
                tabBarActiveBackgroundColor: '#224229',
                tabBarInactiveBackgroundColor: '#162C1B',
                tabBarActiveTintColor: '#FFFFFF',
                tabBarInactiveTintColor: '#DAE4DC',
                tabBarIcon: ({ focused, color }) => {
                    let iconName = 'users';
                    if (route.name === 'Favorites') iconName = 'star';
                    return (
                        <Icon
                            name={iconName}
                            size={16}
                            style={styles.tabIcon}
                            color={color}
                        />
                    );
                },
                headerShown: false,
            })}
        >
            <Tab.Screen
                name="Characters"
                component={CharacterListScreen}
                options={{ tabBarLabel: 'All characters', headerShown: false }}
            />
            <Tab.Screen
                name="Favorites"
                component={FavoriteCharactersScreen}
                options={{ tabBarLabel: 'Favorites', headerShown: false }}
            />
        </Tab.Navigator>
        </SafeAreaView>
    );
};