import React, { createContext, useState } from 'react';

export const DraggableContext = createContext();

const DraggableContextProvider = ({ children }) => {
    const [draggableId, setDraggableId] = useState(null);
    const resetDraggableId = () => setDraggableId(null);

    return <DraggableContext.Provider value={{
        draggableId,
        resetDraggableId,
        setDraggableId
    }}>
        {children}
    </DraggableContext.Provider>
};

export default DraggableContextProvider;