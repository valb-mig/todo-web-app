import removeTask from '@/utils/api/task/remove';

export default async function taskRemove(selectedProject, projects, task_id, task_key, ambient) {

    const {type, id} = selectedProject;

    const tasks = projects[type][id].project_tasks;

    const updatedTasks = Object.values(tasks).filter((task, index) => {
        return index !== task_key && task.task_id !== task_id;
    });
    
    const updatedProject = {
        ...projects[type][id],
        project_tasks: updatedTasks,
    };
    
    const updatedProjectType = {
        ...projects[type],
        [id]: updatedProject,
    };
    
    const updatedProjects = {
        ...projects,
        [type]: updatedProjectType,
    };

    let response = await removeTask(task_id, id, ambient);

    if(response == true) {
        return updatedProjects;
    }

    return false;
}


