import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';

// Helper function to format time
const formatTime = (time: number) => {
  return time < 10 ? `0${time}` : time.toString();
};

// Countdown component
const Countdown: React.FC<{ startTime: Date }> = ({ startTime }) => {
  const [timeLeft, setTimeLeft] = useState<number>(startTime.getTime() - new Date().getTime());

  useEffect(() => {
    // Function to update the countdown
    const updateCountdown = () => {
      const now = new Date();
      const timeDifference = startTime.getTime() - now.getTime();
      setTimeLeft(timeDifference);
    };

    // Update countdown every second
    const intervalId = setInterval(updateCountdown, 1000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, [startTime]);

  // Calculate days, hours, minutes, and seconds left
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  // Display countdown
  return (
    <View>
      <Text>Now Date: {new Date().toLocaleDateString()}</Text>
      <Text>Now Time: {new Date().toLocaleTimeString()}</Text>
      <Text>Start Date: {startTime.toString()}</Text>
      <Text>Countdown: {timeLeft > 0 ? `${formatTime(days)}d ${formatTime(hours)}h ${formatTime(minutes)}m ${formatTime(seconds)}s` : 'Time is up!'}</Text>
    </View>
  );
};

export default Countdown;