// components/GameCard.tsx
import React from 'react';
import { StyleSheet, Image, TouchableOpacity, View, Text, Button } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { IGame } from '@/firebaseFunctions'; // Assuming the path to types.ts is correct
import { Ionicons } from '@expo/vector-icons';
import { getRandomColorScheme } from '@/utils/colorSchemes';
import { Dimensions } from 'react-native';
import { Link } from 'expo-router';
// import { useNavigation } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
// import { useRoute } from 'expo-router';


const width = Dimensions.get('window').width;

interface GameCardProps {
  game: IGame
}

export const GameCard: React.FC<GameCardProps> = ({ game }: { game: IGame }) => {
  const backgroundColor = useThemeColor({}, 'background');
  const colorScheme = getRandomColorScheme(); // Get a random color scheme
  // const cardWidth = game.title.length <= 16 ? (width / 2) - 16 : width - 16;
  // const cardWidth = (width / 2) - 14;
  const cardWidth = (width / 2) - 14;

  function hasGameStarted(game: IGame): boolean {
    const now = new Date();
    return now > game.startdatetime; // FIXME:
  }


  const styles = StyleSheet.create({
    creator: {
      fontSize: 14,
      color: colorScheme.creatorColor,
      // width fits the text
    },
    dot: {
      width: 10,
      height: 10,
      backgroundColor: '#16FF00',
      borderRadius: 100
    },
    peopletext: {
      fontSize: 14,
      color: colorScheme.peopleColor,
    },
    subtitle: {
      fontSize: 16,
      color: colorScheme.subtitleColor,
    },
    title: {
      fontSize: 22,
      lineHeight: 24,
      fontWeight: '600',
      color: colorScheme.titleColor,
    },
    chip: {
      backgroundColor: colorScheme.chipColor,
      // flex:0,
      flexShrink: 1,
      padding: 4,
      borderRadius: 32,
      height: 24,
      borderWidth: .5,
      borderColor: colorScheme.chipColor,
      alignContent: 'flex-start',
      textAlign: 'left',
      alignItems: 'flex-start'
    },
    card: {
      // margin: 10,
      backgroundColor: colorScheme.backgroundColor,

      padding: 8,
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      borderRadius: 16,
      // width: width/2 - 20,
      width: width - 20,

    },
    image: {
      flex: 0.5,
    },
    info: {
      flex: 1,
      padding: 10,
    },
    description: {
      fontSize: 14,
      flexShrink: 1,
    },
    button: {
      marginTop: 10,
      backgroundColor: '#007bff',
      padding: 10,
      borderRadius: 5,
    },
    buttonText: {
      textAlign: 'center',
      color: '#ffffff',
      fontWeight: 'bold',
    },
  });

  return (
    <Link href={
      {
        pathname: '/gameDetails',
        params: { id: game.id }
      }
    } >
      <ThemedView style={[styles.card, { width: cardWidth }]} >

        <View style={{ padding: 2, flexDirection: 'row', justifyContent: 'space-between' }}>

          <View style={{ padding: 2, flexDirection: 'row', gap: 4 }}>

            <View style={{ backgroundColor: colorScheme.chipColor, borderRadius: 100, padding: 2, flexDirection: 'row', alignItems: 'center', gap: 2, width: 42 }}>

              <View style={{ backgroundColor: colorScheme.chipColor, borderRadius: 100, padding: 2, width: 22 }}>
                <Ionicons name="people" size={18} color="black" />
              </View>
              <Text style={styles.peopletext}>{Object.keys(game?.joinedPlayers ?? {}).length}</Text>
              {/* TODO: if full show full */}
            </View>

            <View style={{ padding: 2, flexDirection: 'row', alignItems: 'center', gap: 2, backgroundColor: '#DCFFB7', borderRadius: 16, width: 65 }}>
              <View style={{ padding: 2 }}>
                <Ionicons name="trophy" size={18} color="black" />
              </View>
              <Text style={styles.peopletext}>{game.winningAmount}</Text>
            </View>
          </View>

          {hasGameStarted(game as IGame) &&
            <View style={styles.dot}>

            </View>}
        </View>

        <View>

          <Text style={styles.title}>{game.title}</Text>

          <Text style={styles.subtitle}>{game.description}</Text>

          {/* <View style={{ padding: 2, flexDirection: 'row', alignItems: 'center', gap: 2, }}>
          <View style={{ padding: 2 }}>
            <Ionicons name="wallet" size={18} color="black" />
          </View>
          <Text style={styles.peopletext}>Min Wager: {game.minWager}</Text>
        </View> */}

        </View>




        {/*  avatar of creator with name */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#FFD700', borderRadius: 16, width: 104 }}>
          <Image
            style={{ width: 24, height: 24, borderRadius: 12 }}
            source={{ uri: 'https://api.dicebear.com/9.x/adventurer/svg?seed=Tinkerbell' }}
            accessibilityLabel='avatar'
          />
          <Text style={styles.creator}>{game.creator}</Text>
        </View>



      </ThemedView>
    </Link>
  );
};

