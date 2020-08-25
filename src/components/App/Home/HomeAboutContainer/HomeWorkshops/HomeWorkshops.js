import React from 'react';

import AnimatedTypography from '#shared/AnimatedTypography';
import HomeSubList from '#shared/HomeSubList';
import HomeSubListItem from '#shared/HomeSubListItem';

const HomeWorkshops = ({ workshops }) =>  <HomeSubList itemsLength={workshops.length} title='workshop' >
    {workshops.map(workshop => <HomeSubListItem
        date={workshop.year}
        key={workshop._id}
        title={workshop.artist}
        titleLink={workshop.artistLink}
    >
        <AnimatedTypography variant='body1'>
            {workshop.body}
        </AnimatedTypography>
    </HomeSubListItem>)}
</HomeSubList>

export default HomeWorkshops;