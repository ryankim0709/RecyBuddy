import React from 'react'
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native'

export default function SummaryScreen({navigation, route}) {
    var numItems = route.params.num
    var type = route.params.type
    console.log("Num Items: "+numItems)
    return(
        <View style = {styles.container}>
            <View style = {styles.navOptions}>
                <TouchableOpacity style = {styles.playAgain} onPress = {() => {navigation.navigate("Options", {type: type})}}>
                    <Text style = {styles.againText}>Play Again with different settings!</Text>
                </TouchableOpacity>

                <TouchableOpacity style = {styles.playAgain} onPress = {() => {navigation.navigate("Game", {num: numItems, type: type})}}>
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
        alignItems:'center',
        marginTop:10
    },
    playAgain: {
        backgroundColor: "#95d5b2",
        width:"28%",
        height:60,
        borderRadius:20,
        alignItems:'center',
        justifyContent:'center',
        textAlign:'center',
        margin: 5
    },
    againText: {
        fontWeight:'bold',
        textAlign:'center',
        alignSelf:'center',
        fontSize:15
    },
    navOptions: {
        flex:0.5,
        flexDirection:'row'
    }
})