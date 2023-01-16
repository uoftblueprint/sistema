import { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native'
import { Overlay } from '@rneui/themed';

const SistemaOverlay = (props) => {

    return (
        <Overlay isVisible={props.visible} onBackdropPress={props.onBackdropPress}>
            <View>
                <Text>
                    {props.header}
                </Text>
                <Text>
                    {props.body}
                </Text>
            </View>
        </Overlay>
    );


}

export default SistemaOverlay;