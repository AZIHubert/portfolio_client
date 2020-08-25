import { Box } from '@material-ui/core';
import React from 'react';

import { useGetDegrees } from '#graphql';
import LoadingData from '#shared/LoadingData';
import NoData from '#shared/NoData';

import BackendAboutSingleDegree from './BackendAboutSingleDegree';

const DegreesList = () => {
    const { degrees, loading: loadingDegrees} = useGetDegrees();

    return loadingDegrees ? <LoadingData /> : degrees.length ? <Box>
        {degrees.map(degree => <BackendAboutSingleDegree degree={degree} key={degree._id} />)}
    </Box> : <NoData title='degree' />
};

export default DegreesList;