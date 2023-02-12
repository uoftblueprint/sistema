import {
  StyleSheet,
  SafeAreaView,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import AddButton from './components/AddToLessonButton';
import BackArrow from '../../assets/backArrow';
import Header from '../Components/Header';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ExpandedCard = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.background}>
      <Header showInfoIcon={true} />

      <TouchableOpacity
        style={styles.backArrowContainer}
        onPress={() => navigation.goBack()}>
        <BackArrow height={30} width={15} style={styles.backArrow} />
      </TouchableOpacity>

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
    height: '100%'
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
    height: windowHeight * 0.55
  },
  scrollview: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    color: '#453E3D',
    fontSize: 20,
    fontWeight: '700',
    width: '60%',
    textAlign: 'center',
    marginBottom: 40
  },
  backArrowContainer: {
    position: 'absolute',
    top: 20,
    bottom: 0,
    left: 25,
    right: 0
  },
  backArrow: {
    fill: '#222222'
  }
});

export default ExpandedCard;
