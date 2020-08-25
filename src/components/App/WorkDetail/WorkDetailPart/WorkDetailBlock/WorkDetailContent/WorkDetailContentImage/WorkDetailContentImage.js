import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import React from 'react';

import useProgressiveImage from '#hooks/useProgressiveImage';

const useStyles = makeStyles(theme => ({
    imageContainer: {
        backgroundColor: theme.palette.tertiaryColor,
        opacity: 0,
        transition: '0.5s',
        '&.loaded': {
            opacity: 1,
        },
    },
    image: {
        display: 'block',
        height: 'auto',
        width: '100%',
        '&::selection': {
            backgroundColor: theme.palette.tertiaryColor,
        },
    }
}));

const WorkDetailContentImage = ({ content : { image: { url } } }) => {
    const theme = useTheme();
    const classes = useStyles(theme);

    const loaded = useProgressiveImage(url);
    
    return <div className={clsx(classes.imageContainer, {
        ['loaded']: loaded
    })}>
        <img
            alt='content'
            className={classes.image}
            src={loaded}
        />
    </div>
};

export default WorkDetailContentImage;