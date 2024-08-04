// // // signup screen
// // // SHA1 67:89:2E:D1:38:B1:BC:84:5B:8B:46:1B:16:9E:F0:CC:81:4D:4B:A2

// // import * as React from 'react';
// // import { Image, StyleSheet, Platform, Button, Alert } from 'react-native';
// // import * as Linking from 'expo-linking';

// // import { HelloWave } from '@/components/HelloWave';
// // import ParallaxScrollView from '@/components/ParallaxScrollView';
// // import { ThemedText } from '@/components/ThemedText';
// // import { ThemedView } from '@/components/ThemedView';
// // import * as WebBrowser from 'expo-web-browser';
// // // import * as Google from 'expo-auth-session/providers/google';
// // import * as Google from 'expo-auth-session/providers/google';
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // import * as AuthSession from 'expo-auth-session';

// // import { addUserToFirestore } from '@/firebaseFunctions';
// // import { Redirect } from 'expo-router';
// // import HomeScreen from './(tabs)';

// // // WebBrowser.maybeCompleteAuthSession();
// // // WebBrowser.maybeCompleteAuthSession();

// // // WebBrowser.maybeCompleteAuthSession();
// // if (Platform.OS === 'web') {    
// //     WebBrowser.maybeCompleteAuthSession();
// //   }

// // export default function SignUpScreen() {

// //     // const discovery = AuthSession.useAutoDiscovery('');


// //     const redirectUri = AuthSession.makeRedirectUri();
// //     const [signedIn, setSignedIn] = React.useState(false);


// //     const [userInfo, setUserInfo] = React.useState(null);
// //     const [request, response, promptAsync] = Google.useAuthRequest({
// //         androidClientId: "824703805654-1366kc54md0ssh6fatn1a55q17t4ol6e.apps.googleusercontent.com",
// //         iosClientId: Platform.OS === 'ios' ? "824703805654-qrm65sa31vp8mmqokdisn2lesi0dlp99.apps.googleusercontent.com" : undefined,
// //         webClientId: "824703805654-38apkiebil9fa3bdqp2dptumt42g958d.apps.googleusercontent.com",
// //         redirectUri: redirectUri,
// //         scopes: ["profile", "email"],

// //     },
// //     )


// //     React.useEffect(() => {
// //         console.log(request?.redirectUri, " red uri ")

// //         if (response) {
// //             console.log('Auth response:', response);
// //             handleSignInWithGoogle();
// //         }
// //     }, [response]);

// //     // async function handleSignInWithGoogle() {
// //     //     const user = await AsyncStorage.getItem("@user");
// //     //     if (!user) {
// //     //         if (response?.type === 'success') {
// //     //             await getUserInfo(response.authentication?.accessToken);
// //     //         }



// //     //     }
// //     //     else {
// //     //         setUserInfo(JSON.parse(user));
// //     //     }
// //     // }

// //     async function handleSignInWithGoogle() {
// //         const user = await AsyncStorage.getItem("@user");
// //         if (!user) {
// //             if (response?.type === 'success') {
// //                 await getUserInfo(response.authentication?.accessToken);
// //             }
// //         } else {
// //             setUserInfo(JSON.parse(user));
// //         }
// //     }

// //     // async function getUserInfo(token: any) {
// //     //     if (!token) return;
// //     //     try {
// //     //         const response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
// //     //             headers: {
// //     //                 Authorization: `Bearer ${token}`
// //     //             }
// //     //         });
// //     //         const user = await response.json();
// //     //         await AsyncStorage.setItem("@user", JSON.stringify(user));
// //     //         await addUserToFirestore(user);
// //     //         setUserInfo(user);
// //     //         WebBrowser.dismissBrowser();
// //     //     } catch (error) {
// //     //         console.error(error);
// //     //     }
// //     // }

// //     // temporary sign in , store a user id in async storage
// //     async function temp() {
// //         await AsyncStorage.setItem("@user", JSON.stringify({ id: "user" }));
// //         Alert.alert("User signed in as `user`");
// //         setSignedIn(true);
// //         return <Redirect href={"/"} />
// //         // setUserInfo({ id: "user" });
// //     }


