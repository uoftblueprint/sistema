import { useRef, useState } from 'react';
import {
  SafeAreaView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { addToSection } from '../../services/editor/lessonPlanSlice';
import { TextStyle, AppColors } from '../../Styles.config';
import { ModuleType } from '../../services/constants';
import { scale } from 'react-native-size-matters';

import LinkIcon from '../../../assets/icons/linkIcon.svg';

const LinkCard = ({ setisLinkInputOpen, sectionType }) => {
  const titleInput = useRef();
  const linkInput = useRef();
  const dispatch = useDispatch();

  const [linkTitle, setlinkTitle] = useState('');
  const [linkContent, setlinkContent] = useState('');

  return (
    <SafeAreaView style={styles.LinkCardStyle}>
      {/* Touching the touchable opacity should focus the text input */}
      <TouchableOpacity
        onPress={() => titleInput.current.focus()}
        style={styles.TouchableStyle}>
        <View pointerEvents="none">
          <TextInput
            style={[TextStyle.body, { paddingVertical: 5 }]}
            placeholder={'Adding a link title is optional.'}
            multiline={true}
            ref={titleInput}
            onEndEditing={e => {
              setlinkTitle(e.nativeEvent.text);
              if (linkContent !== '') {
                // Only send data in if the link content isn't empty
                // It's getting sent and closed right away, so we don't care
                // about setting the state variable for the title (hopefully)
                dispatch(
                  addToSection({
                    type: ModuleType.link,
                    section: sectionType,
                    content: linkContent,
                    title: e.nativeEvent.text ?? '',
                  }),
                );
                setisLinkInputOpen(false);
              } else if (linkContent === '' && !e.nativeEvent.text) {
                setisLinkInputOpen(false);
              }
            }}
          />
        </View>
      </TouchableOpacity>
      <View style={styles.LinkBodyStyle}>
        <TouchableOpacity
          onPress={() => linkInput.current.focus()}
          style={[styles.TouchableStyle, { paddingHorizontal: 0 }]}>
          <View style={styles.LinkViewStyle}>
            <LinkIcon height={'20'} width={'20'} marginRight={scale(5)} />
            <TextInput
              style={[
                TextStyle.body,
                styles.LinkInputStyle,
                { color: '#0078E8' },
              ]}
              ref={linkInput}
              placeholder={'Paste Link Here'}
              onEndEditing={e => {
                let inputtedLink = e.nativeEvent.text.trim();

                if (inputtedLink) {
                  // No whitespaces in links!
                  setlinkContent(inputtedLink);

                  // If text is not empty
                  dispatch(
                    addToSection({
                      type: ModuleType.link,
                      section: sectionType,
                      content: inputtedLink,
                      title: linkTitle ?? '',
                    }),
                  );
                }
                setisLinkInputOpen(false);
              }}
            />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  LinkCardStyle: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: AppColors.light_background,
    height: 'auto',
    borderWidth: 0.77,
    borderColor: '#000',
    borderRadius: 8,
    shadowColor: AppColors.dark,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 5,
    marginVertical: 5,
  },
  LinkBodyStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(10),
    marginBottom: Platform.OS === 'ios' ? 0 : 10,
  },
  LinkViewStyle: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Platform.OS === 'android' ? 0 : 5,
    paddingHorizontal: scale(10),
    marginBottom: Platform.OS === 'android' ? 0 : 15,
    borderWidth: 0.77,
    borderColor: '#000',
    borderRadius: 8,
    shadowColor: AppColors.dark,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 5,
  },
  TouchableStyle: {
    ...Platform.select({
      ios: {
        paddingTop: 10,
        paddingHorizontal: 15,
      },
      android: {
        paddingVertical: 0,
        paddingHorizontal: 10,
      },
    }),
    width: '100%',
  },
  LinkInputStyle: {
    paddingVertical: 6,
    flex: 1,
  },
});

export default LinkCard;
