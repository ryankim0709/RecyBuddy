import * as React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from 'react-native'

export default function HomeScreen({navigation}) {


        return(
            <ScrollView contentContainerStyle = {styles.contianer} style = {{backgroundColor: "#D0F1DD"}}>

            </ScrollView>
        )
    
}

const styles = StyleSheet.create({
    contianer: {
        flex:1,
        alignItems:'center',
        backgroundColor: "#D0F1DD"
    },
    gameButton: {
        width: Dimensions.get('window').width * 7/10,
        height: Dimensions.get('window').height * 1/10,
        backgroundColor: '#b5e48c',
        justifyContent:'center',
        borderRadius:10
    },
    gameText: {
        textAlign:'center',
        fontWeight:'bold',
        alignItems:'center',
        fontSize:30
    }
})