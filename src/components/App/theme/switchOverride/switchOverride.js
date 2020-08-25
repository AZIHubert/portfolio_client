export default (theme) => ({
    MuiButtonBase: {
        root: {
            background: 'transparent',
            '&:not(.Mui-checked) .MuiSwitch-thumb': {
                border: `2px solid ${theme.palette.tertiaryColor}`,
                color: theme.palette.primaryColor,
            },
        },
    },
    MuiSwitch: {
        colorSecondary: {
            '&$checked': {
                color: theme.palette.tertiaryColor,
                '& + $track': {
                    backgroundColor: theme.palette.tertiaryColor,
                },
                '&:hover': {
                    backgroundColor: 'transparent',
                },
            }
        },
        root: {
            '& + .MuiTypography-root': {
                color: theme.palette.tertiaryColor,
                fontSize: 18,
                textTransform: 'uppercase',
                '&::selection': {
                    backgroundColor: theme.palette.tertiaryColor,
                    color: theme.palette.primaryColor,
                },
            },
        },
        track: {
            backgroundColor: theme.palette.primaryColor,
            border: `2px solid ${theme.palette.tertiaryColor}`,
            opacity: 1,
        },
    },
});