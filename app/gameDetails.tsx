// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, Alert, Button, Platform } from 'react-native';
// import { getGameById, joinGame } from '../firebaseFunctions';
// import { IGame, StepCountingGame } from '../firebaseFunctions';
// import { Link, useLocalSearchParams } from 'expo-router';
// import { ThemedView } from '@/components/ThemedView';
// import { ThemedText } from '@/components/ThemedText';

// interface GameDetailsProps {
//   gameId: string;
// }

// const GameDetails: React.FC<GameDetailsProps> = () => {
//   const gameId = useLocalSearchParams().id;

//   // TODO: Replace with actual user ID from the auth logic
//   // const userId = 'currentUserId'; // Replace with actual user ID from your authentication logic
//   const userId = Platform.OS;

//   if (!gameId) {
//     return <Text>No game ID provided</Text>;
//   }

//   const [game, setGame] = useState<IGame | null>(null);
//   const [countdown, setCountdown] = useState<string>('');
//   const [gameStarted, setGameStarted] = useState<boolean>(false);

//   useEffect(() => {
//     const fetchGame = async () => {
//       const gameData = await getGameById(gameId as string);
//       setGame(gameData);
//     };

//     fetchGame();
//   }, [gameId]);

//   useEffect(() => {
//     if (game && game.startdatetime) {
//       const updateCountdown = () => {
//         const now = new Date().getTime();
//         const startTime = new Date(game.startdatetime.seconds * 1000).getTime();
//         const distance = startTime - now;

//         if (distance < 0) {
//           if (!gameStarted) {
//             setGameStarted(true);
//             Alert.alert('Game Started');
//           }
//           setCountdown('Game Started');
//         } else {
//           const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//           const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//           const seconds = Math.floor((distance % (1000 * 60)) / 1000);
//           setCountdown(`${hours}h ${minutes}m ${seconds}s`);
//         }
//       };

//       // Update countdown every second
//       const intervalId = setInterval(updateCountdown, 1000);

//       // Initial update
//       updateCountdown();

//       // Clean up interval on component unmount
//       return () => clearInterval(intervalId);
//     }
//   }, [game, gameStarted]);

//   // const handleJoinGame = async () => {
//   //   if (game) {
//   //     const now = new Date().getTime();
//   //     const startTime = new Date(game.startdatetime.seconds * 1000).getTime();

//   //     if (now >= startTime) {
//   //       Alert.alert('Cannot join the game as it has already started');
//   //       return;
//   //     }

//   //     const success = await joinGame(gameId as string, userId);
//   //     if (success) {
//   //       Alert.alert('Successfully joined the game');
//   //     } else {
//   //       Alert.alert('Failed to join the game');
//   //     }
//   //   }
//   // };

//   const handleJoinGame = async () => {
//     if (game) {
//       const now = new Date().getTime();
//       const startTime = new Date(game.startdatetime.seconds * 1000).getTime();

//       if (now >= startTime) {
//         Alert.alert('Cannot join the game as it has already started');
//         return;
//       }

//       // Check if the user has already joined the game
//       if (game.joinedPlayers.includes(userId)) {
//         Alert.alert('You have already joined this game');
//         return;
//       }

//       const success = await joinGame(gameId as string, userId);
//       if (success) {
//         Alert.alert('Successfully joined the game');
//       } else {
//         Alert.alert('Failed to join the game');
//       }
//     }
//   };

//   if (!game) {
//     return <Text>{gameId} Loading...</Text>;
//   }

//   return (
//     <ThemedView style={styles.container}>
//       <ThemedText type="title">{game.title}</ThemedText>
//       <ThemedText type="subtitle">{game.description}</ThemedText>
//       <ThemedText type="default">Created At: {new Date(game.createdAt.seconds * 1000).toString()}</ThemedText>
//       <ThemedText>Start Date: {new Date(game.startdatetime.seconds * 1000).toString()}</ThemedText>
//       <ThemedText>End Date: {new Date(game.enddatetime.seconds * 1000).toString()}</ThemedText>
//       <ThemedText>Creator: {game.creator}</ThemedText>
//       <ThemedText>Type: {game.type}</ThemedText>
//       {game.type === 'stepCounting' && (
//         <>
//           <ThemedText>Steps Goal: {(game as StepCountingGame).stepsGoal}</ThemedText>
//           <ThemedText>Time Goal: {(game as StepCountingGame).timeGoal}</ThemedText>
//         </>
//       )}
//       <ThemedText>Countdown to Start: {countdown}</ThemedText>
//       <Button title="Join Game" onPress={handleJoinGame} />

