import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import '~/config/ReactotronConfig';
// import { StyleSheet, Text, View } from 'react-native';
import createNavigator from './routes';

export default class App extends Component {
  state = {
    userLogged: false,
    userChecked: false,
  };

  async componentDidMount() {
    const username = await AsyncStorage.getItem('@Githuber:username');

    this.setState({
      userChecked: true,
      userLogged: !!username,
    });
  }

  render() {
    const { userLogged, userChecked } = this.state;

    if (!userChecked) return null;

    const Routes = createNavigator(userLogged);

    return <Routes />;
  }
}
