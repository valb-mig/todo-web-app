import removeTask from '@/utils/api/task/remove';

export default async function taskRemove(selectedProject, projects, task_id, task_key, ambient) {

    const tasks = projects[selectedProject.type][selectedProject.id].project_tasks;

    const updatedTasks = Object.values(tasks).filter((task, index) => {
        return index !== task_key;
    });
    
    const updatedProject = {
        ...projects[selectedProject.type][selectedProject.id],
        project_tasks: updatedTasks,
    };
    
    const updatedProjectType = {
        ...projects[selectedProject.type],
        [selectedProject.id]: updatedProject,
    };
    
    const updatedProjects = {
        ...projects,
        [selectedProject.type]: updatedProjectType,
    };

    let response = await removeTask(task_id, selectedProject.id, ambient);

    if(response == true) {
        return updatedProjects;
    }

    return false;
}


