import React, { createContext } from 'react';


const ThemeContext = createContext({
    primary: '#4b5e78',
    Header:{
        backgroundColor: '#4b5e78'
    }
})

export const ThemeProvider = ThemeContext.Provider;
export const ThemeConsumer = ThemeContext.Consumer;

export default ThemeContext;