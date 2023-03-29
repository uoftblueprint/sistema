import React, { useRef } from 'react';
import {
  SafeAreaView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { addToSection } from '../../services/editor/lessonPlanSlice';
import { TextStyle } from '../../Styles.config';
import store from '../../services/configureStore';
import { ModuleType } from '../../services/constants';

const ContentCard = ({
  setisTextinputOpen,
  setSectionContent,
  sectionContent,
}) => {
  const refInput = useRef();

  return (
    <SafeAreaView style={styles.ContentCardStyle}>
      {/* Touching the touchable opacity should focus the text input */}
      <TouchableOpacity
        onPress={() => refInput.current.focus()}
        style={styles.TouchableStyle}>
        <View pointerEvents="none">
          <TextInput
            style={TextStyle.body}
            placeholder={'Add Text'}
            multiline={true}
            ref={refInput}
            onEndEditing={e => {
              if (e.nativeEvent.text) {
                setSectionContent([             // TODO: Update this store func
                  ...sectionContent, 
                  {
                    type: ModuleType.text,
                    content: e.nativeEvent.text
                  },
                ]);
              }
              setisTextinputOpen(false);
            }}
          />
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  ContentCardStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#FFFAF5',
    height: 'auto',
    borderWidth: 0.77,
    borderColor: '#000',
    borderRadius: 8,
    shadowColor: '#453E3D',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 5,
    marginVertical: 5,
  },
  TouchableStyle: {
    height: '100%',
    ...Platform.select({
      ios: {
        paddingTop: 10,
        paddingBottom: 15,
        paddingHorizontal: 15,
      },
      android: {
        paddingVertical: 0,
        paddingHorizontal: 10,
      },
    }),
    width: '100%',
  },
  text: {
    color: '#000000',
  }
});

export default ContentCard;
