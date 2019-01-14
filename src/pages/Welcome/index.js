import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  AsyncStorage,
  ActivityIndicator,
} from 'react-native';
import styles from './styles';
import api from '~/services/api';

export default class Welcome extends Component {
  state = {
    username: '',
    isLoading: false,
    error: false,
  };

  checkUserExists = async (username) => {
    const user = await api.get(`/users/${username}`);

    return user;
  };

  saveUser = async (username) => {
    await AsyncStorage.setItem('@Githuber:username', username);
  };

  signIn = async () => {
    const { username } = this.state;
    const { navigation } = this.props;

    this.setState({ isLoading: true });

    try {
      await this.checkUserExists(username);
      await this.saveUser(username);
      navigation.navigate('User');
    } catch (err) {
      this.setState({ isLoading: false, error: true });
      console.tron.log('Usuário inexistente');
    }
  };

  render() {
    const { username, isLoading, error } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.title}>Bem-vindo</Text>
        <Text style={styles.text}>Para continuar precisamos que você informe seu usuário.</Text>
        {error && <Text style={styles.error}>Insira um usuário valido.</Text>}
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Digite seu usuário"
            underlineColorAndroid="transparent"
            value={username}
            onChangeText={text => this.setState({ username: text })}
          />
          <TouchableOpacity style={styles.button} onPress={this.signIn}>
            {isLoading ? (
              <ActivityIndicator size="small" color="#FFF" />
            ) : (
              <Text style={styles.buttonText}>Processeguir</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
