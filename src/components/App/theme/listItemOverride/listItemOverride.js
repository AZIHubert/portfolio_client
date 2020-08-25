export default theme => ({
    MuiListItem: {
        button: {
            '&:hover': {
                backgroundColor: 'transparent'
            }
        },
        gutters: {
            [theme.breakpoints.down('sm')]: {
                paddingLeft: 8,
                paddingRight: 8,
            }
        },
        root: {
            [theme.breakpoints.down('sm')]: {
                paddingBottom: 4,
                paddingTop: 4,
            }
        },
    },
});