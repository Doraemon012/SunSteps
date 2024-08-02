import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { FontDisplay, useFonts } from 'expo-font';
import { Redirect, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
        <Stack.Screen name="gameDetails" options={{
          headerBackTitle: 'Home', headerBlurEffect: 'prominent',
          headerTintColor: '#fefefe',
          headerShadowVisible: false,
          headerTitleStyle: {"fontSize": 0},
          headerStyle: {
            backgroundColor: '#2C7865'
          } // Change this color as needed
        }} />
        <Stack.Screen name="pedometer" options={{
          headerBackTitle: 'Game Deatils', headerBlurEffect: 'prominent',
          headerTintColor: '#fefefe',
          headerShadowVisible: true,
          headerTitleStyle: {"fontSize": 0},
          headerStyle: {
            // backgroundColor: '#2C7865'
          } // Change this color as needed
        }} />
        <Stack.Screen name="leaderBoard" options={{
          headerBackTitle: 'Game Deatils', headerBlurEffect: 'prominent',
          headerTintColor: '#fefefe',
          headerShadowVisible: true,
          headerTitleStyle: {"fontSize": 0},
          headerStyle: {
            // backgroundColor: '#2C7865'
          } // Change this color as needed
        }} />
      </Stack>
    </ThemeProvider>
  );
}
