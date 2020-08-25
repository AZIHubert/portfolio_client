import React from 'react';

import AnimatedTypography from '#shared/AnimatedTypography';
import HomeSubList from '#shared/HomeSubList';
import HomeSubListItem from '#shared/HomeSubListItem';

const HomeTraineeship = ({ traineeships }) => <HomeSubList itemsLength={traineeships.length} title='traineeship'>
    {traineeships.map(traineeship => <HomeSubListItem
        date={traineeship.year}
        key={traineeship._id}
        title={traineeship.company}
        titleLink={traineeship.companyLink}
    >
        {traineeship.body ? <AnimatedTypography variant='body1'>
            {traineeship.body}
        </AnimatedTypography> : null }
        {traineeship.city ? <AnimatedTypography variant='body1'>
            {traineeship.city}
        </AnimatedTypography> : null }
    </HomeSubListItem>)}
</HomeSubList>

export default HomeTraineeship;