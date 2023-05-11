import { useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { verticalScale } from 'react-native-size-matters';

const SkeletonModule = () => {
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const springValue = useRef(new Animated.Value(1)).current;

  let fadeInAndOut = Animated.sequence([
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }),    
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }),
  ]);

  Animated.loop(
    Animated.parallel([
      fadeInAndOut,
      Animated.timing(springValue, {
        toValue: 1,
        friction: 3,
        tension: 40,
        duration: 2000,
        useNativeDriver: true,
      }),
    ]),
  ).start();

  return (
    <Animated.View style={[styles.module, { opacity: fadeAnim }]} />
  );
};


const styles = StyleSheet.create({
  module: {
    backgroundColor: '#e3e1de',
    height: verticalScale(100),
    width: '100%',
    borderWidth: 0.77,
    borderColor: '#e3e1de',
    borderRadius: 8,
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
});

export default SkeletonModule;
