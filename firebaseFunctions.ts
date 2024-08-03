import { useEffect } from "react";
import { firestore } from "./firebaseConf";
import { collection, onSnapshot, query, doc, getDoc, setDoc, Firestore, Timestamp, runTransaction, arrayUnion } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

// export const addUserToFirestore = async (user: any) => {
//   try {
//     const userRef = doc(firestore, "users", user.id);
//     await setDoc(userRef, user);
//     console.log("User added with ID: ", user.id);
//   } catch (e) {
//     console.error("Error adding user: ", e);
//   }
// }

// firebaseFunctions.ts

// firebaseFunctions.ts
export const addUserToFirestore = async (user: any): Promise<boolean> => {
  try {
    const userRef = doc(firestore, "users", user.id);

    // add user with initial currency
    await setDoc(userRef, {
      ...user,
      currency: 1000
    });

    console.log("User added with ID: ", user.id);
    return true;
  } catch (e) {
    console.error("Error adding user: ", e);
    return false;
  }
};

  // Check if user exists in Firestore


  // if (!userRef.exists) {
  //   // Set initial currency balance for new users
  //   const initialCurrency = 1000; // Set the initial currency amount here
  //   await userRef.set({
  //     ...user,
  //     currency: initialCurrency,
  //   });
  // }

export const getGames = (updateGamesCallback: (games: IGame[]) => void) => {
  const gamesRef = collection(firestore, 'games');
  const gamesQuery = query(gamesRef);

  const unsubscribe = onSnapshot(gamesQuery, (snapshot) => {
    const games: IGame[] = [];
    snapshot.forEach((doc) => {
      games.push({ id: doc.id, ...doc.data() } as IGame);
    });
    updateGamesCallback(games);
  });

  return unsubscribe;
};

export const getGameById = async (gameId: string): Promise<IGame | null> => {
  try {
    const gameDocRef = doc(firestore, 'games', gameId);
    const gameDocSnapshot = await getDoc(gameDocRef);

    if (gameDocSnapshot.exists()) {
      const gameData = gameDocSnapshot.data() as IGame;
      return gameData;
    } else {
      console.log('No such game found with ID:', gameId);
      return null;
    }
  } catch (e) {
    console.error('Error fetching game by ID:', e);
    return null;
  }
};



export interface IGame {
  id?: string;
  title: string;
  description: string;
  createdAt: Date;
  joinedPlayers: string[]; // User IDs
  creator: string; // User ID
  startdatetime: Date;
  enddatetime: Date;
  isActive: boolean;
  winnerId: string;
  type: string; // stepCounting 

  minPlayers: number;
  maxPlayers?: number;
  minWager: number;
  maxWager: number;
  winningAmount: number;

}

export interface StepCountingGame extends IGame {
  type: 'stepCounting';
  stepsGoal: number;
  timeGoal: number;
  steps: { [userId: string]: { steps: number; timestamp: Timestamp } };
}



// Function to generate a unique ID
const generateGameId = (): string => {
  return doc(collection(firestore, 'games')).id;
};

export const addGame = async (newGame: IGame, userId: string) => {
  const gameId = generateGameId(); // Generate a new unique ID
  const gameRef = doc(firestore, 'games', gameId);

  const gameWithMetadata = {
    ...newGame,
    id: gameId,
    createdAt: new Date(),
    creator: userId
  };

  try {
    await setDoc(gameRef, gameWithMetadata);
    console.log(`New game added with ID: ${gameId}`);
    return gameId;
  } catch (e) {
    console.error('Error adding new game', e);
    return null;
  }

};

export const joinGame = async (gameId: string, userId: string) => {
  const gameRef = doc(firestore, 'games', gameId);

  try {
    // Use a transaction to ensure atomic increment
    await runTransaction(firestore, async (transaction: any) => {
      const gameDoc = await transaction.get(gameRef);
      if (!gameDoc.exists()) {
        throw "Document does not exist!";
      }
      transaction.update(gameRef, { joinedPlayers: arrayUnion(userId) });
    });

    console.log(`User ${userId} joined game ${gameId}`);
    return true;
  } catch (e) {
    console.error('Error joining game:', e);
    return false;
  }
};

