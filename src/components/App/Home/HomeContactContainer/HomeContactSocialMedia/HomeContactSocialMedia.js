import { makeStyles } from '@material-ui/core/styles';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import React from 'react';

import AnimatedTypography from '#shared/AnimatedTypography';
import HomeSubList from '#shared/HomeSubList';
import HomeSubListItem from '#shared/HomeSubListItem';

const useStyles = makeStyles(() => ({
    text: {
        textTransform: 'uppercase',
    },
}));

const HomeContactSocialMedia = ({ facebook, instagram, linkedin }) => {
    const classes = useStyles();

    const numOfSocialMedia = +!!facebook + +!!instagram + +!!linkedin;
    
    return <HomeSubList itemsLength={numOfSocialMedia} paddingBottom={1} title={'Social Media'}>
        <HomeSubListItem icon={FacebookIcon} paddingBottom={0}>
            <AnimatedTypography
                className={classes.text}
                component='a'
                href={facebook}
                target='_blank'
                variant='body2'
            >
                facebook
            </AnimatedTypography>
        </HomeSubListItem>
        <HomeSubListItem icon={InstagramIcon} paddingBottom={0}>
            <AnimatedTypography
                className={classes.text}
                component='a'
                href={instagram}
                target='_blank'
                variant='body2'
            >
                instagram
            </AnimatedTypography>
        </HomeSubListItem>
        <HomeSubListItem icon={LinkedInIcon} paddingBottom={0}>
            <AnimatedTypography
                className={classes.text}
                component='a'
                href={linkedin}
                target='_blank'
                variant='body2'
            >
                linkedin
            </AnimatedTypography>
        </HomeSubListItem>
    </HomeSubList>
};

export default HomeContactSocialMedia;