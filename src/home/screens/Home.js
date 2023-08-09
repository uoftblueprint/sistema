import {
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { useState, useEffect } from 'react';
import RecentCard from '../components/RecentCard';
import Header from '../../Components/Header';
import RefreshIcon from '../../../assets/icons/refreshIcon.svg';
import { MAINDIRECTORY } from '../../services/constants';
import { STACK_SCREENS } from '../constants';
import { AppColors } from '../../Styles.config';
import ActivityCardService from '../../services/ActivityCardService';
import {
  makeDirectory,
  readDirectory,
  readFile,
  writeFile,
  checkFileExists,
} from '../../services/routes/Local.js';
import { TextStyle } from '../../Styles.config';
import { scale, verticalScale } from 'react-native-size-matters';

const Home = ({ navigation }) => {
  const [date, setDate] = useState('');
  const [pathArr, setPathArr] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleRefreshPress = async () => {
    setLoading(true);
    const datePath = MAINDIRECTORY + '/RefreshedDate';
    const filePath = `${datePath}/date.txt`;
    const cards = await ActivityCardService.getFeaturedActivityCards();

    //update the last refreshed date and card array if new cards were found
    if (cards.length != 0) {
      setPathArr(cards);

      const today = new Date().toDateString();
      setDate(today);
      await makeDirectory(datePath);
      await writeFile(false, filePath, today);
    }
    setLoading(false);
  };

  //load the save data when Home.js mounts
  useEffect(() => {
    const fetchSavedData = async () => {
      try {
        const datePath = MAINDIRECTORY + '/RefreshedDate';
        const filePath = `${datePath}/date.txt`;

        //Check if the last refreshed date is stored, read and store into date if it does
        if (await checkFileExists(filePath)) {
          const lastDate = await readFile(filePath, 'utf8');
          setDate(lastDate);
        }

        //Check if the last Activity Cards exist, read and store into pathArr if it does
        const arrPath = MAINDIRECTORY + '/FeaturedActivityCards';
        if (await checkFileExists(arrPath)) {
          const fileNames = await readDirectory(arrPath);
          const subDirectories = fileNames.filter(name => name !== '.DS_Store'); // filter out .DS_Store files (on macOS)
          const tempArr = subDirectories.map(name => `${arrPath}/${name}/`); // create an array of the full path of all subdirectories

          //map this pathArr when app is first opened
          if (tempArr.length != 0) {
            setPathArr(tempArr);
          }
        } else {
          //very first time loading the app, no cards in RNFS
          handleRefreshPress();
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchSavedData();
  }, []);

  return (
    <SafeAreaView style={styles.background}>
      <Header isHome={true} navigation={navigation} showBackButton={false} />
      <SafeAreaView style={styles.headContainer}>
        <Text style={[styles.title, TextStyle.h2]}>New activity cards</Text>
        <SafeAreaView style={styles.subContainer}>
          {pathArr.length == 0 ? (
            <Text style={[styles.subtitle, TextStyle.h3]}>
              Check for cards from the past week
            </Text>
          ) : (
            <Text style={[styles.subtitle, TextStyle.h3]}>
              Last updated on {date}
            </Text>
          )}
          <TouchableOpacity onPress={() => handleRefreshPress()}>
            <RefreshIcon height={23} width={23} style={styles.refreshIcon} />
          </TouchableOpacity>
        </SafeAreaView>
      </SafeAreaView>

      {!loading ? (
        <SafeAreaView style={styles.flatListContainer}>
          {pathArr.length == 0 && (
            <Text style={[TextStyle.h3, { marginTop: 15 }]}>Nothing here!</Text>
          )}
          <FlatList
            data={pathArr}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(STACK_SCREENS.EXPANDED_CARD, {
                    cardPath: item,
                  })
                }>
                <RecentCard cardPath={item} />
              </TouchableOpacity>
            )}
            keyExtractor={(_, index) => index.toString()}
          />
        </SafeAreaView>
      ) : (
        //Loading Animation Component
        <SafeAreaView style={[styles.loadingView]}>
          <ActivityIndicator size="large" color={AppColors.secondary} />
        </SafeAreaView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#FFFAF5',
    height: '100%',
  },
  loadingView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: verticalScale(30),
  },
  headContainer: {
    paddingHorizontal: scale(30),
    marginBottom: verticalScale(5),
  },
  flatListContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: scale(30),
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
  loadingIcon: {
    color: '#453E3D',
  },
});

export default Home;
