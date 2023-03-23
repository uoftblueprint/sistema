import {
  StyleSheet,
  SafeAreaView,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import RecentCard from '../components/RecentCard';
import Header from '../../Components/Header';
import RefreshIcon from '../../../assets/refreshIcon.svg';
import { STACK_SCREENS } from '../constants';
import { TextStyle } from '../../Styles.config';

const Home = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.background}>
      <Header isHome={true} navigation={navigation} showBackButton={false} />
      <ScrollView style={styles.scrollContainer}>
        <SafeAreaView style={styles.container}>
          <Text style={[styles.title, TextStyle.h2]}>
            New activity cards
          </Text>
          <SafeAreaView style={styles.subContainer}>
            <Text style={[styles.subtitle, TextStyle.h3]}>Last updated on Jan 1, 2023</Text>
            {/* This refresh icon should eventually become a TouchableOpacity */}
            <RefreshIcon height={23} width={23} style={styles.refreshIcon} />
          </SafeAreaView>
        </SafeAreaView>

        {/* Will eventually convert this into .map for x amount of cards in cache */}
        <SafeAreaView style={{ height: '100%' }}>
          {/* PROPS TO PASS IN: Title, Card image, Card id */}
          <TouchableOpacity
            onPress={() => navigation.navigate(STACK_SCREENS.EXPANDED_CARD)}>
            <RecentCard />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate(STACK_SCREENS.EXPANDED_CARD)}>
            <RecentCard />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate(STACK_SCREENS.EXPANDED_CARD)}>
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
  scrollContainer: {
    height: '100%',
    paddingHorizontal: 35,
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
    width: '100%',
    paddingBottom: 5,
  },
  subtitle: {
    marginRight: 10,
  },
  refreshIcon: {
    fill: '#453E3D',
  },
});

export default Home;
