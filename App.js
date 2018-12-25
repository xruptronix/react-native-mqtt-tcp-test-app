/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';


export default class App extends Component{
  state = {
    possibleFriends:[
      'Tushar',
      'Ekesh',
      'Saurav',
      'Lomas',
      'Sagar',
      'Sanjaya'
    ],
    currentFriends:[]
  }

  addFriend = (index)=> {
    const {
      possibleFriends,
      currentFriends
    } = this.state;
    const addedFriend = possibleFriends.splice(index,1);
    currentFriends.push(addedFriend);

    this.setState({
      currentFriends,
      possibleFriends
    });

  }

  render() {
    return (
      <AppNavigator 
        screenProps = {{
          currentFriends: this.state.currentFriends,
          possibleFriends: this.state.possibleFriends,
          addFriend: this.addFriend
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
