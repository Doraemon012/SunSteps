import React, { useState } from 'react';
import { SafeAreaView, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { ThemedView } from './ThemedView';

const DateTimePickerComponent = ({ date, setDate, mode }) => {
    // const [show, setShow] = useState(false);
    const [pickerMode, setPickerMode] = useState(mode);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        // setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        if (Platform.OS === 'android') {
            DateTimePickerAndroid.open({
                value: date,
                onChange,
                mode: currentMode,
                is24Hour: true,
            });
        } else {
            // setShow(true);
            setPickerMode(currentMode);
        }
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    return (
        <ThemedView style={styles.container}>
            {/* <Text style={styles.selectedText}>Selected: {date.toLocaleString()}</Text> */}
            <ThemedView style={styles.box}>
            {Platform.OS === 'ios' && (
                <DateTimePicker
                    value={date}
                    mode={'date'}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            )}
            {Platform.OS === 'ios' && (
                <DateTimePicker
                    value={date}
                    mode={'time'}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            )}
            </ThemedView>
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 4,
        // alignItems: 'center',
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
        marginVertical: 5,
        alignItems: 'center',
        // width: '80%',
    },
    buttonText: {
        color: '#ffffff',
        // fontSize: 16,
    },
    selectedText: {
        marginTop: 10,
        // fontSize: 16,
        color: '#495057',
    },
    box: {
        flex:1,
        flexDirection: 'row',
        gap: 4,
        alignItems: 'center',
        // justifyContent: 'center',
        // padding: 10,
        // borderRadius: 8,
        // backgroundColor: '#f8f9fa',
        // width: '80%',
    },
});

export default DateTimePickerComponent;
