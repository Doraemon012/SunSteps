// import { Image, StyleSheet, Platform, ScrollView, Button } from 'react-native';
// // app/(tabs)/index.tsx
// import { HelloWave } from '@/components/HelloWave';
// import ParallaxScrollView from '@/components/ParallaxScrollView';
// import { ThemedText } from '@/components/ThemedText';
// import { ThemedView } from '@/components/ThemedView';
// import { Link, Redirect } from 'expo-router';
// import { getGames, IGame } from '@/firebaseFunctions';
// import { useState, useEffect } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export default function HomeScreen() {
//   const [games, setGames] = useState<IGame[]>([]);
//   // AsyncStorage.setItem("@user", JSON.stringify({ id: "123" }));
//     const [getuser, setUser] = useState(null);

// useEffect(() => {
//   const user = AsyncStorage.getItem("@user");
//   user.then((data) => {
//     console.log(data, " user from index.tsx "); // Add this line to log the retrieved user data
//     if (data === null) {
//       <Redirect href={"./signup"} />

//     }
//   });
// })
//   // console.log(JSON.parse(), " user from index.tsx "); // Add this line to log the retrieved user data

//   // const [getuser, setUser] = useState(null);

//   // console.log(getuser, " getuser ")
//   // // redirect to signup page if user is not signed in
//   // if (getuser === null || getuser === undefined || getuser === "") {
//   //   return <Redirect href={"./signup"} />
//   // }

//   useEffect(() => {
//     const unsubscribe = getGames(setGames);
//     return () => unsubscribe();
//   }, []);

//   async function clearAsyncStorage() {
//     await AsyncStorage.clear();
//   }

//   return (

//     <ScrollView>
//       {/* <Redirect href={"./signup"} /> */}
//       <Button title="Clear Async Storage" onPress={()=>{clearAsyncStorage()}} />

//       <ThemedView style={styles.container}>
//         {games.map((game) => (
//           <Link href={
//             {
//               pathname: '/gameDetails',
//               params: { id: game.id }
//             }
//           } >
//             <ThemedView key={game.id} style={styles.gameContainer}>
//               <ThemedText style={styles.gameTitle}>{game.title}</ThemedText>
//               <ThemedText>{game.description}</ThemedText>
//             </ThemedView>
//           </Link>
//         ))}
//       </ThemedView>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // alignItems: 'center',
//     gap: 8,
//     paddingVertical: 32,
//   },
//   gameContainer: {
//     padding: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//     flex: 1,
//   },
//   gameTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });

// // TODO: home redirect
// // TODO: kitni bhi baar sign in 
// // TODO: local storage clear ka button hatana hai
// // TODO: signup page pe user info display karna hai

// // TODO: saara code is folder mai laana hai


// import React, { useState, useEffect } from 'react';
// import { Image, StyleSheet, ScrollView, Button, View } from 'react-native';
// import { HelloWave } from '@/components/HelloWave';
// import ParallaxScrollView from '@/components/ParallaxScrollView';
// import { ThemedText } from '@/components/ThemedText';
// import { ThemedView } from '@/components/ThemedView';
// import { Link, Redirect } from 'expo-router';
// import { getGames, IGame } from '@/firebaseFunctions';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { GameCard } from '@/components/GameCard';
// import { Dimensions } from 'react-native';

// const width = Dimensions.get('window').width;


// export default function HomeScreen() {
//   const [games, setGames] = useState<IGame[]>([]);
//   const [getuser, setUser] = useState(null);

//   useEffect(() => {
//     (async () => {
//       const user = await AsyncStorage.getItem("@user");
//       if (user === null) {
//         <Redirect href="./signup" />
//       } else {
//         setUser(JSON.parse(user));
//       }
//     })();
//   }, []);

//   useEffect(() => {
//     const unsubscribe = getGames(setGames);
//     return () => unsubscribe();
//   }, []);

//   const clearAsyncStorage = async () => {
//     await AsyncStorage.clear();
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.scrollContainer}>
//       {/* <Button title="Clear Async Storage" onPress={clearAsyncStorage} /> */}
//       <ThemedView style={styles.container}>
//         {games.map((game) => (
//           <GameCard key={game.id} game={game} />
//         ))}
//       </ThemedView>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   scrollContainer: {
//     paddingVertical: 20,
//     paddingHorizontal: 10,
//   },
//   container: {
//     flex: 1,
//     gap: 7,
//     // width : width,
//     // paddingVertical: 20,
//     flexDirection: 'row',
//     // alignItems: 'center',
//     justifyContent: 'center',
//     flexWrap: 'wrap',

//   },
//   gameContainer: {
//     padding: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//     marginBottom: 8,
//     borderRadius: 8,
//     // backgroundColor: '#fff',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.3,
//     shadowRadius: 1,
//     flex: 1,
//     elevation: 3,
//   },
//   gameTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
// });


// import React, { useState, useEffect } from 'react';
// import { Image, StyleSheet, FlatList, View, Dimensions, Text, SafeAreaView } from 'react-native';
// import { HelloWave } from '@/components/HelloWave';
// import ParallaxScrollView from '@/components/ParallaxScrollView';
// import { ThemedText } from '@/components/ThemedText';
// import { ThemedView } from '@/components/ThemedView';
// import { Link, Redirect } from 'expo-router';
// import { getGames, IGame } from '@/firebaseFunctions';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { GameCard } from '@/components/GameCard';
// // import { ScrollView } from 'react-native-gesture-handler';
// import { ScrollView } from 'react-native';

