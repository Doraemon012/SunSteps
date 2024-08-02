// CircularStepProgress.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, G, Text as SvgText } from 'react-native-svg';

const CircularStepProgress = ({ currentSteps, targetSteps }) => {
  const size = 200;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = currentSteps / targetSteps;
  const remainingSteps = targetSteps - currentSteps;
  const offset = circumference - progress * circumference;

  return (
    <View style={styles.container}>
      <Svg height={size} width={size}>
        <G rotation="-90" origin={`${size / 2}, ${size / 2}`}>
          <Circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke="#DDDDDD"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <Circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke="#9BEC00"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </G>
        <SvgText
          x="50%"
          y="50%"
          textAnchor="middle"
          alignmentBaseline="middle"
          fontSize={24}
          fill="#9BEC00"
          fontWeight={700}
        >
          {`${remainingSteps} / ${targetSteps}`}
        </SvgText>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
  },
});

export default CircularStepProgress;
