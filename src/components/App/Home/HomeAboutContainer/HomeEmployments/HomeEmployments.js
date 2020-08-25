import React from 'react';

import AnimatedTypography from '#shared/AnimatedTypography';
import HomeSubList from '#shared/HomeSubList';
import HomeSubListItem from '#shared/HomeSubListItem';

const Employments = ({ employments }) => <HomeSubList itemsLength={employments.length} title='employment'>
    {employments.map(employment => <HomeSubListItem
        date={employment.yearTo ? `${employment.yearFrom} - ${employment.yearTo}` : employment.yearFrom}
        key={employment._id}
        title={employment.company}
        titleLink={employment.companyLink}
    >
        {employment.body ? <div>
            {employment.body.split('\n').map((splite, index) => <AnimatedTypography
                key={index}
                variant='body1'
            >
                {splite}
            </AnimatedTypography>)}
        </div> : null}
        {employment.city ? <AnimatedTypography variant='body1'>
            {employment.city}
        </AnimatedTypography> : null}
    </HomeSubListItem>)}
</HomeSubList>

export default Employments;