// //     async function getUserInfo(token : any ) {
// //         if (!token) return;
// //         try {
// //             const response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
// //                 headers: {
// //                     Authorization: `Bearer ${token}`
// //                 }
// //             });
// //             const user = await response.json();
// //             await AsyncStorage.setItem("@user", JSON.stringify(user));
// //             await addUserToFirestore(user);
// //             console.log("\n calling getUserInfo",user, )
// //             setUserInfo(user);
// //             if (Platform.OS !== 'web') {
// //                 WebBrowser.dismissBrowser();
// //             }
// //         } catch (error) {
// //             console.error(error);
// //         }
// //     }






// //     return (
// //         <ThemedView style={{flex:1, alignItems:'center'}}>
// //             {
// //                 signedIn && <Redirect href={"../(tabs)/index"} /> 
// //                 // app/(tabs)/index.tsx
// //             }

// //             <ThemedView style={styles.titleContainer}>
// //                 <ThemedText type="title">Welcome!</ThemedText>
// //                 <HelloWave />

// //                 <ThemedText type="title">{JSON.stringify(userInfo, null, 2)}</ThemedText>

// //             </ThemedView>

// //             <ThemedView style={{backgroundColor:'#88D66C', padding:4, borderRadius:16, marginVertical:16}}>
// //                 <Button title="Temp Sign up " onPress={() => temp() } />
// //             </ThemedView>

// //             <ThemedView style={{backgroundColor:'#FFC5C5', padding:4, borderRadius:16, marginVertical:16}}>
// //                 <Button title="Sign Up" onPress={() => promptAsync()} />
// //             </ThemedView>

// //             <ThemedView style={{backgroundColor:'#F1EAFF', padding:4, borderRadius:16, marginBottom:48}}>
// //                 <Button title="Delete Local Storage" onPress={() => {
// //                     AsyncStorage.removeItem("@user")
// //                 }} />
// //             </ThemedView>
// //         </ThemedView>
// //     );
// // }

// // const styles = StyleSheet.create({
// //     titleContainer: {
// //         flexDirection: 'row',
// //         alignItems: 'center',
// //         gap: 8,
// //         flex: 1
// //     },
// //     stepContainer: {
// //         gap: 8,
// //         marginBottom: 8,
// //     },
// //     reactLogo: {
// //         height: 178,
// //         width: 290,
// //         bottom: 0,
// //         left: 0,
// //         position: 'absolute',
// //     },
// // });


// import * as React from 'react';
// import { StyleSheet, Platform, Button, Alert } from 'react-native';
// import * as Linking from 'expo-linking';
// import { HelloWave } from '@/components/HelloWave';
// import { ThemedText } from '@/components/ThemedText';
// import { ThemedView } from '@/components/ThemedView';
// import * as WebBrowser from 'expo-web-browser';
// import * as Google from 'expo-auth-session/providers/google';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import * as AuthSession from 'expo-auth-session';
// import { addUserToFirestore } from '@/firebaseFunctions';
// import { useRouter } from 'expo-router';

// if (Platform.OS === 'web') {
//     WebBrowser.maybeCompleteAuthSession();
// }

// export default function SignUpScreen() {
//     const router = useRouter();
//     const redirectUri = AuthSession.makeRedirectUri();
//     const [signedIn, setSignedIn] = React.useState(false);
//     const [userInfo, setUserInfo] = React.useState(null);
//     const [request, response, promptAsync] = Google.useAuthRequest({
//         androidClientId: "824703805654-1366kc54md0ssh6fatn1a55q17t4ol6e.apps.googleusercontent.com",
//         iosClientId: Platform.OS === 'ios' ? "824703805654-qrm65sa31vp8mmqokdisn2lesi0dlp99.apps.googleusercontent.com" : undefined,
//         webClientId: "824703805654-38apkiebil9fa3bdqp2dptumt42g958d.apps.googleusercontent.com",
//         redirectUri: redirectUri,
//         scopes: ["profile", "email"],
//     });

