import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    tabBarContainer: {
        flexDirection: 'row',
        height: 70,
        backgroundColor: '#162C1B',
        borderTopWidth: 0,
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        elevation: 8,
        zIndex: 10,
    },
    tabButton: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        gap: 4,
        height: 70,
    },
    tabButtonActive: {
        backgroundColor: '#224229',
    },
    tabButtonInactive: {
        backgroundColor: '#162C1B',
        borderBottomWidth: 1,
        borderBottomColor: '#224229',
    },
    tabIcon: {
        width: 16,
        height: 16,
        marginBottom: 4,
    },
    tabLabel: {
        fontFamily: 'DM Mono',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 14,
        lineHeight: 18,
        textTransform: 'uppercase',
        width: 118,
        height: 18,
        textAlign: 'center',
    },
    tabLabelActive: {
        color: '#FFFFFF',
    },
    tabLabelInactive: {
        color: '#DAE4DC',
    },
});