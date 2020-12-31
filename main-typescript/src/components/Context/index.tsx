import React from 'react';

export interface AppContextInterface {
    boardWidth: string,
    boardHeight: string,
    boxWidth: string,
    boxHeight: string
};

const AppContext = React.createContext<AppContextInterface | null>(null);

export const AppProvider = AppContext.Provider;
export const AppConsumer = AppContext.Consumer;