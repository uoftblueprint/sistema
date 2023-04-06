import { useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, Linking } from 'react-native';
import { TextStyle } from '../../Styles.config';

const LinkButton = ({ title, url }) => {
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
        // Opening the link with some app, if the URL scheme is "http" the web link should be opened
        // by some browser in the mobile
        await Linking.openURL(url);
    } else {
        console.error(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Text style={[TextStyle.h3, styles.link]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  link: {
    textDecorationLine: "underline",
    color: '#4D8ECB',
  },
});

export default LinkButton;
