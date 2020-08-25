import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

import AnimatedTypography from '#shared/AnimatedTypography';
import HomeSubList from '#shared/HomeSubList';
import HomeSubListItem from '#shared/HomeSubListItem';

const useStyles = makeStyles(() => ({
    text: {
        textTransform: 'uppercase',
    },
}));

const HomeContactEmail = ({ email }) => {
    const classes = useStyles();

    return (!!email && email !== '') && <HomeSubList paddingBottom={1} title={'Email'}>
        <HomeSubListItem fullWidth>
            <AnimatedTypography
                className={classes.text}
                component='a'
                href={`mailto:${email}`}
                variant='body2'
            >
                {email}
            </AnimatedTypography>
        </HomeSubListItem>
    </HomeSubList>
};

export default HomeContactEmail;