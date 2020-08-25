import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

import ClearSansBoldTTF from '#res/fonts/clearSans/bold/ClearSans-Bold.ttf';
import ClearSansBoldWoff from '#res/fonts/clearSans/bold/ClearSans-Bold.woff';
import ClearSansBoldWoff2 from '#res/fonts/clearSans/bold/ClearSans-Bold.woff2';
import FedraSansStdBoldTTF from '#res/fonts/fedraSansStd/bold/FedraSansStd-Bold.ttf';
import FedraSansStdBoldWoff from '#res/fonts/fedraSansStd/bold/FedraSansStd-Bold.woff';
import FedraSansStdBoldWoff2 from '#res/fonts/fedraSansStd/bold/FedraSansStd-Bold.woff2';
import FedraSansStdBookTTF from '#res/fonts/fedraSansStd/book/FedraSansStd-Book.ttf';
import FedraSansStdBookWoff from '#res/fonts/fedraSansStd/book/FedraSansStd-Book.woff';
import FedraSansStdBookWoff2 from '#res/fonts/fedraSansStd/book/FedraSansStd-Book.woff2';
import FedraSansStdBookItalicTTF from '#res/fonts/fedraSansStd/bookItalic/FedraSansStd-BookItalic.ttf';
import FedraSansStdBookItalicWoff from '#res/fonts/fedraSansStd/bookItalic/FedraSansStd-BookItalic.woff';
import FedraSansStdBookItalicWoff2 from '#res/fonts/fedraSansStd/bookItalic/FedraSansStd-BookItalic.woff2';
import FedraSansStdLightTTF from '#res/fonts/fedraSansStd/light/FedraSansStd-Light.ttf';
import FedraSansStdLightWoff from '#res/fonts/fedraSansStd/light/FedraSansStd-Light.woff';
import FedraSansStdLightWoff2 from '#res/fonts/fedraSansStd/light/FedraSansStd-Light.woff2';

import checkBoxOverride from './checkBoxOverride';
import formControlLabelOverride from './formControlLabelOverride';
import listItemIconOverride from './listItemIconOverride';
import listItemOverride from './listItemOverride';
import switchOverride from './switchOverride';
import typographyOverride from './typographyOverride';

const ClearSansBold = {
    fontFamily: 'ClearSansBold',
    fontDisplay: 'swap',
    src: ` local('ClearSans-Bold'),
      local('ClearSans-Bold'),
      url(${ClearSansBoldWoff2}) format('woff2'),
      url(${ClearSansBoldWoff}) format('woff'),
      url(${ClearSansBoldTTF}) format('ttf') `,
    unicodeRange: 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF'
};

const FedraSansStdBold = {
  fontFamily: 'FedraSansStdBold',
  fontDisplay: 'swap',
  src: ` local('FedraSansStd-Bold'),
    local('FedraSansStd-Bold'),
    url(${FedraSansStdBoldWoff2}) format('woff2'),
    url(${FedraSansStdBoldWoff}) format('woff'),
    url(${FedraSansStdBoldTTF}) format('ttf') `,
  unicodeRange: 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF'
};

const FedraSansStdBook = {
    fontFamily: 'FedraSansStdBook',
    fontDisplay: 'swap',
    src: ` local('FedraSansStd-Book'),
      local('FedraSansStd-Book'),
      url(${FedraSansStdBookWoff2}) format('woff2'),
      url(${FedraSansStdBookWoff}) format('woff'),
      url(${FedraSansStdBookTTF}) format('ttf') `,
    unicodeRange: 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF'
};

const FedraSansStdBookItalic = {
    fontFamily: 'FedraSansStdBookItalic',
    fontDisplay: 'swap',
    src: ` local('FedraSansStd-BookItalic'),
      local('FedraSansStd-BookItalic'),
      url(${FedraSansStdBookItalicWoff2}) format('woff2'),
      url(${FedraSansStdBookItalicWoff}) format('woff'),
      url(${FedraSansStdBookItalicTTF}) format('ttf') `,
    unicodeRange: 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF'
};

const FedraSansStdLight = {
  fontFamily: 'FedraSansStdLight',
  fontDisplay: 'swap',
  src: ` local('FedraSansStd-Light'),
    local('FedraSansStd-Light'),
    url(${FedraSansStdLightWoff2}) format('woff2'),
    url(${FedraSansStdLightWoff}) format('woff'),
    url(${FedraSansStdLightTTF}) format('ttf') `,
  unicodeRange: 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF'
};

const theme = () => {
    const defaultTheme = createMuiTheme({
        palette: {
            'primaryColor': '#fcfff6',
            'secondaryColor': '#1e0a14',
            'tertiaryColor': '#ffbeaa',
            'quaternaryColor': '#ffffdc'
        },
        spacing: 10,
    });

    const checkBox = checkBoxOverride(defaultTheme);
    const formControlaLabel = formControlLabelOverride(defaultTheme);
    const listItem = listItemOverride(defaultTheme);
    const listItemIcon = listItemIconOverride(defaultTheme);
    const typography = typographyOverride(defaultTheme);
    const switcher = switchOverride(defaultTheme);

    return createMuiTheme({
        palette: {
            ...defaultTheme.palette
        },
        spacing: defaultTheme.spacing,
        overrides: {
            MuiCssBaseline: {
                '@global': {
                    '#root': {
                        overflow: 'hidden',
                    },
                    a: {
                        textDecoration: 'none',
                    },
                    body: {
                        backgroundColor: defaultTheme.palette.primaryColor,
                        margin: 0,
                        transition: defaultTheme.transitions.create('background', {
                            duration: '600ms',
                            easing: defaultTheme.transitions.easing.sharp,
                        }),
                        '&::-webkit-scrollbar': {
                            display: 'none'
                        },
                    },
                    html: {
                        margin: 0,
                    },
                    '*': {
                        boxSizing: 'border-box',
                    },
                    '@font-face': [
                        FedraSansStdBold,
                        FedraSansStdBookItalic,
                        FedraSansStdBook,
                        FedraSansStdLight,
                        ClearSansBold
                    ],
                },
            },
            ...formControlaLabel,
            ...checkBox,
            ...listItemIcon,
            ...listItem,
            ...typography,
            ...switcher,
        },
        custom: {
            userForm: {
                maxWidth: 500,
            },
            drawerWidth: 200,
            drawerWidthDownSM:  120
        },
        typography: {
            fontFamily: 'FedraSansStdBookItalic, Arial'
        }
    })
};

export default theme;