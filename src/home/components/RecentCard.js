import {
  StyleSheet,
  SafeAreaView,
  Text,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import { readFile } from '../../services/routes/Local.js';
import { useState, useEffect } from 'react';
import { scale, verticalScale } from 'react-native-size-matters';

const windowHeight = Dimensions.get('window').height;

const RecentCard = ({ navigation, cardPath }) => {
  const [title, setTitle] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('#9D649F');
  const [cardImagePath, setCardImagePath] = useState('');

  useEffect(() => {
    const readCardTitle = async () => {
      try {
        //read card name from the .txt file pointed to by pathArr in Home.js
        const cardTitlePath = cardPath + 'cardName.txt';
        let cardNames = await readFile(cardTitlePath, 'utf-8');
        cardNames = cardNames.substring(0, cardNames.length - 5);
        setTitle(cardNames);

        //read and store the image to, while we're at it
        setCardImagePath(cardPath + 'cardImage.jpg');

        //Set the title.bar colour of RecentCard component depending on the type of Activity Card
        switch (true) {
          case cardNames.includes('Knowledge'):
            setBackgroundColor('#5D8CC6');
            break;
          case cardNames.includes('Action'):
            setBackgroundColor('#9D649F');
            break;
          case cardNames.includes('Perception'):
            setBackgroundColor('#5CB1A9');
            break;
          case cardNames.includes('Creation'):
            setBackgroundColor('#DD726C');
            break;
          default:
            setBackgroundColor('#9D649F');
        }
      } catch (err) {
        console.log(err);
      }
    };
    readCardTitle();
  }, [cardPath]);

  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    box: {
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: 'black',
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      marginVertical: 15,
      width: '100%',
      height: windowHeight * 0.25,
    },
    scrollview: {
      backgroundColor: '#000000',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    },
    titleBar: {
      borderBottomLeftRadius: 18,
      borderBottomRightRadius: 18,
      width: '100%',
      height: '19%',
      backgroundColor: backgroundColor,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    title: {
      fontFamily: 'Mulish-Italic',
      color: '#FFFFFF',
      width: '100%',
    },
    cardImage: {
      width: scale(290), // 80% of window width
      height: verticalScale(290), // 30% of window height
      paddingTop: scale(500),
      opacity: 0.8, // darken the tint of the thumbnail
    },
  });

  return (
    <SafeAreaView>
      {cardImagePath && (
        <SafeAreaView style={styles.container}>
          <SafeAreaView style={styles.box}>
            <ScrollView contentContainerStyle={styles.scrollview}>
              <Image
                source={{ uri: `file://${cardImagePath}` }}
                style={styles.cardImage}
              />
            </ScrollView>
            <SafeAreaView style={styles.titleBar}>
              <Text style={styles.title} numberOfLines={1}>
                {title}
              </Text>
            </SafeAreaView>
          </SafeAreaView>
        </SafeAreaView>
      )}
    </SafeAreaView>
  );
};

export default RecentCard;
