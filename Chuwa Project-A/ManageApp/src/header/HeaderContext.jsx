import React, {useContext, useState} from 'react';

const HeaderContext = React.createContext();

export const HeaderProvider = ({children}) => {
    const [search, setSearch] = useState(undefined);

    return (
        <HeaderContext.Provider value = {{search, setSearch}}>
            {children}
        </HeaderContext.Provider>
    );
};

export const useHeader = () => useContext(HeaderContext);