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
  Text,
  Linking,
} from 'react-native';
import { ModuleType } from '../../services/constants';
import { TextStyle } from '../../Styles.config';

import LinkIcon from '../../../assets/linkIcon.svg';

import { scale, verticalScale } from 'react-native-size-matters';

// Modified from https://github.com/izzisolomon/react-native-options-menu to handle onLongPress and to suit our needs

export default class DraggableModuleWithMenu extends React.Component {
  // Menu that appears when you tap the module
  textMenu = ['Edit', 'Delete'];
  linkMenu = ['Open link', 'Edit', 'Delete'];
  activityCardMenu = ['Move up', 'Move down', 'Delete'];

  constructor(props) {
    super(props);
    this.menuRef; // Assigned upon render
    this.textInputRef; // Assigned upon render
    this.linkInputRef; // Assigned upon render

    // If the module is a text module, add the edit option to the menu
    if (this.props.data.type == ModuleType.text) {
      this.options =
        Platform.OS === 'ios' ? [...this.textMenu, 'Cancel'] : this.textMenu;
      this.actions = [this.toggleEdit, this.deleteModule]; // matches order of this.options
    } else if (this.props.data.type == ModuleType.link) {
      this.options =
        Platform.OS === 'ios' ? [...this.linkMenu, 'Cancel'] : this.linkMenu;
      this.actions = [this.openLink, this.toggleEdit, this.deleteModule]; // matches order of this.options
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

      // Image dynamic resizing-related variables
      boxWidth: 1,
      boxHeight: 1,
      fullWidth: 1,
      dimensionsFound: false,

      // Link editing-related variables
      linkContent: this.props.data.content,
      linkTitle: this.props.data.title,
    };
  }

  /** Manage sizing of an image module */
  componentDidMount() {
    if (this.props.data.type == ModuleType.image) {
      Image.getSize(`file://${this.props.data.path}`, (width, height) => {
        // Get original widths and heights of the image for dynamic resizing
        this.setState({ boxWidth: width, boxHeight: height });
      });
    } else if (this.props.data.type == ModuleType.activityCard) {
      this.setState({ boxWidth: '100%', boxHeight: scale(463) });
    }
  }

  componentDidUpdate(prevState) {
    // Get full width of image component once it's mounted and resize height accordingly
    if (
      this.state.fullWidth != prevState.fullWidth &&
      this.props.data.type == ModuleType.image
    ) {
      if (
        this.state.fullWidth > 1 &&
        this.state.boxHeight > 1 &&
        !this.state.dimensionsFound
      ) {
        const curHeight = this.state.boxHeight;
        const curFullWidth = this.state.fullWidth;
        const curWidth = this.state.boxWidth;
        const newHeight = Math.floor(curHeight * (curFullWidth / curWidth));
        this.setState({ dimensionsFound: true, boxHeight: newHeight });
      }
    }
  }

  /** Edit the text module */
  toggleEdit = () => {
    this.setState({ isEditable: true });
    setTimeout(() => this.textInputRef.focus(), 100);
  };