//       <Link href={
//       {
//         pathname: './pedometer',
//         params: { id: game.id }
//       }
//     } >
//       <ThemedText style={{color:'blue', borderRadius:19}}>Go to Game</ThemedText>
//         </Link>

//         <Link href={
//       {
//         pathname: './leaderBoard',
//         params: { id: game.id }
//       }
//     } >
//       <ThemedText style={{color:'blue', borderRadius:19}}>Leaderboard</ThemedText>
//         </Link>
//     </ThemedView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     gap: 8,
//   },
// });

// export default GameDetails;




// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, Alert, Button, Platform, TouchableOpacity, Image, SafeAreaView } from 'react-native';
// import { getGameById, joinGame } from '../firebaseFunctions';
// import { IGame, StepCountingGame } from '../firebaseFunctions';
// import { Link, useLocalSearchParams } from 'expo-router';
// import { ThemedView } from '@/components/ThemedView';
// import { ThemedText } from '@/components/ThemedText';
// import ParallaxScrollView from '@/components/ParallaxScrollView';
// import { Ionicons } from '@expo/vector-icons';
// // import p from '';
// import pImage from '../assets/p.jpeg'; // Ensure the path is correct


// const GameDetails: React.FC = () => {
//   const gameId = useLocalSearchParams().id;
//   const userId = Platform.OS;

//   if (!gameId) {
//     return <Text>No game ID provided</Text>;
//   }

//   const [game, setGame] = useState<IGame | null>(null);
//   const [countdown, setCountdown] = useState<string>('');
//   const [gameStarted, setGameStarted] = useState<boolean>(false);

//   useEffect(() => {
//     const fetchGame = async () => {
//       const gameData = await getGameById(gameId as string);
//       setGame(gameData);
//     };

//     fetchGame();
//   }, [gameId]);

//   useEffect(() => {
//     if (game && game.startdatetime) {
//       const updateCountdown = () => {
//         const now = new Date().getTime();
//         const startTime = new Date(game.startdatetime.seconds * 1000).getTime();
//         const distance = startTime - now;

//         if (distance < 0) {
//           if (!gameStarted) {
//             setGameStarted(true);
//             Alert.alert('Game Started');
//           }
//           setCountdown('Game Started');
//         } else {
//           const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//           const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//           const seconds = Math.floor((distance % (1000 * 60)) / 1000);
//           setCountdown(`${hours}h ${minutes}m ${seconds}s`);
//         }
//       };

//       const intervalId = setInterval(updateCountdown, 1000);
//       updateCountdown();

//       return () => clearInterval(intervalId);
//     }
//   }, [game, gameStarted]);

//   const handleJoinGame = async () => {
//     if (game) {
//       const now = new Date().getTime();
//       const startTime = new Date(game.startdatetime.seconds * 1000).getTime();

//       if (now >= startTime) {
//         Alert.alert('Cannot join the game as it has already started');
//         return;
//       }

//       if (game.joinedPlayers.includes(userId)) {
//         Alert.alert('You have already joined this game');
//         return;
//       }

//       const success = await joinGame(gameId as string, userId);
//       if (success) {
//         Alert.alert('Successfully joined the game');
//       } else {
//         Alert.alert('Failed to join the game');
//       }
//     }
//   };

//   if (!game) {
//     return <Text>Loading...</Text>;
//   }
//   // source={{ uri: require('../assets/p.jpeg') }} 
//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       {/* <ThemedView style={{flex:1}}> */}
//       <ParallaxScrollView

//         headerImage={<Image source={pImage} style={{ width: '100%', height: 250 }} />}
//         headerBackgroundColor={{ dark: '#333', light: '#f4f4f4' }}

