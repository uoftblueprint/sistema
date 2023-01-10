import React from "react";
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import TagFilter from '../components/TagFilter'

const TAGS = [
    'Warm Up',
    'No Equipment',
    'Beginner',
    'Rhythm',
    'Note Reading',
    'Group Activity',
    'Quick',
    'Scale',
]

const AddActivityCard = function () {
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity>
                <Text style={styles.back}> Back </Text>
            </TouchableOpacity>
            <Text style={styles.header}> Main Lesson Activity Card </Text>
            <Text style={styles.tags}> Tags: </Text>
            <View style={styles.tagContainer}>
                {TAGS.map((tag, index) => (
                    <TagFilter key = {index} tagContent={tag} />
                    )
                )}

            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        width: '100%',
        paddingHorizontal: '3%'
    },
    tagContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    header:{
        color: 'black',
        fontSize: 22,
        fontFamily: 'Poppins-ExtraBold'
    },
    tags: {
        color: 'black',
        fontSize: 15,
        fontFamily: 'Mulish-Regular'
    },
    back: {
        color: 'black',
        fontSize: 18,
        fontFamily: 'Roboto-Regular'
    }
})

export default AddActivityCard;