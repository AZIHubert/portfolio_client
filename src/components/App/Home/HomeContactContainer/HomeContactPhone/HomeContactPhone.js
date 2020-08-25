import React from 'react';

import AnimatedTypography from '#shared/AnimatedTypography';
import HomeSubList from '#shared/HomeSubList';
import HomeSubListItem from '#shared/HomeSubListItem';

const HomeContactPhone = ({ phone }) => (!!phone && phone !== '') && <HomeSubList paddingBottom={1} title='phone'>
    <HomeSubListItem>
        <AnimatedTypography
            variant='body2'
            yMoving
        >
            {phone}
        </AnimatedTypography>
    </HomeSubListItem>
</HomeSubList>

export default HomeContactPhone;