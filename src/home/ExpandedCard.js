import { StyleSheet, SafeAreaView, Text, ScrollView } from 'react-native';
import AddButton from './components/AddToLessonButton';
import Header from '../Components/Header';
import { TextStyle } from '../Styles.config';
import { verticalScale } from 'react-native-size-matters';

const ExpandedCard = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.background}>
      <Header
        navigation={navigation}
        showInfoIcon={true}
        showBackButton={true}
      />

      <ScrollView>
        <SafeAreaView
          style={{ justifyContent: 'center', alignItems: 'center' }}>
          {/* Pass in props.cardTitle eventually. You want to parse the parts around the dashes for the third part of the title */}
          <Text style={[styles.title, TextStyle.h2]}>Listening Spinners</Text>
          <Text style={[TextStyle.h3, styles.subtitle]}>
            Theme:
            {/* You'll parse the name of the activity card to get the theme (first part of title) */}
            <Text style={TextStyle.h3}> THEME HERE</Text>
          </Text>
          <Text style={[TextStyle.h3, styles.subtitle]}>
            Activity Type:
            {/* You'll parse the name of the activity card to get the type (second part of title) */}
            <Text style={TextStyle.h3}> TYPE HERE</Text>
          </Text>
          <SafeAreaView style={styles.box}>
            {/* CARD CONTENT GOES HERE */}
          </SafeAreaView>

          <AddButton />
        </SafeAreaView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#FFFAF5',
    height: '100%',
  },
  box: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    width: '75%',
    marginTop: 30,
    height: verticalScale(400),
  },
  title: {
    width: '75%',
    textAlign: 'left',
    marginBottom: 5,
  },
  subtitle: {
    width: '75%',
    textAlign: 'left',
    fontFamily: 'Mulish-Bold',
  },
});

export default ExpandedCard;
