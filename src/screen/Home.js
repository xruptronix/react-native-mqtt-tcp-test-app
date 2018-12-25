import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
// const net = require('react-native-tcp');
export default class Home extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>We have {this.props.screenProps.currentFriends.length } friends!</Text>
        <Button 
            title='Add more friends'
            onPress={()=>{
                this.props.navigation.navigate('Friend');
            }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});