// const { width } = Dimensions.get('window');

// const numColumns = 2; // Number of columns in the grid

// export default function HomeScreen() {
//   const [games, setGames] = useState<IGame[]>([]);
//   const [getuser, setUser] = useState(null);

//   useEffect(() => {
//     (async () => {
//       const user = await AsyncStorage.getItem("@user");
//       if (user === null) {
//         <Redirect href="./signup" />
//       } else {
//         setUser(JSON.parse(user));
//       }
//     })();
//   }, []);

//   useEffect(() => {
//     const unsubscribe = getGames(setGames);
//     return () => unsubscribe();
//   }, []);

//   const clearAsyncStorage = async () => {
//     await AsyncStorage.clear();
//   };

//   // Render each item in the grid
//   const renderItem = ({ item }: { item: IGame }) => (
//     <View style={styles.cardContainer}>
//       <GameCard game={item} />
//       {/* <Text>hi</Text> */}
//     </View>
//   );

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//    <ScrollView style={{flex:1, padding: 8}}>
//       {/* <Button title="Clear Async Storage" onPress={clearAsyncStorage} /> */}
//       {/* <ThemedView style={{flex:1, flexDirection:'row', flexWrap: 'wrap', width:width-16, alignItems:'center', justifyContent:'space-between'}}>

// {games.map((game) => (
//   <GameCard key={game.id} game={game} />
// ))}

//       </ThemedView> */}

//       {/*  greeting conatiner */}

//       <ThemedView style={{flexDirection:'row', alignItems:'center'}}>
//       <ThemedView style={{flexDirection:'column'}}>

//       <ThemedText type='title'>Hi,</ThemedText>
//       <ThemedText type='title'>{}username.</ThemedText>
//       </ThemedView>
//       {/* style={{ width: width - 16, height: 200, borderRadius: 8 }} */}
//         <Image source={require('../../assets/char.jpeg')}  />
//       </ThemedView>

//       <ThemedText type='title'>Explore Games</ThemedText>

//       <ThemedView style={{ flex: 1, flexDirection:'row', columnGap: 14 }}>

//       {/*  first half */}
//     {/* { half of the games in one column} */}
//     <ThemedView style={{ flex: 1, flexDirection:'column', rowGap: 12}}>
//     {games.slice(0, Math.ceil(games.length / 2)).map((game) => (
//       <GameCard key={game.id} game={game} />
//     ))}
//     </ThemedView>


//       {/* second half */}
//       <ThemedView style={{ flex: 1, flexDirection:'column',  rowGap: 12 }}>

//       {/* { half of the games in one column} */}
//     {games.slice(Math.ceil(games.length / 2)).map((game) => (
//       <GameCard key={game.id} game={game} />
//     ))}
//     </ThemedView>


//       </ThemedView>
//     </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     paddingVertical: 20,
//     paddingHorizontal: 10,
//     flexDirection: 'column',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',

//   },
//   row: {
//     justifyContent: 'space-between',
//   },
//   cardContainer: {
//     flex: 1,
//     margin: 2,
//     borderRadius: 8,
//     overflow: 'hidden',
//     // backgroundColor: '#fff',
//     // shadowColor: '#000',
//     // shadowOffset: { width: 0, height: 1 },
//     // shadowOpacity: 0.3,
//     // shadowRadius: 3,
//     // elevation: 3,
//   },
// });


import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, View, Dimensions, SafeAreaView } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Redirect } from 'expo-router';
import { getGames, IGame } from '@/firebaseFunctions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GameCard } from '@/components/GameCard';
import { ScrollView } from 'react-native';
import AppBar from '@/components/AppBar';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [games, setGames] = useState<IGame[]>([]);
  const [getuser, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      const user = await AsyncStorage.getItem("@user");
      console.log(JSON.parse(user as string), " user from index.tsx "); // Add this line to log the retrieved user data
      if (user === null) {
        <Redirect href="./signup" />
      } else {
        setUser(JSON.parse(user));
      }
    })();
  }, []);

  useEffect(() => {
    const unsubscribe = getGames(setGames);
    return () => unsubscribe();
  }, []);

  const clearAsyncStorage = async () => {
    await AsyncStorage.clear();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>

<AppBar coins={getuser?.coins || 0} onProfilePress={() => { }} />


      <ScrollView style={{ flex: 1, padding: 8, rowGap: 32 }}>
        {/* <ThemedText type='title'>{}</ThemedText> */}
        <ThemedView style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 32 }}>
          <ThemedView style={{ flexDirection: 'column' }}>
            <ThemedText type='title'>Hi,{getuser?.username || 'User'}.</ThemedText>
          </ThemedView>
          {/* <Image source={require('../../assets/char.jpeg')} style={styles.profileImage} /> */}
        </ThemedView>
        <ThemedView>

          <ThemedText type='title'>Explore Games</ThemedText>

          <ThemedView style={{ flex: 1, flexDirection: 'row', columnGap: 14, marginVertical: 16 }}>
            <ThemedView style={{ flex: 1, flexDirection: 'column', rowGap: 12 }}>
              {games.slice(0, Math.ceil(games.length / 2)).map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </ThemedView>
            <ThemedView style={{ flex: 1, flexDirection: 'column', rowGap: 12 }}>
              {games.slice(Math.ceil(games.length / 2)).map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </ThemedView>
          </ThemedView>

        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginLeft: 16,
  },
});
