import { useGlobalContext } from '@/config/context/store';

import getProject  from '@/utils/api/project/get';
import modalSubmit from '@/utils/validators/home/modal/submitController';

const useLayout = () => {
   
    const { projects, selectedProject, userData, setProjects, setSelectedProject, setScreenPath } = useGlobalContext();

    const handleGetProjects = async () => {
            
        let response = await getProject(userData.data.ambient);

        if( response ) {
            setProjects(response.projects);
        }
    };

    const changeProjectType = (type) => {

        setScreenPath({
            current: { project:true },
            breadcrumbs: [type],
        });

        setSelectedProject({
            id:    null,
            key:   null,
            type:  type,
            title: null,
            icon:  null,
        });
    };

    const selectProject = (project, key, id) => {

        setScreenPath({
            current: { task:true },
            type: { [selectedProject.type]:true },
            breadcrumbs: [selectedProject.type, project.project_title],
        });

        setSelectedProject({
            id:    id,
            key:   key,
            type:  selectedProject.type,
            title: project.project_title,
            icon:  project.project_icon,
        });
    };

    const submitModal = async (event, setModalFormData, modalFormData) => {

        event.preventDefault();
        
        setModalFormData({...modalFormData, error: false});

        let response = await modalSubmit(modalFormData, setModalFormData, selectedProject, userData);

        if(typeof response == "object") {

            let projectCount = Object.keys(projects[selectedProject.type]).length + 1;
            
            setProjects({

                ...projects,

                [selectedProject.type]:{
                ...projects[selectedProject.type],
                    [projectCount]:{
                        ...response
                    }
                }
            });

        } else if(typeof response == "boolean") {
            if(response) {
                handleGetProjects();
            } else {
                setModalFormData({...modalFormData, error: true});
            }
        }
    };

    return { handleGetProjects, changeProjectType, selectProject, submitModal };
}

export default useLayout;