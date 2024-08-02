// import React, { useState, useEffect } from 'react';
// import { Alert, PermissionsAndroid, Platform, StyleSheet } from 'react-native';
// import { Pedometer } from 'expo-sensors';
// import { ThemedText } from '@/components/ThemedText';
// import { ThemedView } from '@/components/ThemedView';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { getGameById, updateGameStepsWithTimestamp } from '@/firebaseFunctions';
// import { useLocalSearchParams } from 'expo-router';
// import { StepCountingGame } from '@/firebaseFunctions';

// export default function PedometerScreen() {
//     const params = useLocalSearchParams();
//     const gameId = params.id as string;

//     const [isPedometerAvailable, setIsPedometerAvailable] = useState(false);
//     const [currentPlayerId, setCurrentPlayerId] = useState('');
//     const [gameState, setGameState] = useState<StepCountingGame | null>(null);
//     const [isGameActive, setIsGameActive] = useState(false);
//     const [currentSteps, setCurrentSteps] = useState<number>(0);
//     const [lastSteps, setLastSteps] = useState<number>(0);
//     const [gameEnded, setGameEnded] = useState(false);
//     const [gameWinner, setWinner] = useState('');

//     useEffect(() => {
//         const initialize = async () => {
//             const playerId = await getPlayerId();
//             setCurrentPlayerId(playerId);
//             if (Platform.OS === 'android') {
//                 const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACTIVITY_RECOGNITION);
//                 setIsPedometerAvailable(granted === PermissionsAndroid.RESULTS.GRANTED);
//             } else {
//                 const available = await Pedometer.isAvailableAsync();
//                 setIsPedometerAvailable(available);
//             }
//             fetchGame(gameId);
//         };
//         initialize();
//     }, [gameId]);

//     useEffect(() => {
//         if (isGameActive) {
//             const interval = setInterval(() => {
//                 if (currentSteps !== lastSteps) {
//                     updateStepsInFirestore(currentSteps);
//                     setLastSteps(currentSteps);
//                 }
//             }, 10000); // 2 minutes

//             return () => clearInterval(interval);
//         }
//     }, [isGameActive, currentSteps]);

//     const getPlayerId = async (): Promise<string> => {
//         const user = await AsyncStorage.getItem('@user');
//         return JSON.parse(user!).id;
//     };

//     const fetchGame = async (id: string) => {
//         try {
//             const game = await getGameById(id);
//             if (game) {
//                 setGameState(game as StepCountingGame);

//                 const startTime = new Date(game.startdatetime.seconds * 1000).getTime();
//                 const currTime = new Date().getTime();
//                 const delayTime = startTime - currTime;

//                 if (delayTime > 0) {
//                     setTimeout(startGame, delayTime);
//                 } else {
//                     startGame();
//                 }
//             }
//         } catch (error) {
//             console.log('Error fetching game:', error);
//         }
//     };

//     const startGame = () => {
//         setIsGameActive(true);
//         Alert.alert('Game Started', 'Walk to reach the target steps');

//         const subscription = Pedometer.watchStepCount(result => {
//             updateSteps(result.steps);
//         });

//         const endTime = new Date(gameState!.enddatetime.seconds * 1000).getTime();
//         const remainingTime = endTime - Date.now();

//         setTimeout(() => {
//             endGame('');
//             subscription.remove();
//         }, remainingTime);
//     };

//     const updateSteps = (steps: number) => {
//         setCurrentSteps(steps);
//     };

//     const updateStepsInFirestore = async (steps: number) => {
//         const timestamp = new Date();
//         try {
//             await updateGameStepsWithTimestamp(gameId, currentPlayerId, steps, timestamp);
//         } catch (error) {
//             console.log('Error updating steps in Firestore:', error);
//         }
//     };

//     const endGame = async (winnerId: string) => {
//         setIsGameActive(false);
//         await fetchGame(gameId); // Fetch updated game data

//         if (gameState) {
//             let maxSteps = 0;
//             let winner = '';

//             for (const playerId in gameState.steps) {
//                 const playerSteps = gameState.steps[playerId].steps;
//                 if (playerSteps > maxSteps) {
//                     maxSteps = playerSteps;
//                     winner = playerId;
//                     setGameEnded(true);
//                     setWinner(winner);
//                 }
//             }

//             // Alert.alert('Game Over', winner ? `Winner: ${winner}` : 'Time is up! No winner');

//             if (winner) {

//                 setGameState(prevState => ({ ...prevState, winnerId: winner, isActive: false } as StepCountingGame));
//             }
//         }
//     };

//     // alert if game ended
//     useEffect(() => {
//         if (gameEnded) {
//             Alert.alert("Game Ended !", gameWinner ? `Winner: ${gameWinner}` : 'Time is up! No winner');
//         }
//     }, [gameEnded]);

//     useEffect(() => {
//         if (gameState && Date.now() > gameState.enddatetime.seconds * 1000) {
//             endGame('');
//         }
//     }, [currentSteps]);

//     if (!gameState) {
//         return <ThemedText>Loading game data...</ThemedText>;
//     }

//     return (
//         <ThemedView style={styles.container}>
//             <ThemedText type="title">Step Counting Game</ThemedText>
//             <ThemedText type="default">Pedometer available: {isPedometerAvailable ? 'Yes' : 'No'}</ThemedText>
//             <ThemedText type="default">Current Steps: {currentSteps}</ThemedText>
//             <ThemedText type="default">Target Steps: {gameState.stepsGoal}</ThemedText>
//             <ThemedText type="default">Time Goal: {gameState.timeGoal} minutes</ThemedText>
//             <ThemedText type="default">Players: {gameState.joinedPlayers.join(', ')}</ThemedText>
//         </ThemedView>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
// });


