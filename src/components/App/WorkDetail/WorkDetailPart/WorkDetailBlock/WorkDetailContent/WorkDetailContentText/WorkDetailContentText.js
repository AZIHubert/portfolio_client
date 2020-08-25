import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles(theme => ({
    container: {
        borderBox: 'box-sizing'
    },
    text: {
        color: props => props.content.color ? props.content.color : '',
        fontSize: props => {
            switch (props.content.variant) {
                case 'body1': 
                    return '1.3rem';
                case 'body2':
                    return '1rem';
                case 'h1':
                    return '3rem';
                case 'h2':
                    return '3rem';
                case 'h3':
                    return '2rem';
                default:
                    return '1.3rem';
            }
        },
    }
}));

const WorkDetailContentText = props => {
    const classes = useStyles(props);

    const { content: { body, textAlign } } = props;

    return <Box className={classes.container} textAlign={textAlign}>
        <Typography className={classes.text} variant='body1'>
            {body}
        </Typography>
    </Box>
};

export default WorkDetailContentText;