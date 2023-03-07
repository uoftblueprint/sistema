import {
  SafeAreaView,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Header from '../../Components/Header';
import BackArrow from '../../../assets/backArrow.svg';

const TemplatePolicy = ({ navigation, title, content }) => {

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} showInfoIcon={false} />

      <SafeAreaView style={styles.inlineTitle}>
        <TouchableOpacity onPress={navigation.goBack()}>
          <BackArrow height={'30'} width={'30'} />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
      </SafeAreaView>

      <ScrollView>
        {content}
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

export default TemplatePolicy;
