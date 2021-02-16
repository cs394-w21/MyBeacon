import React from 'react';
import {View, Text, StyleSheet} from 'react-native';


const ContinueAsGuest = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text} onPress={() => navigation.navigate('HomeScreen')}>Continue as guest</Text>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        alignContent: 'center',
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: '25%'
    }, 
    text: {
        color: '#223fd4',
        fontSize: 15,
    }
})

export default ContinueAsGuest;