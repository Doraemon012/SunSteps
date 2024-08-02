// import React, { useState } from 'react';
// import { View, TextInput, Button, StyleSheet, Alert, ScrollView, Text, TouchableOpacity, SafeAreaView } from 'react-native';
// import { addGame, IGame, StepCountingGame } from '@/firebaseFunctions';
// import { useNavigation } from '@react-navigation/native';
// import { ThemedView } from '@/components/ThemedView';
// import DateTimePickerComponent from '@/components/DateTimePicker';
// import { ThemedText } from '@/components/ThemedText';

// const CreateGame = () => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [type, setType] = useState('');
//   const [stepsGoal, setStepsGoal] = useState('');
//   const [timeGoal, setTimeGoal] = useState('');
//   const [startdatetime, setStartdatetime] = useState(new Date());
//   const [enddatetime, setEnddatetime] = useState(new Date());

//   const navigation = useNavigation();

//   const toggleGameType = () => {
//     setType((prevType:string) => (prevType === 'stepCounting' ? '' : 'stepCounting'));
//   };

//   const handleCreateGame = async () => {
//     if (!title || !description) {
//       Alert.alert('Please fill in all required fields');
//       return;
//     }

//     const newGame: IGame = {
//       title,
//       description,
//       createdAt: new Date(),
//       joinedPlayers: [],
//       creator: 'userId', // Replace with actual user ID
//       startdatetime,
//       enddatetime,
//       isActive: false,
//       winnerId: '',
//       type,
//       minPlayers: 0,
//       minWager: 0,
//       // maxPlayers?: 0, this is optional
//       maxWager: 0,
//       winningAmount: 0,
//     };

//     if (type === 'stepCounting') {
//       (newGame as StepCountingGame).stepsGoal = parseInt(stepsGoal, 10);
//       (newGame as StepCountingGame).timeGoal = parseInt(timeGoal, 10);
//       (newGame as StepCountingGame).steps = {};
//     }

//     const gameId = await addGame(newGame, 'userId'); // Replace with actual user ID

//     if (gameId) {
//       Alert.alert('Game created successfully');
//       // TODO: Redirect to game details page
//       // navigation.navigate('GameDetails', { id: gameId });
//     } else {
//       Alert.alert('Failed to create game');
//     }
//   };

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <ThemedView>
//         <ScrollView contentContainerStyle={styles.container}>
//           <ThemedText type='title'>Create Game</ThemedText>
//         <ThemedView style={styles.content}>
//           <TextInput
//             style={styles.input}
//             placeholder="Enter game title"
//             value={title}
//             onChangeText={setTitle}
//             placeholderTextColor="#6c757d"
//           />
//           <TextInput
//             style={[styles.input, styles.textArea]}
//             placeholder="Enter game description"
//             value={description}
//             onChangeText={setDescription}
//             multiline
//             placeholderTextColor="#6c757d"
//           />
//           <ThemedView>
//           <ThemedText type='defaultSemiBold'>Start Date and Time</ThemedText>
//           <DateTimePickerComponent date={startdatetime} setDate={setStartdatetime} mode="datetime" />
//           </ThemedView>

//           <ThemedView>
//           <ThemedText type='defaultSemiBold'>End Date and Time</ThemedText>
//           <DateTimePickerComponent date={enddatetime} setDate={setEnddatetime} mode="datetime" />
//           </ThemedView>

