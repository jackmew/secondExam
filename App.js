/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Row, Dialog } from './js/components';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = { data: null, isDialogVisible: false, dataSelected: null  };
    this._getData();
  }
  _getData() {
    axios({
      method: 'get',
      url: 'https://jsonplaceholder.typicode.com/posts'
    }).then((response) => {
        console.log(response.data);
        this._setData(response.data);
      }).catch((error) => {
        console.log(`error ${error}`);
      });
  }
  _setData(data) {
    this.setState({ data });
  }
  _renderContent() {
    if (!this.state.data) {
      return <Text style={styles.welcome}>{'loading'}</Text>
    }
    console.log(this.state.data);
    return this.state.data.map((d, key) => {
      return <Row key={key} data={d} onPress={(dataOne) => { this.setState({ isDialogVisible: true, dataSelected: dataOne })}}/>
    });
  }
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          { this._renderContent() } 
          <Dialog 
            visible={this.state.isDialogVisible}
            content={this.state.dataSelected}
            isCancel={false}
            onConfirm={() => this.setState({ isDialogVisible: false })}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
