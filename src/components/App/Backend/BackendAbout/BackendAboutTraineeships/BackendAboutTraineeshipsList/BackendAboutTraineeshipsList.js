import { Box } from '@material-ui/core';
import React from 'react';

import { useGetTraineeships } from '#graphql';
import LoadingData from '#shared/LoadingData';
import NoData from '#shared/NoData';

import BackendAboutSingleTraineeship from './BackendAboutSingleTraineeship';

const TraineeshipsList = () => {
    const { loading: loadingTraineeships, traineeships } = useGetTraineeships();

    return loadingTraineeships ? <LoadingData /> : traineeships.length ? <Box>
        {traineeships.map(traineeship => <BackendAboutSingleTraineeship key={traineeship._id} traineeship={traineeship} />)}
    </Box> : <NoData title='traineeship' />
};

export default TraineeshipsList;