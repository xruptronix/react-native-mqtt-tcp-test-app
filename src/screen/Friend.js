import React from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';
// const net = require('react-native-tcp');
export default class Home extends React.Component {
  
  render() {
    return (
      <View style={styles.container}>
        <Text>Add Friends here</Text>
        {
            this.props.screenProps.possibleFriends.map((friend,index)=>{
                return <Button 
                    title={`Add ${friend}`}
                    onPress={()=>{
                        this.props.screenProps.addFriend(index);
                        this.props.screenProps.sendData('react_native',friend);
                        }
                    }
                    key={index}
                />
            })
        }
        <Button 
            title='Back to home'
            onPress={()=>{
                this.props.navigation.navigate('Home');
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