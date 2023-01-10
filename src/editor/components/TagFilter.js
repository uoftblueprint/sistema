import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';

const TagFilter = function (props) {
    return (
        <TouchableOpacity style={styles.tagContainer}>
            <Text style={styles.text}>{props.tagContent}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    tagContainer: {
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: '#afafaf',
        marginHorizontal: 5,
        marginVertical: 4
    },
    text: {
        fontWeight: 'bold',
        FontFamily: 'Roboto-Regular'

    }
})

export default TagFilter;