// update steps in firestore

export const updateGameStepsWithTimestamp = async (gameId: string, playerId: string, steps: number, timestamp: Date) => {
  const gameRef = doc(firestore, 'games', gameId);
  // steps: {
  // playerId: { steps: number; timestamp: Timestamp }
  // }

  await runTransaction(firestore, async (transaction) => {
    const gameDoc = await transaction.get(gameRef);
    if (!gameDoc.exists()) {
      throw "Document does not exist!";
    }

    const gameData = gameDoc.data() as StepCountingGame;
    const stepsData = gameData.steps || {};

    stepsData[playerId] = {
      steps,
      timestamp: Timestamp.fromDate(timestamp)
    };

    transaction.update(gameRef, { steps: stepsData });

    console.log(`Steps updated for player ${playerId} in game ${gameId}`);
  })





  // updateGameStepsWithTimestamp('u6i0pStLQHd9hAKboYg7', 'player1', 5000, new Date());




  // await setDoc(gameRef, {
  //   // [`steps.${playerId}`]: {
  //   //   steps,
  //   //   timestamp: Timestamp.fromDate(timestamp)
  //   // }
  // }, { merge: true });
}

// sample step update
// updateGameStepsWithTimestamp('u6i0pStLQHd9hAKboYg7', 'player1', 5000, new Date());

// function updateStepsInFirestore() {
//   useEffect(() => {
//     updateGameStepsWithTimestamp('u6i0pStLQHd9hAKboYg7', 'player1', 5000, new Date());
//   })

// }




// const timestamp = new firebase.firestore.Timestamp(jsonTimestamp.seconds, jsonTimestamp.nanoseconds)

// Example game to add to Firestore
// const stepCountingGame: StepCountingGame = {
//   id: 'game123',
//   title: 'Step Counting Challenge',
//   description: 'A fun step counting challenge to see who can reach the step goal first.',
//   createdAt: new Date(), // Creation date of the game
//   joinedPlayers: [], // List of player IDs
//   creator: 'user1', // ID of the game creator
//   startdatetime: new Date(Date.now() + 60000), // Game start time, 1 minute from now
//   enddatetime: new Date(Date.now() + 3600000), // Game end time, 1 hour from now
//   isActive: false, // Initial state of the game
//   winnerId: '', // No winner initially
//   type: 'stepCounting', // Type of the game
//   stepsGoal: 10000, // Goal for the number of steps
//   timeGoal: 60, // Time goal in minutes
//   steps: {

//   },
// };
// addGame(stepCountingGame, stepCountingGame.creator);


// export const getLeaderboard = async (gameId: string) => {
//   try {
//       // const gameRef = firestore.collection('games').doc(gameId);

//       const gameRef = doc(firestore, 'games', gameId);
//       const gameDoc = await getDoc(gameRef);
//       // const gameDoc = await gameRef.get();

//       if (!gameDoc.exists) {
//           throw new Error('Game not found');
//       }

//       const gameData = gameDoc.data();
//       if (!gameData || !gameData.steps) {
//           return [];
//       }

//       const leaderboard = Object.entries(gameData.steps).map(([playerId, data]: any) => ({
//           playerId,
//           steps: data.steps,
//           timestamp: data.timestamp
//       })).sort((a, b) => b.steps - a.steps);

//       return leaderboard;
//   } catch (error) {
//       console.error('Error retrieving leaderboard:', error);
//       return [];
//   }
// };

