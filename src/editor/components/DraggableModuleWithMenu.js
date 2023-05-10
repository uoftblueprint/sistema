import React from 'react';
import {
  Platform,
  ActionSheetIOS,
  UIManager,
  findNodeHandle,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  SafeAreaView,
  Image,
} from 'react-native';
import { ModuleType } from '../../services/constants';
import { TextStyle } from '../../Styles.config';
import { scale, verticalScale } from 'react-native-size-matters';

// Modified from https://github.com/izzisolomon/react-native-options-menu to handle onLongPress and to suit our needs

export default class DraggableModuleWithMenu extends React.Component {
  // Menu that appears when you tap the module
  textMenu = ['Edit', 'Delete'];
  activityCardMenu = ['Move up', 'Move down', 'Delete'];

  constructor(props) {
    super(props);
    this.menuRef; // Assigned upon render
    this.textInputRef; // Assigned upon render

    // If the module is a text module, add the edit option to the menu
    if (this.props.data.type == ModuleType.text) {
      this.options =
        Platform.OS === 'ios' ? [...this.textMenu, 'Cancel'] : this.textMenu;
      this.actions = [this.toggleEdit, this.deleteModule]; // matches order of this.options
    } else {
      this.options =
        Platform.OS === 'ios'
          ? [...this.activityCardMenu, 'Cancel']
          : this.activityCardMenu;
      this.actions = [
        this.moveModuleUp,
        this.moveModuleDown,
        this.deleteModule,
      ]; // matches order of this.options
    }

    this.state = {
      isEditable: false,
    };
  }

  /** Edit the text module */
  toggleEdit = () => {
    this.setState({ isEditable: true });
    setTimeout(() => this.textInputRef.focus(), 100);
  };

  /** Removes the module from this section. Deletes this component. */
  deleteModule = () => {
    // TODO: [SIS-118] Warn user before deleting lesson plan module
    this.props.handleDelete(this.props.data.key);
  };

  /** Moves the activity card module in the draggable flatlist up */
  moveModuleUp = () => {
    this.props.handleMove(this.props.data.key, true); // swapUp=true
  };

  /** Moves the activity card module in the draggable flatlist down */
  moveModuleDown = () => {
    this.props.handleMove(this.props.data.key, false); // swapUp=false
  };

  /** Based on what menu option the user clicks, execute the function corresponding with the same index in this.actions. */
  handleClick = index => {
    for (var i = 0; i < this.options.length; i++) {
      if (index === i) {
        if (Platform.OS === 'ios' && index === this.options.length - 1) {
          // Do nothing
        } else if (this.actions[i] !== null) {
          this.actions[i]();
        }
      }
    }
  };

  /** Opens module menu */
  handlePress = () => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: this.options,
          destructiveButtonIndex: this.options.indexOf('Delete'),
          cancelButtonIndex: this.options.length - 1, // index of "Cancel" which is always last
        },
        buttonIndex => {
          this.handleClick(buttonIndex);
        },
      );
    } else if (Platform.OS === 'android') {
      UIManager.showPopupMenu(
        findNodeHandle(this.menuRef),
        this.options,
        () =>
          console.warn(
            `Something went wrong with the Android popup menu inside DraggableModuleWithMenu ${this.props.data.key}.`,
          ),
        (_, i) => {
          this.handleClick(i);
        },
      );
    }
  };

  render() {
    return (
      <View>
        <TouchableOpacity
          ref={el => (this.menuRef = el)}
          onPress={this.handlePress}
          delayLongPress={this.props.longPressTriggerMs} // ms to trigger a LongPress
          onLongPress={this.props.drag}
          disabled={this.props.dragIsActive} // disable interactions while being dragged
          style={styles.module}>
          {this.props.data.type == ModuleType.text ? (
            <View pointerEvents={!this.state.isEditable ? 'none' : undefined}>
              <TextInput
                ref={input => {
                  this.textInputRef = input;
                }}
                editable={this.state.isEditable}
                style={TextStyle.body}
                multiline
                defaultValue={this.props.data.content}
                onEndEditing={e => {
                  const currText = e.nativeEvent.text;
                  this.props.handleEdit(this.props.data.key, currText);
                  this.setState({ isEditable: false });
                }}
              />
            </View>
          ) : (
            <SafeAreaView style={styles.box}>
              <Image
                source={{ uri: `file://${this.props.data.content}` }}
                style={styles.cardImage}
                resizeMode="contain"
              />
            </SafeAreaView>
          )}
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  module: {
    backgroundColor: '#FDFBF7',
    height: 'auto',
    width: '100%',
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
  },
  CardStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 15,
    marginRight: 10,
    marginVertical: 10,
  },
  cardName: {
    fontFamily: 'Poppins-Medium',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 15,
  },
  cardImage: {
    width: '100%',
    height: scale(463),
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    backgroundColor: '#FDFBF7',
    borderWidth: 1,
    borderColor: '#FDFBF7',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    paddingVertical: Platform.OS === 'ios' ? 0 : verticalScale(10),
    height: 'auto',
  },
});
