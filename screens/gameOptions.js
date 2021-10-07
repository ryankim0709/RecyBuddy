import React, {useState} from 'react'
import{View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native'
import WheelPicker from 'react-native-wheely';

export default function gameOptions({navigation, route}) {
    const[times, setTimes] = useState(10)
    const [selected, setSelected] = useState(0);
    const choices = [1,5,10,15,13]

    return(
        <View style = {styles.container}>
            <View>
            <WheelPicker
                options={choices}
                selected = {selected}
                itemStyle = {{backgroundColor: "#09B44D"}}
                itemTextStyle = {{color: "#F6F6F6"}}
                onChange={(num) => setSelected(num)}
                containerStyle = {{}}
            />
            </View>

            <TouchableOpacity  style = {styles.navigateButton} onPress = {() => {
                navigation.navigate("Game", {num: choices[selected]})
                }}>
                <Text style = {styles.navigateText}>Play with {choices[selected]} items</Text>
            </TouchableOpacity>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
        backgroundColor: "#D0F1DD",
        justifyContent:'center'
    },
    navigateButton: {
        borderRadius:10,
        backgroundColor: "#09B44D",
        width:"80%",
        textAlign:'center',
        alignItems:'center',
        justifyContent:'center',
        height: 40
    },
    navigateText: {
        fontSize:25,
        fontWeight:'bold',
        textAlign:'center',
        color: "#F6F6F6"
    },
    text: {
        fontSize:25,
        fontWeight:'bold',
        textAlign:'center',
        color:"#262626"
    }
})