'use client';

import React, { createContext, useContext, useState } from "react";

const GlobalContext = createContext({
    
    userData: {},
    setUserData: () => {},

    path: {},
    setScreenPath: () => {},

    projects: {},
    setProjects: () => {},

    selectedProject: {},
    setSelectedProject: () => {}
});

export const GlobalContextProvider = ({ children }) => {

    const [userData, setUserData] = useState({

        username:'',
        darkTheme:true, 
        logged:false,
    });
    
    const [path, setScreenPath] = useState({
        current: {home:true},
        breadcrumbs: ['home']
    });

    const [projects, setProjects] = useState({
        
        'todo':[],
        'kanban':[]
    });

    const [selectedProject, setSelectedProject] = useState({

        id:    null,
        key:   null,
        title: null,
        type:  null,
        icon:  null
    });

    return (
        <GlobalContext.Provider value={{ 
            
            userData, 
            setUserData, 

            path,
            setScreenPath,

            projects, 
            setProjects,

            selectedProject,
            setSelectedProject
        }}>
            { children }
        </GlobalContext.Provider>
    )
};

export const useGlobalContext = () => useContext(GlobalContext);