//       // title={game.title}
//       // subtitle={game.description}
//       // image="https://source.unsplash.com/random/800x600"
//       >

//         {/* Date of starting */}
//         <ThemedView style={styles.dateChip}>
//           <ThemedText style={styles.dateText}>{new Date(game.startdatetime.seconds * 1000).toDateString()}</ThemedText>
//         </ThemedView>

//         <ThemedView style={styles.container}>
//           <ThemedText type="title" style={styles.title}>{game.title}</ThemedText>
//           <ThemedText type="subtitle" style={styles.subtitle}>{game.description}</ThemedText>
//         </ThemedView>


//         {/* countdown */}
//         <ThemedView style={styles.dateChip}>
//           <ThemedText style={styles.countdown}>Countdown to Start: {countdown}</ThemedText>
//         </ThemedView>


//         {/* tags */}

//         {/* winning amount card halfwidth, min wager amount card another half, in flex */}
//         <ThemedView style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 16 }}>
//           <ThemedView style={{ backgroundColor: '#007bff', padding: 8, borderRadius: 16, flex: 1 }}>
//             {/* <ThemedText style={{ color: '#ffffff' }}>Min Wager: {game.minWager}</ThemedText> */}
//             {/*  icon on top , text below */}
//             <View style={{ flexDirection: 'column', alignItems: 'center' }}>
//               <Ionicons name="wallet" size={24} color="#fff" />
//               <ThemedText >{game.minWager}</ThemedText>
//             </View>
//           </ThemedView>
//           <ThemedView style={{ backgroundColor: '#007bff', padding: 8, borderRadius: 16, flex: 1 }}>
//             {/* <ThemedText style={{ color: '#ffffff' }}>Winning Amount: {game.winningAmount}</ThemedText> */}
//             <View style={{ flexDirection: 'column', alignItems: 'center' }}>
//               <Ionicons name="trophy" size={24} color="#fff" />
//               <ThemedText >{game.winningAmount}</ThemedText>
//             </View>
//           </ThemedView>
//         </ThemedView>


//         {/*  join game button */}
//         <TouchableOpacity style={styles.button} onPress={handleJoinGame}>
//           <ThemedText style={styles.buttonText}>Join Game</ThemedText>
//         </TouchableOpacity>








//       </ParallaxScrollView>
//       {/* </ThemedView> */}
//     </SafeAreaView>

