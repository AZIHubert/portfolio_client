import { Box } from '@material-ui/core';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import React, { memo } from 'react';

import { useGetTypes } from '#graphql';
import LoadingData from '#shared/LoadingData';
import NoData from '#shared/NoData';

import BackendWorksSingleType from './BackendWorksSingleType';

const useStyles = makeStyles(theme => ({
    container: {
        [theme.breakpoints.up('sm')]: {
            width: '75%'
        }
    }
}));

const BackendWorksTypesList = () => {
    const theme = useTheme();
    const classes = useStyles(theme);

    const { types, loading: loadingTypes } = useGetTypes();

    return loadingTypes ? <LoadingData /> : types.length ? <Box
        className={classes.container}
        display='flex'
        flexWrap='wrap'
    >
        {types.map(type => <BackendWorksSingleType key={type._id} type={type} />)}
    </Box> : <NoData title='types' />

};

export default memo(BackendWorksTypesList);