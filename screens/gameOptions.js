import React, {useState} from 'react'
import{View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import ScrollPicker from 'react-native-wheel-scrollview-picker';
import WheelPicker from 'react-native-wheely';

export default function gameOptions({navigation, route}) {
    const[times, setTimes] = useState(10)
    const [selected, setSelected] = useState(0);
    const choices = [1,5,10,15]

    return(
        <View style = {styles.container}>
            <View>
                <Text style = {{paddingTop:20}}>Choose the number of items you would like to play with</Text>
                <Text>{choices[selected]}</Text>
            </View>
            <View>
            <WheelPicker 
                options={[1,5,10,15]}
                selected = {selected}
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
        alignItems:'center'
    },
    navigateButton: {
        borderRadius:10,
        backgroundColor: "#95d5b2",
        width:"80%",
        textAlign:'center',
        alignItems:'center',
        justifyContent:'center'
    },
    navigateText: {
        fontSize:30,
        fontWeight:'bold',
        textAlign:'center'
    }
})