import React, { createContext, useState, useContext, useCallback } from 'react';

// Create the context
const MenuContext = createContext({
    isMenuOpen: false,
    toggleMenu: () => {}
});

// Create the provider component
export const MenuProvider = ({ children }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = useCallback(() => {
        setIsMenuOpen((prevState) => !prevState);
    }, []);

    return (
        <MenuContext.Provider value={{ isMenuOpen, toggleMenu }}>
            {children}
        </MenuContext.Provider>
    );
};

export const useMenu = () => {
    const context = useContext(MenuContext);
    if (!context) {
        throw new Error('useMenu must be used within a MenuProvider');
    }
    return context;
};
