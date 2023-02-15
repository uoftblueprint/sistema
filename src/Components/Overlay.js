import { Modal, SafeAreaView, StyleSheet, View } from 'react-native';

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
    width: '85%',
    height: 'auto',
    backgroundColor: '#FFFAF5',
    padding: 16,
    borderRadius: 4.2
  },
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#D9D9D980',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Overlay;
