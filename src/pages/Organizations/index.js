import React, { Component } from 'react';
import {
  View, FlatList, AsyncStorage, ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';
import api from '~/services/api';

import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '~/components/Header';
import OrganizationItem from './OrganizationItem';

import styles from './styles';

const TabIcon = ({ tintColor }) => <Icon name="building" size={20} color={tintColor} />;

TabIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

export default class Organization extends Component {
  static navigationOptions = {
    tabBarIcon: TabIcon,
  };

  state = {
    data: [],
    isLoading: true,
    refreshing: false,
  };

  componentDidMount() {
    this.loadOrganization();
  }

  loadOrganization = async () => {
    this.setState({ refreshing: true });

    const username = await AsyncStorage.getItem('@Githuber:username');
    const { data } = await api.get(`/users/${username}/orgs`);

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
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        onRefresh={this.loadOrganization}
        refreshing={refreshing}
      />
    );
  };

  renderListItem = ({ item }) => <OrganizationItem organization={item} />;

  render() {
    const { isLoading } = this.state;
    return (
      <View style={styles.container}>
        <Header title="Organization" />
        {isLoading ? <ActivityIndicator style={styles.loaging} /> : this.renderList()}
      </View>
    );
  }
}
