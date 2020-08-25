import React, { useContext, memo } from 'react';

import { ScrollContext } from '#contexts/ScrollContext';
import HomePartWrapper from '#shared/HomePartWrapper';

import HomeContactEmail from './HomeContactEmail';
import HomeContactPhone from './HomeContactPhone';
import HomeContactSocialMedia from './HomeContactSocialMedia';
import HomeMailForm from './HomeMailForm';

const HomeContactContainerMemoized = memo(({
    email,
    facebook,
    instagram,
    linkedin,
    phone
}) => <HomePartWrapper title='contact'>
    {(!!email && email.trim() !== '') && <HomeMailForm />}
    {(!!email && email.trim() !== '') && <HomeContactEmail email={email} />}
    {(!!phone && phone.trim() !== '') && <HomeContactPhone phone={phone} />}
    {(
        (!!facebook && facebook !== '') ||
        (!!instagram && instagram !== '') ||
        (!!linkedin && linkedin !== '')
    ) && <HomeContactSocialMedia
        facebook={facebook}
        instagram={instagram}
        linkedin={linkedin}
    />}
</HomePartWrapper>)

const HomeContactContainer = ({
    email,
    facebook,
    instagram,
    linkedin,
    phone
}) => {
    const { refs } = useContext(ScrollContext);
    
    return <div id='contact' ref={refs['contact']}>
        <HomeContactContainerMemoized
            email={email}
            facebook={facebook}
            instagram={instagram}
            linkedin={linkedin}
            phone={phone}
        />
    </div>
};

export default HomeContactContainer;