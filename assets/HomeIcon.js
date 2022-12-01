import * as React from 'react';
import { SvgXml } from 'react-native-svg';

const xml = `
    <svg width="39" height="36" viewBox="0 0 39 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M37.6605 16.6486L21.0827 2.03821C20.3757 1.38896 19.3202 1.38896 18.6133 2.03821L2.03548 16.6486C1.62857 17.0223 4.84797 15.006 4.84797 15.5735V32.3928C4.84797 33.4797 5.68744 34.3608 6.72297 34.3608H14.223C15.2585 34.3608 16.098 33.4797 16.098 32.3928V24.5207C16.098 23.4337 16.9374 22.5526 17.973 22.5526H21.723C22.7585 22.5526 23.598 23.4337 23.598 24.5207V32.3928C23.598 33.4797 24.4374 34.3608 25.473 34.3608H32.973C34.0085 34.3608 34.848 33.4797 34.848 32.3928V15.5735C34.848 15.006 38.0674 17.0223 37.6605 16.6486Z" stroke="black" stroke-width="2.29008" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
`;

export default () => <SvgXml xml={xml} width={39} height={36} />;
