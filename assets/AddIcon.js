import * as React from 'react';
import { SvgXml } from 'react-native-svg';

const xml = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 19C14.9706 19 19 14.9706 19 10C19 5.02944 14.9706 1 10 1C5.02944 1 1 5.02944 1 10C1 14.9706 5.02944 19 10 19Z" stroke="black" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6 10H14" stroke="black" stroke-width="0.857143" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10 14L10 6" stroke="black" stroke-width="0.857143" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

export default () => (
  <SvgXml xml={xml} width={20.78} height={20.78} color={'#453E3D'} />
);
