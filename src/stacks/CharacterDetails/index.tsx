import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {CharacterDetailsStackRoutes} from './CharacterDetails.routes';
import {CharacterDetailsScreen} from './screens';

const Stack = createNativeStackNavigator();

export const CharacterDetailsStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={CharacterDetailsStackRoutes.CharacterDetailsScreen}
                component={CharacterDetailsScreen}
                options={{headerShown: false }}
            />
        </Stack.Navigator>
    );
};