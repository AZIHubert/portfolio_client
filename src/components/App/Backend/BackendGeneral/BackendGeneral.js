import React, { memo } from 'react';

import { useGetGeneral } from '#graphql';
import BackendPartWrapper from '#shared/BackendPartWrapper';
import LoadingData from '#shared/LoadingData';

import BackendGeneralForm from './BackendGeneralForm';

const BackendGeneral = () => {
    const { general, loading } = useGetGeneral();
    return <BackendPartWrapper title={'General informations'}>
        {(loading && !Object.keys(general).length) ? <LoadingData /> : <BackendGeneralForm general={general} />}
    </BackendPartWrapper>
};

export default BackendGeneral;