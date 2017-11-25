/* 
    Mode:
    1. String
    2. Image Vertication
*/
import React, { Component } from 'react';
import { Modal, Text, TouchableOpacity, View, StyleSheet, Animated, Image, TextInput, Dimensions } from 'react-native';
import PropTypes from 'prop-types';

export default class Dialog extends Component {

    static propTypes = {
        visible: PropTypes.bool,
        onPress: PropTypes.func,
        header: PropTypes.string,
        content: PropTypes.object,
        onConfirm: PropTypes.func,
        onCancel: PropTypes.func,
        renderContent: PropTypes.func,
        height: PropTypes.number,
        width: PropTypes.number,

        isCancel: PropTypes.bool
    }

    static defaultProps = {
        visible: false,
        header: 'data - body',
        content: 'content',
        height: Dimensions.get('window').height * 0.67,
        width: Dimensions.get('window').width * 0.67,

        isCancel: true
    }
    constructor(props) {
        super(props);        
        this.springValue = new Animated.Value(1);
    }
    _renderContent() {
        return (
            <View style={styles.content}>
                <Text style={styles.contentText}>{this.props.content ? this.props.content.body : '' }</Text>
            </View>
        );
    }
    _renderCancel() {
        if (this.props.isCancel) {
            return (
                <TouchableOpacity
                    style={[styles.button, { borderRightWidth: 1 }]}
                    onPress={() => this.props.onCancel()}
                >
                    <Text style={styles.buttonText}>{'Close'}</Text>
                </TouchableOpacity>
            );
        }
    }
    // 可以傳入一個component
    renderContent() {
        if (this.props.renderContent) {
            return (
                <View style={styles.content}>
                    { React.cloneElement(this.props.renderContent()) }
                </View>    
            );
        }
        return this._renderContent();
    }
    render() {
        return (
            <Modal
            animationType="fade"
            transparent={true}
            visible={this.props.visible}
            >
                <View style={styles.modal}>
                    <View style={[styles.container, { height: this.props.height, width: this.props.width }]}>
                        <View style={styles.headerContentContainer}>
                            <View style={styles.header}>
                                <Text style={styles.headerText}>{this.props.header}</Text>
                            </View>
                            { this.renderContent() }
                        </View>
                        <View style={styles.buttons}>
                            { this._renderCancel() }
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => this.props.onConfirm()}
                            >
                                <Text style={styles.buttonText}>{'Confirm'}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}
const largefontSize = 18;

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'grey',  
    },
    container: {
        backgroundColor: 'white',
        borderRadius: 5
    },
    headerContentContainer: {
        flex: 1,
    },
    header: {
        // flex: 2,
        marginTop: 20,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    content: {
        // flex: 3,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    headerText: {
        fontSize: largefontSize
    },
    contentText: {
        
    },
    buttons: {
        height: 50,
        flexDirection: 'row'
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 1,
        borderColor: 'grey'
    },
    buttonText: {
        fontSize: largefontSize,
        color: 'grey'
    }
});
