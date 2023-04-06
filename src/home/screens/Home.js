import {
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useState, useEffect } from 'react';
import RecentCard from '../components/RecentCard';
import Header from '../../Components/Header';
import RefreshIcon from '../../../assets/refreshIcon.svg';
import { MAINDIRECTORY } from '../../services/constants';
import { STACK_SCREENS } from '../constants';
import ActivityCardService from '../../services/ActivityCardService';
import {
  makeDirectory,
  readDirectory,
  readFile,
  writeFile,
  checkFileExists,
} from '../../services/routes/Local.js';
import { TextStyle } from '../../Styles.config';
import { scale } from 'react-native-size-matters';

const Home = ({ navigation }) => {
  const [date, setDate] = useState('');
  const [pathArr, setPathArr] = useState([]);

  const handleRefreshPress = async () => {
    const datePath = MAINDIRECTORY + '/RefreshedDate';
    const filePath = `${datePath}/date.txt`;
    const cards = await ActivityCardService.getFeaturedActivityCards();

    //update the last refreshed date
    if (cards.length != 0) {
      setPathArr(cards);

      const today = new Date().toDateString();
      setDate(today);
      await makeDirectory(datePath);
      await writeFile(false, filePath, today);
    }
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
      <SafeAreaView style={styles.container}>
        <Text style={[styles.title, TextStyle.h2]}>New activity cards</Text>
        <SafeAreaView style={styles.subContainer}>
          <Text style={[styles.subtitle, TextStyle.h3]}>
            Last updated on {date}
          </Text>
          <TouchableOpacity onPress={() => handleRefreshPress()}>
            <RefreshIcon height={23} width={23} style={styles.refreshIcon} />
          </TouchableOpacity>
        </SafeAreaView>
      </SafeAreaView>

      <SafeAreaView style={{ height: '100%' }}>
        <FlatList
          data={pathArr}
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
          keyExtractor={(item, index) => index.toString()}
        />
      </SafeAreaView>
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
});

export default Home;
