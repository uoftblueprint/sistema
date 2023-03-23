import { StyleSheet } from 'react-native';

export const AppColors = {
  primary: '#4D8ECB', // Celestial Blue, primary color
  background: '#FFFAF5', // Floral White, background color
  secondary: '#33B4A9', // Keppei (it's a turqoise color), for buttons?
  tertiary: '#685777', // Granite Gray idk what this is used for lmao
  quaternary: '#A761A3', // Pearly purple, idk what this is used for lmao
  quinary: '#EC6A6B', // Light Carmine Pink, idk what this is used for lmao
  senary: '#F6A957', // Rajah (some kind of orangey color), idk what is used for lmao

  // opacity
  primary_30: 'rgba(77, 142, 203, 0.4)',
  secondary_30: 'rgba(51, 180, 169, 0.4)',
  tertiary_30: 'rgba(134, 87, 119, 0.4)',
  quaternary_30: 'rgba(167, 97, 163, 0.4)',
  quinary_30: 'rgba(236, 106, 107, 0.4)',
  senary_30: 'rgba(246, 169, 87, 0.4)',
};

export const TextStyle = StyleSheet.create({
  h1: {
    fontSize: 24,
    color: '#000000',
    fontFamily: 'Poppins-Bold',
    letterSpacing: 0.3,
  },
  h2: {
    fontSize: 20,
    color: '#453E3D',
    fontFamily: 'Poppins-Bold',
    lineHeight: 28,
    letterSpacing: 0.3,
  },
  body: {
    color: '#000000',
    fontFamily: 'Mulish-Regular',
  },
});
