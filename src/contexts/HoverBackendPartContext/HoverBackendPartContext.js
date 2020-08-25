import React, { createContext, useState } from 'react';

export const HoverBackendPartContext = createContext();

const HoverBackendPartContextProvider = ({ children }) => {
    const [hoverBlock, setHoverBlock] = useState(false);
    const [hoverContent, setHoverContent] = useState(false);
    const [hoverPart, setHoverPart] = useState(false);

    const handleHoverBlock = () => {
        if(!hoverContent) setHoverBlock(true);
        setHoverPart(false);
    };
    const handleHoverContent = () => {
        setHoverContent(true);
        setHoverBlock(false);
        setHoverPart(false);
    };
    const handleHoverPart = () => {
        if(!hoverBlock && !hoverContent) setHoverPart(true);
    };
    const handleLeaveBlock = () => {
        setHoverBlock(false);
        setHoverPart(true)
    };
    const handleLeaveContent = () => {
        setHoverContent(false);
        setHoverBlock(true);
    };
    const handleLeavePart = () => setHoverPart(false);

    return <HoverBackendPartContext.Provider value={{
        handleHoverBlock,
        handleHoverContent,
        handleHoverPart,
        handleLeaveBlock,
        handleLeaveContent,
        handleLeavePart,
        hoverBlock,
        hoverContent,
        hoverPart,
    }}>
        {children}
    </HoverBackendPartContext.Provider>
};

export default HoverBackendPartContextProvider;