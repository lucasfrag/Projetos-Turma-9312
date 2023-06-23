// Componentes base
import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'

export default class Mercados extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Essa é a tela de mercados.</Text>
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
    }
});