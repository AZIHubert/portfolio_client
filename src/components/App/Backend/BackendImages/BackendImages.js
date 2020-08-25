import React from 'react';

import { useGetImages } from '#graphql';
import BackendPartWrapper from '#shared/BackendPartWrapper';

import BackendImagesList from './BackendImagesList';

const BackendImages = () => {
    const { images, loading: loadingImages } = useGetImages();

    return !loadingImages && <BackendPartWrapper title={'Images'}>
        <BackendImagesList images={images} />
    </BackendPartWrapper>
};

export default BackendImages;