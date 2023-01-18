import * as React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useState
} from 'react-native';
import TagFilter from '../components/TagFilter';
import BackArrow from '../../../assets/backArrow.svg';
import { Searchbar } from 'react-native-paper';

const TAGS = [
  'Warm Up',
  'No Equipment',
  'Beginner',
  'Rhythm',
  'Note Reading',
  'Group Activity',
  'Quick',
  'Scale'
];

const AddActivityCard = function () {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.paddingHorizontal}>
        <TouchableOpacity style={styles.backButton}>
          <BackArrow height={15} width={15} />
          <Text style={styles.backText}> Back </Text>
        </TouchableOpacity>
        <Text style={styles.header}> Main Lesson Activity Card </Text>
        <Text style={styles.tags}> Tags: </Text>
        <View style={styles.tagContainer}>
          {TAGS.map((tag, index) => (
            <TagFilter key={index} tagContent={tag} />
          ))}
        </View>
        <Searchbar
          placeholder="Search by title or keyword"
          onChangeText={onChangeSearch}
          value={searchQuery}
          icon={require('../../../assets/search.png')}
          style={{ backgroundColor: 'white', marginTop: '3%' }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    width: '100%'
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  header: {
    color: 'black',
    fontSize: 22,
    fontFamily: 'Poppins',
    marginTop: '5%',
    fontWeight: '900'
  },
  tags: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'Mulish-Regular',
    marginTop: '-1%',
    marginBottom: '2%'
  },
  backText: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'Roboto-Regular'
  },
  backButton: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '30%',
    width: '20%',
    justifyContent: 'space-evenly'
  },
  paddingHorizontal: {
    paddingHorizontal: '3%'
  }
});

export default AddActivityCard;
