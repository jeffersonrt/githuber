import React from 'react';

import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import styles from './styles';

const RepositoryItem = ({ repository }) => (
  <View style={styles.container}>
    <Text style={styles.title}>{repository.full_name}</Text>
    <View style={styles.infoContainer}>
      <View style={styles.info}>
        <Icon size={12} name="star" style={styles.infoIcon} />
        <Text style={styles.infoText}>{repository.stargazers_count}</Text>
      </View>
      <View style={styles.info}>
        <Icon size={12} name="code-fork" style={styles.infoIcon} />
        <Text style={styles.infoText}>{repository.forks_count}</Text>
      </View>
      <View style={styles.info}>
        <Icon size={12} name="eye" style={styles.infoIcon} />
        <Text style={styles.infoText}>{repository.watchers_count}</Text>
      </View>
    </View>
  </View>
);

RepositoryItem.propType = {
  repository: PropTypes.shape({
    full_name: PropTypes.string,
    stargazers_count: PropTypes.number,
    forks_count: PropTypes.number,
    watchers_count: PropTypes.number,
  }).isRequired,
};

export default RepositoryItem;
