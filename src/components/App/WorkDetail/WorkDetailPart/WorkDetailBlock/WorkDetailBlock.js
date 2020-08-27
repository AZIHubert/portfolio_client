import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

import { useGetContents } from '#graphql';

import WorkDetailContent from './WorkDetailContent';

const useStyles = makeStyles(theme => ({
    container: {
        paddingLeft: props => {
            if(props.position.includes('last')) return props.spacing * 2 / 3;
            if(props.position.includes('middle')) return props.spacing / 3;
            return 0
        },
        paddingRight: props => {
            if(props.position.includes('first')) return props.spacing * 2 / 3;
            if(props.position.includes('middle')) return props.spacing / 3;
            return 0;
        },
        [theme.breakpoints.down('sm')]: {
            paddingLeft: () => 0,
            paddingRight: () => 0,
        },
    },
}));

const WorkDetailBlock = props => {
    const classes = useStyles(props);

    const { block: { _id: blockId, size } } = props;

    const { contents, loading: loadingContents } = useGetContents(blockId);

    return (!loadingContents && !!contents.length) && <Grid
        className={classes.container}
        item
        md={3 * size}
        xs={12}
    >
        <Grid container>
            {contents.map((content, index) => <Grid
                item
                key={index}
                xs={12}
            >
                <WorkDetailContent content={content} index={index} />
            </Grid>)}
        </Grid>
    </Grid>
};

export default WorkDetailBlock;