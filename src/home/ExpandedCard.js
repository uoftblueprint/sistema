import {
  StyleSheet,
  SafeAreaView,
  Text,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import { useState, useEffect } from 'react';
import { readFile } from '../services/routes/Local.js';
import Header from '../Components/Header';
import { TextStyle } from '../Styles.config';
import { verticalScale } from 'react-native-size-matters';

const ExpandedCard = ({ route, navigation }) => {
  const { cardPath } = route.params;
  const [theme, setTheme] = useState('');
  const [activityType, setActivityType] = useState('');
  const [title, setTitle] = useState('');
  const [cardImagePath, setCardImagePath] = useState('');

  useEffect(() => {
    const readCardTitle = async () => {
      try {
        const cardTitlePath = cardPath + 'cardName.txt';
        let cardNames = await readFile(cardTitlePath, 'utf-8');
        cardNames = cardNames.substring(0, cardNames.length - 5);
        setCardImagePath(cardPath + 'cardImage.jpg');

        let titleSegment = cardNames.split("-");
        setTheme(titleSegment[0]);
        setActivityType(titleSegment[1]);
        setTitle(titleSegment[2]);

      } catch (err) {
        console.warn(err);
        setTitle('Could not load card preview. Please try again.');
      }
    };
    readCardTitle();
  }, [cardPath]);

  return (
    <SafeAreaView style={styles.background}>
      <Header
        navigation={navigation}
        showInfoIcon={true}
        showBackButton={true}
      />

      <ScrollView>
        <SafeAreaView
          style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text style={[styles.title, TextStyle.h2]}> {title} </Text>
          <Text style={[TextStyle.h3, styles.subtitle]}>
            Theme:
            <Text style={TextStyle.h3}> {theme} </Text>
          </Text>
          <Text style={[TextStyle.h3, styles.subtitle]}>
            Activity Type:
            <Text style={TextStyle.h3}> {activityType} </Text>
          </Text>
          <SafeAreaView style={styles.box}>
          { cardImagePath && 
            (<Image
              source={{ uri: `file://${cardImagePath}` }}
              style={styles.cardImage}
              resizeMode="contain"
            />)
}
          </SafeAreaView>
        </SafeAreaView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#FFFAF5',
    height: '100%',
  },
  box: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    width: '75%',
    marginTop: 30,
    height: verticalScale(400),
  },
  title: {
    width: '75%',
    textAlign: 'left',
    marginBottom: 5,
  },
  subtitle: {
    width: '75%',
    textAlign: 'left',
    fontFamily: 'Mulish-Bold',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ExpandedCard;
