import { Grid } from '@material-ui/core';
import React, { useContext, memo } from 'react';

import { ScrollContext } from '#contexts/ScrollContext';
import HomePartWrapper from '#shared/HomePartWrapper';

import HomeSingleWork from './HomeSingleWork';

const HomeContainerMemoized = memo(({  works }) => <HomePartWrapper>
    <Grid container spacing={0}>
        {works.map((work, index) => <HomeSingleWork
            index={index + 1}
            key={work._id}
            thumbnailUrl={!!work.thumbnail ? work.thumbnail.url : null}
            title={work.title}
            workId={work._id}
        />)}
    </Grid>
</HomePartWrapper>);

const HomeContainer = ({ works }) => {
    const { refs } = useContext(ScrollContext);
    
    return <div id='works' ref={refs['works']}>
        <HomeContainerMemoized works={works} />
    </div>
};

export default HomeContainer;