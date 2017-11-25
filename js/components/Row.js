import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

export default class Row extends Component {
    static propTypes = {
        data: PropTypes.object,
        onPress: PropTypes.func
    }

    static defaultProps = {
        data: false
    }
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <TouchableOpacity style={styles.container} onPress={() => this.props.onPress(this.props.data) }>
                <Text>{this.props.data.id}</Text>
                <Text>{this.props.data.title}</Text>
            </TouchableOpacity>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        height: 30, 
        flexDirection: 'row', 
        justifyContent: 'space-between'
    },
  });
