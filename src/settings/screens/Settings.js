import {
  SafeAreaView,
  Text,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
} from 'react-native';
import Header from '../../Components/Header';

const Settings = ({ navigation }) => {

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} showInfoIcon={false} />

      <ScrollView>
        <Text style={styles.title}>Settings</Text>
        <View style={styles.buttonContainer}>

        </View>

        <Text style={styles.title}>Policies</Text>
        <View style={styles.buttonContainer}>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#FFFAF5',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    letterSpacing: 0.3,
    color: '#453E3D',
    marginHorizontal: 30,
    marginBottom: 10,
  },
  buttonContainer: {
    marginHorizontal: 30,
    display: 'flex',
    flexDirection: 'column',
  }
});

export default Settings;
