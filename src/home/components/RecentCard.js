import {
  StyleSheet,
  SafeAreaView,
  Text,
  ScrollView,
  Dimensions,
} from 'react-native';
import { readFile } from '../../services/routes/Local.js';
import { useState, useEffect } from 'react';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const RecentCard = ({ navigation, cardPath }) => {
  const [title, setTitle] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('#9D649F');

  useEffect(() => {
    const readCardTitle = async () => {
      try {
        const cardTitlePath = cardPath + 'cardName.txt';
        var cardNames = await readFile(cardTitlePath, 'utf-8');
        cardNames = cardNames.substring(0, cardNames.length - 5);
        setTitle(cardNames);

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
      width: '87%',
      height: windowHeight * 0.25,
    },
    scrollview: {
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    },
    titleBar: {
      borderBottomLeftRadius: 18,
      borderBottomRightRadius: 18,
      width: '100%',
      height: '19%',
      backgroundColor: backgroundColor,
      // ACTION:     #9D649F
      // PERCEPTION: #5CB1A9
      // CREATION:   #DD726C
      // KNOWLEDGE:  #5D8CC6
    },
    title: {
      fontFamily: 'Mulish-Regular',
      color: '#FFFFFF',
      width: '100%',
      fontSize: 17,
      marginTop: 7,
      fontStyle: 'italic',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.box}>
        <ScrollView>{/* <Text>CARD IMAGE GOES HERE</Text> */}</ScrollView>

        <SafeAreaView style={styles.titleBar}>
          <SafeAreaView style={{ marginHorizontal: 20 }}>
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
          </SafeAreaView>
        </SafeAreaView>
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default RecentCard;
