import React, { createContext, useRef, useState, useEffect, useCallback } from 'react';

export const ScrollContext = createContext();

const ScrollContextProvider = ({children}) => {
    const [refs] = useState({
        'home': useRef(null),
        'works':  useRef(null),
        'about': useRef(null),
        'contact': useRef(null),
        'footer': useRef(null)
    });
    const [current, setCurrent] = useState('');
    const [activeLink, setActiveLink] = useState('home');
    const [light, setLight] = useState(true);

    const getCurrent = useCallback(() => {
        const h = window.innerHeight;
        let v = Number.MIN_SAFE_INTEGER;
        let k = '';
        for (const [key, value] of Object.entries(refs)) {
            if(value.current) {
                const itemY = value.current.getBoundingClientRect().top;
                if(itemY < h/6 && itemY > v){
                    k = key;
                    v = itemY;
                }
            }
        }
        setCurrent(k);
    }, [refs]);

    useEffect(() => {
        if(current === 'home' || current === 'works'){
            setLight(true);
            if(current === 'home') setActiveLink('home');
            else setActiveLink('works');
        } else if(current === 'about') {
            setLight(false);
            setActiveLink('about');
        } else if(current === 'contact') {
            setLight(true);
            setActiveLink('contact');
        } else if(current === 'footer') setLight(false);
        else setLight(true);
    }, [current]);

    useEffect(() => {
        window.addEventListener('scroll', getCurrent);
        return () => window.removeEventListener('scroll', getCurrent);
    }, [getCurrent]);

    return <ScrollContext.Provider value={{ refs, activeLink, light }}>
        {children}
    </ScrollContext.Provider>
};

export default ScrollContextProvider;