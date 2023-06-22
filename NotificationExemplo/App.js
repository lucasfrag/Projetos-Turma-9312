// Componentes base
import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { Notification } from './src/services/NotificationService'

// Declaração de constantes
const notificador = Notification;

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
      "Esse é o nosso título",
      "E aqui está a mensagem. Vamos inserir uma mensagem um pouco mais longa para vermos o Android irá se adaptar ao conteúdo na tela?",
      {}, // data
      {} // options
    ),
    notificador.showNotification(
      1,
      "Teste 2 😄",
      "Teste 2 🥰",
      {}, // data
      {} // options
    ),
    notificador.showNotification(
      2,
      "Teste 3 ✅",
      "Teste 3",
      {}, // data
      {} // options
    )
  }

  onPressCancelAllLocalNotification = () => {
    notificador.cancelAllLocalNotification()
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={this.onPressSendNotification}
        >
          <Text>Enviar notificação</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={this.onPressCancelAllLocalNotification}>
          <Text>Cancelar notificações</Text>
        </TouchableOpacity>
      </View>
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