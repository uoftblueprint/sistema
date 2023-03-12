import {
  StyleSheet,
  SafeAreaView,
  Text,
  ScrollView,
  Dimensions,
} from 'react-native';
import AddButton from './components/AddToLessonButton';
import Header from '../Components/Header';

const windowHeight = Dimensions.get('window').height;

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
          {/* pass in props.cardTitle eventually */}
          <Text style={styles.title}> TITLE </Text>

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
    marginTop: 15,
    width: '75%',
    height: windowHeight * 0.55,
  },
  title: {
    color: '#453E3D',
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    width: '60%',
    textAlign: 'center',
    marginBottom: 40,
  },
});

export default ExpandedCard;