//     React.useEffect(() => {
//         if (response) {
//             console.log('Auth response:', response);
//             handleSignInWithGoogle();
//         }
//     }, [response]);

//     async function handleSignInWithGoogle() {
//         const user = await AsyncStorage.getItem("@user");
//         if (!user) {
//             if (response?.type === 'success') {
//                 await getUserInfo(response.authentication?.accessToken);
//                 // redirect to home screen
//                 router.replace('/(tabs)/home');

//             }
//         } else {
//             setUserInfo(JSON.parse(user));
//         }
//     }

//     async function getUserInfo(token: any) {
//         if (!token) return;
//         try {
//             const response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             });
//             const user = await response.json();
//             await AsyncStorage.setItem("@user", JSON.stringify(user));
//             await addUserToFirestore(user);
//             console.log("\n calling getUserInfo", user);
//             setUserInfo(user);
//             if (Platform.OS !== 'web') {
//                 WebBrowser.dismissBrowser();
//             }
//         } catch (error) {
//             console.error(error);
//         }
//     }

//     async function temp() {
//         await AsyncStorage.setItem("@user", JSON.stringify({ id: "user" }));
//         Alert.alert("User signed in as `user`");
//         setSignedIn(true);

//         // redirect to home screen
//         router.replace('/(tabs)/home');

//         // router.replace('/(tabs)');
//     }

//     return (
//         <ThemedView style={{ flex: 1, alignItems: 'center' }}>
//             <ThemedView style={styles.titleContainer}>
//                 <ThemedText type="title">Welcome!</ThemedText>
//                 <HelloWave />
//                 <ThemedText type="title">{JSON.stringify(userInfo, null, 2)}</ThemedText>
//             </ThemedView>

//             <ThemedView style={{ backgroundColor: '#88D66C', padding: 4, borderRadius: 16, marginVertical: 16 }}>
//                 <Button title="Temp Sign up" onPress={() => temp()} />
//             </ThemedView>

//             <ThemedView style={{ backgroundColor: '#FFC5C5', padding: 4, borderRadius: 16, marginVertical: 16 }}>
//                 <Button title="Sign Up" onPress={() => promptAsync()} />
//             </ThemedView>

//             <ThemedView style={{ backgroundColor: '#F1EAFF', padding: 4, borderRadius: 16, marginBottom: 48 }}>
//                 <Button title="Delete Local Storage" onPress={() => {
//                     AsyncStorage.removeItem("@user");
//                 }} />
//             </ThemedView>
//         </ThemedView>
//     );
// }

// const styles = StyleSheet.create({
//     titleContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         gap: 8,
//         flex: 1
//     },
//     stepContainer: {
//         gap: 8,
//         marginBottom: 8,
//     },
//     reactLogo: {
//         height: 178,
//         width: 290,
//         bottom: 0,
//         left: 0,
//         position: 'absolute',
//     },
// });


import * as React from 'react';
import { Image, StyleSheet, Platform, Button, Alert, TouchableOpacity, View, Text, SafeAreaView } from 'react-native';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AuthSession from 'expo-auth-session';
import { addUserToFirestore } from '@/firebaseFunctions';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ThemedView } from '@/components/ThemedView';
import { Redirect } from 'expo-router';;

if (Platform.OS === 'web') {
    WebBrowser.maybeCompleteAuthSession();
}

