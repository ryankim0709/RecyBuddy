import React from 'react'
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native'

export default function SummaryScreen({navigation, route}) {
    var numItems = route.params.num

    return(
        <View style = {styles.container}>
            <View style = {styles.navOptions}>
                <TouchableOpacity style = {styles.playAgain} onPress = {() => {navigation.navigate("Options")}}>
                    <Text style = {styles.againText}>Play Again with different settings!</Text>
                </TouchableOpacity>

                <TouchableOpacity style = {styles.playAgain} onPress = {() => {navigation.navigate("Game", {num: numItems})}}>
                    <Text style = {styles.againText}>Play Again with same settings!</Text>
                </TouchableOpacity>

                <TouchableOpacity style = {styles.playAgain} onPress = {() => {navigation.navigate("Mode")}}>
                    <Text style = {styles.againText}>Go Home</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignContent: 'center',
        //alignItems:'center',
        backgroundColor: "#D0F1DD"
    },
    playAgain: {
        backgroundColor: "#09B44D",
        width:"70%",
        height:60,
        borderRadius:20,
        alignItems:'center',
        justifyContent:'center',
        textAlign:'center',
        margin: 5
    },
    againText: {
        fontWeight:'bold',
        //textAlign:'center',
        //alignSelf:'center',
        fontSize:25,
        color: "#F6F6F6"
    },
    navOptions: {
        //flex:0.5,
        //flexDirection:'column',
        //marginTop:10
    }
})