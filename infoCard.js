import React from 'react'
import { View, Text,Image, StyleSheet,Dimensions } from 'react-native'

export default class InfoCard extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        var object = this.props.object
        var facts = this.props.facts
        console.log("Object: "+object)
        console.log("Facts: "+facts)
        if(object == "--" || object == "" || object == null || !this.props.valid) {
            console.log("NOPE")
            return(
                <View style = {styles.container}>
                    
                </View>
            )
        }

        else {
            //console.log("OBJECT: "+object)
            
            if((typeof(facts[1]) === 'undefined')) {
                return(
                    <View style = {styles.container}>
                        <Text>NOT FOUND</Text>
                    </View>
                )
            }
            var type = facts[1]
            var learnMore = facts[0]
            //console.log("type: "+type)
            var path = require('./photos/qmark.jpg')
            if(type == "compostable") {
                path = require('./photos/compostSymbol.png')
                
            }
            else if(type == "recyclable") {
                path = require('./photos/recycleSymbol.jpg')
            }
            
            return(
                <View style = {styles.container}>
                    <Image source = {path} style = {styles.symbol}/>
                    <Text style = {styles.learnText}>Your {this.props.object} is {this.props.facts[1]}</Text>
                    <Text style = {styles.learnText}>Put your {this.props.object} in the </Text>
                    <Text></Text>
                    <Text style = {{fontSize:20}}></Text>
                </View>
            )

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