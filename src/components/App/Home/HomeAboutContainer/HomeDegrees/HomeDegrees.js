import React from 'react';

import AnimatedTypography from '#shared/AnimatedTypography';
import HomeSubList from '#shared/HomeSubList';
import HomeSubListItem from '#shared/HomeSubListItem';

const HomeDegrees = ({ degrees }) => <HomeSubList itemsLength={degrees.length} title='degree'>
    {degrees.map(degree => <HomeSubListItem
        date={degree.year}
        key={degree._id}
        title={degree.degree}
    >
        {degree.schoolLink !== '' ? <AnimatedTypography
            component='a'
            href={degree.schoolLink}
            variant='body2'
            target='_blank'
        >
            {degree.school}
        </AnimatedTypography> : <AnimatedTypography variant='body1'>
            {degree.school}
        </AnimatedTypography>}
        {degree.city !== '' ? <AnimatedTypography variant='body1'>
            {degree.city}
        </AnimatedTypography> : null}
    </HomeSubListItem>)}
</HomeSubList>

export default HomeDegrees;