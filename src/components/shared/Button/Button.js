import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import React, { memo } from 'react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    container: {
        cursor: props => props.cursor !== undefined ? props.cursor : 'pointer',
        border: props => (props.borderWidth !== undefined || props.borderColor !== undefined) ?
            `${props.borderWidth !== undefined ? `${props.borderWidth}px` : '1px'} solid ${props.borderColor !== undefined ? props.borderColor : theme.palette.tertiaryColor}` :
            'none',
        borderRadius: props => props.borderRadius !== undefined ? props.borderRadius : 0,
        boxShadow: props => props.shadow === true ? '2px 2px 10px rgba(0,0,0,0.2)' : 'none',
        marginBottom: props => props.marginBottom !== undefined ? theme.spacing(props.marginBottom) : 0,
        opacity: props => props.disabled ? 0.5 : 1,
        marginTop: props => props.marginTop !== undefined ? theme.spacing(props.marginTop) : 0,
        width: props => props.width !== undefined ? props.width : '100%',
        zIndex: props => props.zIndex !== undefined ? props.zIndex : 0,
        [theme.breakpoints.down('sm')]: {
            marginBottom: props => props.marginBottomSM !== undefined ? theme.spacing(props.marginBottomSM) : props.marginBottom !== undefined ? theme.spacing(props.marginBottom) : 0,
            marginTop: props => props.marginTopSM !== undefined ? theme.spacing(props.marginTopSM) : props.marginTop !== undefined ? theme.spacing(props.marginTop) : 0,
            width: props => props.widthSM !== undefined ? props.widthSM : props.width !== undefined ? props.width : '100%',
        },
        [theme.breakpoints.down('xs')]: {
            marginBottom: props => props.marginBottomXS !== undefined ? theme.spacing(props.marginBottomXS) : props.marginBottom !== undefined ? theme.spacing(props.marginBottom) : 0,
            marginTop: props => props.marginTopXS !== undefined ? theme.spacing(props.marginTopXS) : props.marginTop !== undefined ? theme.spacing(props.marginTop) : 0,
            width: props => props.widthXS !== undefined ? props.widthXS : props.width !== undefined ? props.width : '100%',
        },
    },
    link: {
        alignItems: 'center',
        display: 'inline-flex',
        justifyContent: 'center',
        verticalAlign: 'middle',
        '& span': {
            textAlign: 'center',
            width: '100%',
        },
    },
    text: {
        backgroundColor: props => props.disabledBackgroundColor ? 'transparent' : props.backgroundColor !== undefined ? props.backgroundColor : theme.palette.tertiaryColor,
        color:  props => props.color !== undefined ? props.color : theme.palette.primaryColor,
        fontFamily: props => {
            switch(props.variant){
                case 'book':
                    return 'FedraSansStdBook';
                case 'book italic':
                    return 'FedraSansStdBookItalic';
                case 'bold':
                    return 'FedraSansStdBold';
                case 'light':
                    return 'FedraSansStdLight';
                default:
                    return 'FedraSansStdBook'
            }
        },
        fontSize: props => props.fontSize !== undefined ? `${props.fontSize}rem` : '1rem',
        fontSpacing: props => props.fontSpacing !== undefined ? props.fontSpacing : 0,
        padding: props => theme.spacing(props.paddingTB !== undefined ? props.paddingTB : 0.5, props.paddingLR !== undefined ? props.paddingLR : 0.5),
        textTransform: props => props.textTransform !== undefined ? props.textTransform : 0,
        transition: props => props.transitionDuration !== undefined ? `color ${props.transitionDuration}s, background-color ${props.transitionDuration}s` : 'color 0.5s, background-color 0.5s, opacity 0.5s',
        '& svg': {
            color:  props => props.color !== undefined ? props.color : theme.palette.primaryColor
        },
        '&:focus': {
            outline: 0,
        },
        '&:hover': {
            backgroundColor: props => props.disabledBackgroundColor ? 'transparent' :
                props.disableBackgroundColorAnimation === true ?
                props.backgroundColor !== undefined ? props.backgroundColor : theme.palette.tertiaryColor :
                props.backgroundColorHover !== undefined ?
                props.backgroundColorHover :
                props.color !== undefined ? props.color : theme.palette.primaryColor,
            color: props => props.disableColorAnimation === true ?
                props.color !== undefined ? props.color : theme.palette.primaryColor :
                props.colorHover !== undefined ?
                props.colorHover :
                props.backgroundColor !== undefined ? props.backgroundColor : theme.palette.tertiaryColor,
            '& svg': {
                color: props => props.disableColorAnimation === true ?
                props.color !== undefined ? props.color : theme.palette.primaryColor :
                props.colorHover !== undefined ?
                props.colorHover :
                props.backgroundColor !== undefined ? props.backgroundColor : theme.palette.tertiaryColor
            },
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: props => props.fontSizeSM !== undefined ? `${props.fontSizeSM}rem` : props.fontSize !== undefined ? `${props.fontSize}rem` : '1rem'
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: props => props.fontSizeXS !== undefined ? `${props.fontSizeXS}rem` : props.fontSize !== undefined ? `${props.fontSize}rem` : '1rem'
        },
    }
}));

const Button = props => {
    const classes = useStyles(props);

    const {
        backgroundColor,
        borderColor,
        borderRadius,
        borderWidth,
        children,
        colorHover,
        disabledBackgroundColor,
        download,
        link,
        loading,
        marginBottom,
        marginTop,
        onClick,
        shadow,
        to,
        type,
        ...rest
    } = props;

    const handleClick = e => {
        if(onClick === undefined || loading) e.preventDefault();
        else onClick(e);
    };

    return link ? <Link
        {...rest}
        className={clsx(classes.container, classes.link)}
        disabled={loading}
        to={to}
    >
        <span className={classes.text}>
            {!!loading ? 'loading' : children}
        </span>
    </Link> : to !== undefined ? <a
        {...rest}
        className={clsx(classes.container, classes.link)}
        disabled={loading}
        download={download !== undefined && download}
        href={to}
        rel='noopener noreferrer'
        target='_blank'
    >
        <span className={classes.text}>
            {!!loading ? 'loading' : children}
        </span>
    </a> : <button
        {...rest}
        className={clsx(classes.container, classes.text)}
        onClick={handleClick}
        type={type !== undefined ?  type : 'button'}
    >
        {!!loading ? 'loading' : children}
    </button>
};

const areEqual = (prevProps, nextProps) => prevProps.loading === nextProps.loading && prevProps.children === nextProps.children;
const useMemo = (component, propsAreEqual) => memo(component, propsAreEqual);

export default useMemo(Button, areEqual);