import React, { Component } from 'react'
import { createSwitchNavigator, createStackNavigator, createBottomTabNavigator } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'
import { Platform } from 'react-native'

import HomeScreen from './screens/Home'
import FavoritesScreen from './screens/Favorites'
import AuthLoadingScreen from './screens/AuthLoadingScreen'

import firebase, { db } from './firebase'
import { registerForPushNotificationsAsync } from './notification'
import { setUserToken } from './firebase/user'
import { Notifications } from 'expo'

//
const AppStack = createBottomTabNavigator(
  {
    Home: HomeScreen,
    Favorites: FavoritesScreen,
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state
        let iconName
        if (routeName === 'Home') {
          iconName = Platform.select({
            ios: `ios-home${focused ? '' : '-outline'}`,
            android: `md-home`,
          })
        } else if (routeName === 'Favorites') {
          iconName = Platform.select({
            ios: `ios-star${focused ? '' : '-outline'}`,
            android: `md-star${focused ? '' : '-outline'}`,
          })
        }

        return <Ionicons name={iconName} size={25} color={tintColor} />
      },
    }),
    tabBarOptions: {
      activeTintColor: 'blue',
      inactiveTintColor: 'gray',
    },
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  }
)

const MainNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
)

export default class App extends Component {
  componentDidMount() {
    registerForPushNotificationsAsync().then(response => setUserToken(response))

    this._notificationSubscription = Notifications.addListener(this._handleNotification)
  }

  _handleNotification = notification => {
    console.warn('TEST', notification.data.user)
    //this.setState({notification: notification});
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Origin: {this.state.notification.origin}</Text>
        <Text>Data: {JSON.stringify(this.state.notification.data)}</Text>
      </View>
    )
  }

  render() {
    return <MainNavigator />
  }
}
