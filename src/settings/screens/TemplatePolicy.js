import { SafeAreaView, Text, StyleSheet, ScrollView, View } from 'react-native';
import Header from '../../Components/Header';
import LinkButton from '../components/LinkButton';
import { scale, verticalScale } from 'react-native-size-matters';
import { TextStyle, AppColors } from '../../Styles.config';

const TemplatePolicy = ({ navigation, route }) => {
  const { pageTitle, pageContent } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Header
        navigation={navigation}
        showInfoIcon={false}
        showBackButton={true}
      />

      <Text style={[TextStyle.h1, styles.title]}>{pageTitle}</Text>
      <ScrollView>
        <Text style={[TextStyle.label, styles.text]}>{pageContent}</Text>
        {pageTitle == 'About Sistema' && (
          <View style={styles.linkContainers}>
            <LinkButton
              title={'www.sistema-toronto.ca'}
              url={'https://www.sistema-toronto.ca/'}
            />
            <LinkButton
              title={'info@sistema-toronto.ca'}
              url={'mailto:info@sistema-toronto.ca'}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: AppColors.background,
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    height: 'auto',
    width: 'auto',
    textAlign: 'center',
    marginHorizontal: scale(30),
    marginBottom: verticalScale(10),
  },
  text: {
    marginHorizontal: scale(30),
    marginBottom: verticalScale(30),
  },
  linkContainers: {
    flexDirection: 'column',
    marginHorizontal: scale(30),
    marginBottom: verticalScale(30),
  },
});

export default TemplatePolicy;
