import * as React from 'react';
import { SvgXml } from 'react-native-svg';

const xml = `<svg width="22" height="17" viewBox="0 0 22 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2 14.9165H20.0833" stroke="#333333" stroke-width="2.58333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2 8.45825H20.0833" stroke="#333333" stroke-width="2.58333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2 2H20.0833" stroke="#333333" stroke-width="2.58333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

export default () => <SvgXml xml={xml} width={24} height={16} color={"#453E3D"}/>;