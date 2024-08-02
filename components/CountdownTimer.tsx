// CountdownTimer.tsx

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';
import { ThemedText } from './ThemedText';

interface CountdownTimerProps {
  duration: number; // Duration in seconds
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ duration }) => {
  const [remainingTime, setRemainingTime] = useState<number>(duration);
  const [progress, setProgress] = useState<number>(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime(prev => {
        if (prev > 1) {
          const newTime = prev - 1;
          setProgress(newTime / duration);
          return newTime;
        } else {
          clearInterval(interval);
          setProgress(0);
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [duration]);

  return (
    <View style={styles.container}>
      <ThemedText type='defaultSemiBold'>{`Remaining Time: ${remainingTime}s`}</ThemedText>
      <Progress.Bar 
        progress={progress} 
        width={200} 
        color={'#F4CE14'} 
        style={styles.progressBar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  progressBar: {
    marginTop: 10,
  },
});

export default CountdownTimer;