export const getLeaderboard = (gameId: string, updateLeaderboardCallback: (leaderboard: any[]) => void) => {
  try {
    const gameRef = doc(firestore, 'games', gameId);

    const unsubscribe = onSnapshot(gameRef, (gameDoc) => {
      if (!gameDoc.exists()) {
        throw new Error('Game not found');
      }

      const gameData = gameDoc.data();
      if (!gameData || !gameData.steps) {
        updateLeaderboardCallback([]);
        return;
      }

      const leaderboard = Object.entries(gameData.steps).map(([playerId, data]: any) => ({
        playerId,
        steps: data.steps,
        timestamp: data.timestamp
      })).sort((a, b) => b.steps - a.steps);

      updateLeaderboardCallback(leaderboard);
    });

    return unsubscribe;
  } catch (error) {
    console.error('Error retrieving leaderboard:', error);
    updateLeaderboardCallback([]);
  }
};


// async function reset(){
//   await AsyncStorage.clear();

// }

// reset();


export const updateUserCurrency = async (userId: string, amount: number) => {
  const userRef = doc(firestore, "users", userId);

  try {
    await runTransaction(firestore, async (transaction) => {
      const userDoc = await transaction.get(userRef);
      if (!userDoc.exists()) {
        throw "User does not exist!";
      }

      const userData = userDoc.data();
      const newCurrency = (userData.currency || 0) + amount;

      transaction.update(userRef, { currency: newCurrency });

      console.log(`Currency updated for user ${userId}: ${newCurrency}`);
    });
  } catch (e) {
    console.error("Error updating currency: ", e);
  }
};



const games = [
  {
    "title": "Daily Step Challenge",
    "description": "A fun step counting game where players compete to reach a step goal.",
    "createdAt": "2024-08-01T10:00:00Z",
    "joinedPlayers": ["player1", "player2"],
    "creator": "userId1",
    "startdatetime": "2024-08-05T09:00:00Z",
    "enddatetime": "2024-08-12T17:00:00Z",
    "isActive": true,
    "winnerId": "",
    "type": "stepCounting",
    "minPlayers": 2,
    "maxPlayers": 10,
    "minWager": 5.00,
    "maxWager": 50.00,
    "winningAmount": 100.00,
    "stepsGoal": 10000,
    "timeGoal": 60,
    "steps": {
      "player1": 5000,
      "player2": 8000
    }
  },
  {
    "title": "Fitness Frenzy",
    "description": "An exciting fitness game with various physical challenges.",
    "createdAt": "2024-08-02T12:30:00Z",
    "joinedPlayers": ["player3", "player4"],
    "creator": "userId2",
    "startdatetime": "2024-08-10T08:00:00Z",
    "enddatetime": "2024-08-20T18:00:00Z",
    "isActive": true,
    "winnerId": "",
    "type": "fitnessChallenge",
    "minPlayers": 3,
    "maxPlayers": 6,
    "minWager": 10.00,
    "maxWager": 30.00,
    "winningAmount": 200.00
  },
  {
    "title": "Trivia Tournament",
    "description": "A quiz-based game where players answer questions to win prizes.",
    "createdAt": "2024-08-03T15:00:00Z",
    "joinedPlayers": ["player5", "player6"],
    "creator": "userId3",
    "startdatetime": "2024-08-15T14:00:00Z",
    "enddatetime": "2024-08-22T20:00:00Z",
    "isActive": false,
    "winnerId": "",
    "type": "trivia",
    "minPlayers": 4,
    "maxPlayers": 12,
    "minWager": 8.00,
    "maxWager": 40.00,
    "winningAmount": 150.00
  },
  {
    "title": "Speed Reading Race",
    "description": "A reading challenge where players race to complete reading tasks as quickly as possible.",
    "createdAt": "2024-08-04T09:45:00Z",
    "joinedPlayers": ["player7", "player8"],
    "creator": "userId4",
    "startdatetime": "2024-08-12T10:00:00Z",
    "enddatetime": "2024-08-19T16:00:00Z",
    "isActive": true,
    "winnerId": "",
    "type": "readingChallenge",
    "minPlayers": 2,
    "maxPlayers": 8,
    "minWager": 12.00,
    "maxWager": 60.00,
    "winningAmount": 250.00
  }
]



// add games to firestore
