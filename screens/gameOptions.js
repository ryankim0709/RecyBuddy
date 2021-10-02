import React, {useState} from 'react'
import{View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native'
import WheelPicker from 'react-native-wheely';

export default function gameOptions({navigation, route}) {
    const[times, setTimes] = useState(10)
    const [selected, setSelected] = useState(0);
    const choices = [1,5,10,15]

    return(
        <View style = {styles.container}>
            <View>
                <Text style = {styles.text}>Choose the number of items you would like to play with</Text>
                <Text>{choices[selected]}</Text>
            </View>
            <View>
            <WheelPicker
                options={[1,5,10,15]}
                selected = {selected}
                itemStyle = {{backgroundColor: "#09B44D"}}
                itemTextStyle = {{color: "#F6F6F6"}}
                onChange={(num) => setSelected(num)}
            />
            </View>

            <TouchableOpacity  style = {styles.navigateButton} onPress = {() => {
                navigation.navigate("Game", {num: choices[selected]})
                }}>
                <Text style = {styles.navigateText}>Play game with {choices[selected]} items</Text>
            </TouchableOpacity>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
        backgroundColor: "#D0F1DD"
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