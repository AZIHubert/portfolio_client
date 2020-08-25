import React from 'react';

import ScrollContextProvider from '#contexts/ScrollContext';
import {
    useGetDegrees,
    useGetEmployments,
    useGetGeneral,
    useGetTraineeships,
    useGetWorkshops,
    useGetWorks
} from '#graphql';

import HomeAboutContainer from './HomeAboutContainer';
import HomeContactContainer from './HomeContactContainer';
import HomeBackground from './HomeBackground';
import HomeFooter from './HomeFooter';
import HomeHeader from './HomeHeader';
import HomeLoader from './HomeLoader';
import HomeNavbar from './HomeNavbar';
import HomeWorksList from './HomeWorksList';

const Home = () => {
    const { degrees, loading: loadingDegrees } = useGetDegrees();
    const { employments, loading: loadingEmployments } = useGetEmployments();
    const { general, loading: loadingGeneral } = useGetGeneral();
    const { traineeships, loading: loadingTraineeships } = useGetTraineeships();
    const { works, loading: loadingWorks } = useGetWorks(true);
    const { workshops, loading: loadingWorkshops } = useGetWorkshops();

    const hasAbout =
        !!degrees.length ||
        !!employments.length ||
        !!general.biography ||
        !!traineeships.length ||
        !!workshops.length;
    
    const hasContact = 
        !!general.email ||
        !!general.facebook ||
        !!general.instagram ||
        !!general.linkedin ||
        !!general.phone;
        
    const hasWorks = !!works.length;

    return (
        !loadingDegrees &&
        !loadingEmployments &&
        !loadingGeneral &&
        !loadingTraineeships &&
        !loadingWorks &&
        !loadingWorkshops
    ) ? <ScrollContextProvider>
        <HomeNavbar hasAbout={hasAbout} hasContact={hasContact} hasWorks={hasWorks} />
        <HomeHeader />
        {hasWorks && <HomeWorksList works={works} />}
        {hasAbout && <HomeAboutContainer
            biography={general.biography}
            degrees={degrees}
            employments={employments}
            traineeships={traineeships}
            workshops={workshops}
        />}
        {hasContact && <HomeContactContainer
            email={general.email}
            facebook={general.facebook}
            instagram={general.instagram}
            linkedin={general.linkedin}
            phone={general.phone}
        />}
        <HomeFooter />
        <HomeBackground />
    </ScrollContextProvider> : <HomeLoader />
};

export default Home;