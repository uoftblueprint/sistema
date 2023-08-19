import { useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, Linking } from 'react-native';
import { TextStyle } from '../../Styles.config';

const LinkButton = ({ title, url }) => {
  const handlePress = useCallback(() => {
    Linking.openURL(url);
  }, [url]);

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Text style={[TextStyle.h3, styles.link]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {},
  link: {
    textDecorationLine: 'underline',
    color: '#4D8ECB',
  },
});

export default LinkButton;
