import * as React from 'react';
import { SvgXml } from 'react-native-svg';

const xml = `
<svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.33333 21.781V22.781C6.59855 22.781 6.8529 22.6757 7.04044 22.4882L6.33333 21.781ZM1 21.781H0C0 22.3333 0.447715 22.781 1 22.781L1 21.781ZM1 16.4477L0.292893 15.7406C0.105357 15.9281 0 16.1825 0 16.4477H1ZM16.0572 1.39052L16.7643 2.09763L16.7643 2.09763L16.0572 1.39052ZM17.9428 1.39052L17.2357 2.09763V2.09763L17.9428 1.39052ZM21.3905 4.83824L22.0976 4.13113V4.13113L21.3905 4.83824ZM6.33333 20.781H1V22.781H6.33333V20.781ZM2 21.781V16.4477H0V21.781H2ZM1.70711 17.1548L16.7643 2.09763L15.3501 0.683417L0.292893 15.7406L1.70711 17.1548ZM17.2357 2.09763L20.6834 5.54535L22.0976 4.13113L18.6499 0.683417L17.2357 2.09763ZM20.6834 6.01675L5.62623 21.0739L7.04044 22.4882L22.0976 7.43096L20.6834 6.01675ZM20.6834 5.54535C20.8136 5.67552 20.8136 5.88658 20.6834 6.01675L22.0976 7.43096C23.0089 6.51974 23.0089 5.04236 22.0976 4.13113L20.6834 5.54535ZM16.7643 2.09763C16.8945 1.96746 17.1055 1.96746 17.2357 2.09763L18.6499 0.683418C17.7387 -0.227806 16.2613 -0.227806 15.3501 0.683418L16.7643 2.09763Z" fill="#453E3D"/>
<path d="M11.6666 5.78125L17 11.1146" stroke="#453E3D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

export default () => <SvgXml xml={xml} width={25} height={25} />;