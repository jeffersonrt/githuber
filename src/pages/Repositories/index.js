import React, { Component } from 'react';
import {
  View, ActivityIndicator, AsyncStorage, FlatList,
} from 'react-native';
import PropTypes from 'prop-types';
import api from '~/services/api';
import Icon from 'react-native-vector-icons/FontAwesome';

import Header from '~/components/Header';
import RepositoryItem from './RepositoryItem';

import styles from './styles';

const TabIcon = ({ tintColor }) => <Icon name="list-alt" size={20} color={tintColor} />;

TabIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

export default class Repositories extends Component {
  static navigationOptions = {
    tabBarIcon: TabIcon,
  };

  state = {
    data: [],
    isLoading: true,
    refreshing: false,
  };

  componentDidMount() {
    this.loadRepositories();
  }

  loadRepositories = async () => {
    this.setState({ refreshing: true });

    const username = await AsyncStorage.getItem('@Githuber:username');
    const { data } = await api.get(`/users/${username}/repos`);

    this.setState({
      data,
      isLoading: false,
      refreshing: false,
    });
  };

  renderList = () => {
    const { data, refreshing } = this.state;
    return (
      <FlatList
        data={data}
        keyExtractor={item => String(item.id)}
        renderItem={this.renderListItem}
        onRefresh={this.loadRepositories}
        refreshing={refreshing}
      />
    );
  };

  renderListItem = ({ item }) => <RepositoryItem repository={item} />;

  render() {
    const { isLoading } = this.state;
    return (
      <View style={styles.container}>
        <Header title="Repositories" />
        {isLoading ? <ActivityIndicator style={styles.loaging} /> : this.renderList()}
      </View>
    );
  }
}
