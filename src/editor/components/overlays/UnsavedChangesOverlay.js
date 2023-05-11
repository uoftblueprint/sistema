import { View, StyleSheet, Text } from 'react-native';
import Overlay from '../../../Components/Overlay';
import SistemaButton from '../../../Components/SistemaButton';
import { TextStyle } from '../../../Styles.config';
import { verticalScale } from 'react-native-size-matters';

const UnsavedChangesOverlay = ({ visible, handleStay, handleLeave }) => {
  return (
    <Overlay
      close={handleStay}
      visible={visible}
      style={styles.overlayContainer}>
      <View style={styles.textColumn}>
        <Text style={[TextStyle.label, styles.overlayTitle]}>
          You have unsaved changes.
        </Text>
        <Text style={TextStyle.body}>
          Are you sure you want to leave this page?
        </Text>
        <View style={styles.buttonContainer}>
          <SistemaButton onPress={handleStay}>
            <Text style={TextStyle.body}> Stay on page </Text>
          </SistemaButton>
          <SistemaButton onPress={handleLeave} color={'blue'}>
            <Text style={TextStyle.body}> Leave page </Text>
          </SistemaButton>
        </View>
      </View>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    flexDirection: 'row',
    height: 'auto',
  },
  overlayTitle: {
    fontWeight: 'bold',
    marginBottom: verticalScale(10),
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingTop: verticalScale(15),
    justifyContent: 'space-evenly',
  },
  textColumn: {
    flex: 5,
    flexDirection: 'column',
  },
});

export default UnsavedChangesOverlay;
