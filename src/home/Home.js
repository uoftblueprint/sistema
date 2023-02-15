import {
  StyleSheet,
  SafeAreaView,
  Text,
  ScrollView,
  TouchableOpacity
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
        <SafeAreaView>
          <Text style={styles.title}>Recently added activity cards</Text>
          <SafeAreaView
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center'
            }}>
            <Text style={styles.subtitle}>Last updated on Jan 1, 2023</Text>
            <RefreshIcon height={25} width={25} style={styles.refreshIcon} />
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
    height: '100%'
  },
  title: {
    color: '#453E3D',
    fontFamily: 'Poppins',
    fontWeight: '700',
    fontSize: 25,
    marginHorizontal: 30,
    letterSpacing: 0.3,
    width: '100%',
    paddingBottom: 11
  },
  subtitle: {
    color: '#453E3D',
    fontFamily: 'Mulish',
    fontWeight: '400',
    fontSize: 16,
    fontStyle: 'italic',
    marginLeft: '8%',
    letterSpacing: 0.3,
    width: '55%',
    paddingBottom: '1%'
  },
  refreshIcon: {
    fill: '#453E3D'
  }
});

export default Home;
