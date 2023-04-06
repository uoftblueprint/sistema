import { SafeAreaView, Text, StyleSheet, ScrollView, View } from 'react-native';
import Header from '../../Components/Header';
import LinkButton from '../components/LinkButton';

const TemplatePolicy = ({ navigation, route }) => {
  const { pageTitle, pageContent } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Header
        navigation={navigation}
        showInfoIcon={false}
        showBackButton={true}
      />

      <Text style={styles.title}>{pageTitle}</Text>
      <ScrollView>
        <Text style={styles.text}>{pageContent}</Text>
        {(pageTitle == 'About Sistema') &&
          <View style={styles.linkContainers}>
            <LinkButton title={'www.sistema-toronto.ca'} url={'https://www.sistema-toronto.ca/'} />
            <LinkButton title={'info@sistema-toronto.ca'} url={'mailto:info@sistema-toronto.ca'} />
          </View>
        }
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#FFFAF5',
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    height: 'auto',
    width: 'auto',
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    letterSpacing: 0.3,
    color: '#453E3D',
    textAlign: 'center',
    marginHorizontal: 30,
    marginBottom: 10,
  },
  text: {
    fontFamily: 'Mulish-Regular',
    fontSize: 16,
    letterSpacing: 0.3,
    color: '#000000',
    marginHorizontal: 30,
    marginBottom: 30,
  },
  linkContainers: {
    flexDirection: 'column',
    marginHorizontal: 30,
    marginBottom: 30,
  }
});

export default TemplatePolicy;
