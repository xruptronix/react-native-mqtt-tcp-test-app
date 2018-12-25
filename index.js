/** @format */

import {AppRegistry} from 'react-native';
// import App from './App';


import {name as appName} from './app.json';

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
const net = require('react-native-tcp');

import AppNavigator from './src/navigation/AppNavigator';

import { Client, Message } from 'react-native-paho-mqtt';
 
//Set up an in-memory alternative to global localStorage
const myStorage = {
  setItem: (key, item) => {
    myStorage[key] = item;
  },
  getItem: (key) => myStorage[key],
  removeItem: (key) => {
    delete myStorage[key];
  },
};
 
class App extends Component{
  state = {
    possibleFriends:[
      'Ekesh',
      'Binod',
      'Bigyan',
      'Lomas',
      'Sagar',
      'Sanjaya'
    ],
    currentFriends:[]
  }

  componentDidMount(){
    const mqtt_client = new Client({ uri: 'ws://139.59.69.60:1884/mqtt', clientId: 'clientId', storage: myStorage });

    mqtt_client.connect()
    .then(() => {
      alert('mqtt connected')
    })
    .catch((responseObject) => {
        if (responseObject.errorCode !== 0) {
        console.log('onConnectionLost:' + responseObject.errorMessage);
        }
    });

    let client = net.createConnection(1337, () => {
        client.write('Hello, server! Love, Client.');
    });
  
    client.on('data', (data) => {
    });

    client.on('error', (error) => {
        alert(error);
    });

    client.on('close', () => {
    });

    setInterval(()=>{
        navigator.geolocation.getCurrentPosition(
            position => {
              const location = JSON.stringify(position);
              try{
                this.client.write(location);
              }catch(e){

              }
              
            },
            error => alert(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    },10000)

    this.client = client;
    this.mqtt_client = mqtt_client;
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

  sendData = (topic,data)=>{
    const message = new Message(data);
    message.destinationName = topic;
    this.mqtt_client.send(message);
  }

  render() {
    return (
      <AppNavigator 
        screenProps = {{
          currentFriends: this.state.currentFriends,
          possibleFriends: this.state.possibleFriends,
          addFriend: this.addFriend,
          sendData: this.sendData
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


AppRegistry.registerComponent(appName, () => App);
