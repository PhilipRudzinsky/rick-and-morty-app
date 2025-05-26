import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CharacterDetailsStack} from '../CharacterDetails';
import {TabNavigationStack} from '../TabNavigation';
import {MainStackRoutes} from './Main.routes';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import { FavoritesProvider } from '../../context/FavoritesContext';

const Tab = createNativeStackNavigator();
const queryClient = new QueryClient();

export const MainStack = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <FavoritesProvider>
            <Tab.Navigator>
                <Tab.Screen
                    name={MainStackRoutes.TabNavigationStack}
                    component={TabNavigationStack}
                    options={{headerShown: false}}
                />
                <Tab.Screen
                    name={MainStackRoutes.CharacterDetailsStack}
                    component={CharacterDetailsStack}
                    options={{headerShown: false}}
                />
            </Tab.Navigator>
            </FavoritesProvider>
        </QueryClientProvider>
    );
};