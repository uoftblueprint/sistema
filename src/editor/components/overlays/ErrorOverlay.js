import { View, StyleSheet, Text } from 'react-native';
import Overlay from '../../../Components/Overlay';
import SistemaButton from '../../../Components/SistemaButton';
import { TextStyle } from '../../../Styles.config';
import { verticalScale, scale } from 'react-native-size-matters';
import AlertErrorIcon from '../../../../assets/errorAlertThin.svg';
import { ERROR } from '../../constants';

const ErrorOverlay = ({ errorType, visible, handleClose }) => {
  const iconSize = scale(27);

  let title;
  let text;
  switch (errorType) {
    case ERROR.FETCHING:
      title = 'This lesson plan could not be loaded.';
      text =
        'Please try again. If this keeps on happening, the file may be' +
        ' corrupted and irretrievable.';
      break;
    case ERROR.DUPLICATE_NAME:
      title = 'Another lesson plan already has this name!';
      text = 'Please rename this one and try saving again.';
      break;
    case ERROR.SAVING:
      title = 'This lesson plan could not be saved.';
      text =
        'Please try again. If this keeps on happening, the file may be' +
        ' corrupted.';
      break;
    default:
      title = `Editor error code: ${errorType}`;
      text = '';
      break;
  }

  return (
    <Overlay
      close={handleClose}
      visible={visible}
      style={styles.overlayContainer}>
      <View style={styles.textColumn}>
        <View style={styles.row}>
          <AlertErrorIcon
            height={iconSize}
            width={iconSize}
            style={styles.icon}
          />
          <Text style={[TextStyle.label, styles.overlayTitle]}>{title}</Text>
        </View>

        <Text style={TextStyle.body}>{text}</Text>

        <View style={styles.buttonContainer}>
          <SistemaButton onPress={handleClose}>
            <Text style={TextStyle.body}> Okay </Text>
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
    flex: 1,
    marginLeft: scale(10),
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingTop: verticalScale(15),
    justifyContent: 'center',
  },
  textColumn: {
    flex: 5,
    flexDirection: 'column',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '100%',
    marginBottom: verticalScale(10),
  },
});

export default ErrorOverlay;
