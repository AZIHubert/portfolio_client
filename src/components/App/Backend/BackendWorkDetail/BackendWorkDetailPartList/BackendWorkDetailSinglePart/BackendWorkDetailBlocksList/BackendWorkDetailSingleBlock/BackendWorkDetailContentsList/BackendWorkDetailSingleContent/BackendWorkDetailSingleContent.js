import { Box, Typography, withWidth } from '@material-ui/core';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import clsx from 'clsx';
import React, { useContext, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { DraggableContext } from '#contexts/DraggableContext';
import { HoverBackendPartContext } from '#contexts/HoverBackendPartContext';
import { useDeleteContent } from '#graphql';
import AddContentModal from '#shared/AddContentModal';
import DeleteModal from '#shared/DeleteModal';


const useStyles = makeStyles(theme => ({
    body: {
        color: props => props.content.color,
        fontSize: props => {
            switch (props.content.variant) {
                case 'body1': 
                    return '1rem';
                case 'body2':
                    return '0.8rem';
                case 'h1':
                    return '2rem';
                case 'h2':
                    return '1.6rem';
                case 'h3':
                    return '1.3rem';
                default:
                    return '1rem';
            }
        },
    },
    bodyContainer: {
        textAlign: props => props.content.textAlign,
    },
    container: {
        marginBottom: theme.spacing(1),
        position: 'relative',
        '&.dragging': {
            height: 150,
            overflow: 'hidden',
        },
        '&.hover': {
            outline: `2px dotted ${theme.palette.tertiaryColor}`,
        },
    },
    editors: {
        backgroundColor: theme.palette.tertiaryColor,
        padding: theme.spacing(0.5, 0, 0.5, 1),
    },
    gradient: {
        background: `linear-gradient(90deg, rgba(0,0,0,0) 25%, ${theme.palette.quaternaryColor} 100%);`,
        height: '100%',
    },
    icon: {
        color: theme.palette.primaryColor,
        fontSize: '1.2rem',
        pointerEvents: 'auto',
        transition: theme.transitions.create('color', {
            duration: theme.transitions.duration.short,
            easing: theme.transitions.easing.easeInOut,
        }),
        [theme.breakpoints.down('md')]: {
            fontSize: '0.8rem',
        },
    },
    iconContainer: {
        marginRight: theme.spacing(1),
        [theme.breakpoints.down('md')]: {
            marginRight: theme.spacing(0.5),
        },
    },
    iconHover: {
        cursor: 'pointer',
        '&:hover': {
            color: theme.palette.secondaryColor,
        },
    },
    image: {
        display: 'block',
        height: 'auto',
        width: '100%',
    },
    informations: {
        alignItems: 'center',
        display: 'flex',
        padding: theme.spacing(0.5, 1),
        justifyContent: 'space-between',
        opacity: 0,
        pointerEvents: 'none',
        position: 'absolute',
        transition: '0.5s',
        width: '100%',
        zIndex: 10,
        '&.hover': {
            opacity: 1,
        },
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(1),
        },
    },
    title: {
        color: theme.palette.tertiaryColor,
        fontSize: '1rem',
        [theme.breakpoints.down('md')]: {
            fontSize: '0.6rem',
        },
    },
    titleContainer: {
        backgroundColor: theme.palette.primaryColor,
        border: `1px solid ${theme.palette.tertiaryColor}`,
        padding: theme.spacing(0.5, 1),
        [theme.breakpoints.down('md')]: {
            padding: theme.spacing(0.5),
        },
    },
}));

const SingleContent = props => {
    const theme = useTheme();
    const classes = useStyles(props);
    const { blockId, content, contentsLength, index, width } = props;

    const { handleHoverContent, handleLeaveContent, hoverContent } = useContext(HoverBackendPartContext);
    const { draggableId } = useContext(DraggableContext);

    const [hover, setHover] = useState(false);
    const handleHover = () => {
        setHover(true);
        handleHoverContent();
    };
    const handleLeave = () => {
        setHover(false);
        handleLeaveContent();
    };
    
    const [openDelete, setOpenDelete] = useState(false);
    const handleOpenDelete = () => setOpenDelete(true);
    const handleCloseDelete = () => setOpenDelete(false);
    
    const [openEdit, setOpenEdit] = useState(false);
    const handleOpenEdit = () => setOpenEdit(true);
    const handleCloseEdit = () => setOpenEdit(false);
    
    const [deleteContent, { loading: loadingDelete }] = useDeleteContent({ contentId: content._id }, blockId, handleCloseDelete);

    // const bodySplit = body => {
    //     if(width === 'xs') return body.length > 300 ? `${body.slice(0, 200)}...` : body;
    //     if(width === 'sm') return body.length > 320 ? `${body.slice(0, 220)}...` : body;
    //     if(width === 'md') return body.length > 340 ? `${body.slice(0, 240)}...` : body;
    //     if(width === 'lg') return body.length > 360 ? `${body.slice(0, 260)}...` : body;
    //     if(width === 'xl') return body.length > 380 ? `${body.slice(0, 280)}...` : body;
    //     return body;
    // };

    return <Draggable
        draggableId={content._id}
        index={index}
        isDragDisabled={contentsLength < 2}
    >
        {(provided, snapshot) => <Box
            className={clsx(classes.container, {
                ['hover']: ((hover && hoverContent) || snapshot.isDragging),
                ['dragging']: draggableId === content._id
            })}
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
            ref={provided.innerRef}
            {...provided.draggableProps}
        >
            <Box
                className={clsx(classes.informations, {
                    ['hover']: ((hover && hoverContent) || snapshot.isDragging),
                })}
            >
                <Box className={classes.titleContainer}>
                    <Typography className={classes.title} variant='body1'>
                        {`Content #${index + 1}`}
                    </Typography>
                </Box>
                <Box
                    alignItems='center'
                    className={classes.editors}
                    display='flex'
                >
                    <Box display='flex'>
                        <Box
                            alignItems='center'
                            className={classes.iconContainer}
                            display='flex'
                            onClick={handleOpenEdit}
                        >
                            <EditIcon className={clsx(classes.icon, classes.iconHover)} />
                        </Box>
                        <Box
                            alignItems='center'
                            className={classes.iconContainer}
                            display='flex'
                            onClick={handleOpenDelete}
                        >
                            <DeleteOutlineIcon className={clsx(classes.icon, classes.iconHover)} />
                        </Box>
                        {contentsLength > 1 && <Box
                            alignItems='center'
                            className={classes.iconContainer}
                            display='flex'
                            {...provided.dragHandleProps}
                        >
                            <UnfoldMoreIcon className={classes.icon} />
                        </Box>}
                    </Box>
                </Box>
            </Box>
            {content.type === 'image' && <Box>
                <img className={classes.image} src={content.image.url} />
            </Box>}
            {content.type === 'text' && <Box className={classes.bodyContainer}>
                <Typography className={classes.body} variant='body1'>
                    {/* {bodySplit(content.body)} */}
                    {content.body}
                </Typography>
            </Box>}
            <DeleteModal
                actionTitle='delete'
                handleClose={handleCloseDelete}
                handleSubmit={deleteContent}
                loading={loadingDelete}
                open={openDelete}
                title='Delete content'
            />
            <AddContentModal
                handleClose={handleCloseEdit}
                initialContent={content}
                open={openEdit}
            />
        </Box>}
    </Draggable>
};

export default withWidth()(SingleContent);