// Componentes base
import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

// Importação de telas e serviços
import Home from './src/screens/Home'
import Redirect from './src/screens/Redirect'
import Restaurantes from './src/screens/Restaurantes'
import Mercados from './src/screens/Mercados'
import { Notification } from './src/services/NotificationService'


// Declaração de constantes
const notificador = Notification;
const Stack = createStackNavigator();

export default class App extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    notificador.configure();
    notificador.createChannel();
    notificador.scheduleNotification();
  }

  onPressSendNotification = () => {
    notificador.showNotification(
      1,
      "Restaurantes",
      "👉 Clique aqui e confira nossos restaurantes.",
      {}, // data
      {} // options
    ),
      notificador.showNotification(
        2,
        "Mercados",
        "👉 Clique aqui e confira nossos mercados parceiros.",
        {}, // data
        {} // options
      )
  }

  onPressCancelAllLocalNotification = () => {
    notificador.cancelAllLocalNotification()
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home">
            {
              ({navigation}) => {
                notificador.setNavigation(navigation)

                return (
                  <Home
                    Send={this.onPressSendNotification}
                    Cancel={this.onPressCancelAllLocalNotification}
                  />
                )
              }
            }
          </Stack.Screen>

          <Stack.Screen name="Redirect" component={Redirect} />
          <Stack.Screen name="Mercados" component={Mercados} />
          <Stack.Screen name="Restaurantes" component={Restaurantes} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

/* Estilização do projeto */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 200,
    marginTop: 10
  }
});