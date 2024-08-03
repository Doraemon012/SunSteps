import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from './ThemedText';

interface AppBarProps {
    coins: number;
    onProfilePress: () => void;
}

const AppBar: React.FC<AppBarProps> = ({ coins, onProfilePress }) => {
    return (
        <View style={styles.container}>
            {/* <Ionicons name="apps" size={32} color="#fff" style={styles.icon} /> */}
            <Image source={require('../assets/char.jpeg')} style={{ width: 44, height: 46 }} />
            <View style={styles.fl}>

                <View style={styles.coinsContainer}>
                    <Image source={require('../assets/coin.png')} style={{ width: 36, height: 36 }} />
                    <ThemedText style={styles.coinsText}>{coins}</ThemedText>
                </View>
                <TouchableOpacity onPress={onProfilePress}>

                    <Ionicons name="person-circle" size={32} color="#fff" style={styles.icon} />
                </TouchableOpacity>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 8,
        paddingHorizontal: 16,
        // backgroundColor: '#F8EDED',
        backgroundColor: '#1A5319',
    },
    icon: {
        marginHorizontal: 8,
    },
    coinsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    coinsText: {
        marginLeft: 4,
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    fl: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 10
    }
});

export default AppBar;