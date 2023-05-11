import { useSelector, useDispatch } from 'react-redux';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Platform,
  View,
} from 'react-native';
import {
  replaceNote,
  getLessonSection,
} from '../../services/editor/lessonPlanSlice';
import { TextStyle } from '../../Styles.config';

const LessonPlanNotes = ({ sectionType, isDisabled }) => {
  const dispatch = useDispatch();
  const currNotes = useSelector(state =>
    getLessonSection(state.lessonPlan, sectionType),
  );

  return (
    <SafeAreaView width={'100%'}>
      <Text style={[styles.title, TextStyle.h2]}>{sectionType}</Text>
      <View style={styles.SectionStyle}>
        <TextInput
          editable={!isDisabled}
          style={TextStyle.body}
          placeholder={'Add lesson notes here...'}
          placeholderTextColor={'#453E3D'}
          value={currNotes}
          multiline
          returnKeyType="next"
          onChangeText={newText => {
            dispatch(replaceNote(newText));
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: 10,
  },
  SectionStyle: {
    paddingHorizontal: 15,
    ...Platform.select({
      ios: {
        paddingTop: 10,
        paddingBottom: 15,
      },
      android: {
        paddingVertical: 0,
      },
    }),
    flexDirection: 'column',
    backgroundColor: '#FDFBF7',
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
    marginBottom: 20,
  },
});

export default LessonPlanNotes;
