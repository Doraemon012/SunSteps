// empty screen to redirect to signup page if user is not signed in


import React, { useEffect, useState } from 'react';
import { Redirect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
  const [getuser, setUser] = useState(null);

  useEffect(() => {
    const user = AsyncStorage.getItem("@user");
    user.then((data) => {
      console.log(data, " user from index.tsx "); // Add this line to log the retrieved user data
      if (data === null) {
        <Redirect href={"./signup"} />
      }
    });
  });

  return (
    <Redirect href={"./signup"} />
  );
}