export default function SignUpScreen() {
    const router = useRouter();
    const redirectUri = AuthSession.makeRedirectUri();
    const [signedIn, setSignedIn] = React.useState(false);
    const [userInfo, setUserInfo] = React.useState(null);
    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: "824703805654-1366kc54md0ssh6fatn1a55q17t4ol6e.apps.googleusercontent.com",
        iosClientId: Platform.OS === 'ios' ? "824703805654-qrm65sa31vp8mmqokdisn2lesi0dlp99.apps.googleusercontent.com" : undefined,
        webClientId: "824703805654-38apkiebil9fa3bdqp2dptumt42g958d.apps.googleusercontent.com",
        redirectUri: redirectUri,
        scopes: ["profile", "email"],
    });

    React.useEffect(() => {
        if (response) {
            console.log('Auth response:', response);
            handleSignInWithGoogle();
        }
    }, [response]);

    async function handleSignInWithGoogle() {
        const user = await AsyncStorage.getItem("@user");
        console.log("User: ", user);

        // response?.type === 'success' ? console.log("Response: ", response) : console.log("Response: ", response?.type);

        if (!user) {
            if (response?.type === 'success') {
                await getUserInfo(response.authentication?.accessToken);
                Alert.alert("User signed in successfully as " + userInfo);
                // Alert.prompt("hu")
                console.log("User signed in successfully as ", userInfo);
                // redirect to home screen
                router.replace('/(tabs)/home');
            }
        } else {
            setUserInfo(JSON.parse(user));
        }
    }

    // async function getUserInfo(token: any) {
    //     if (!token) return;
    //     try {
    //         const response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             }
    //         });
    //         const user = await response.json();
    //         await AsyncStorage.setItem("@user", JSON.stringify(user));
    //         await addUserToFirestore(user);
    //         console.log("\n calling getUserInfo", user);
    //         setUserInfo(user);
    //         if (Platform.OS !== 'web') {
    //             WebBrowser.dismissBrowser();
    //         }
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }


    // app/signup.tsx
    async function getUserInfo(token: any) {
        if (!token) return;
        


        try {
            const response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const user = await response.json();
            console.log("User: hai ye ", user);
            await AsyncStorage.setItem("@user", JSON.stringify(user));

            await addUserToFirestore(user);

            // if (isUserAdded) {
            //     console.log("User successfully added to Firestore");
            // } else {
            //     console.log("Failed to add user to Firestore");
            // }
            
            setUserInfo(user);
            if (Platform.OS !== 'web') {
                WebBrowser.dismissBrowser();
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function temp() {
        await AsyncStorage.setItem("@user", JSON.stringify({ id: "user" }));
        Alert.alert("User signed in as `user`");
        setSignedIn(true);

        // redirect to home screen
        router.replace('/(tabs)/home');

        // router.replace('/(tabs)');
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Image source={require('../assets/char.jpeg')} style={styles.image} />
            </View>

            <View style={styles.content}>
                <Text style={styles.title}>Welcome to Our App</Text>
                <Text style={styles.subtitle}>Sign up to get started</Text>

                <TouchableOpacity style={styles.googleButton} onPress={() => promptAsync()}>
                    <Ionicons name="logo-google" size={24} color="#fff" />
                    <Text style={styles.googleButtonText}>Sign up with Google</Text>
                </TouchableOpacity>

                <ThemedView style={styles.tempButton}>
                    <Button title="Temp Sign up" onPress={() => temp()} />
                </ThemedView>

                <ThemedView style={styles.deleteButton}>
                    <Button title="Delete Local Storage" onPress={() => {
                        AsyncStorage.removeItem("@user");
                    }} />
                </ThemedView>

                {signedIn && <Redirect href={"../(tabs)/index"} />}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F4CE14',
        borderBottomRightRadius: 175,
    },
    image: {
        width: '80%',
        height: '80%',
        resizeMode: 'contain',
    },
    content: {
        flex: 1,
        backgroundColor: '#F5F7F8',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 165,
        paddingVertical: 64,
        // padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 18,
        color: '#666',
        marginBottom: 32,
    },
    googleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#4285F4',
        paddingVertical: 10,
        paddingHorizontal: 24,
        borderRadius: 10,
        marginBottom: 16,
    },
    googleButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        marginLeft: 16,
        fontSize: 16,

    },
    tempButton: {
        backgroundColor: '#88D66C',
        padding: 4,
        borderRadius: 16,
        marginVertical: 16,
    },
    deleteButton: {
        backgroundColor: '#F1EAFF',
        padding: 4,
        borderRadius: 16,
        marginBottom: 48,
    },
});
