import { Box } from '@material-ui/core';
import React from 'react';

import { useGetWorkshops } from '#graphql';

import LoadingData from '#shared/LoadingData';
import NoData from '#shared/NoData';

import BackendAboutSingleWorkshop from './BackendAboutSingleWorkshop';

const BackendAboutWorkshopsList = () => {
    const { workshops, loading: loadingWorkshop} = useGetWorkshops();

    return loadingWorkshop ? <LoadingData /> : workshops.length ? <Box>
        {workshops.map(workshop => <BackendAboutSingleWorkshop key={workshop._id} workshop={workshop} />)}
    </Box> : <NoData title='workshop' />
};

export default BackendAboutWorkshopsList;