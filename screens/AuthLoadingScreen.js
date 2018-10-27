import React from 'react'
import { ActivityIndicator, AsyncStorage, StatusBar, StyleSheet, View, TextInput, Button } from 'react-native'
import { getCurrentUser } from '../firebase'
import { setSaveUserName } from '../firebase/saveName'

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = { text: '' }
    //this._bootstrapAsync()
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const currentUser = await getCurrentUser()
    this.props.navigation.navigate('App')
  }

  _saveName = () => {
    setSaveUserName(this.state.text).then(this._bootstrapAsync())
  }

  _textUpdate = text => {
    this.setState({ text })
  }
  //En el onPress del <Button> guardar el nombre del usuario en la collection users usando el userId como key y { name: 'El nombre' } como valor.

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          value={this.state.text}
          title="ingrese su nombre"
          placeholder="ingrese su nombre"
          onChangeText={this._textUpdate}
        />
        <Button title="Guardar" onPress={this._saveName} />
        {/*<ActivityIndicator />*/}
        <StatusBar barStyle="default" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