//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // padding: 20,
//     // gap: 0,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   subtitle: {
//     fontSize: 18,
//     color: '#666',
//     marginBottom: 16,
//   },
//   text: {
//     fontSize: 16,
//     marginBottom: 8,
//   },
//   countdown: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#ff0000',
//     marginBottom: 16,
//   },
//   button: {
//     backgroundColor: '#06D001',
//     padding: 10,
//     borderRadius: 16,
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   buttonText: {
//     color: '#ffffff',
//     fontWeight: 'bold',
//   },
//   link: {
//     color: '#007bff',
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   dateChip: {
//     // position:'absolute',
//     // top: 100,
//     // zIndex: 1,
//     // left: 32,


//     backgroundColor: '#007bff',
//     paddingHorizontal: 12,
//     paddingVertical: 2,
//     borderRadius: 16,
//     alignSelf: 'flex-start',
//   },
//   dateText: {
//     color: '#ffffff',
//   },
// });

// export default GameDetails;


// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, Alert, TouchableOpacity, Image, SafeAreaView, Platform } from 'react-native';
// import { getGameById, joinGame } from '../firebaseFunctions';
// import { IGame } from '../firebaseFunctions';
// import { useLocalSearchParams } from 'expo-router';
// import ParallaxScrollView from '@/components/ParallaxScrollView';
// import { Ionicons } from '@expo/vector-icons';
// import { ThemedText } from '@/components/ThemedText';
// import { ThemedView } from '@/components/ThemedView';
// import { Dimensions } from 'react-native';
// import { Link } from 'expo-router';

// const innerHeight = Dimensions.get('window').height;

// const GameDetails: React.FC = () => {
//   const gameId = useLocalSearchParams().id;
//   const userId = Platform.OS;

//   const [game, setGame] = useState<IGame | null>(null);
//   const [countdown, setCountdown] = useState<string>('');
//   const [gameStarted, setGameStarted] = useState<boolean>(false);

//   useEffect(() => {
//     const fetchGame = async () => {
//       const gameData = await getGameById(gameId as string);
//       setGame(gameData);
//     };

//     fetchGame();
//   }, [gameId]);

//   // useEffect(() => {
//   //   if (game && game.startdatetime) {
//   //     const updateCountdown = () => {
//   //       const now = new Date().getTime();
//   //       const startTime = new Date(game.startdatetime.seconds * 1000).getTime();
//   //       const distance = startTime - now;

//   //       if (distance < 0) {
//   //         if (!gameStarted) {
//   //           setGameStarted(true);
//   //           Alert.alert('Game Started');
//   //         }
//   //         setCountdown('Game Started');
//   //       } else {
//   //         const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//   //         const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//   //         const seconds = Math.floor((distance % (1000 * 60)) / 1000);
//   //         setCountdown(`${hours}h ${minutes}m ${seconds}s`);
//   //       }
//   //     };

//   //     const intervalId = setInterval(updateCountdown, 1000);
//   //     updateCountdown();

//   //     return () => clearInterval(intervalId);
//   //   }
//   // }, [game, gameStarted]);

//   useEffect(() => {
//     if (game && game.startdatetime) {
//       const updateCountdown = () => {
//         const now = new Date().getTime();
//         const startTime = new Date(game.startdatetime.seconds * 1000).getTime();
//         const distance = startTime - now;
  
//         if (distance < 0) {
//           if (!gameStarted) {
//             setGameStarted(true);
//             Alert.alert('Game Started');
//             clearInterval(intervalId); // Clear the interval once the game has started
//           }
//           setCountdown('Game Started');
//         } else {
//           const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//           const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//           const seconds = Math.floor((distance % (1000 * 60)) / 1000);
//           setCountdown(`${hours}h ${minutes}m ${seconds}s`);
//         }
//       };
  
//       const intervalId = setInterval(updateCountdown, 1000);
//       updateCountdown();
  
//       return () => clearInterval(intervalId);
//     }
//   }, [game, gameStarted]);

//   const handleJoinGame = async () => {
//     if (game) {
//       const now = new Date().getTime();
//       const startTime = new Date(game.startdatetime.seconds * 1000).getTime();

//       if (now >= startTime) {
//         Alert.alert('Cannot join the game as it has already started');
//         return;
//       }

//       if (game.joinedPlayers.includes(userId)) {
//         Alert.alert('You have already joined this game');
//         return;
//       }

//       const success = await joinGame(gameId as string, userId);
//       if (success) {
//         Alert.alert('Successfully joined the game');
//       } else {
//         Alert.alert('Failed to join the game');
//       }
//     }
//   };

//   if (!game) {
//     return <Text>Loading...</Text>;
//   }

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: '' }}>
//       <View style={{ flex: 1, backgroundColor: '#2C7865', borderBottomRightRadius: 175, justifyContent: 'center', padding: 16 }}>
//         {/* <Image source={require('../assets/o.jpeg')} style={{ width: '100%', height: '100%' }} /> */}
//         <ThemedText type="title" style={styles.title}>{game.title}</ThemedText>
//         <ThemedText type="subtitle" style={styles.subtitle}>{game.description}</ThemedText>
//       </View>

//       {/* time with clock icon */}
//       <View style={{ padding: 16, gap: 32 }}>

//         {/*  TODO: countdown */}



//         <ThemedView style={styles.dateChip}>
//           <Ionicons name="alarm" size={24} color="#fff" />
//           <ThemedText style={styles.dateText}>{new Date(game.startdatetime.seconds * 1000).toDateString()}</ThemedText>
//         </ThemedView>

//         {/* Goal */}
//         <View style={styles.goal}>
//           <Ionicons name="fitness" size={48} color="#fff" />

