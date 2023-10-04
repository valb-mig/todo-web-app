import { useGlobalContext } from '@/config/context/store';

const useDragDrop = () => {
   
    const { selectedProject, projects, setProjects } = useGlobalContext();

    const handleDragEnd = (event) => {

        const tasks = projects[selectedProject.type][selectedProject.id].project_tasks;
        
        const { source, destination } = event;
        
        if (!destination) return;
        if (destination.droppableId === source.droppableId && destination.index === source.index) return;
        
        const updatedTasks = [...tasks];

        const [removedTask] = updatedTasks.splice(source.index, 1);

        updatedTasks.splice(destination.index, 0, removedTask);
        
        const updatedProject = {
            ...projects,
                [selectedProject.type]: {
                    ...projects[selectedProject.type],
                    [selectedProject.id]: {
                        ...projects[selectedProject.type][selectedProject.id],
                        project_tasks: updatedTasks,
                    },
                },
        };
        
        setProjects(updatedProject);
    }

    return { handleDragEnd };
}

export default useDragDrop;