  /** Removes the module from this section. Deletes this component. */
  deleteModule = () => {
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

  /** Based on what menu option the user clicks, execute the function corresponding
   * with the same index in this.actions. */
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
            `Something went wrong with the Android popup menu inside 
              DraggableModuleWithMenu ${this.props.data.key}.`,
          ),
        (_, i) => {
          this.handleClick(i);
        },
      );
    }
  };

  /** Handles link navigation */
  openLink = () => {
    let cleanLink = this.state.linkContent;
    if (cleanLink.search(/^http[s]?\:\/\//) == -1) {
      cleanLink = 'http://' + cleanLink;
    }
    Linking.openURL(cleanLink).catch(err => {
      console.error("Couldn't load page", err);
    });
  };

  /** Renders module depending on type */
  renderModule = moduleType => {
    if (moduleType == ModuleType.text) {
      return (
        <View pointerEvents={!this.state.isEditable ? 'none' : undefined}>
          <TextInput
            ref={input => {
              this.textInputRef = input;
            }}
            editable={this.state.isEditable}
            style={[
              TextStyle.body,
              { marginBottom: Platform.OS === 'ios' ? 5 : 0 },
            ]}
            multiline
            defaultValue={this.props.data.content}
            onEndEditing={e => {
              const currText = e.nativeEvent.text;
              this.props.handleEdit(this.props.data.key, currText);
              this.setState({ isEditable: false });
            }}
          />
        </View>
      );
    } else if (moduleType == ModuleType.link) {
      if (this.state.isEditable) {
        // Toggle editing version of the link module type
        return (
          <View
            pointerEvents={!this.state.isEditable ? 'none' : undefined}
            style={styles.LinkBodyStyle}>
            <TextInput
              ref={input => {
                this.textInputRef = input;
              }}
              editable={this.state.isEditable}
              style={[TextStyle.body, { paddingVertical: 10 }]}
              multiline
              defaultValue={this.state.linkTitle ?? ''}
              onEndEditing={e => {
                const currText = e.nativeEvent.text;
                this.setState({ linkTitle: currText });
                // Move focus to the link area
                this.linkInputRef.focus();
              }}
            />
            <View style={styles.LinkViewStyle}>
              <LinkIcon height={'20'} width={'20'} marginRight={scale(5)} />
              <TextInput
                style={[TextStyle.body, styles.LinkInputStyle]}
                ref={input => {
                  this.linkInputRef = input;
                }}
                defaultValue={this.state.linkContent}
                onEndEditing={e => {
                  // No whitespaces in links!
                  currText = e.nativeEvent.text;
                  this.setState({ linkContent: currText });
                  if (this.state.linkContent !== '') {
                    this.props.handleEdit(
                      this.props.data.key,
                      currText,
                      this.state.linkTitle,
                    );
                    this.setState({ isEditable: false });
                  }
                }}
              />
            </View>
          </View>
        );
      } else {
        // Toggle preview version of the link module type
        return (
          <View style={styles.LinkPreviewStyle}>
            <LinkIcon height={'20'} width={'20'} marginRight={scale(5)} />
            <Text style={styles.LinkTextStyle}>
              {this.state.linkTitle !== ''
                ? this.state.linkTitle
                : this.state.linkContent}
            </Text>
          </View>
        );
      }
    } else {
      // Images and activity cards are displayed like this
      return (
        <SafeAreaView
          style={styles.box}
          onLayout={({ nativeEvent }) => {
            const { x, y, width, height } = nativeEvent.layout;
            this.setState({ fullWidth: width });
          }}>
          <Image
            source={{ uri: `file://${this.props.data.path}` }}
            style={[
              styles.cardImage,
              { width: '100%', height: this.state.boxHeight },
            ]}
            resizeMode="contain"
          />
        </SafeAreaView>
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
          // disable interactions while being dragged or when saving
          disabled={this.props.dragIsActive || this.props.isMenuDisabled}
          style={styles.module}>
          {this.renderModule(this.props.data.type)}
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
        paddingBottom: 10,
        paddingHorizontal: 10,
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
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'contain',
  },
  LinkBodyStyle: {
    marginBottom: Platform.OS === 'ios' ? 0 : 10,
  },
  LinkViewStyle: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(10),
    paddingVertical: Platform.OS === 'android' ? 0 : 15,
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
  },
  LinkInputStyle: {
    color: '#0078E8',
    flex: 1,
  },
  LinkPreviewStyle: {
    flexDirection: 'row',
    marginVertical: Platform.OS === 'ios' ? 0 : 15,
    alignItems: 'center',
    height: 'auto',
    justifyContent: 'flex-start',
  },
  LinkTextStyle: {
    color: '#0078E8',
    flex: 1,
    flexWrap: 'wrap',
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
