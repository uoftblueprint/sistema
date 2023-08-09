import { useState } from 'react';
import { SafeAreaView, Text, StyleSheet, ScrollView, View } from 'react-native';
import { policyPages, STACK_SCREENS } from '../constants';
import Header from '../../Components/Header';
import IconButton from '../components/IconButton';
import PolicyButton from '../components/PolicyButton';
import CloudUpload from '../../../assets/icons/cloudUploadOutline.svg';
import Trash from '../../../assets/icons/trashIcon.svg';
import { TextStyle } from '../../Styles.config';
import { deleteFile } from '../../services/routes/Local';
import Overlay from '../../Components/Overlay';
import WarningIcon from '../../../assets/icons/errorAlert.svg';
import SistemaButton from '../../Components/SistemaButton';
import RNRestart from 'react-native-restart';
import { MAINDIRECTORY } from '../../services/constants';
import { verticalScale, scale } from 'react-native-size-matters';

const Settings = ({ navigation }) => {
  const [deleteOverlayVisible, toggleDeleteOverlay] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        navigation={navigation}
        showInfoIcon={false}
        showBackButton={false}
      />

      <ScrollView>
        <Text style={[TextStyle.h2, styles.title]}>Settings</Text>
        <View style={styles.buttonContainer}>
          <IconButton
            title={'Back Up Data'}
            handlePress={() => console.log('hi')}>
            <CloudUpload width={25} height={25} />
          </IconButton>
          <IconButton
            title={'Clear App Data'}
            handlePress={() => toggleDeleteOverlay(true)}>
            <Trash width={25} height={25} />
          </IconButton>
        </View>
        <Overlay
          close={toggleDeleteOverlay}
          visible={deleteOverlayVisible}
          style={styles.deleteOverlayContainer}>
          <View style={styles.warningIconContainer}>
            <WarningIcon height={25} width={25} />
          </View>
          <View style={styles.textColumn}>
            <Text style={[TextStyle.label, { fontWeight: 'bold' }]}>
              Warning! This will reset the app and delete all data.
            </Text>
            <View style={styles.buttonContainer2}>
              <SistemaButton onPress={toggleDeleteOverlay}>
                <Text style={TextStyle.body}> Cancel </Text>
              </SistemaButton>
              <SistemaButton
                onPress={() => {
                  deleteFile(MAINDIRECTORY);
                  RNRestart.Restart();
                }}
                color={'blue'}>
                <Text style={TextStyle.body}> Continue </Text>
              </SistemaButton>
            </View>
          </View>
        </Overlay>
        <Text style={[TextStyle.h2, styles.title]}>Policies</Text>
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
    marginHorizontal: scale(30),
    marginBottom: verticalScale(10),
  },
  buttonContainer: {
    marginHorizontal: scale(30),
    display: 'flex',
    flexDirection: 'column',
  },
  buttonContainer2: {
    flexDirection: 'row',
    paddingTop: verticalScale(15),
    justifyContent: 'space-evenly',
  },
  deleteOverlayContainer: {
    flexDirection: 'row',
    height: 'auto',
  },
  textColumn: {
    flex: 5,
    flexDirection: 'column',
  },
  warningIconContainer: {
    flex: 1,
  },
});

export default Settings;
