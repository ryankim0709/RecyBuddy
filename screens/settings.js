import React from 'react'
import {View, StyleSheet, Text, Switch} from 'react-native'
import ToggleSwitch from 'toggle-switch-react-native'

export default function settings() {
    const [switchValue, setSwitchValue] = React.useState(false);

  return(
      <View style = {styles.container}>
          <Switch
          style={{marginTop: 30}}
          trackColor={{
            false: "#1a1030",
            true: "#1a1030"
          }}
          onValueChange={() => {setSwitchValue(!switchValue)}}
          value={switchValue}
        />
      </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    }
})