import { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import TagFilter from '../components/TagFilter';
import BackArrow from '../../../assets/backArrow.svg';
import Searchbar from '../components/Searchbar';
// import { act } from 'react-test-renderer';

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

const AddActivityCard = function ({ navigation, route }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTags, setActiveTags] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false
  ]);

  const onChangeSearch = query => setSearchQuery(query);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.paddingHorizontal}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <BackArrow height={15} width={15} />
          <Text style={styles.backText}> Back </Text>
        </TouchableOpacity>
        <Text style={styles.header}> {route.params.header} Activity Card </Text>
        <Text style={styles.tags}> Tags: </Text>
        <View style={styles.tagContainer}>
          {TAGS.map((tag, index) => (
            <TagFilter
              key={index}
              tagContent={tag}
              active={activeTags[index]}
              onPress={() => {
                // make a copy of the active tags
                const newActiveTags = activeTags.slice();
                newActiveTags[index] = !newActiveTags[index];
                setActiveTags(newActiveTags);
              }}
            />
          ))}
        </View>
        <Searchbar
          placeholder="Search by title or keyword"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    backgroundColor: '#FFFAF5'
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  header: {
    color: 'black',
    fontSize: 24,
    fontFamily: 'Poppins',
    marginTop: '5%',
    fontWeight: '700'
  },
  tags: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'Mulish',
    fontWeight: '400',
    marginTop: '1%',
    marginBottom: '2%'
  },
  backText: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'Mulish',
    fontWeight: '400'
  },
  backButton: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '10%',
    width: '20%',
    justifyContent: 'space-evenly'
  },
  paddingHorizontal: {
    paddingHorizontal: '5%'
  }
});

export default AddActivityCard;