//           <ThemedText type='defaultSemiBold'>Game Type</ThemedText>
//           <View style={styles.pickerContainer}>
//             <TouchableOpacity
//               style={[styles.pickerOption, type === 'stepCounting' && styles.pickerOptionSelected]}
//               onPress={() => toggleGameType()}
//             >
//               <Text style={[styles.pickerOptionText, type === 'stepCounting' && styles.pickerOptionTextSelected]}>Step Counting</Text>
//             </TouchableOpacity>
//           </View>
//           {type === 'stepCounting' && (
//             <>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Enter steps goal"
//                 value={stepsGoal}
//                 onChangeText={setStepsGoal}
//                 keyboardType="numeric"
//                 placeholderTextColor="#6c757d"
//               />
//               <TextInput
//                 style={styles.input}
//                 placeholder="Enter time goal (minutes)"
//                 value={timeGoal}
//                 onChangeText={setTimeGoal}
//                 keyboardType="numeric"
//                 placeholderTextColor="#6c757d"
//               />
//             </>
//           )}
//           <TouchableOpacity style={styles.button} onPress={handleCreateGame}>
//             <Text style={styles.buttonText}>Create Game</Text>
//           </TouchableOpacity>
//           </ThemedView>
//         </ScrollView>
//       </ThemedView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     paddingHorizontal: 16,
//     paddingVertical: 32,
//   },
//   title: {
//     // fontsize: 28,
//     // fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//     color: '#343a40',
//   },
//   input: {
//     height: 42,
//     borderColor: '#ced4da',
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingHorizontal: 15,
//     marginBottom: 12,
//     // backgroundColor: '#ffffff',
//   },
//   textArea: {
//     height: 100,
//     textAlignVertical: 'top',
//   },
//   label: {
//     color: '#495057',
//   },
//   pickerContainer: {
//     flexDirection: 'row',
//     marginBottom: 12,
//   },
//   pickerOption: {
//     flex: 1,
//     padding: 10,
//     borderWidth: 1,
//     borderColor: '#ced4da',
//     borderRadius: 8,
//     alignItems: 'center',
//     marginHorizontal: 5,
//     // backgroundColor: '#ffffff',
//   },
//   pickerOptionSelected: {
//     backgroundColor: '#007bff',
//   },
//   pickerOptionText: {
//     color: '#495057',
//   },
//   pickerOptionTextSelected: {
//     color: '#ffffff',
//   },
//   button: {
//     backgroundColor: '#007bff',
//     padding: 15,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   buttonText: {
//     color: '#ffffff',
//     // fontsize: 16,
//   },
//   content:{
//     gap: 8,
//     paddingVertical: 32
//   }
// });

// export default CreateGame;


// import React, { useState } from 'react';
// import { View, TextInput, Button, StyleSheet, Alert, ScrollView, Text, TouchableOpacity, SafeAreaView } from 'react-native';
// import { addGame, IGame, StepCountingGame } from '@/firebaseFunctions';
// import { useNavigation } from '@react-navigation/native';
// import { ThemedView } from '@/components/ThemedView';
// import DateTimePickerComponent from '@/components/DateTimePicker';
// import { ThemedText } from '@/components/ThemedText';

// const CreateGame = () => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [type, setType] = useState('');
//   const [stepsGoal, setStepsGoal] = useState('');
//   const [timeGoal, setTimeGoal] = useState('');
//   const [startdatetime, setStartdatetime] = useState(new Date());
//   const [enddatetime, setEnddatetime] = useState(new Date());
//   const [minPlayers, setMinPlayers] = useState('');
//   const [maxPlayers, setMaxPlayers] = useState('');
//   const [minWager, setMinWager] = useState('');
//   const [maxWager, setMaxWager] = useState('');
//   const [winningAmount, setWinningAmount] = useState('');

//   const navigation = useNavigation();

//   const toggleGameType = () => {
//     setType((prevType: string) => (prevType === 'stepCounting' ? '' : 'stepCounting'));
//   };

//   const handleCreateGame = async () => {
//     if (!title || !description) {
//       Alert.alert('Please fill in all required fields');
//       return;
//     }

//     const newGame: IGame = {
//       title,
//       description,
//       createdAt: new Date(),
//       joinedPlayers: [],
//       creator: 'userId', // Replace with actual user ID
//       startdatetime,
//       enddatetime,
//       isActive: false,
//       winnerId: '',
//       type,
//       minPlayers: minPlayers ? parseInt(minPlayers, 10) : 0,
//       maxPlayers: maxPlayers ? parseInt(maxPlayers, 10) : undefined, // Optional
//       minWager: minWager ? parseFloat(minWager) : 0,
//       maxWager: parseFloat(maxWager),
//       winningAmount: winningAmount ? parseFloat(winningAmount) : 0,
//     };

