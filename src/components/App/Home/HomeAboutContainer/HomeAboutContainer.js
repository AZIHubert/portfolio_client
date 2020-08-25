import React, { useContext, memo } from 'react';

import { ScrollContext } from '#contexts/ScrollContext';
import HomePartWrapper from '#shared/HomePartWrapper';

import HomeBiography from './HomeBiography';
import HomeDegrees from './HomeDegrees';
import HomeTraineeships from './HomeTraineeships';
import HomeWorkshops from './HomeWorkshops';

import HomeEmployments from './HomeEmployments';

const HomeAboutContainerMemoized = memo(({
    biography,
    degrees,
    employments,
    traineeships,
    workshops,
}) => <HomePartWrapper title='about'>
    {(!!biography && biography !== '') && <HomeBiography biography={biography} />}
    {!!traineeships.length && <HomeTraineeships traineeships={traineeships} />}
    {!!degrees.length && <HomeDegrees degrees={degrees} />}
    {!!workshops.length && <HomeWorkshops workshops={workshops} />}
    {!!employments.length && <HomeEmployments employments={employments} />}
</HomePartWrapper>);

const HomeAboutContainer = ({
    biography,
    degrees,
    employments,
    traineeships,
    workshops
}) => {
    const { refs } = useContext(ScrollContext);
    
    return (
        (!!biography && biography !== '') ||
        !!degrees.length ||
        !!traineeships.length ||
        !!workshops.length ||
        !!employments.length
    ) && <div id='about' ref={refs['about']}>
        <HomeAboutContainerMemoized
            biography={biography}
            degrees={degrees}
            employments={employments}
            traineeships={traineeships}
            workshops={workshops}
        />
    </div>
};

export default HomeAboutContainer;