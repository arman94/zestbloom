import React from 'react';
// import logo from 'assets/img/logo.svg';
import logo from 'assets/img/logo-test.jpg';
import logoIcon from 'assets/img/logo-icon.svg';
import logoGray from 'assets/img/logo-gray.svg';
import logoIconGray from 'assets/img/logo-icon-gray.svg';
import iconOnly from 'assets/img/logo-only.svg';

const LOGO_TYPES = {
    logo,
    logoIcon,
    logoGray,
    logoIconGray,
    iconOnly,
};

const Logo = ({ type, width }) => {
    const src = LOGO_TYPES[type];
    return <img src={src} width={width} alt="Logo" />;
};

export default Logo;
