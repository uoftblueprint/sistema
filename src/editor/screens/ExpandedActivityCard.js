import {
  StyleSheet,
  SafeAreaView,
  Text,
  ScrollView,
  Dimensions,
  Image
} from 'react-native';
import { useState, useEffect } from 'react';
import { readFile } from '../../services/routes/Local.js';
import Header from '../../Components/Header';
const windowHeight = Dimensions.get('window').height;

const ExpandedActivityCard = ({ navigation, route }) => {
  const { cardName, cardPath } = route.params;
  const [title, setTitle] = useState('');
  const [cardImagePath, setCardImagePath] = useState(null);

    //load the save data when Home.js mounts
  useEffect(() => {
    const readCardTitle = async () => {
      try {
        //const cardTitlePath = cardPath + 'cardName.txt';
        const cardTitlePath = cardPath;
        var cardNames = await readFile(cardTitlePath, 'utf-8');
        cardNames = cardNames.substring(0, cardNames.length - 5);
        setCardImagePath(cardPath + 'cardImage.jpg');
        setTitle(cardNames);
      } catch (err) {
        console.log(err);
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
          <Text style={styles.title}>{cardName}</Text>

          <SafeAreaView style={styles.box}>
            {
              console.log("cardImagePath: " + cardPath)
            }
            {
              cardPath && 
              (
                <Image
                  source={{ uri: `file:/${cardImagePath}` }}
                  style={styles.cardImage}
                  resizeMode="contain"
                  />
              )
              
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
    marginTop: 15,
    width: '75%',
    height: windowHeight * 0.55,
  },
  title: {
    color: '#453E3D',
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    width: '60%',
    textAlign: 'center',
    marginBottom: 20,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ExpandedActivityCard;
