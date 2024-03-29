import { Modal, SafeAreaView, StyleSheet, View } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import { AppColors } from '../Styles.config';

const Overlay = props => {
  return (
    <Modal
      transparent={true}
      visible={props.visible}
      onRequestClose={() => {
        props.close();
      }}>
      <SafeAreaView style={styles.container}>
        <View style={[styles.overlay, props.style]}>{props.children}</View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    width: scale(280),
    height: verticalScale(400),
    backgroundColor: AppColors.background,
    padding: scale(20),
    borderRadius: 4.2,
  },
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: AppColors.overlay_background,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Overlay;
