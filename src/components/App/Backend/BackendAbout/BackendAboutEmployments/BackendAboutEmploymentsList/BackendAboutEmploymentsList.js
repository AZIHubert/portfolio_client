import { Box } from '@material-ui/core';
import React from 'react';

import { useGetEmployments } from '#graphql';
import LoadingData from '#shared/LoadingData';
import NoData from '#shared/NoData';

import BackendAboutSingleEmployment from './BackendAboutSingleEmployment';

const BackendAboutEmploymentsList = () => {
    const { employments, loading: loadingEmployment} = useGetEmployments();

    return loadingEmployment ? <LoadingData /> : employments.length ? <Box>
        {employments.map(employment => <BackendAboutSingleEmployment employment={employment} key={employment._id} />)}
    </Box> : <NoData title='employment' />
};

export default BackendAboutEmploymentsList;