//     if (type === 'stepCounting') {
//       (newGame as StepCountingGame).stepsGoal = parseInt(stepsGoal, 10);
//       (newGame as StepCountingGame).timeGoal = parseInt(timeGoal, 10);
//       (newGame as StepCountingGame).steps = {};
//     }

//     const gameId = await addGame(newGame, 'userId'); // Replace with actual user ID

//     if (gameId) {
//       Alert.alert('Game created successfully');
//       // TODO: Redirect to game details page
//       // navigation.navigate('GameDetails', { id: gameId });
//     } else {
//       Alert.alert('Failed to create game');
//     }
//   };

//   return (
//     <SafeAreaView style={{ flex: 1 }}>

//       <ThemedView>
//         <ScrollView contentContainerStyle={styles.container}>

//           <View style={{ flex: 1, backgroundColor: '#2C7865', borderBottomRightRadius: 175, justifyContent: 'center', paddingHorizontal: 16, paddingVertical: 52 }}>
//             {/* <Image source={require('../assets/o.jpeg')} style={{ width: '100%', height: '100%' }} /> */}
//             {/* <ThemedText type="title" style={styles.title}>{game.title}</ThemedText> */}
//             {/* <ThemedText type="subtitle" style={styles.subtitle}>{game.description}</ThemedText> */}
//             <ThemedText type='title' style={{color:'#fff'}}>Create Game</ThemedText>

//           </View>

//           <ThemedView style={styles.content}>
//             <TextInput
//               style={styles.input}
//               placeholder="Enter game title"
//               value={title}
//               onChangeText={setTitle}
//               placeholderTextColor="#6c757d"
//             />
//             <TextInput
//               style={[styles.input, styles.textArea]}
//               placeholder="Enter game description"
//               value={description}
//               onChangeText={setDescription}
//               multiline
//               placeholderTextColor="#6c757d"
//             />
//             <ThemedView>
//               <ThemedText type='defaultSemiBold'>Start Date and Time</ThemedText>
//               <DateTimePickerComponent date={startdatetime} setDate={setStartdatetime} mode="datetime" />
//             </ThemedView>

//             <ThemedView>
//               <ThemedText type='defaultSemiBold'>End Date and Time</ThemedText>
//               <DateTimePickerComponent date={enddatetime} setDate={setEnddatetime} mode="datetime" />
//             </ThemedView>

//             <ThemedText type='defaultSemiBold'>Game Type</ThemedText>
//             <View style={styles.pickerContainer}>
//               <TouchableOpacity
//                 style={[styles.pickerOption, type === 'stepCounting' && styles.pickerOptionSelected]}
//                 onPress={() => toggleGameType()}
//               >
//                 <Text style={[styles.pickerOptionText, type === 'stepCounting' && styles.pickerOptionTextSelected]}>Step Counting</Text>
//               </TouchableOpacity>
//             </View>

//             {type === 'stepCounting' && (
//               <>
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Enter steps goal"
//                   value={stepsGoal}
//                   onChangeText={setStepsGoal}
//                   keyboardType="numeric"
//                   placeholderTextColor="#6c757d"
//                 />
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Enter time goal (minutes)"
//                   value={timeGoal}
//                   onChangeText={setTimeGoal}
//                   keyboardType="numeric"
//                   placeholderTextColor="#6c757d"
//                 />
//               </>
//             )}

//             <TextInput
//               style={styles.input}
//               placeholder="Enter minimum number of players"
//               value={minPlayers}
//               onChangeText={setMinPlayers}
//               keyboardType="numeric"
//               placeholderTextColor="#6c757d"
//             />
//             <TextInput
//               style={styles.input}
//               placeholder="Enter maximum number of players (optional)"
//               value={maxPlayers}
//               onChangeText={setMaxPlayers}
//               keyboardType="numeric"
//               placeholderTextColor="#6c757d"
//             />
//             <TextInput
//               style={styles.input}
//               placeholder="Enter minimum wager"
//               value={minWager}
//               onChangeText={setMinWager}
//               keyboardType="numeric"
//               placeholderTextColor="#6c757d"
//             />
//             <TextInput
//               style={styles.input}
//               placeholder="Enter maximum wager (optional)"
//               value={maxWager}
//               onChangeText={setMaxWager}
//               keyboardType="numeric"
//               placeholderTextColor="#6c757d"
//             />
//             <TextInput
//               style={styles.input}
//               placeholder="Enter winning amount"
//               value={winningAmount}
//               onChangeText={setWinningAmount}
//               keyboardType="numeric"
//               placeholderTextColor="#6c757d"
//             />

