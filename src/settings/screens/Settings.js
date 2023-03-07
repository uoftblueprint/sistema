import { SafeAreaView, Text, StyleSheet, ScrollView, View } from 'react-native';
import { policyPages } from '../constants';
import Header from '../../Components/Header';
import IconButton from '../components/IconButton';
import PolicyButton from '../components/PolicyButton';
import CloudUpload from '../../../assets/cloudUploadOutline.svg';
import Trash from '../../../assets/trashIcon.svg';

const Settings = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header
        navigation={navigation}
        showInfoIcon={false}
        showBackButton={false}
      />

      <ScrollView>
        <Text style={styles.title}>Settings</Text>
        <View style={styles.buttonContainer}>
          <IconButton
            title={'Back Up Data'}
            handlePress={() => console.log('hi')}>
            <CloudUpload width={25} height={25} />
          </IconButton>
          <IconButton
            title={'Clear App Data'}
            handlePress={() => console.log('bye')}>
            <Trash width={25} height={25} />
          </IconButton>
        </View>

        <Text style={styles.title}>Policies</Text>
        <View style={styles.buttonContainer}>
          {policyPages.map((policyPage, i) => (
            <PolicyButton
              key={i}
              title={policyPage.title}
              content={policyPage.text}
              navigation={navigation}
            />
          ))}
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
  },
});

export default Settings;
