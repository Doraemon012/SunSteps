//  ac onatainer with a small subheader, icon and a titile text and color as prop

import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedText } from './ThemedText';

const width = Dimensions.get('window').width;


interface SquareContainerProps {
    title: string;
    icon: string;
    color: string;
    subtitle: string;
}

export const SquareContainer: React.FC<SquareContainerProps> = ({ title, icon, color, subtitle }: SquareContainerProps) => {
    const styles = StyleSheet.create({
        container: {
            backgroundColor: color,
            borderRadius: 24,
            padding: 16,
            // margin: 8,
            width: width/2 - 24,
            // height: 150,
            maxHeight: 200,
            justifyContent: 'center',
            // alignItems: 'center',
        },
        icon: {
            marginBottom: 8,
        },
        title: {
            fontSize: 18,
            fontWeight: 'bold',
        },
    });

    return (
        <View style={styles.container}>
            <ThemedText type='defaultSemiBold' style={{color:'#fff'}}>{subtitle}</ThemedText>

            <Ionicons name={icon} size={36} color="white" style={styles.icon} />
            <ThemedText type='title' style={{color:'#fff'}}>{title}</ThemedText>
        </View>
    );
};