//             <TouchableOpacity style={styles.button} onPress={handleCreateGame}>
//               <Text style={styles.buttonText}>Create Game</Text>
//             </TouchableOpacity>
//           </ThemedView>
//         </ScrollView>
//       </ThemedView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     // paddingHorizontal: 16,
//     // paddingVertical: 32,
//   },
//   input: {
//     height: 42,
//     borderColor: '#ced4da',
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingHorizontal: 15,
//     marginBottom: 12,
//   },
//   textArea: {
//     height: 100,
//     textAlignVertical: 'top',
//   },
//   pickerContainer: {
//     flexDirection: 'row',
//     marginBottom: 12,
//   },
//   pickerOption: {
//     flex: 1,
//     padding: 10,
//     borderWidth: 1,
//     borderColor: '#ced4da',
//     borderRadius: 8,
//     alignItems: 'center',
//     marginHorizontal: 5,
//   },
//   pickerOptionSelected: {
//     backgroundColor: '#007bff',
//   },
//   pickerOptionText: {
//     color: '#495057',
//   },
//   pickerOptionTextSelected: {
//     color: '#ffffff',
//   },
//   button: {
//     backgroundColor: '#007bff',
//     padding: 15,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   buttonText: {
//     color: '#ffffff',
//   },
//   content: {
//     gap: 8,
//     paddingVertical: 32,
//     paddingHorizontal: 16,
//     // paddingVertical: 32,
//   }
// });

// export default CreateGame;

import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, ScrollView, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { addGame, IGame, StepCountingGame } from '@/firebaseFunctions';
import { useNavigation } from '@react-navigation/native';
import { ThemedView } from '@/components/ThemedView';
import DateTimePickerComponent from '@/components/DateTimePicker';
import { ThemedText } from '@/components/ThemedText';

