import React from 'react'
import { View, Text,Image, StyleSheet,Dimensions } from 'react-native'

export default class InfoCard extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        var object = this.props.object
        var facts = this.props.facts
        var valid = this.props.valid
        if(object == "--" || object == "" || object == null || valid === false) {
            return(
                <View style = {styles.container}>
                    
                </View>
            )
        }

        else {
            if((typeof(facts[1]) === 'undefined')) {
                return(
                    <View style = {styles.container}>
                        <Text>NOT FOUND</Text>
                    </View>
                )
            }
            
            else {
                var type = facts[1]
                var learnMore = facts[0]
                var message = "black bin"
                var path = require('./photos/landfillBin.png')

                if(type == "compostable") {
                    path = require('./photos/compostBin.png')
                    message = "green bin"
                }
                else if(type == "recyclable") {
                    path = require('./photos/recycleBin.png')
                    message = "blue bin"
                }
            
                return(
                    <View style = {styles.container}>
                        <Image source = {path} style = {styles.symbol}/>
                        <Text style = {styles.learnText}>Your {this.props.object.toLowerCase()} is {this.props.facts[1]}</Text>
                        <Text style = {styles.learnText}>Put your {this.props.object} in the {message}</Text>
                        <Text></Text>
                        <Text style = {{fontSize:20}}></Text>
                    </View>
                )
            }

        }
    }
}

const styles = StyleSheet.create({
    container: {
        //width: Dimensions.get('window').width * 4/5,
        //height: Dimensions.get('window').height * 2/5,
        //borderColor:'black',
        //borderWidth:10,
        alignSelf:'center'
    },
    symbol: {
        width:200,
        height:200,
        alignSelf:'center'
    },
    learnText: {
        textAlign:'center',
        fontSize:20
    }
})