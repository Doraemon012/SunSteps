// import React, { useEffect, useState } from 'react';
// import { ThemedText } from '@/components/ThemedText';
// import { ThemedView } from '@/components/ThemedView';
// import { getLeaderboard } from '@/firebaseFunctions';
// import { StyleSheet } from 'react-native';
// import { useLocalSearchParams } from 'expo-router';

// const Leaderboard = () => {

//     const params = useLocalSearchParams();
//     const gameId = params.id as string;
//     const [leaderboard, setLeaderboard] = useState<Array<{ playerId: string, steps: number }>>([]);

//     useEffect(() => {
//         const unsubscribe = getLeaderboard(gameId, setLeaderboard);
    
//         // Clean up the subscription on component unmount
//         return () => unsubscribe && unsubscribe();
//       }, [gameId]);
    
//     return (
//         <ThemedView style={styles.container}>
//             <ThemedText type="title">Leaderboard</ThemedText>
//             {leaderboard.map((entry, index) => (
//                 <ThemedText key={entry.playerId} type="default">
//                     {index + 1}. {entry.playerId}: {entry.steps} steps
//                 </ThemedText>
//             ))}
//         </ThemedView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         // alignItems: 'center',
//         padding: 16
//     },
// });

// export default Leaderboard;


import React, { useEffect, useState, useCallback } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { getLeaderboard } from '@/firebaseFunctions';
import { StyleSheet, Image, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Animated, { Layout, SlideInLeft, SlideOutRight } from 'react-native-reanimated';

const Leaderboard = () => {

    const params = useLocalSearchParams();
    const gameId = params.id as string;
    const [leaderboard, setLeaderboard] = useState<Array<{ playerId: string, steps: number }>>([]);

    useEffect(() => {
        const unsubscribe = getLeaderboard(gameId, setLeaderboard);

        // Clean up the subscription on component unmount
        return () => unsubscribe && unsubscribe();
    }, [gameId]);

    const renderItem = useCallback(({ item, index }: { item: { playerId: string, steps: number }, index: number }) => (
        <Animated.View
            entering={SlideInLeft}
            exiting={SlideOutRight}
            layout={Layout}
            style={styles.itemContainer}
        >
            <ThemedView style={styles.rankContainer}>
                <ThemedText type="default" style={styles.rankText}>{index + 1}</ThemedText>
            </ThemedView>
            <ThemedView style={styles.playerContainer}>
                <Image
                    source={{ uri: `https://api.adorable.io/avatars/50.png` }} // Placeholder for player avatar
                    style={styles.avatar}
                />
                <ThemedText type="default" style={styles.playerText}>{item.playerId}</ThemedText>
            </ThemedView>
            <ThemedView style={styles.stepsContainer}>
                <ThemedText type="default" style={styles.stepsText}>{item.steps} steps</ThemedText>
            </ThemedView>
        </Animated.View>
    ), []);

    return (
        <ThemedView style={styles.container}>
            <ThemedText type="title" style={styles.title}>Leaderboard</ThemedText>
            <Animated.FlatList
                data={leaderboard}
                renderItem={renderItem}
                keyExtractor={item => item.playerId}
                contentContainerStyle={styles.list}
            />
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        padding: 16,
    },
    title: {
        marginBottom: 16,
    },
    list: {
        width: '100%',
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 12,
        marginBottom: 8,
        borderRadius: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        // flex:1
    },
    rankContainer: {
        width: 30,
        alignItems: 'center',
    },
    rankText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    playerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // flex: 1,
        marginLeft: 16,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 12,
    },
    playerText: {
        fontSize: 16,
        color: '#333',
    },
    stepsContainer: {
        alignItems: 'flex-end',
    },
    stepsText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Leaderboard;