//           <ThemedText type='defaultSemiBold' style={{ fontSize: 20 }}>Run 1000 {game.stepsgoal} steps in 20 {game.timegoal} mins</ThemedText>

//         </View>

//         {/* wagers and winning amt */}
//         <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 16 }}>

//           <View style={{ backgroundColor: '#06D001', padding: 8, borderRadius: 16, flex: 1, alignItems: 'center', gap:4 }}>
//             <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
//               <Text style={{ fontWeight: 'bold', color: "#fff" }}>Minimum Wager</Text>
//             </View>
//             <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
//             <Ionicons name="wallet" size={24} color="#fff" />

//             <Text style={{ fontWeight: 'bold', color: "#fff", fontSize: 20 }}>{game.minWager} 100</Text>
//             </View>
//           </View>


//           <View style={{ backgroundColor: '#F4CE14', padding: 8, borderRadius: 16, flex: 1, alignItems: 'center', gap:4 }}>
//             <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
//               <Text style={{ fontWeight: 'bold', color: "#fff" }}>Minimum Wager</Text>
//             </View>
//             <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
//             <Ionicons name="wallet" size={24} color="#fff" />

//             <Text style={{ fontWeight: 'bold', color: "#fff", fontSize: 20 }}>{game.winningAmount} 100</Text>
//             </View>
//           </View>

//         </View>


//         {/*  if game started, go to game screen button */}
//         <Link 
//         href={{
//           pathname: '/pedometer',
//           params: { id: game.id }
//         }}
//         >
//         {/* <TouchableOpacity style={styles.button} onPress={() => { }}> */}
//         <View style={styles.button}>
//           <Text style={styles.buttonText}>Go to Game</Text>
//           </View>
//         {/* </TouchableOpacity> */}

//         </Link>


//         {/*  join button */}
//         <TouchableOpacity style={styles.button} onPress={handleJoinGame}>
//           <Text  style={styles.buttonText}>Join Game</Text>
//         </TouchableOpacity>

//       </View>

//     </SafeAreaView>

//   );
// };

// const styles = StyleSheet.create({
//   goal: {
//     padding: 8,
//     borderRadius: 32,
//     backgroundColor: '#279EFF',
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 16,
//     justifyContent: 'center'


//   },
//   container: {
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   title: {
//     // fontSize: 42,
//     fontWeight: '900',
//     color: '#fff',
//     marginBottom: 8,
//   },
//   subtitle: {
//     fontSize: 18,
//     color: '#ccc',
//     marginBottom: 16,
//   },
//   countdown: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#ff0000',
//   },
//   button: {
//     // position: 'absolute',
//     // bottom: -(innerHeight- 10),
//     // left: 16,
//     // right: 16,
//     backgroundColor: '#06D001',
//     padding: 15,
//     borderRadius: 10,
//     alignItems: 'center',
//     // margin: 20,
//   },
//   buttonText: {
//     color: '#ffffff',
//     fontWeight: 'bold',
//     // fontSize: 16,
//   },
//   dateChip: {
//     // backgroundColor: '#007bff',
//     // paddingHorizontal: 12,
//     // paddingVertical: 4,
//     // borderRadius: 16,
//     // alignSelf: 'flex-start',
//     // margin: 20,
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 32,
//     flexDirection: 'row',
//     columnGap: 8,
//     width: 190,
//   },
//   dateText: {
//     color: '#ffffff',
//   },
//   statsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: 20,
//     marginBottom: 16,
//   },
//   statsCard: {
//     backgroundColor: '#333',
//     padding: 20,
//     borderRadius: 10,
//     alignItems: 'center',
//     flex: 1,
//     marginHorizontal: 8,
//   },
//   statsText: {
//     color: '#fff',
//     marginTop: 10,
//     fontSize: 16,
//   },
// });

// export default GameDetails;

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { getGameById, joinGame } from '../firebaseFunctions';
import { IGame } from '../firebaseFunctions';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Dimensions } from 'react-native';
import { Link } from 'expo-router';
import { SquareContainer } from '@/components/SquareCoantainer';

const innerHeight = Dimensions.get('window').height;

