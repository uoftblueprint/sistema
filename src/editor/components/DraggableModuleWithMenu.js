import React from "react";
import {
  Platform,
  ActionSheetIOS,
  UIManager,
  findNodeHandle,
  View,
  TouchableOpacity,
} from "react-native";

// Modified from https://github.com/izzisolomon/react-native-options-menu to handle onLongPress and to suit our needs

export default class DraggableModuleWithMenu extends React.Component {
  constructor(props) {
    super(props);
    this.menuRef; // Assigned upon render
  }

  handleClick = index => {
    let options = this.props.options;
    if (index == options.length - 1 && Platform.OS === "android") {
      
    }

    for (var i = 0; i < options.length; i++) {
      if (index === i) {
        if (this.props.actions[i] !== null) {
          this.props.actions[i]();
        }
      }
    }
  };

  handlePress = () => {
    let options = this.props.options;
    if (Platform.OS === "ios") {
      let destructiveIndex = -1;
      if (
        Number.isInteger(this.props.destructiveIndex) &&
        this.props.destructiveIndex >= 0
      ) {
        destructiveIndex = this.props.destructiveIndex;
      }
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: [...options, "Cancel"],  // Add Cancel button for iOS since menu appears as overlay
          destructiveButtonIndex: destructiveIndex,
          cancelButtonIndex: options.length - 1
        },
        buttonIndex => {
          this.handleClick(buttonIndex);
        }
      );
    } else if (Platform.OS === "android") {
      UIManager.showPopupMenu(
        findNodeHandle(this.menuRef),
        options,
        () => console.log("something went wrong with the popup menu"),
        (e, i) => {
          this.handleClick(i);
        }
      );
    }
  };
  
  render() {
    return (
      <View>
        <TouchableOpacity 
          ref={(el) => this.menuRef = el} 
          onPress={this.handlePress}
          delayLongPress={this.props.longPressTriggerMs}  // ms to trigger a LongPress
          onLongPress={this.props.drag}
          disabled={this.props.dragIsActive}              // disable interactions while being dragged
          style={this.props.style}
        >
          {this.props.children}
        </TouchableOpacity>
      </View>
    );
  };
  
}
