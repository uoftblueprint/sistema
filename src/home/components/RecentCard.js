import {
  StyleSheet,
  SafeAreaView,
  Text,
  ScrollView,
  Dimensions,
} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const RecentCard = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.box}>
        <ScrollView>{/* <Text>CARD GOES HERE</Text> */}</ScrollView>

        <SafeAreaView style={styles.titleBar}>
          <Text style={styles.title} numberOfLines={1}>
            Listening - Knowledge - Listening Spinners
          </Text>
        </SafeAreaView>
      </SafeAreaView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginVertical: 15,
    width: '100%',
    height: windowHeight * 0.25,
  },
  scrollview: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleBar: {
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    width: '100%',
    height: '19%',
    backgroundColor: '#4D8ECB',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: 'Mulish-Italic',
    color: '#FFFFFF',
    width: '100%',
  },
});

export default RecentCard;