const GameDetails: React.FC = () => {
  const gameId = useLocalSearchParams().id;
  const userId = Platform.OS;

  const [game, setGame] = useState<IGame | null>(null);
  const [countdown, setCountdown] = useState<string>('');
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  useEffect(() => {
    const fetchGame = async () => {
      const gameData = await getGameById(gameId as string);
      setGame(gameData);
    };

    fetchGame();
  }, [gameId]);

  useEffect(() => {
    if (game && game.startdatetime) {
      const updateCountdown = () => {
        const now = new Date().getTime();
        const startTime = new Date(game.startdatetime.seconds * 1000).getTime();
        const distance = startTime - now;

        if (distance < 0) {
          if (!gameStarted) {
            setGameStarted(true);
            Alert.alert('Game Started');
          }
          setCountdown('Game Started');
        } else {
          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);
          setCountdown(`${hours}h ${minutes}m ${seconds}s`);
        }
      };

      const intervalId = setInterval(updateCountdown, 1000);
      updateCountdown();

      return () => clearInterval(intervalId);
    }
  }, [game, gameStarted]);

  const handleJoinGame = async () => {
    if (game) {
      const now = new Date().getTime();
      const startTime = new Date(game.startdatetime.seconds * 1000).getTime();

      if (now >= startTime) {
        Alert.alert('Cannot join the game as it has already started');
        return;
      }

      if (game.joinedPlayers.includes(userId)) {
        Alert.alert('You have already joined this game');
        return;
      }

      const success = await joinGame(gameId as string, userId);
      if (success) {
        Alert.alert('Successfully joined the game');
      } else {
        Alert.alert('Failed to join the game');
      }
    }
  };

  if (!game) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.title}>{game.title}</ThemedText>
        <ThemedText type="subtitle" style={styles.subtitle}>{game.description}</ThemedText>
      </ThemedView>

      <ThemedView style={styles.content}>
        <ThemedView style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
        <ThemedView style={styles.dateChip}>
          <Ionicons name="alarm" size={24} color="#fff" />
          <ThemedText style={styles.dateText}>{new Date(game.startdatetime.seconds * 1000).toDateString()}</ThemedText>
        </ThemedView>
        <Link href={{ pathname: '/pedometer', params: { id: game.id } }}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Go to Game</Text>
          </View>
        </Link>
        </ThemedView>
        <ThemedView style={{ flexDirection: 'row', flexWrap:'wrap', gap : 16}}>

        <SquareContainer subtitle="Steps Goal" icon="fitness" color="#279EFF" title={game.stepsGoal} />
        <SquareContainer subtitle="Time Goal" icon="time" color="#279EFF" title={game.timeGoal} />
        <SquareContainer subtitle="Minimum Wager" icon="wallet" color="#F2613F" title={game.minWager} />
        <SquareContainer subtitle="Winning Amount" icon="wallet" color="#FF8F00" title={game.winningAmount} />
        </ThemedView>



       

        {/* style={{color:'#fff'}} */}
        <TouchableOpacity style={styles.button} onPress={handleJoinGame}>
          <Text style={styles.buttonText}>Join Game</Text>
        </TouchableOpacity>
      </ThemedView>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flex: 1,
    backgroundColor: '#2C7865',
    borderBottomRightRadius: 175,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontWeight: '900',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#ccc',
    marginBottom: 16,
  },
  content: {
    padding: 16,
    gap: 32,
  },
  dateChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 32,
    flexDirection: 'row',
    alignItems: 'center',
    width: 190,
    backgroundColor: '#007bff',
  },
  dateText: {
    color: '#ffffff',
  },
  goal: {
    padding: 8,
    borderRadius: 32,
    backgroundColor: '#279EFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  goalText: {
    fontSize: 20,
  },
  wagerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  wagerCard: {
    backgroundColor: '#BED754',
    padding: 8,
    borderRadius: 16,
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  winningAmountCard: {
    backgroundColor: '#F4CE14',
  },
  wagerText: {
    fontWeight: 'bold',
    color: '#fff',
  },
  wagerAmount: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  amountText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 20,
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

export default GameDetails;
