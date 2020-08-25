import { Box, Typography } from '@material-ui/core';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import React, { memo } from 'react';


const useStyles = makeStyles(theme => ({
    info: {
        fontFamily: 'FedraSansStdLight',
        fontSize: '0.9rem',
        lineHeight: '1.3rem',
        '& b': {
            color: theme.palette.tertiaryColor,
            fontFamily: 'FedraSansStdBook',
        },
    },
    infoWrapper: {
        marginTop: theme.spacing(1),
    },
}));

const MetaInfo = ({ createdAt, createdBy, paddingBottom, paddingTop, updatedAt, updatedBy }) => {
    const theme = useTheme();
    const classes = useStyles(theme);

    return (!!createdBy || !!updatedBy) && <Box paddingBottom={paddingBottom} paddingTop={paddingTop}>
        {!!createdBy && <Box>
            <Typography className={classes.info} variant='body1'>
                <b>Created on</b> {`${moment(+createdAt).format('MMMM')} the ${moment(+createdAt).format('Do YYYY')}, at ${moment(+createdAt).format('h:mma')},`} <b>by</b> {`${createdBy.username}.`}
            </Typography>
        </Box>}
        {!!updatedBy && <Box className={classes.infoWrapper}>
            <Typography variant='body1' className={classes.info}>
                <b>Modify for the last time on</b> {`${moment(+updatedAt).format('MMMM')} the ${moment(+updatedAt).format('Do YYYY')}, at ${moment(+updatedAt).format('h:mma')},`} <b>by</b> {`${updatedBy.username}.`}
            </Typography>
        </Box>}
    </Box>
};

export default memo(MetaInfo);