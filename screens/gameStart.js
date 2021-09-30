import * as React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'

export default function gameStart({navigation}) {


        return(
            <View style  = {styles.contianer}>

                <TouchableOpacity style = {styles.gameButton} onPress = {() => {
                    navigation.navigate("Options")
                }} >
                    <Text style = {styles.gameText}>Learn mode</Text>
                </TouchableOpacity> 
            </View>
        )
    
}

const styles = StyleSheet.create({
    contianer: {
        flex:1,
        alignItems:'center',
        marginTop:10
    },
    gameButton: {
        width: Dimensions.get('window').width * 7/10,
        height: Dimensions.get('window').height * 1/10,
        backgroundColor: '#b5e48c',
        justifyContent:'center',
        borderRadius:10,
        marginTop:10
    },
    gameText: {
        textAlign:'center',
        fontWeight:'bold',
        alignItems:'center',
        fontSize:30
    }
})