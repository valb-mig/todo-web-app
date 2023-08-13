'use client';

import React, { createContext, useContext, useState } from "react";

const GlobalContext = createContext({
    
    userData: {},
    setUserData: () => {},

    projects: {},
    setProjects: () => {},

    selectedProject: {},
    setSelectedProject: () => {}
});

export const GlobalContextProvider = ({ children }) => {

    const [userData, setUserData] = useState({
        username:'...',
        logged:false
    });
    
    const [projects, setProjects] = useState({});

    const [selectedProject, setSelectedProject] = useState({
        id:    null,
        title: null,
        type:  null,
        icon:  null,
        id_project: null
    });

    return (
        <GlobalContext.Provider value={{ 
            
            userData, 
            setUserData, 

            projects, 
            setProjects,

            selectedProject,
            setSelectedProject
        }}>
            {children}
        </GlobalContext.Provider>
    )
};

export const useGlobalContext = () => useContext(GlobalContext);