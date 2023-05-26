import { useRef } from 'react';
import { Animated, View, ScrollView, StyleSheet } from 'react-native';
import TagFilter from './TagFilter';

const TagCarousel = ({
  tagsList,
  activeTags,
  setActiveTags,
  selectOnlyOne,
  showBottomScrollbar,
}) => {
  const scrollBarPosition = useRef(new Animated.Value(0)).current;
  const scrollBarPositionPercentage = scrollBarPosition.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  const handleScroll = event => {
    if (showBottomScrollbar) {
      const { x } = event.nativeEvent.contentOffset;
      const { width } = event.nativeEvent.contentSize;
      const maxScrollX = width;
      const scrollPercentage = x / maxScrollX;
      Animated.timing(scrollBarPosition, {
        toValue: scrollPercentage,
        duration: 0,
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <View style={{ height: 80, flexDirection: 'column' }}>
      <View style={{ backgroundColor: 'red' }}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          nestedScrollEnabled={true}>
          {tagsList.map((tag, index) => (
            <TagFilter
              key={index}
              tagContent={tag}
              active={activeTags[index]}
              onPress={() => {
                // make a copy of the active tags
                let newActiveTags = activeTags.slice();
                if (
                  selectOnlyOne &&
                  !activeTags[index] && // if planning to activate tag
                  activeTags.includes(true) // and other tags are already active
                ) {
                  // turn off all tags since we can only have one active
                  newActiveTags = new Array(activeTags).fill(false);
                }
                // toggle current tag
                newActiveTags[index] = !newActiveTags[index];
                setActiveTags(newActiveTags);
              }}
            />
          ))}
        </ScrollView>
        {showBottomScrollbar && 
          <View>
            <View
              style={{
                width: '100%',
                borderBottomWidth: 1.5,
                borderBottomColor: '#C7BCBC87',
                position: 'absolute',
                top: '130%',
              }}
            />
            <Animated.View
              style={[
                styles.segment,
                {
                  left: scrollBarPositionPercentage,
                },
              ]}
            />
          </View>
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  segment: {
    width: '40%',
    borderBottomWidth: 1.5,
    borderBottomColor: 'black',
    position: 'absolute',
    top: '130%',
  },
});

export default TagCarousel;
