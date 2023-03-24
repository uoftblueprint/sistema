import {
  StyleSheet,
  SafeAreaView,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useState } from 'react';
import RecentCard from '../components/RecentCard';
import Header from '../../Components/Header';
import RefreshIcon from '../../../assets/refreshIcon.svg';
import { STACK_SCREENS, MAINDIRECTORY } from '../constants';
import ActivityCardService from '../../services/ActivityCardService';

const Home = ({ navigation }) => {

  const [date, setDate] = useState(new Date());
  const [pathArr, setPathArr] = useState([MAINDIRECTORY + '/FeaturedActivityCards/']);


  const handleRefreshPress = async () => {
      const cards = await ActivityCardService.getFeaturedActivityCards();
      setPathArr(cards);
      
  };

  return (
    <SafeAreaView style={styles.background}>
      <Header isHome={true} navigation={navigation} showBackButton={false} />
      <ScrollView>
        <SafeAreaView style={styles.container}>
          <Text style={styles.title}>Recently added activity cards</Text>
          <SafeAreaView style={styles.subContainer}>
            <Text style={styles.subtitle}>Last updated on ...</Text>
            <TouchableOpacity
              onPress={() => handleRefreshPress()}>
              <RefreshIcon 
                height={23} 
                width={23} 
                style={styles.refreshIcon}
              />
            </TouchableOpacity>
          </SafeAreaView>
        </SafeAreaView>

        {/* 
        
        pathArr.map(cardPath => {
          <TouchableOpacity
            onPress={() => navigation.navigate(STACK_SCREENS.EXPANDED_CARD, {
            cardImage= "${cardPath}/cardimage.jpg",
            cardName= "${cardPath}/cardName.txt",
          });
            <RecentCard 
              image={"${cardPath}/cardimage.jpg"}
              cardName: "${cardPath}/cardName.txt"
            />
          </TouchableOpacity>
        });
        
        */}

        <SafeAreaView style={{ height: '100%' }}>
          
          {
          

            pathArr.map((cardPath, index) => {
              return(<SafeAreaView>
                <TouchableOpacity key={index}>
                  <RecentCard 
                    cardPath={cardPath}
                  />
                </TouchableOpacity>
                </SafeAreaView>);
              
          
              })
          
          
          }
          
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
  container: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    color: '#453E3D',
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    marginHorizontal: 30,
    letterSpacing: 0.3,
    width: '100%',
    paddingBottom: 11,
  },
  subtitle: {
    color: '#453E3D',
    fontFamily: 'Mulish-Regular',
    fontSize: 15,
    fontStyle: 'italic',
    marginLeft: '8%',
    letterSpacing: 0.3,
    width: '55%',
  },
  refreshIcon: {
    fill: '#453E3D',
  },
});

export default Home;
