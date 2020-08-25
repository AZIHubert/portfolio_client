import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

import WorkDetailContentEmpty from './WorkDetailContentEmpty';
import WorkDetailContentImage from './WorkDetailContentImage';
import WorkDetailContentText from './WorkDetailContentText';

const useStyles = makeStyles(theme => ({
    container: {
        boxSizing: 'border-box',
        marginTop: props => theme.spacing(props.content.paddingTop),
        [theme.breakpoints.down('sm')]: {
            marginTop: () => theme.spacing(1),
            paddingLeft: props => props.columnMd ? props.index % 2 ? theme.spacing(0.5) : 0 : 0,
            paddingRight: props => props.columnMd ? props.index % 2 ? 0 : theme.spacing(0.5) : 0,
        }
    },
}));

const WorkDetailContent = props => {
    const classes = useStyles(props);

    const { content } = props;
    
    const contentType = () => {
        switch (content.type) {
            case 'image':
                return <WorkDetailContentImage content={content} />
            case 'text':
                return <WorkDetailContentText content={content} />
            default:
                return <WorkDetailContentEmpty />
        };
    };

    return <div className={classes.container}>
        {contentType()}
    </div>
};

export default WorkDetailContent;