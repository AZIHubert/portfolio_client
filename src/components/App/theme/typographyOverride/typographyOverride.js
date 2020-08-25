export default theme => ({
    MuiTypography: {
        h1: {
            color: theme.palette.tertiaryColor,
            fontFamily: 'FedraSansStdBold',
            fontSize: '10rem',
            letterSpacing: '0.12rem',
            margin: 0,
            textTransform: 'uppercase',
            '&::selection': {
                background: theme.palette.tertiaryColor,
                color: theme.palette.primaryColor,
            },
            [theme.breakpoints.down('md')]: {
                fontSize: '7rem'
            },
            [theme.breakpoints.down('xs')]: {
                fontSize: '4rem'
            },
        },
        h2: {
            color: theme.palette.tertiaryColor,
            fontFamily: 'FedraSansStdBold',
            fontSize: '7rem',
            margin: 0,
            textTransform: 'uppercase',
            '&::selection': {
                background: theme.palette.tertiaryColor,
                color: theme.palette.primaryColor,
            },
            [theme.breakpoints.down('md')]: {
                fontSize: '4.5rem',
            },
            [theme.breakpoints.down('xs')]: {
                fontSize: '3rem',
            },
        },
        h3: {
            color: theme.palette.tertiaryColor,
            fontFamily: 'FedraSansStdBold',
            fontSize: '3rem',
            letterSpacing: 1.4,
            textTransform: 'capitalize',
            [theme.breakpoints.down('xs')]: {
                fontSize: '3rem',
            },
            lineHeight: 1,
            '&::selection': {
                background: theme.palette.tertiaryColor,
                color: theme.palette.primaryColor,
            },
        },
        h4: {
            color: theme.palette.tertiaryColor,
            fontFamily: 'FedraSansStdBook',
            fontSize: '3rem',
            letterSpacing: 1.2,
            lineHeight: 1.3,
            textTransform: 'capitalize',
            '&::selection': {
                background: theme.palette.tertiaryColor,
                color: theme.palette.primaryColor,
            },
            [theme.breakpoints.down('xs')]: {
                fontSize: '2.5rem',
            },
        },
        h5: {
            color: theme.palette.tertiaryColor,
            fontFamily: 'FedraSansStdBook',
            fontSize: '3rem',
            lineHeight: 1.3,
            letterSpacing: 1.2,
            margin: 0,
            '&::selection': {
                backgroundColor: theme.palette.tertiaryColor,
                color: theme.palette.primaryColor,
            },
            [theme.breakpoints.down('sm')]: {
                fontSize: '2rem',
            },
            [theme.breakpoints.down('xs')]: {
                fontSize: '1.8rem',
            },
        },
        h6: {
            color: theme.palette.secondaryColor,
            fontFamily: 'FedraSansStdBold',
            fontSize: '2rem',
            lineHeight: 1,
            '&::selection': {
                backgroundColor: theme.palette.tertiaryColor,
                color: theme.palette.secondaryColor,
            },
            [theme.breakpoints.down('xs')]: {
                fontSize: '1.5rem'
            },
        },
        body1: {
            color: theme.palette.secondaryColor,
            fontFamily: 'FedraSansStdBook',
            fontSize: '1.3rem',
            lineHeight: 1.2,
            '&::selection': {
                backgroundColor: theme.palette.secondaryColor,
                color: theme.palette.primaryColor,
            },
            [theme.breakpoints.down('xs')]: {
                fontSize: '1rem',
            },
        },
        body2: {
            color: theme.palette.secondaryColor,
            fontFamily: 'FedraSansStdBookItalic',
            fontSize: '1.3rem',
            lineHeight: 1.2,
            '&::selection': {
                backgroundColor: theme.palette.secondaryColor,
                color: theme.palette.tertiaryColor,
            },
            [theme.breakpoints.down('xs')]: {
                fontSize: '1rem',
            },
        },
        subtitle1: {
            color: theme.palette.secondaryColor,
            fontFamily: 'FedraSansStdBook',
            fontSize: '1.2rem',
        },
    },
});