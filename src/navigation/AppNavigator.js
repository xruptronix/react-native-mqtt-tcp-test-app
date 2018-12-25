import { createStackNavigator,createAppContainer } from 'react-navigation';
import Home from '../screen/Home';
import Friend from '../screen/Friend';

const AppNavigator = createStackNavigator(
    {
        Home: {
            screen: Home
        },
        Friend: {
            screen: Friend
        }
    },
    {
        initialRouteName: 'Home'
    }
);

export default createAppContainer(AppNavigator);