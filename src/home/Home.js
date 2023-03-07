import {
  StyleSheet,
  SafeAreaView,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import RecentCard from '../home/components/RecentCard';
import Header from '../Components/Header';
import RefreshIcon from '../../assets/refreshIcon.svg';
import { NavigationContainer } from '@react-navigation/native';

const Home = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.background}>
      <Header isHome={true} navigation={navigation} />
      <ScrollView>
        <SafeAreaView style={styles.container}>
          <Text style={styles.title}>Recently added activity cards</Text>
          <SafeAreaView style={styles.subContainer}>
            <Text style={styles.subtitle}>Last updated on Jan 1, 2023</Text>
            <RefreshIcon height={23} width={23} style={styles.refreshIcon} />
          </SafeAreaView>
        </SafeAreaView>

        {/* Will eventually convert this into .map for x amount of cards in cache */}
        <SafeAreaView style={{ height: '100%' }}>
          {/* PROPS TO PASS IN: Title, Card image, Card id */}
          <TouchableOpacity onPress={() => navigation.navigate('CardView')}>
            <RecentCard />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('CardView')}>
            <RecentCard />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('CardView')}>
            <RecentCard />
          </TouchableOpacity>
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
