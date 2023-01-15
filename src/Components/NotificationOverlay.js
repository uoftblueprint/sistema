import React, { useState } from 'react';
import { Overlay } from '@rneui/themed';
import { StyleSheet } from 'react-native';

const NotificationOverlay = props => {
  const [visible, setVisible] = useState(true);
  return (
    <Overlay
      isVisible={visible}
      onBackdropPress={() => {
        setVisible(false);
      }}
      overlayStyle={styles.overlayContainer}>
      {props.children}
    </Overlay>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    backgroundColor: '#FFFAF5',
    borderRadius: 4.23,
    width: 336,
    height: 152,
    padding: 12,
    display: 'flex'
  }
});

export default NotificationOverlay;
