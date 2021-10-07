import React from 'react'
import {View, StyleSheet, Text, TouchableOpacity, ScrollView} from 'react-native'

export default function SummaryScreen({navigation, route}) {
    var numItems = route.params.num

    return(
        <ScrollView contentContainerStyle = {styles.container} style = {{backgroundColor: "#D0F1DD"}}>
            <View style = {styles.navOptions}>
                <TouchableOpacity style = {styles.playAgain} onPress = {() => {navigation.navigate("Game", {num: numItems})}}>
                    <Text style = {styles.againText}>Play Again</Text>
                </TouchableOpacity>

                <TouchableOpacity style = {styles.playAgain} onPress = {() => {navigation.navigate("Mode")}}>
                    <Text style = {styles.againText}>Go Home</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
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
        width:"45%",
        height:48,
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
        fontSize:20,
        color: "#F6F6F6"
    },
    navOptions: {
        flexDirection:'row',
        marginTop:10,
        alignItems: "center",
        alignSelf:'center'
    }
})