import React, { useState, useEffect } from 'react';
import { Alert, PermissionsAndroid, Platform, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { Pedometer } from 'expo-sensors';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getGameById, updateGameStepsWithTimestamp } from '@/firebaseFunctions';
import { Link, useLocalSearchParams } from 'expo-router';
import { StepCountingGame } from '@/firebaseFunctions';
import CircularStepProgress from '@/components/CircularStepProgress';
import CountdownTimer from '@/components/CountdownTimer';

export default function PedometerScreen() {
    const params = useLocalSearchParams();
    const gameId = params.id as string;

    console.log('gameId:', gameId);

    const [isPedometerAvailable, setIsPedometerAvailable] = useState(false);
    const [currentPlayerId, setCurrentPlayerId] = useState('');
    const [gameState, setGameState] = useState<StepCountingGame | null>(null);
    const [isGameActive, setIsGameActive] = useState(false);
    const [currentSteps, setCurrentSteps] = useState<number>(0);
    const [lastSteps, setLastSteps] = useState<number>(0);
    const [gameEnded, setGameEnded] = useState(false);
    const [gameWinner, setWinner] = useState('');

    useEffect(() => {
        const initialize = async () => {
            // const playerId = await getPlayerId();
            const playerId = "userId"; // TODO: Replace with actual user ID
            setCurrentPlayerId(playerId);
            if (Platform.OS === 'android') {
                const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACTIVITY_RECOGNITION);
                setIsPedometerAvailable(granted === PermissionsAndroid.RESULTS.GRANTED);
            } else {
                const available = await Pedometer.isAvailableAsync();
                setIsPedometerAvailable(available);
            }
            fetchGame(gameId);
        };
        initialize();
    }, [gameId]);

    useEffect(() => {
        if (isGameActive) {
            const interval = setInterval(() => {
                if (currentSteps !== lastSteps) {
                    updateStepsInFirestore(currentSteps);
                    setLastSteps(currentSteps);
                }
            }, 10000); // 10 seconds

            return () => clearInterval(interval);
        }
    }, [isGameActive, currentSteps]);

    const getPlayerId = async (): Promise<string> => {
        const user = await AsyncStorage.getItem('@user');
        return JSON.parse(user!).id;
    };

    const fetchGame = async (id: string) => {
        try {
            const game = await getGameById(id);
            if (game) {
                setGameState(game as StepCountingGame);

                const startTime = new Date(game.startdatetime.seconds * 1000).getTime();
                const currTime = new Date().getTime();
                const delayTime = startTime - currTime;

                if (delayTime > 0) {
                    setTimeout(startGame, delayTime);
                } else if (!isGameActive) {
                    startGame();
                }
            }
        } catch (error) {
            console.log('Error fetching game:', error);
        }
    };

    const startGame = () => {
        setIsGameActive(true);
        Alert.alert('Game Started', 'Walk to reach the target steps');

        const subscription = Pedometer.watchStepCount(result => {
            updateSteps(result.steps);
        });

        const endTime = new Date(gameState!.enddatetime.seconds * 1000).getTime();
        const remainingTime = endTime - Date.now();

        setTimeout(() => {
            endGame('');
            subscription.remove();
        }, remainingTime);
    };

    const updateSteps = (steps: number) => {
        setCurrentSteps(steps);
    };

    const updateStepsInFirestore = async (steps: number) => {
        const timestamp = new Date();
        try {
            await updateGameStepsWithTimestamp(gameId, currentPlayerId, steps, timestamp);
        } catch (error) {
            console.log('Error updating steps in Firestore:', error);
        }
    };

    const endGame = async (winnerId: string) => {
        setIsGameActive(false);
        await fetchGame(gameId); // Fetch updated game data

        if (gameState) {
            let maxSteps = 0;
            let winner = '';

            for (const playerId in gameState.steps) {
                const playerSteps = gameState.steps[playerId].steps;
                if (playerSteps > maxSteps) {
                    maxSteps = playerSteps;
                    winner = playerId;
                    setGameEnded(true);
                    setWinner(winner);
                }
            }

            if (winner) {
                setGameState(prevState => ({ ...prevState, winnerId: winner, isActive: false } as StepCountingGame));
            }
        }
    };

    // Alert if the game ended
    useEffect(() => {
        if (gameEnded) {
            Alert.alert("Game Ended !", gameWinner ? `Winner: ${gameWinner}` : 'Time is up! No winner');
        }
    }, [gameEnded]);

    // Check if the game has ended
    useEffect(() => {
        if (gameState && Date.now() > gameState.enddatetime.seconds * 1000) {
            endGame('');
        }
    }, [currentSteps]);

    if (!gameState) {
        return <ThemedText>Loading game data...</ThemedText>;
    }

    return (
        <ThemedView style={styles.container}>

            {/*  time left */}

            {/* current steps / goal steps */}
            <ThemedView style={{}}>

                <ThemedText type='title'>{gameState.title}</ThemedText>

                <ThemedView style={styles.stepcon}>
                    <CountdownTimer duration={gameState.timeGoal * 60} />
                    {/* <CountdownTimer duration={1000} /> */}
                </ThemedView>
                <ThemedView style={styles.stepcon}>
                    <CircularStepProgress currentSteps={currentSteps} targetSteps={gameState.stepsGoal} />
                    {/* <CircularStepProgress currentSteps={8009} targetSteps={10000} /> */}
                </ThemedView>

            </ThemedView>


            {/*  leaderboard buuuton */}

            <Link
                href={{
                    pathname: '/leaderBoard',
                    params: { id: gameId }
                }}
            >
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Leaderboard</Text>
                </View>

            </Link>


        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        // justifyContent: 'center',
        alignItems: 'center',
    },
    stepcon: {
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#06D001',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: 'bold',
    },
});
