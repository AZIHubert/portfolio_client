export default theme => ({
    MuiIconButton: {
        colorPrimary: {
            '&:hover': {
                backgroundColor: 'transparent'
            }
        },
        colorSecondary: {
            '&:hover': {
                backgroundColor: 'transparent'
            }
        },
        root: {
            '&:hover': {
                backgroundColor: 'transparent'
            }
        },
    },
    MuiCheckbox: {
        colorPrimary: {
            '&.Mui-checked': {
                color: theme.palette.tertiaryColor
            }
        },
        colorSecondary: {
            '& .MuiSvgIcon-root': {
                fill: theme.palette.tertiaryColor
            },
            '&.Mui-checked:hover': {
                backgroundColor: 'transparent !important' 
            },
        },
        root: {
            color: theme.palette.tertiaryColor
        },
    }
});