const CreateGame = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [stepsGoal, setStepsGoal] = useState('');
  const [timeGoal, setTimeGoal] = useState('');
  const [startdatetime, setStartdatetime] = useState(new Date());
  const [enddatetime, setEnddatetime] = useState(new Date());
  const [minPlayers, setMinPlayers] = useState('');
  const [maxPlayers, setMaxPlayers] = useState('');
  const [minWager, setMinWager] = useState('');
  const [maxWager, setMaxWager] = useState('');
  const [winningAmount, setWinningAmount] = useState('');

  const navigation = useNavigation();

  const toggleGameType = () => {
    setType((prevType: string) => (prevType === 'stepCounting' ? '' : 'stepCounting'));
  };

  const handleCreateGame = async () => {
    // Basic validation
    if (!title || !description || !startdatetime || !enddatetime || !minPlayers || !minWager || !winningAmount) {
      Alert.alert('Please fill in all required fields');
      return;
    }

    // Additional validation for step counting games
    if (type === 'stepCounting' && (!stepsGoal || !timeGoal)) {
      Alert.alert('Please fill in all required fields for step counting game');
      return;
    }

    const newGame: IGame = {
      title,
      description,
      createdAt: new Date(),
      joinedPlayers: [],
      creator: 'userId', // Replace with actual user ID
      startdatetime,
      enddatetime,
      isActive: false,
      winnerId: '',
      type,
      minPlayers: minPlayers ? parseInt(minPlayers, 10) : 0,
      maxPlayers: maxPlayers ? parseInt(maxPlayers, 10) : undefined, // Optional
      minWager: minWager ? parseFloat(minWager) : 0,
      maxWager: maxWager ? parseFloat(maxWager) : undefined, // Optional
      winningAmount: winningAmount ? parseFloat(winningAmount) : 0,
    };

    if (type === 'stepCounting') {
      (newGame as StepCountingGame).stepsGoal = parseInt(stepsGoal, 10);
      (newGame as StepCountingGame).timeGoal = parseInt(timeGoal, 10);
      (newGame as StepCountingGame).steps = {};
    }

    const gameId = await addGame(newGame, 'userId'); // Replace with actual user ID

    if (gameId) {
      Alert.alert('Game created successfully');
      // TODO: Redirect to game details page
      // navigation.navigate('GameDetails', { id: gameId });
    } else {
      Alert.alert('Failed to create game');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemedView>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.header}>
            <ThemedText type='title' style={styles.headerText}>Create Game</ThemedText>
          </View>
          <ThemedView style={styles.content}>
            <TextInput
              style={styles.input}
              placeholder="Enter game title"
              value={title}
              onChangeText={setTitle}
              placeholderTextColor="#6c757d"
            />
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Enter game description"
              value={description}
              onChangeText={setDescription}
              multiline
              placeholderTextColor="#6c757d"
            />
            <ThemedView>
              <ThemedText type='defaultSemiBold'>Start Date and Time</ThemedText>
              <DateTimePickerComponent date={startdatetime} setDate={setStartdatetime} mode="datetime" />
            </ThemedView>
            <ThemedView>
              <ThemedText type='defaultSemiBold'>End Date and Time</ThemedText>
              <DateTimePickerComponent date={enddatetime} setDate={setEnddatetime} mode="datetime" />
            </ThemedView>
            <ThemedText type='defaultSemiBold'>Game Type</ThemedText>
            <View style={styles.pickerContainer}>
              <TouchableOpacity
                style={[styles.pickerOption, type === 'stepCounting' && styles.pickerOptionSelected]}
                onPress={() => toggleGameType()}
              >
                <Text style={[styles.pickerOptionText, type === 'stepCounting' && styles.pickerOptionTextSelected]}>Step Counting</Text>
              </TouchableOpacity>
            </View>
            {type === 'stepCounting' && (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Enter steps goal"
                  value={stepsGoal}
                  onChangeText={setStepsGoal}
                  keyboardType="numeric"
                  placeholderTextColor="#6c757d"
                />
                <TextInput
                  style={styles.input}
                  placeholder="Enter time goal (minutes)"
                  value={timeGoal}
                  onChangeText={setTimeGoal}
                  keyboardType="numeric"
                  placeholderTextColor="#6c757d"
                />
              </>
            )}
            <TextInput
              style={styles.input}
              placeholder="Enter minimum number of players"
              value={minPlayers}
              onChangeText={setMinPlayers}
              keyboardType="numeric"
              placeholderTextColor="#6c757d"
            />
            <TextInput
              style={styles.input}
              placeholder="Enter maximum number of players (optional)"
              value={maxPlayers}
              onChangeText={setMaxPlayers}
              keyboardType="numeric"
              placeholderTextColor="#6c757d"
            />
            <TextInput
              style={styles.input}
              placeholder="Enter minimum wager"
              value={minWager}
              onChangeText={setMinWager}
              keyboardType="numeric"
              placeholderTextColor="#6c757d"
            />
            <TextInput
              style={styles.input}
              placeholder="Enter maximum wager (optional)"
              value={maxWager}
              onChangeText={setMaxWager}
              keyboardType="numeric"
              placeholderTextColor="#6c757d"
            />
            <TextInput
              style={styles.input}
              placeholder="Enter winning amount"
              value={winningAmount}
              onChangeText={setWinningAmount}
              keyboardType="numeric"
              placeholderTextColor="#6c757d"
            />
            <TouchableOpacity style={styles.button} onPress={handleCreateGame}>
              <Text style={styles.buttonText}>Create Game</Text>
            </TouchableOpacity>
          </ThemedView>
        </ScrollView>
      </ThemedView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  header: {
    flex: 1,
    backgroundColor: '#2C7865',
    borderBottomRightRadius: 175,
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 52,
  },
  headerText: {
    color: '#fff',
  },
  content: {
    gap: 8,
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  input: {
    height: 42,
    borderColor: '#ced4da',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 12,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  pickerOption: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  pickerOptionSelected: {
    backgroundColor: '#007bff',
  },
  pickerOptionText: {
    color: '#495057',
  },
  pickerOptionTextSelected: {
    color: '#ffffff',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#ffffff',
  },
});

export default CreateGame;
