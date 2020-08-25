import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

import { useGetBlocks } from '#graphql';

import WorkDetailBlock from './WorkDetailBlock';

const useStyles = makeStyles(theme => ({
    container: {
        backgroundColor: props => props.part.disableBackground ? props.part.backgroundColor : 'transparant',
        paddingBottom: props => props.part.paddingBottom * 10,
        paddingLeft: theme.spacing(0),
        paddingRight: theme.spacing(0),
        paddingTop: props => props.part.paddingTop * 10,
        [theme.breakpoints.down('sm')]: {
            paddingBottom: props => props.part.disablePaddingSm ? '' : props.part.paddingBottom * 10,
            paddingLeft: theme.spacing(1),
            paddingRight: theme.spacing(1),
            paddingTop: props => props.part.disablePaddingSm ? '' : props.part.paddingTop * 10,
        },
    }
}));

const WorkDetailPart = props => {
    const classes = useStyles(props);

    const {
        part: {
            _id: partId,
            alignItems,
            justifyContent,
            spacing,
        }
    } = props;

    const { blocks, loading: loadingBlocks } = useGetBlocks(partId)
    
    return (!loadingBlocks && !!blocks.length) && <Grid
        alignItems={alignItems}
        className={classes.container}
        container
        justify={justifyContent}
        spacing={0}
    >
        {blocks.map((block, index) => {
            const position = () => {
                const position = [];
                if(blocks.length.size === 5) return [];
                if(blocks.length === 1 && justifyContent === 'flex-start') return ['first'];
                if(blocks.length === 1 && justifyContent === 'flex-end') return ['last'];
                if(index === 0) position.push('first'); 
                if(
                    (index + 1) % blocks.length === 2 ||
                    (index + 1) % blocks.length === 3 ||
                    (index + 1) % blocks.length === 4
                ) position.push('middle');
                if((index + 1)%blocks.length === 0) position.push('last');
                return position;
            };
            return <WorkDetailBlock
                block={block}
                key={block._id}
                position={position()}
                spacing={(spacing*10)/2}
            />
        })}
    </Grid>
};

export default WorkDetailPart;